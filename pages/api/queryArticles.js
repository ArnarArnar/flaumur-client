// import React from 'react';

// import { useLazyQuery } from '@apollo/client';

// import { useSelector } from 'react-redux';
// import { selectQuery } from '../../store/slices/querySlice';
// import { QUERY_ARTICLES } from './graphql';

// export default function useQueryArticles(query) {
//     const [result, setResult] = React.useState('');

//     console.log('useQueryCreatorAndArticles > query: ', query);

//     const [queryArticles, { loading, error, data }] = useLazyQuery(QUERY_ARTICLES, {
//         variables: {
//             query: query
//         },
//         fetchPolicy: 'network-only'
//     });
//     console.log('loading', loading);
//     console.log('Error', error);
//     console.log('data', data);

//     React.useEffect(() => {
//         console.log(`UseEffect`);
//         if (!query) {
//             return;
//         }
//         //console.log('useQueryTag useEffect query', query);
//         queryArticles();
//     }, [query]);

//     React.useEffect(() => {
//         // console.log('useQueryTag useEffect data', data);
//         if (data) {
//             const onCompleted = (data) => {
//                 //console.log('React.useEffect > if (data)', data);
//                 setResult(data.articles);
//             };
//             const onError = (error) => {
//                 return <div>{error}</div>;
//             };
//             if (onCompleted || onError) {
//                 if (onCompleted && !loading && !error) {
//                     onCompleted(data);
//                 } else if (onError && !loading && error) {
//                     onError(error);
//                 }
//             }
//         }
//     }, [data, error, loading]);

//     return [result];
// }
