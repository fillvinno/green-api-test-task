import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Instance} from "../../models/types.ts";


interface InitialState {
  isAuth: boolean
  instance: Instance
}

const initialState: InitialState = {
  isAuth: false,
  instance: {} as Instance
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setInstance(state, action: PayloadAction<Instance>) {
      state.instance = action.payload
    }
  }
})

export default authSlice.reducer