import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
import { GET_AUTH_USER } from './graphql/queries/user.query';
import { useQuery } from '@apollo/client';
import { Toaster } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import Homepage from './components/Homepage';
import TimezoneChecker from './components/TimezoneChecker';
import Dashboard from './components/Dashboard';

const App = () => {
  // Track authentication state locally
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  function Loader() {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
  }

  const { data, loading, refetch } = useQuery(GET_AUTH_USER);
  
  // Update authentication state when data changes
  useEffect(() => {
    console.log('Auth user data:', data);
    if (data?.authUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [data]);

  // Custom refetch function that ensures state is updated
  const handleRefetch = async () => {
    try {
      const result = await refetch();
      console.log("Refetch result:", result);
      return result;
    } catch (error) {
      console.error("Error refetching auth user:", error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Homepage />} />
        <Route path="/Signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/login" element={!isAuthenticated ? <Login refetchAuthUser={handleRefetch} /> : <Navigate to="/dashboard" />} />
        <Route path="/todos" element={isAuthenticated ? (<TodoList userID={data?.authUser?._id} />) : (<Navigate to="/" />)} />
        <Route path="/timezone" element={isAuthenticated ? (<TimezoneChecker />) : (<Navigate to="/" />)} />
        <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/" />)} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;


// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import TodoList from './components/TodoList';
// import { GET_AUTH_USER } from './graphql/queries/user.query';
// import { useQuery } from '@apollo/client';
// import { Toaster } from "react-hot-toast";
// import { RotatingLines } from "react-loader-spinner";
// import Homepage from './components/Homepage';
// import TimezoneChecker from './components/TimezoneChecker';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   function Loader() {
//     return (
//       <RotatingLines
//         strokeColor="grey"
//         strokeWidth="5"
//         animationDuration="0.75"
//         width="96"
//         visible={true}
//       />
//     );
//   }

//   const { data, loading, refetch } = useQuery(GET_AUTH_USER);
//   console.log('Auth user data:', data);
//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <Loader />
//     </div>
//   );

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={data?.authUser ? <Navigate to="/dashboard" /> : <Homepage />} />
//         <Route path="/Signup" element={data?.authUser ? <Navigate to="/dashboard" /> : <Signup />} />
//         <Route path="/login" element={!data?.authUser ? <Login refetchAuthUser={refetch} /> : <Navigate to="/dashboard" />} />
//         <Route path="/todos" element={data?.authUser ? (<TodoList userID={data?.authUser._id} />) : (<Navigate to="/" />)} />
//         <Route path="/timezone" element={data?.authUser ? (<TimezoneChecker />) : (<Navigate to="/" />)} />
//         <Route path="/dashboard" element={data?.authUser ? (<Dashboard />) : (<Navigate to="/" />)} />
//       </Routes>
//       <Toaster />
//     </Router>
//   );
// };

// export default App;