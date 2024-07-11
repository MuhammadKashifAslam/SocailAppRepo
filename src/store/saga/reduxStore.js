import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mySaga from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with Saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(mySaga);

export default store;
