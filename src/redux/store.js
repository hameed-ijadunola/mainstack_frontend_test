import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import LocalStorage from 'redux-persist/lib/storage';
import { userApi } from './features/user/userApi';
import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
  userStore: userReducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: LocalStorage,
  whitelist: ['userStore'],
  blacklist: [[userApi.reducerPath]],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(userApi.middleware),
});

setupListeners(store.dispatch);
