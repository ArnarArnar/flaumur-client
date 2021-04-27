//import { initializeApollo, addApolloState } from '../lib/apolloClient';
import ArticleList from '../components/ArticleList';
import Sidebar from '../components/Sidebar';
// import { QUERY_ARTICLES } from '../pages/api/graphql';
// import { initialState } from '../store/slices/querySlice';

const IndexPage = (articles) => {
    return (
        <>
            <Sidebar />
            <ArticleList articles={articles} />
        </>
    );
};

// export async function getStaticProps() {
//     const apolloClient = initializeApollo();

//     const { data } = await apolloClient.query({
//         query: QUERY_ARTICLES,
//         variables: {
//             query: initialState()
//         },
//         fetchPolicy: 'network-only'
//     });

//     return addApolloState(apolloClient, {
//         props: { articles: data.articleQueryAndPagination },
//         revalidate: 100
//     });
// }

export default IndexPage;
