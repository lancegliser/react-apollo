# React Example

> Provides a working React App integrated with a GraphQL server via Apollo client

## Topics

- Client configuration ✅
- Codegen ✅
- Immediate ✅ and lazy queries❌
- Namespaces ✅
- Pagination strategies: Independent ✅, field ✅, read and merge ✅
- Mutations: Optimistic behaviors ❌, cache updates ❌, refetching ❌

## Prerequisites

Ensure the API paired with this code base is up and listening on port 5000.

# Framework

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `graphql-codegen`

This UI works from a GraphQL client first approach.
Update the `./codegen.yml` file to point at your API.
Then create local `*.graphql` files in your `src` directory
to build the calls you want for your project.
The types in it will cause typescript code to be generated
by running the following command:

```
npm run graphql-codegen
```

The generated classes are created at:

```
src/generated/types.ts
```

You can import those types in your own components,
providing you Apollo client strongly typed hooks.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
