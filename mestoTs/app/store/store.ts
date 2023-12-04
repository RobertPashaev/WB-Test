import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/UserService';
import { cardsApi } from '../services/CardServices';

const rootReducer = combineReducers({
  [cardsApi.reducerPath]: cardsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cardsApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
