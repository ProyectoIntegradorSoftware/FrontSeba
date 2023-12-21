import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import client from './utils/graphClient'; // Asegúrate de que la ruta sea correcta
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';





ReactDOM.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);