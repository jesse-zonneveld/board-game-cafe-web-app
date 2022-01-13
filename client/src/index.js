import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './custom.scss';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import setupAxiosInterceptors from "./api/axiosInterceptors";

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(customMiddleware, customMiddleware2, thunk)));
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);

setupAxiosInterceptors(store);