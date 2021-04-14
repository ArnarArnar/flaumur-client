import styles from '../styles/Home.module.css';

import { initializeApollo, addApolloState } from '../lib/apolloClient';

import { gql } from '@apollo/client';
import ArticleList, { GET_ARTICLES } from '../components/ArticleList';

// function index(props) {
//   console.log("PROPS", props);
//   return <div>hello</div>;
// }

const IndexPage = () => <ArticleList />;

// function Home({ articles }) {
//     return (
//         <div className={styles.grid}>
//             {articles.map((articles, index) => (
//                 <div key={index} className={styles.card}>
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
        query: GET_ARTICLES
    });

    return addApolloState(apolloClient, {
        props: {},
        revalidate: 100
    });
}

export default IndexPage;
// export default Home;
