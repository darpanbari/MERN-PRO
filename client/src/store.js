import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import productReducer from './pages/Redux/product/productReducer'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    productState: productReducer,
})

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
    ))

export default store;