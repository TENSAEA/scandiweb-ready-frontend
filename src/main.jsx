import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext';

const httpLink = createHttpLink({
  uri: 'https://scandiweb-ready-backend-1.onrender.com/graphql',
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
