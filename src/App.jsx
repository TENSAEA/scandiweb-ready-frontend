import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [authChecked, setAuthChecked] = useState(false);
  
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

  const { data, loading, refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'network-only',
    onCompleted: () => {
      setAuthChecked(true);
      console.log("Auth check completed:", data);
    }
  });

  // Function to handle authentication updates
  const handleAuthUpdate = async () => {
    console.log("Refreshing auth state...");
    try {
      const result = await refetch();
      console.log("Auth refresh result:", result);
      return result;
    } catch (error) {
      console.error("Error refreshing auth:", error);
    }
  };

  if (loading && !authChecked) return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );

  // Check if user is authenticated
  const isAuthenticated = !!data?.authUser;
  console.log("Authentication status:", isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Homepage />} />
        <Route path="/Signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route 
          path="/login" 
          element={
            !isAuthenticated 
              ? <Login refetchAuthUser={handleAuthUpdate} /> 
              : <Navigate to="/dashboard" />
          } 
        />
        <Route 
          path="/todos" 
          element={
            isAuthenticated 
              ? <TodoList userID={data?.authUser._id} /> 
              : <Navigate to="/" />
          } 
        />
        <Route 
          path="/timezone" 
          element={
            isAuthenticated 
              ? <TimezoneChecker /> 
              : <Navigate to="/" />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated 
              ? <Dashboard /> 
              : <Navigate to="/" />
          } 
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
