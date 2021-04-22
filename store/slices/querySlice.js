import { createSlice } from '@reduxjs/toolkit';
import useQueryArticles from '../../pages/api/queryArticles';

export const initialState = () => ({
    creatorsIn: [],
    creatorsNin: [],
    categoriesIn: [],
    categoriesNin: [],
    limit: 10,
    offset: 0
});

export const querySlice = createSlice({
    name: 'query',
    initialState: initialState(),
    reducers: {
        addCreatorIn: (state, action) => {
            state.creatorIn = [...new Set([...state.creatorIn, action.payload])];
        },
        removeCreatorIn: (state, action) => {
            state.creatorIn = state.creatorIn.filter((i) => i !== action.payload);
        },
        resetCreatorIn: (state) => {
            state.creatorIn = [];
        },
        addCreatorNin: (state, action) => {
            state.creatorNin = [...new Set([...state.creatorNin, action.payload])];
        },
        removeCreatorNin: (state, action) => {
            state.creatorNin = state.creatorNin.filter((i) => i !== action.payload);
        },
        resetCreatorNin: (state) => {
            state.creatorNin = [];
        },
        //TODO:
        addCategoriesIn: (state, action) => {
            console.log('addCategoriesIn: state', state.categoriesIn, ' action ', action.payload);
            //state.categoriesIn.push(action.payload);
            state.categoriesIn = [...new Set([...state.categoriesIn, action.payload])];
        },
        removeCategoriesIn: (state, action) => {
            state.categoriesIn = state.categoriesIn.filter((i) => i !== action.payload);
        },
        resetCategoriesIn: (state) => {
            state.categoriesIn = [];
        },
        addCategoriesNin: (state, action) => {
            state.categoriesNin = [...new Set([...state.categoriesNin, action.payload])];
        },
        removeCategoriesNin: (state, action) => {
            state.categoriesNin = state.categoriesNin.filter((i) => i !== action.payload);
        },
        resetCategoriesNin: (state) => {
            state.categoriesNin = [];
        },
        setLimit: (state, action) => {
            state.limit += action.payload;
        },
        setOffset: (state, action) => {
            state.offset += action.payload;
        },
        resetQuery: () => initialState()
    }
});

export const {
    addCreatorIn,
    removeCreatorIn,
    resetCreatorIn,
    addCreatorNin,
    removeCreatorNin,
    resetCreatorNin,
    addCategoriesIn,
    removeCategoriesIn,
    resetCategoriesIn,
    addCategoriesNin,
    removeCategoriesNin,
    resetCategoriesNin,
    setLimit,
    setOffset,
    resetQuery
} = querySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectQuery = (state) => state.query;
export const selectCreatorIn = (state) => state.query.creatorIn;
export const selectCreatorNin = (state) => state.query.creatorIn;
export const selectCategoriesIn = (state) => state.query.creatorIn;
export const selectCategoriesNin = (state) => state.query.creatorIn;
export const selectLimit = (state) => state.query.creatorIn;
export const selectOffset = (state) => state.query.creatorIn;

export default querySlice.reducer;
