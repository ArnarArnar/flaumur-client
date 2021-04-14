import { gql, useQuery, NetworkStatus } from '@apollo/client';
import ArticleItem from './articleItem';

export const GET_ARTICLES = gql`
    query articles {
        articles(sortBy: PUBLICATIONDATE_DESC, limit: 50) {
            guid
            creator
            title
            description
            content
            publicationDate
            categories
            url
            image
        }
    }
`;

export default function ArticleList() {
    const { loading, error, data } = useQuery(GET_ARTICLES);

    if (error) return <div> "Error loading posts." </div>;
    if (loading) return <div>Loading</div>;

    console.log(`data`, data);

    return (
        <div>
            {data
                ? data.articles.map((article) => (
                      <ArticleItem class="ml-1 mr-1" key={article.guid} article={article} />
                  ))
                : null}
        </div>
    );
}
