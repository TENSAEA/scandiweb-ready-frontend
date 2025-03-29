import { createContext, useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTH_USER } from '../graphql/queries/user.query';
import { LOGIN, LOGOUT } from '../graphql/mutations/user.mutation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get auth user query
  const { refetch } = useQuery(GET_AUTH_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log("Auth context - Auth query result:", data);
      if (data?.authUser) {
        setUser(data.authUser);
        setIsAuthenticated(true);
      } else {
        // Check localStorage as fallback
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error("Auth query error:", error);
      // Check localStorage as fallback
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    }
  });

  // Login mutation
  const [loginMutation] = useMutation(LOGIN);
  
  // Logout mutation
  const [logoutMutation] = useMutation(LOGOUT);

  // Login function
  const login = async (username, password) => {
    try {
      const { data } = await loginMutation({ 
        variables: { input: { username, password } } 
      });
      
      if (data?.login) {
        // Store user in state and localStorage
        setUser(data.login);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.login));
        
        // Try to refetch auth user (for cookie-based auth)
        await refetch();
        
        return { success: true, user: data.login };
      }
      return { success: false, error: "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      await refetch();
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };
    
    checkAuth();
  }, [refetch]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout,
      refetchUser: refetch
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
