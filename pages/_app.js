import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import store from '../store/store.js';
import { Provider } from 'react-redux';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
    const apolloClient = useApollo(pageProps);
    return (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} wait={false} />
            </ApolloProvider>
        </Provider>
    );
};

export default App;
