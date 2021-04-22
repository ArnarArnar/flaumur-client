import React from 'react';
import { useQuery } from '@apollo/client';
import ArticleItem from './articleItem';
import { useSelector, useDispatch } from 'react-redux';

import { QUERY_ARTICLES } from '../pages/api/graphql';
import { selectQuery, setLimit } from '../store/slices/querySlice';

export default function ArticleList(pageProps) {
    const query = useSelector(selectQuery);
    const dispatch = useDispatch();

    const { loading, error, data } = useQuery(QUERY_ARTICLES, {
        variables: {
            query: query
        },
        fetchPolicy: 'network-only'
    });

    const loadMorePosts = () => {
        dispatch(setLimit(10));
    };

    if (error) return <div> Error loading posts.</div>;
    if (loading) return <div>Loading</div>;
    if (data) {
        console.log(`If data`, data);
        setTimeout(() => console.log('state', pageProps.articles.articles), [500]);
    }
    console.log(`query`, query);

    return (
        <div>
            {data
                ? data.articleQueryAndPagination.map((article) => (
                      <ArticleItem class="ml-1 mr-1" key={article.guid} article={article} />
                  ))
                : null}
            <button onClick={() => loadMorePosts()} disabled={loading}>
                {loading ? 'Loading...' : 'Show More'}
            </button>
        </div>
    );
}
