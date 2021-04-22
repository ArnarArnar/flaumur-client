import { initializeApollo, addApolloState } from '../lib/apolloClient';

import { gql } from '@apollo/client';
import ArticleList from '../components/ArticleList';
import { GET_ARTICLES, QUERY_ARTICLES } from '../pages/api/graphql';
import Counter from '../components/counter.js';
import { selectQuery } from '../store/slices/querySlice';
import { useSelector } from 'react-redux';
import { initialState } from '../store/slices/querySlice';
//const IndexPage = () => <ArticleList />;
const IndexPage = (articles) => <ArticleList articles={articles} />;

// function Home({ articles }) {
//     return (
//         <div>
//             {articles.map((articles, index) => (
//                 <div key={index}>
//                     <h3>{articles.creator}</h3>
//                     <p>{articles.title}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    await apolloClient.query({
        query: QUERY_ARTICLES,
        variables: {
            query: initialState()
        },
        fetchPolicy: 'network-only'
    });

    return addApolloState(apolloClient, {
        props: {
            //initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 100
    });
}

export default IndexPage;
