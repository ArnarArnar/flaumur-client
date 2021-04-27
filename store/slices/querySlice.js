import { createSlice } from '@reduxjs/toolkit';

export const initialState = () => ({
    creatorsIn: [],
    creatorsNin: [],
    categoriesIn: [],
    categoriesNin: [],
    limit: 15,
    offset: 0
});

export const querySlice = createSlice({
    name: 'query',
    initialState: initialState(),
    reducers: {
        addToCreatorsIn: (state, action) => {
            state.creatorsIn = [...new Set([...state.creatorsIn, action.payload])];
        },
        removeFromCreatorsIn: (state, action) => {
            state.creatorsIn = state.creatorsIn.filter((i) => i !== action.payload);
        },
        resetCreatorsIn: (state) => {
            state.creatorsIn = [];
        },
        addToCreatorsNin: (state, action) => {
            state.creatorsNin = [...new Set([...state.creatorsNin, action.payload])];
        },
        removeFromCreatorsNin: (state, action) => {
            state.creatorsNin = state.creatorsNin.filter((i) => i !== action.payload);
        },
        resetCreatorsNin: (state) => {
            state.creatorsNin = [];
        },
        addToCategoriesIn: (state, action) => {
            console.log('addToCategoriesIn: state', state.categoriesIn, ' action ', action.payload);

            state.categoriesIn = [...new Set([...state.categoriesIn, action.payload])];
        },
        removeFromCategoriesIn: (state, action) => {
            state.categoriesIn = state.categoriesIn.filter((i) => i !== action.payload);
        },
        resetCategoriesIn: (state) => {
            state.categoriesIn = [];
        },
        addToCategoriesNin: (state, action) => {
            state.categoriesNin = [...new Set([...state.categoriesNin, action.payload])];
        },
        removeFromCategoriesNin: (state, action) => {
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
    addToCreatorsIn,
    removeFromCreatorsIn,
    resetCreatorsIn,
    addToCreatorsNin,
    removeFromCreatorsNin,
    resetCreatorsNin,
    addToCategoriesIn,
    removeFromCategoriesIn,
    resetCategoriesIn,
    addToCategoriesNin,
    removeFromCategoriesNin,
    resetCategoriesNin,
    setLimit,
    setOffset,
    resetQuery
} = querySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//         //dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectQuery = (state) => state.query;
export const selectCreatorsIn = (state) => state.query.creatorsIn;
export const selectCreatorsNin = (state) => state.query.creatorsNin;
export const selectCategoriesIn = (state) => state.query.categoriesIn;
export const selectCategoriesNin = (state) => state.query.categoriesNin;
export const selectLimit = (state) => state.query.limit;
export const selectOffset = (state) => state.query.offset;

export default querySlice.reducer;
