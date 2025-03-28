import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
// import Header from './components/Header';
import { GET_AUTH_USER } from './graphql/queries/user.query';
import { useQuery } from '@apollo/client';
import { Toaster } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import Homepage from './components/Homepage';
import TimezoneChecker from './components/TimezoneChecker';
import Dashboard from './components/Dashboard';

const App = () => {

  function Loader() {
        return (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
  
          />
        )
      }
   
  const { data ,loading } = useQuery(GET_AUTH_USER);
  console.log(data);
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );

  
  return (
    <Router>
      {/* {data?.authUser && <Header/>} */}
    <Routes>
        <Route path="/" element={data?.authUser? <Navigate to="/dashboard" />: <Homepage />} />
        <Route path="/Signup" element={data?.authUser ? <Navigate to="/dashboard" />: <Signup />} />
        <Route path="/login" element={!data?.authUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/todos" element={data?.authUser ? (<TodoList userID={data?.authUser._id}/>): (<Navigate to="/" />)} />
        <Route path="/timezone" element={data?.authUser ? (<TimezoneChecker />): (<Navigate to="/" />)} />
        <Route path="/dashboard" element={data?.authUser ? (<Dashboard />): (<Navigate to="/" />)} />
      </Routes>
      <Toaster />

    </Router>
  );
};

export default App;
