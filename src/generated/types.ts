import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ICreated = {
  /** ISO date time string for the time this resource was created */
  createdAt?: Maybe<Scalars["String"]>;
  /** Unique identifier for users that created this resource */
  createdBy?: Maybe<Scalars["ID"]>;
};

export type IDisplayName = {
  /** A preformatted display name safe to display in HTML context */
  displayName?: Maybe<Scalars["String"]>;
};

export type IUpdated = {
  /** ISO date time string for the time this resource was created */
  updatedAt?: Maybe<Scalars["String"]>;
  /** Unique identifier for users that created this resource */
  updatedBy?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Provides name spaced users functionality */
  users: UsersMutations;
};

export type Query = {
  __typename?: "Query";
  /** Returns the current user as defined by the authentication headers */
  self?: Maybe<User>;
  /** Provides name spaced users functionality */
  users: UsersQuery;
};

export type User = ICreated &
  IUpdated &
  IDisplayName & {
    __typename?: "User";
    /** Unique identifier for the resource across all collections */
    id?: Maybe<Scalars["ID"]>;
    /** ISO date time string for the time this resource was created */
    createdAt?: Maybe<Scalars["String"]>;
    /** Unique identifier for users that created this resource */
    createdBy?: Maybe<Scalars["ID"]>;
    /** ISO date time string for the time this resource was created */
    updatedAt?: Maybe<Scalars["String"]>;
    /** Unique identifier for users that created this resource */
    updatedBy?: Maybe<Scalars["ID"]>;
    /** A preformatted name safe to display in any HTML context */
    displayName?: Maybe<Scalars["String"]>;
    /** Email addresses */
    email?: Maybe<Scalars["String"]>;
    /** Determines if a users is a service account supporting applications */
    isServiceAccount?: Maybe<Scalars["Boolean"]>;
  };

export type UserInput = {
  /** Unique identifier for the resource across all collections */
  id: Scalars["ID"];
  /** A preformatted name safe to display in any HTML context */
  displayName?: Maybe<Scalars["String"]>;
  /** Email addresses */
  email?: Maybe<Scalars["String"]>;
};

/** Provides name spaced users functionality */
export type UsersMutations = {
  __typename?: "UsersMutations";
  /** Saves the user and returns the updated copy */
  saveUser?: Maybe<User>;
};

/** Provides name spaced users functionality */
export type UsersMutationsSaveUserArgs = {
  user: UserInput;
};

/** Provides name spaced users functionality */
export type UsersQuery = {
  __typename?: "UsersQuery";
  /** Returns the user record matching the provided id */
  getById?: Maybe<User>;
};

/** Provides name spaced users functionality */
export type UsersQueryGetByIdArgs = {
  id: Scalars["ID"];
};

export type SelfQueryVariables = Exact<{ [key: string]: never }>;

export type SelfQuery = {
  __typename?: "Query";
  self?: Maybe<{
    __typename?: "User";
    id?: Maybe<string>;
    displayName?: Maybe<string>;
  }>;
};

export type UserByIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserByIdQuery = {
  __typename?: "Query";
  users: {
    __typename?: "UsersQuery";
    getById?: Maybe<{
      __typename?: "User";
      id?: Maybe<string>;
      displayName?: Maybe<string>;
      email?: Maybe<string>;
    }>;
  };
};

export type SaveUserMutationVariables = Exact<{
  user: UserInput;
}>;

export type SaveUserMutation = {
  __typename?: "Mutation";
  users: {
    __typename?: "UsersMutations";
    saveUser?: Maybe<{
      __typename?: "User";
      id?: Maybe<string>;
      displayName?: Maybe<string>;
      email?: Maybe<string>;
    }>;
  };
};

export const SelfDocument = gql`
  query Self {
    self {
      id
      displayName
    }
  }
`;

/**
 * __useSelfQuery__
 *
 * To run a query within a React component, call `useSelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfQuery(
  baseOptions?: Apollo.QueryHookOptions<SelfQuery, SelfQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SelfQuery, SelfQueryVariables>(SelfDocument, options);
}
export function useSelfLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SelfQuery, SelfQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SelfQuery, SelfQueryVariables>(
    SelfDocument,
    options
  );
}
export type SelfQueryHookResult = ReturnType<typeof useSelfQuery>;
export type SelfLazyQueryHookResult = ReturnType<typeof useSelfLazyQuery>;
export type SelfQueryResult = Apollo.QueryResult<SelfQuery, SelfQueryVariables>;
export const UserByIdDocument = gql`
  query UserById($id: ID!) {
    users {
      getById(id: $id) {
        id
        displayName
        email
      }
    }
  }
`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    options
  );
}
export function useUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserByIdQuery,
    UserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    options
  );
}
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<
  typeof useUserByIdLazyQuery
>;
export type UserByIdQueryResult = Apollo.QueryResult<
  UserByIdQuery,
  UserByIdQueryVariables
>;
export const SaveUserDocument = gql`
  mutation SaveUser($user: UserInput!) {
    users {
      saveUser(user: $user) {
        id
        displayName
        email
      }
    }
  }
`;
export type SaveUserMutationFn = Apollo.MutationFunction<
  SaveUserMutation,
  SaveUserMutationVariables
>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSaveUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveUserMutation,
    SaveUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveUserMutation, SaveUserMutationVariables>(
    SaveUserDocument,
    options
  );
}
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = Apollo.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = Apollo.BaseMutationOptions<
  SaveUserMutation,
  SaveUserMutationVariables
>;
