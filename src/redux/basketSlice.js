import { createSlice } from '@reduxjs/toolkit';
export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basket: [],
        quantity: {},
    },
    reducers: {

        addBasketItem: (state, action) => {
            let isadd = true;
            console.log(action.payload)
            for (let index = 0; index < state.basket.length; index++) {
                if (state.basket[index][0].v.id === action.payload[0].v.id) {

                    isadd = false;
                    break;
                }

            }
            if (isadd) {
                console.log(action.payload)
                state.basket.push(action.payload);
            }

        },
        incQuantity: (state, action) => {
            ++state.basket.find(it => it[0].v.id === action.payload)[0].v.quantity;
        },
        decQuantity: (state, action) => {
            if (state.basket.find(it => it[0].v.id === action.payload)[0].v.quantity > 1) {
                --state.basket.find(it => it[0].v.id === action.payload)[0].v.quantity;
            }

        },
        deleteItem: (state, action) => {
            state.basket.splice(action.payload, 1);
            console.log(state.basket)
        }

    }
});

export const { addBasketItem, incQuantity, decQuantity, deleteItem } = basketSlice.actions

export default basketSlice.reducer