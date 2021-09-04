import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  createHttpLink,
} from "@apollo/client";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_URL || "http://localhost:5000/api/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});
