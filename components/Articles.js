import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';

const QUERY = gql`
    query test {
        articles {
            title
            creator
            categories
        }
    }
`;

export default function Articles() {
    const { data, loading, error } = useQuery(QUERY);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return null;
    }

    const articles = data.articles;
    console.log(`articles`, articles);

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
