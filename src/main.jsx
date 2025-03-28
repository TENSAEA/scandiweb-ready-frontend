import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import App from './App.jsx'
import './index.css'

const client = new ApolloClient({
  uri: 'https://scandiweb-ready-backend-1.onrender.com/graphql',
  cache: new InMemoryCache(),
  credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
