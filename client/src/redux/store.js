import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/comineReducer';


export default function configureStore(preloadedState) {
    // const customMiddleware = store => next => action => {
    //     console.log("custom middleware ran");
    //     return next(action);
    // }
    
    // const customMiddleware2 = store => next => action => {
    //     console.log("custom middleware 2 ran");
    //     return next(action);
    // }

    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];

    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
        console.log("dev");
        return createStore(rootReducer, preloadedState, composeWithDevTools(...enhancers));
    } else {
        console.log("prod");
        return createStore(rootReducer, preloadedState, enhancers);
    }
}