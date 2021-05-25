import { useQuery } from '@apollo/client';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { QUERY_ARTICLES } from '../pages/api/graphql';
import { selectQuery, setLimit } from '../store/slices/querySlice';
import ArticleItem from './ArticleItem';
import LoadingArticleItem from './LoadingArticleItem';

export default function ArticleList() {
    const query = useSelector(selectQuery);
    const dispatch = useDispatch();
    const [showLoading, setShowLoading] = React.useState(false);
    const [showLoadingRefresh, setShowLoadingRefresh] = React.useState(false);

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
            //setHasMore(false);
            if (showLoading) {
                return (
                    <div className="relative pt-9">
                        <LoadingArticleItem />
                        <LoadingArticleItem />
                        <div className="absolute top-0 left-0 right-0 pt-32 text-center text-gray-400">
                            Engar fréttir fundust með þessum leitarskilyrðum
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="absolute top-0 left-0 right-0 pt-32 text-center text-gray-400 ">
                        Engar fréttir fundust með þessum leitarskilyrðum
                    </div>
                );
            }
        }
        return (
            <div className="mt-16 text-center text-gray-400">Internal Error, please try again</div>
        );
    }

    const refreshData = () => {
        console.log(`refreshData`, query.limit);
        if (query.limit !== 30) {
            dispatch(setLimit(30));
        } else {
            dispatch(setLimit(31));
        }
        setShowLoadingRefresh(true);
        setTimeout(() => {
            setShowLoadingRefresh(false);
        }, [1000]);
    };

    return (
        <div className="pt-8">
            <InfiniteScroll
                dataLength={data.articleQueryAndPagination.length}
                next={loadMorePosts}
                hasMore={!loading && data.articleQueryAndPagination.length >= query.limit}
                refreshFunction={refreshData}
                pullDownToRefresh
                pullDownToRefreshThreshold={100}
                pullDownToRefreshContent={
                    <h3 className="pt-4 text-center text-gray-400 ">
                        &#8595; Pull down to refresh
                    </h3>
                }
                releaseToRefreshContent={
                    <h3 className="pt-4 text-center text-gray-400 ">&#8593; Release to refresh</h3>
                }>
                {showLoadingRefresh ? (
                    <div className="relative">
                        <div className="absolute w-full h-1 shim-red"></div>
                    </div>
                ) : null}
                {data
                    ? data.articleQueryAndPagination.map((article) => (
                          <ArticleItem
                              className="ml-1 mr-1 pt-9 "
                              key={article.guid}
                              article={article}
                          />
                      ))
                    : null}
                {loading || (data && data.articleQueryAndPagination.length === 0) ? (
                    <div>
                        <LoadingArticleItem />
                        <LoadingArticleItem />
                    </div>
                ) : null}
                {!loading && data && data.articleQueryAndPagination.length < query.limit ? (
                    <div className="relative pt-9">
                        <div className="top-0 left-0 right-0 text-center text-gray-400 ">
                            Ekki fleiri fréttir með þessum leitarskilyrðum
                        </div>
                    </div>
                ) : null}
            </InfiniteScroll>
        </div>
    );
}
