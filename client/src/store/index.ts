import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/index";
import chatReducer from './features/chat/index';


export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch