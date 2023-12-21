import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Configuración del enlace HTTP para conectarse a tu servidor GraphQL
const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql', // Reemplaza con la URL de tu servidor GraphQL
    cache: new InMemoryCache(),
  });

// Configuración del manejo de errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Creación del cliente Apollo
const client = new ApolloClient({
  link: from([
    errorLink,
    httpLink, // Enlace HTTP
  ]),
  // Sirve para almacenar en caché los resultados de las consultas
  cache: new InMemoryCache(), // Configuración de la caché en memoria
});

export default client;
