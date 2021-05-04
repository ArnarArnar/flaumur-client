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
    const [showLoading, setShowLoading] = React.useState(false);
    const { loading, error, data } = useQuery(QUERY_ARTICLES, {
        variables: {
            query: query
        },
        fetchPolicy: 'network-only'
    });

    React.useEffect(() => {
        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
        }, [2000]);
    }, [error]);

    const loadMorePosts = () => {
        dispatch(setLimit(query.limit * 2));
    };

    if (error) {
        if (error.message === '{"message":"400: not found","name":"Error"}') {
            if (showLoading) {
                return (
                    <div className="relative pt-9">
                        <LoadingArticleItem />
                        <LoadingArticleItem />
                        <div className="absolute top-0 left-0 right-0 p-12 text-center text-gray-400 ">
                            Engar fréttir fundust með þessum leitarskilyrðum
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="pt-12 text-center text-gray-400 ">
                        Engar fréttir fundust með þessum leitarskilyrðum
                    </div>
                );
            }
        }
        return (
            <div className="mt-16 text-center text-gray-400">Internal Error, please try again</div>
        );
    }

    return (
        <div>
            {data
                ? data.articleQueryAndPagination.map((article) => (
                      <ArticleItem
                          className="ml-1 mr-1 pt-9 "
                          key={article.guid}
                          article={article}
                      />
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
            {loading || (data && data.articleQueryAndPagination.length === 0) ? (
                <div className="pt-9">
                    <LoadingArticleItem />
                    <LoadingArticleItem />
                </div>
            ) : null}
        </div>
    );
}
