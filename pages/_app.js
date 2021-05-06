import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import store from '../store/store.js';
import { Provider } from 'react-redux';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

// Automatically check for touch support and attach a .no-touch class to HTML tag, if device doesn’t support touch.
function touchEventsForTailwind() {
    React.useEffect(() => {
        document.documentElement.className +=
            'ontouchstart' in document.documentElement ? ' touch' : ' no-touch';
    }, []);
}

const App = ({ Component, pageProps }) => {
    const apolloClient = useApollo(pageProps);
    touchEventsForTailwind();
    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Head>
                    <title>Flaumur</title>
                </Head>
                <Component {...pageProps} wait={false} />
            </ApolloProvider>
        </Provider>
    );
};

export default App;
