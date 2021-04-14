import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps);
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />;
        </ApolloProvider>
    );
}

export default App;
