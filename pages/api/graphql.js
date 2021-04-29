import { gql } from '@apollo/client';

export const GET_ARTICLES = gql`
    query articles {
        articles(sortBy: PUBLICATIONDATE_DESC, limit: 5) {
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

export const QUERY_ARTICLES = gql`
    query articleQueryAndPagination($query: QueryAndPagination) {
        articleQueryAndPagination(input: $query) {
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

export const GET_CREATORS = gql`
    query creatorsList {
        creators(sortBy: ID_DESC) {
            creators {
                _id
                count
            }
        }
    }
`;
export const GET_CATEGORIES = gql`
    query categoriesList {
        categories(sortBy: ID_DESC) {
            _id
            categories {
                _id
                count
            }
        }
    }
`;
