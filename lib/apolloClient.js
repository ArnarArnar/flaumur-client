import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import * as Realm from 'realm-web';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;

const app = new Realm.App(APP_ID);

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
    if (!app.currentUser) {
        // If no user is logged in, log in an anonymous user
        await app.logIn(Realm.Credentials.anonymous());
    } else {
        // The logged in user's access token might be stale.
        // Refreshing custom data also refreshes the access token.
        await app.currentUser.refreshCustomData();
    }
    // Get a valid access token for the current user
    const { accessToken } = app.currentUser;
    return accessToken;
}

const articlesInitialValue = [];

function createApolloClient() {
    return new ApolloClient({
        link: new HttpLink({
            uri: graphql_url,
            // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
            // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
            // access token before sending the request.
            fetch: async (uri, options) => {
                const accessToken = await getValidAccessToken();
                options.headers.Authorization = `Bearer ${accessToken}`;
                return fetch(uri, options);
            }
        }),
        ssrMode: typeof window === 'undefined',
        cache: new InMemoryCache(),
        ssrForceFetchDelay: 100
        //https://robearlam.com/blog/nextjs-incremental-static-site-regeneration-and-apollo-graph-ql-caching
        // defaultOptions: {
        //     query: {
        //         fetchPolicy: 'no-cache'
        //     }
        // }
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))
            ]
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') return _apolloClient;

    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

// function createIsomorphLink() {
//   if (typeof window === "undefined") {
//     const { SchemaLink } = require("@apollo/client/link/schema");
//     const schema = require("./schema");
//     return new SchemaLink({ schema });
//   } else {
//     const { HttpLink } = require("@apollo/client/link/http");

//     return new HttpLink({
//       uri: "/api/graphql",
//       credentials: "same-origin",
//     });
//   }
// }

export function addApolloState(client, pageProps) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
// export function useApollo(initialState) {
//     const state = initialState[APOLLO_STATE_PROP_NAME];
//     const store = useMemo(() => initializeApollo(initialState), [initialState]);
//     return store;
// }
