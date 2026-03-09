import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import feedreducer from './feedSlice.js';
import connectionReducer from './connectionSlice.js';
import requestReducer from './requestSlice.js';

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedreducer,
        connection : connectionReducer,
        request : requestReducer
    }
});

export default appStore;