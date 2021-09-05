import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const url =
  process.env.REACT_APP_GRAPHQL_URL || "http://localhost:5000/graphql";

// HTTP connection to the API
const terminatingLink = createHttpLink({
  // You should use an absolute URL here
  uri: url,
});
// An alternative link if you need to support uploads:
// import { createUploadLink } from "apollo-upload-client";
// const terminatingLink = createUploadLink({
//   uri: url,
// });

// Authorization functionality
const withToken = setContext(async () => {
  // const authorization = await authService.getAuthorization();
  const authorization = "bearer 1234";
  return { authorization };
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const { authorization } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      Authorization: authorization,
    },
  }));
  return forward(operation);
});

// Apollo link creation layered with middleware to support auth headers and your http link
const link = ApolloLink.from([
  withToken,
  authMiddleware.concat(terminatingLink),
]);

// Cache implementation
const cache = new InMemoryCache({
  // Define merge strategies for our types and fields
  typePolicies: {
    // Top level Query fields
    Query: {
      fields: {
        // Merge our namespaces
        users: { merge: true },
      },
    },
    // Stub functionality to allow pagination merging through the hook result's .fetchMore().
    // Imagine users(limit: 10, offset: 0, ...) { id, displayName }
    // UsersQuery: {
    //   fields: {
    //     users: {
    //       keyArgs: ["id"],
    //       ...offsetLimitItemsPaginationPolicy(),
    //     },
    //   },
    // },
  },
});

// Create the apollo client
export const apolloClient = new ApolloClient({ link, cache });
