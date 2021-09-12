import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import authReducer from '../reducer/authReducer';
import cartReducer from '../reducer/cartReducer';
import productReducer from '../reducer/productReducer';


const thunkMiddleware = require('redux-thunk').default;

const mainReducer = combineReducers({
    auth:authReducer,
    product:productReducer,
    cart:cartReducer
})

const store = createStore(mainReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)))

export default store;