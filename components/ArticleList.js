import React from 'react';
import { useQuery } from '@apollo/client';
import ArticleItem from './ArticleItem';
import LoadingArticleItem from './LoadingArticleItem';
import { useSelector, useDispatch } from 'react-redux';

import { QUERY_ARTICLES } from '../pages/api/graphql';
import { selectQuery, setLimit } from '../store/slices/querySlice';

export default function ArticleList() {
    const query = useSelector(selectQuery);
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(QUERY_ARTICLES, {
        variables: {
            query: query
        },
        fetchPolicy: 'network-only'
    });

    const loadMorePosts = () => {
        dispatch(setLimit(query.limit * 2));
    };

    if (error) {
        if (error.message === '{"message":"400: not found","name":"Error"}') {
            return (
                <div className="mt-16 text-center text-gray-400">
                    Engar fréttir fundust með þessum leitarskilyrðum
                </div>
            );
        }
        return (
            <div className="mt-16 text-center text-gray-400">Internal Error, please try again</div>
        );
    }

    return (
        <>
            {data
                ? data.articleQueryAndPagination.map((article) => (
                      <ArticleItem class="ml-1 mr-1" key={article.guid} article={article} />
                  ))
                : null}
            {data && data.articleQueryAndPagination.length >= query.limit ? (
                <button
                    className="px-1 m-4 text-lg font-medium text-green-700 bg-black border border-gray-300 border-solid rounded-sm outline-none focus:outline-none max-content"
                    onClick={() => loadMorePosts()}
                    disabled={loading}>
                    {loading ? null : 'Sækja fleiri fréttir'}
                </button>
            ) : null}
            {data && loading ? (
                <>
                    <LoadingArticleItem />
                    <LoadingArticleItem />
                </>
            ) : null}
        </>
    );
}
