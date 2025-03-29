import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
import { Toaster } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import Homepage from './components/Homepage';
import TimezoneChecker from './components/TimezoneChecker';
import Dashboard from './components/Dashboard';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, user, loading } = useAuth();

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

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );

  console.log("App - Authentication status:", isAuthenticated);
  console.log("App - User:", user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Homepage />} />
        <Route path="/Signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/todos" element={isAuthenticated ? (<TodoList userID={user?._id} />) : (<Navigate to="/" />)} />
        <Route path="/timezone" element={isAuthenticated ? (<TimezoneChecker />) : (<Navigate to="/" />)} />
        <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/" />)} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
