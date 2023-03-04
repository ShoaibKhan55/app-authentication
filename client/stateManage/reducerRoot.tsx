import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../stateManage/index";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, usersSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer, 
});

export const persistor = persistStore(store);
// const store = configureStore({
//   reducer: {
//     users: usersSlice.reducer,
//   },
// });

// export default store;
