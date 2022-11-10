import { configureStore } from "@reduxjs/toolkit";
import {reducer as ormReducer} from '../redux/orm/orm';
import appSlice from "../redux/appSlice";
import basketSlice from "../redux/basketSlice";

export const store = configureStore({
    reducer:{
       app:appSlice,
       basket:basketSlice,
       orm: ormReducer,
       
    },
})