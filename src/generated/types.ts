import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
  Upload: { input: any; output: any };
};

/** A base definition authentication actors. Customized from the auth-api generated types. */
export type AuthenticationIdentity = ICreated &
  IDisplayImage &
  IDisplayName &
  IId &
  IUpdated & {
    __typename?: "AuthenticationIdentity";
    /**
     * True if the Identity is active. False if the User has been deactivated.
     * Deactivated Users will not be able to login. Entities will always be active.
     */
    active: Scalars["Boolean"]["output"];
    /** ISO date time string for the time this resource was created */
    createdAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    createdBy?: Maybe<Scalars["String"]["output"]>;
    /** A public url name safe to display in any HTML context */
    displayImageUrl?: Maybe<Scalars["String"]["output"]>;
    /** A preformatted name safe to display in any HTML context */
    displayName: Scalars["String"]["output"];
    /** Email address. Users will have emails, entities will not. */
    email?: Maybe<Scalars["String"]["output"]>;
    /** The primary id for this type. Typically a namespaced chain of methods, providers, and unique ids. */
    id: Scalars["ID"]["output"];
    /** The string will be in an IANA time zone format. https://www.iana.org/time-zones */
    timezone?: Maybe<Scalars["String"]["output"]>;
    /** ISO date time string for the time this resource was created */
    updatedAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    updatedBy?: Maybe<Scalars["String"]["output"]>;
  };

export enum AuthenticationRole {
  Anonymous = "Anonymous",
  Authenticated = "Authenticated",
}

export type ICreated = {
  /** ISO date time string for the time this resource was created */
  createdAt?: Maybe<Scalars["String"]["output"]>;
  /** Unique identifier for users that created this resource */
  createdBy?: Maybe<Scalars["String"]["output"]>;
};

export type IDisplayImage = {
  /** A public url name safe to display in any HTML context */
  displayImageUrl?: Maybe<Scalars["String"]["output"]>;
};

export type IDisplayName = {
  /** A preformatted display name safe to display in HTML context */
  displayName?: Maybe<Scalars["String"]["output"]>;
};

export type IId = {
  /** The primary id for this type. Typically a namespaced chain of methods, providers, and unique ids. */
  id: Scalars["ID"]["output"];
};

/** Provides the required attributes to support automatic .fetchMore() offset pagination merge strategies */
export type IOffsetPaging = {
  /** The number of records in this set */
  limit: Scalars["Int"]["output"];
  /** The index of the first item in this result set from the larger collection */
  offset: Scalars["Int"]["output"];
  /** The total number of records available in the larger collection */
  total: Scalars["Int"]["output"];
};

export type IUpdated = {
  /** ISO date time string for the time this resource was created */
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  /** Unique identifier for users that created this resource */
  updatedBy?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Provides name spaced users functionality */
  users: UsersMutations;
};

export type Query = {
  __typename?: "Query";
  /** A base definition authentication actors */
  self?: Maybe<AuthenticationIdentity>;
  system: System;
  /** Provides name spaced users functionality */
  users: UsersQuery;
};

export enum SortDirection {
  Ascending = "Ascending",
  Descending = "Descending",
}

export type System = {
  __typename?: "System";
  /** Returns configurations applicable to the application for the current environment */
  config: SystemConfig;
  /** Provides a list of environmental variables */
  environment: Scalars["JSON"]["output"];
};

/** Provides environment user agnostic system configurations */
export type SystemConfig = {
  __typename?: "SystemConfig";
  loginUrl: Scalars["String"]["output"];
  logoutUrl: Scalars["String"]["output"];
  /** The current time. A mock field likely to be replaced in application specific implementations. */
  timestamp: Scalars["String"]["output"];
};

export type User = ICreated &
  IDisplayName &
  IUpdated & {
    __typename?: "User";
    /** ISO date time string for the time this resource was created */
    createdAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    createdBy?: Maybe<Scalars["String"]["output"]>;
    /** A preformatted name safe to display in any HTML context */
    displayName?: Maybe<Scalars["String"]["output"]>;
    /** Email addresses */
    email?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for the resource across all collections */
    id: Scalars["ID"]["output"];
    /** Determines if a users is a service account supporting applications */
    isServiceAccount?: Maybe<Scalars["Boolean"]["output"]>;
    /** ISO date time string for the time this resource was created */
    updatedAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    updatedBy?: Maybe<Scalars["String"]["output"]>;
  };

export type UserInput = {
  /** A preformatted name safe to display in any HTML context */
  displayName?: InputMaybe<Scalars["String"]["input"]>;
  /** Email addresses */
  email?: InputMaybe<Scalars["String"]["input"]>;
  /** Unique identifier for the resource across all collections */
  id: Scalars["ID"]["input"];
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
  search: UsersSearchPagedResponse;
};

/** Provides name spaced users functionality */
export type UsersQueryGetByIdArgs = {
  id: Scalars["ID"]["input"];
};

/** Provides name spaced users functionality */
export type UsersQuerySearchArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<UsersSearchOrdering>;
};

