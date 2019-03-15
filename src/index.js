import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import AuthReducer from './store/reducer/authReducer';
import EventReducer from './store/reducer/eventReducer'
import MyEventReducer from './store/reducer/myEventReducer'
import {BrowserRouter} from 'react-router-dom'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import Spinner from './components/Spinner';
import OneEventReducer from './store/reducer/oneEventReducer'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth : AuthReducer,
    event : EventReducer,
    myEvent : MyEventReducer,
    oneEvent : OneEventReducer
})


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

 const store = createStore(persistedReducer,undefined,composeEnhancers(applyMiddleware(thunk)))
 let persistor = persistStore(store)
//const store = createStore(rootReducer,applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
