

import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { store } from './redux/store'; // Adjust the import based on your store location


const httpLink = createHttpLink({
  uri: 'https://patient-appointment-production.up.railway.app/graphql', 
});

// Create a middleware link to attach the token to every request
const authLink = new ApolloLink((operation, forward) => {
  const state = store.getState();
  const token = state.auth.token; 

 
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  return forward(operation);
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

export default client;

