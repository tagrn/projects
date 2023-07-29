import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './index'; // Root reducer

const persistConfig = {
    // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    blacklist: ['token'],
};
// persis reducer를 만들어준다.
const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer
// 여러개의 middleware를 사용할 수 있게 해주는 라이브러리
const logger = createLogger();
// redux devtools 를 사용할 수 있도록 정의를 해준 후
const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// store를 만들어준다. middleware 안에 여러가지 라이브러리를 넣어주고
const configureStore = () => {
    let store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(thunk, logger, promiseMiddleware)),
    );

    let persistor = persistStore(store);
    return { store, persistor };
};

// used to create the persisted store, persistor will be used in the next step

export default configureStore;
