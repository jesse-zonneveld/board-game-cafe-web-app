import { combineReducers } from 'redux';
import { restaurantsReducer } from './restaurantsReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    restaurants: restaurantsReducer
});