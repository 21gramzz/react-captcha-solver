import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import captchaConfigSlice from '../slices/captchaConfig/slice';
import browserSessionsSlice from '../slices/browserSessions/slice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  whitelist: ['captchaConfig', 'browserSessions'],
  storage,
};

const rootReducer = combineReducers({
  captchaConfig: captchaConfigSlice.reducer,
  browserSessions: browserSessionsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
export default store;
