import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message, TChat} from "../../models/types.ts";


interface InitialState {
  currentChat: null | TChat
  chats: TChat[]
}

const initialState: InitialState = {
  currentChat: null,
  chats: []
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat(state, action: PayloadAction<TChat>) {
      state.currentChat = action.payload
    },
    setChats(state, action: PayloadAction<TChat[]>) {
      state.chats = action.payload
    },
    addChat(state, action: PayloadAction<TChat>) {
      state.chats.push(action.payload)
    },
    addMessageToChat(state, action: PayloadAction<Message>) {
      if (state.currentChat) {
        state.currentChat.messages.push(action.payload)
      }
    }
  }
})

export default chatSlice.reducer