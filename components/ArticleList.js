import React from 'react';
import { useQuery } from '@apollo/client';
import ArticleItem from './articleItem';
import { useSelector, useDispatch } from 'react-redux';
import useQueryArticles from '../pages/api/queryArticles';

import { GET_ARTICLES, QUERY_ARTICLES } from '../pages/api/graphql';
import { selectQuery, setLimit, addCategoriesIn } from '../store/slices/querySlice';

export default function ArticleList(state) {
    const query = useSelector(selectQuery);
    //const [articles, setArticles] = React.useState([]);
    const dispatch = useDispatch();
    console.log(`ArticleList props.articles`, state);

    const { loading, error, data } = useQuery(QUERY_ARTICLES, {
        variables: {
            query: query
        },
        fetchPolicy: 'network-only'
    });

    // const updateCache = (cache, { data: { updateArticles } }) => {
    //     const existingArticles = cache.readQuery({
    //         query: QUERY_ARTICLES
    //     });

    //     cache.writeQuery({
    //         query: QUERY_ARTICLES,
    //         data: { book: updateBook }
    //     });
    // };

    const loadMorePosts = () => {
        dispatch(setLimit(10));
    };
    const changeCategory = () => {
        dispatch(addCategoriesIn('Innlent'));
    };

    // React.useEffect(() => {
    //     if (data && data.articleQueryAndPagination) {
    //         console.log('UseEffect result articles', data.articleQueryAndPagination);
    //         setArticles(data.articleQueryAndPagination);
    //         return;
    //     }
    // }, [data]);
    //console.log(`result`, result);

    if (error) return <div> Error loading posts.</div>;
    if (loading) return <div>Loading</div>;
    if (data) {
        console.log(`If data`, data);
        setTimeout(() => console.log('state', state), [500]);
    }

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
            <button onClick={() => changeCategory()} disabled={loading}>
                {loading ? 'Loading...' : 'ChangeCategory'}
            </button>
        </div>
    );
}

//console.log(`ArticleList {articles}`, articles);
//const query = useSelector(selectQuery);
//const [articles, setArticles] = React.useState([]);
//const [result] = useQueryArticles(query);
//const { loading, error, data } = useQuery(GET_ARTICLES);

// React.useEffect(() => {
//     if (result) {
//         console.log('UseEffect result', result);
//         setArticles(result);
//     }
// }, [result]);
