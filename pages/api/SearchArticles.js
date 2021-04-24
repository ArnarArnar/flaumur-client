import { QUERY_ARTICLES } from '../api/graphql';
import { initializeApollo } from '../../lib/apolloClient';
import { useSelector } from 'react-redux';

//import { selectQuery } from '../store/slices/querySlice';

export default async (req, res) => {
    const apolloClient = initializeApollo();
    console.log(`req`, req, 'res', res);
    //const query = useSelector(selectQuery);
    const search = req.body;
    try {
        const { data } = await apolloClient.query({
            query: QUERY_ARTICLES,
            variables: {
                query: {
                    creatorsIn: [],
                    creatorsNin: [],
                    categoriesIn: [search],
                    categoriesNin: [],
                    limit: 10,
                    offset: 0
                }
            },
            fetchPolicy: 'network-only'
        });
        console.log(`data`, data);
        res.status(200).json({ articles: data.articleQueryAndPagination, error: null });
    } catch (error) {
        console.log(`error `, error);
        if (error.message === '{"message":"400: not found","name":"Error"}') {
            res.status(400).json({
                articles: null,
                status: 400,
                error: 'Engar fréttir fundust með þessum leitarskilyrðum'
            });
        } else {
            console.log(`res`, res);
            res.status(500).json({ articles: null, error: 'Internal Error, please try again' });
        }
    }
};