export type UsersSearchOrdering = {
  /** Default: Asc */
  direction?: InputMaybe<SortDirection>;
  /** One or more fields to be used in sort direction */
  method?: InputMaybe<UsersSearchOrderMethod>;
};

export enum UsersSearchOrderMethod {
  CreatedAt = "CreatedAt",
  DisplayName = "DisplayName",
  Id = "Id",
}

export type UsersSearchPagedResponse = IOffsetPaging & {
  __typename?: "UsersSearchPagedResponse";
  items: Array<User>;
  /** The number of records in this set. Default: 50. */
  limit: Scalars["Int"]["output"];
  /** The index of the first item in this result set from the larger collection. Default: 0. */
  offset: Scalars["Int"]["output"];
  /** The total number of records available in the larger collection */
  total: Scalars["Int"]["output"];
};

export type SelfQueryVariables = Exact<{ [key: string]: never }>;

export type SelfQuery = {
  __typename?: "Query";
  self?: {
    __typename?: "AuthenticationIdentity";
    id: string;
    displayName: string;
  } | null;
};

export type UsersSearchQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderMethod?: InputMaybe<UsersSearchOrderMethod>;
  orderDirection?: InputMaybe<SortDirection>;
}>;

export type UsersSearchQuery = {
  __typename?: "Query";
  users: {
    __typename?: "UsersQuery";
    search: {
      __typename?: "UsersSearchPagedResponse";
      limit: number;
      offset: number;
      total: number;
      items: Array<{
        __typename?: "User";
        createdAt?: string | null;
        displayName?: string | null;
        email?: string | null;
        id: string;
        isServiceAccount?: boolean | null;
      }>;
    };
  };
};

export type UserByIdQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type UserByIdQuery = {
  __typename?: "Query";
  users: {
    __typename?: "UsersQuery";
    getById?: {
      __typename?: "User";
      createdAt?: string | null;
      displayName?: string | null;
      email?: string | null;
      id: string;
      isServiceAccount?: boolean | null;
    } | null;
  };
};

export type SaveUserMutationVariables = Exact<{
  user: UserInput;
}>;

export type SaveUserMutation = {
  __typename?: "Mutation";
  users: {
    __typename?: "UsersMutations";
    saveUser?: {
      __typename?: "User";
      createdAt?: string | null;
      displayName?: string | null;
      email?: string | null;
      id: string;
      isServiceAccount?: boolean | null;
    } | null;
  };
};

export type UserFieldsFragment = {
  __typename?: "User";
  createdAt?: string | null;
  displayName?: string | null;
  email?: string | null;
  id: string;
  isServiceAccount?: boolean | null;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    createdAt
    displayName
    email
    id
    isServiceAccount
  }
`;
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
  baseOptions?: Apollo.QueryHookOptions<SelfQuery, SelfQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SelfQuery, SelfQueryVariables>(SelfDocument, options);
}
export function useSelfLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SelfQuery, SelfQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SelfQuery, SelfQueryVariables>(
    SelfDocument,
    options,
  );
}
export type SelfQueryHookResult = ReturnType<typeof useSelfQuery>;
export type SelfLazyQueryHookResult = ReturnType<typeof useSelfLazyQuery>;
export type SelfQueryResult = Apollo.QueryResult<SelfQuery, SelfQueryVariables>;
export const UsersSearchDocument = gql`
  query UsersSearch(
    $limit: Int
    $offset: Int
    $orderMethod: UsersSearchOrderMethod
    $orderDirection: SortDirection
  ) {
    users {
      search(
        limit: $limit
        offset: $offset
        order: { method: $orderMethod, direction: $orderDirection }
      ) {
        limit
        offset
        total
        items {
          ...UserFields
        }
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUsersSearchQuery__
 *
 * To run a query within a React component, call `useUsersSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSearchQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderMethod: // value for 'orderMethod'
 *      orderDirection: // value for 'orderDirection'
 *   },
 * });
 */
export function useUsersSearchQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UsersSearchQuery,
    UsersSearchQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersSearchQuery, UsersSearchQueryVariables>(
    UsersSearchDocument,
    options,
  );
}
export function useUsersSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UsersSearchQuery,
    UsersSearchQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersSearchQuery, UsersSearchQueryVariables>(
    UsersSearchDocument,
    options,
  );
}
export type UsersSearchQueryHookResult = ReturnType<typeof useUsersSearchQuery>;
export type UsersSearchLazyQueryHookResult = ReturnType<
  typeof useUsersSearchLazyQuery
>;
export type UsersSearchQueryResult = Apollo.QueryResult<
  UsersSearchQuery,
  UsersSearchQueryVariables
>;
export const UserByIdDocument = gql`
  query UserById($id: ID!) {
    users {
      getById(id: $id) {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
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
  baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    options,
  );
}
export function useUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserByIdQuery,
    UserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    options,
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
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
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
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveUserMutation, SaveUserMutationVariables>(
    SaveUserDocument,
    options,
  );
}
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = Apollo.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = Apollo.BaseMutationOptions<
  SaveUserMutation,
  SaveUserMutationVariables
>;
