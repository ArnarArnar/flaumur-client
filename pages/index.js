import styles from '../styles/Home.module.css';

import { initializeApollo, addApolloState } from '../lib/apolloClient';

import { gql } from '@apollo/client';

// function index(props) {
//   console.log("PROPS", props);
//   return <div>hello</div>;
// }

function Home({ articles }) {
    return (
        <div className={styles.grid}>
            {articles.map((articles, index) => (
                <div key={index} className={styles.card}>
                    <h3>{articles.creator}</h3>
                    <p>{articles.title}</p>
                </div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
        query: gql`
            query test {
                articles {
                    creator
                    categories
                }
            }
        `
    });

    return addApolloState(apolloClient, {
        props: {
            articles: data.articles
        },
        revalidate: 50
    });
}

export default Home;
