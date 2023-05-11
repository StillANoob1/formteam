import { configureStore } from '@reduxjs/toolkit';
import teamReducer from "../slice/teamSlice";

export const store=configureStore({
    reducer:{
        team:teamReducer
    }
})