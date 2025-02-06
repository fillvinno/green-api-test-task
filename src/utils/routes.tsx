import {AUTH_ROUTE, CHAT_ROUTE} from "./consts.ts";
import ChatPage from "../pages/ChatPage/ChatPage.tsx";
import AuthPage from "../pages/AuthPage/AuthPage.tsx";
import {ReactNode} from "react";

type Route = {
  path: string;
  Component:  ReactNode
}

export const authRoutes: Route[] = [
  {
    path: CHAT_ROUTE,
    Component: <ChatPage/>
  },
]

export const publicRoutes: Route[] = [
  {
    path: AUTH_ROUTE,
    Component: <AuthPage/>
  }
]