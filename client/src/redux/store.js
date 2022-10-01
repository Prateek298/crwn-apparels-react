import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [ sagaMiddleware ];

if (process.env.NODE_ENV === 'development') {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

export default function configureAppStore() {
	const store = configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(middlewares),
		devTools: false
	});

	sagaMiddleware.run(rootSaga);

	return store;
}

export const persistor = persistStore(configureAppStore());
