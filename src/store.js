import { configureStore } from "@reduxjs/toolkit";
import {reducer as ormReducer} from './ormRedux/models'
import appSlice from "./redux/appSlice";
import { createPost } from "./ormRedux/book";
import { createUser } from "./ormRedux/user";


export const store = configureStore({
    reducer:{
       app:appSlice,
       orm: ormReducer,
    },
})

store.dispatch(createUser({ id: 1, name: "Frank" }));
store.dispatch(createUser({ id: 2, name: "Frdfank" }));
store.dispatch(createUser({ id: 3, name: "тдо" }));
store.dispatch(createUser({ id: 4, name: "дл" }));
store.dispatch(createUser({ id: 5, name: "75" }));
store.dispatch(createPost({ content: "A starter post by Frank", user: 1 }));
store.dispatch(createPost({ content: "sdgffdgfdg", user: 2 }));
store.dispatch(createPost({ content: "43534535", user: 3 }));