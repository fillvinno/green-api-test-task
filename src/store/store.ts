import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice'
import chatReducer from './reducers/chatSlice'
import {chatAPI} from "../api/chatAPI.ts";

const rootReducer = combineReducers({
  [chatAPI.reducerPath]: chatAPI.reducer,
  authReducer,
  chatReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(chatAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore[ 'dispatch']