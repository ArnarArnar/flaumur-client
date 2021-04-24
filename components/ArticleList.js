import React from 'react';
import { useQuery } from '@apollo/client';
import ArticleItem from './articleItem';
import { useSelector, useDispatch } from 'react-redux';

import { QUERY_ARTICLES } from '../pages/api/graphql';
import { selectQuery, setLimit } from '../store/slices/querySlice';

export default function ArticleList(pageProps) {
    const query = useSelector(selectQuery);
    const dispatch = useDispatch();
    const initialState = pageProps.articles;
    const [articles, setArticles] = React.useState(initialState.articles);
    const [search, setSearch] = React.useState('');
    console.log(`initialState`, initialState.articles);
    console.log(`articles`, articles);

    const loadMorePosts = () => {
        dispatch(setLimit(10));
    };

    console.log(`query`, query);

    return (
        <div>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    const results = await fetch('/api/SearchArticles', {
                        method: 'post',
                        body: search
                    });

                    const { articles, error, status } = await results.json();
                    if (error) {
                        if (status === 400) {
                            console.log(`Error search>article list engar niðurstöður`, error);
                        } else {
                            console.log(`Error search>article list`, error);
                        }
                    } else {
                        setArticles(articles);
                    }
                }}>
                <div className="bg-gray-600">
                    <input
                        className="m-1 border border-black rounded"
                        placeholder="search"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            console.log(`e.target.value`, e.target.value);
                        }}></input>
                    <button
                        className="m-1 border border-black rounded"
                        disabled={search === ''}
                        type="submit">
                        Search
                    </button>
                    <button
                        className="m-1 border border-black rounded"
                        disabled={search === ''}
                        onClick={async () => {
                            setSearch('');
                            setArticles(initialState.articles);
                        }}>
                        Reset
                    </button>
                </div>
            </form>
            {/* {data
                ? data.articleQueryAndPagination.map((article) => (
                      <ArticleItem class="ml-1 mr-1" key={article.guid} article={article} />
                  ))
                : null} */}
            {articles
                ? articles.map((article) => (
                      <ArticleItem class="ml-1 mr-1" key={article.guid} article={article} />
                  ))
                : null}
            {/* 
            <button onClick={() => loadMorePosts()} disabled={loading}>
                {loading ? 'Loading...' : 'Show More'}
            </button> */}
        </div>
    );
}
