import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import customerSlice from './features/customer/customerSlice';


const persistConfig = {
  key: 'root',
  storage,
  // blacklist: []
  // whitelist: []
}


const appReducer = combineReducers({
  customers: customerSlice
})

//if user logs out empty store
const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logoutSuccess') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;
export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


