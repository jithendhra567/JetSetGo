import {combineReducers, configureStore} from '@reduxjs/toolkit';
import homeApi from './screens/home/home-api';

const rootReducer = combineReducers({
  homeApi: homeApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares => middlewares().concat(homeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
