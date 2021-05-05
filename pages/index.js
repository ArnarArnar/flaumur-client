import React from 'react';
import { initializeApollo, addApolloState } from '../lib/apolloClient';
import ArticleList from '../components/ArticleList';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { GET_CATEGORIES, GET_CREATORS, QUERY_ARTICLES } from '../pages/api/graphql';
import { initialState } from '../store/slices/querySlice';
import Beta from '../components/Beta';

const IndexPage = (data) => {
    return (
        <>
            <Beta />
            <Header />
            <Sidebar data={data} />
            <ArticleList data={data} />
        </>
    );
};

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    const { data: articlesData } = await apolloClient.query({
        query: QUERY_ARTICLES,
        variables: {
            query: initialState()
        },
        fetchPolicy: 'network-only'
    });

    const { data: creatorsData } = await apolloClient.query({
        query: GET_CREATORS,
        variables: {
            query: initialState()
        },
        fetchPolicy: 'network-only'
    });
    const { data: categoriesData } = await apolloClient.query({
        query: GET_CATEGORIES,
        variables: {
            query: initialState()
        },
        fetchPolicy: 'network-only'
    });

    return addApolloState(apolloClient, {
        props: {
            articles: articlesData.articleQueryAndPagination,
            creatorsList: creatorsData.creators[0].creators,
            categoriesList: categoriesData.categories[0].categories
        },
        revalidate: 100
    });
}

export default IndexPage;
