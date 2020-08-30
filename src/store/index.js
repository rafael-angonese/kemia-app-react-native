import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

// const middlewares = [];
const sagaMiddleware = createSagaMiddleware({});
const middlewares = [sagaMiddleware];
// middlewares.push(sagaMiddleware);

// const enhancer = applyMiddleware(...middlewares);
// const store = createStore(rootReducer, enhancer)
const store = createStore(
    persistReducers(rootReducer),
    applyMiddleware(...middlewares)
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
