// src/store/index.ts
import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import doctorReducer from './slices/doctorSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
  
  
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
