import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './slice/main';
import loaderReducer from './slice/loader'

export const store = configureStore({
    reducer: {
        main: mainReducer,
        loader: loaderReducer,
    },
})
