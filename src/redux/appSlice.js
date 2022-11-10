import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        toggleShowVariationsPdiduct: false,
        idCategory: 1,
        initialApp: false,
        quntytiViewItemsProducts: 20,
        viewCatygory: [],
        range: [0, 20],
        sort: ["name", "ASC"],
        listVariation: null,
        isShowVariantions: false,
        errorApp: false,
        isOption: false,
        isLoadMoreProducts: true,


    },
    reducers: {
        setCurrentItem: ((state) => {
            state.currentItem = state.currentItem + 20;
            console.log(state.currentItem)
        }),
        setIdCategory: ((state, action) => {
            state.idCategory = action.payload;
            state.range = [0, state.quntytiViewItemsProducts];
            if (!~state.viewCatygory.indexOf(action.payload)) {
                console.log('add')
                state.viewCatygory.push(action.payload);

            }

        }),
        setInitialApp: (state) => {
            state.initialApp = true;
        },
        setQuntytiViewItemsProducts: (state, action) => {
            state.quntytiViewItemsProducts = action.payload;
        },
        setRange: (state) => {

            state.range = [state.range[0] + state.quntytiViewItemsProducts, state.range[1] + state.quntytiViewItemsProducts];
            console.log(state.range);
        },
        seTtogleShowVariationsPdiduct: (state => {
            state.toggleShowVariationsPdiduct ? state.toggleShowVariationsPdiduct = false : state.toggleShowVariationsPdiduct = true
        }),
        setListVariation: (state, action) => {

            state.listVariation = action.payload;
        },
        clearListVariation: (state) => {
            state.listVariation = null;
            state.isShowVariantions = false;
        },
        setErrorApp: (state, action) => {

            state.errorApp = action.payload;
        },
        showOption: (state) => {
            state.isOption = true;
        },
        hideOption: (state) => {

            state.isOption = false;
        },
        setSort: (state, action) => {
            console.log(action)
            state.sort = ["name", action.payload]
        },
        setIsLoadMoreProducts: (state, action) => {
            state.isLoadMoreProducts = action.payload;
        },
        setStartRange: (state, action) => {
            state.range = action.payload;
        }
    }
});


export const setIdCategoryThunk = (id) => (dispatch) => {
    dispatch(setIdCategory(id));
}
export const setNewRange = () => (dispatch) => {
    dispatch(setRange());

}
export const hideOptionThunk = () => (dispatch) => {
    dispatch(hideOption());
}

export const { setStartRange, setIsLoadMoreProducts, setSort, showOption, hideOption, setErrorApp, clearListVariation, setListVariation, setCurrentItem, setIdCategory, setInitialApp, setQuntytiViewItemsProducts, setRange, seTtogleShowVariationsPdiduct } = appSlice.actions

export default appSlice.reducer