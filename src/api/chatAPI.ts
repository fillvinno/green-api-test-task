import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Instance, Message} from "../models/types.ts";

const apiUrl = 'https://1103.api.green-api.com/'

type ClientMessage = {
  chatId: string
  message: string
}

type SendMessageArgs = {
  message: ClientMessage;
  instance: Instance;
}
type ReceiveNotificationArgs = {
  receiveTimeout: number
  instance: Instance
}
type DeleteNotificationArgs = {
  receiptId: number
  instance: Instance
}

type SendMessageResponse = {
  idMessage: string
}
type ReceiveNotificationResponse = Message | null
type DeleteNotificationResponse = {
  result: boolean
}


export const chatAPI = createApi({
  reducerPath: 'chatAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => headers.set("User-Agent", "GREEN-API_POSTMAN/1.0")
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<SendMessageResponse, SendMessageArgs>({
      query: ({message, instance}) => ({
        url: `/waInstance${instance.idInstance}/sendMessage/${instance.apiTokenInstance}`,
        method: 'POST',
        body: message,
      })
    }),
    receiveNotification: builder.query<ReceiveNotificationResponse, ReceiveNotificationArgs>({
      query: (notification: ReceiveNotificationArgs) => ({
        url: `/waInstance${notification.instance.idInstance}/receiveNotification/${notification.instance.apiTokenInstance}?receiveTimeout=${notification.receiveTimeout}`,
      })
    }),
    deleteNotification: builder.mutation<DeleteNotificationResponse, DeleteNotificationArgs>({
      query: (notification: DeleteNotificationArgs) => ({
        url: `/waInstance${notification.instance.idInstance}/deleteNotification/${notification.instance.apiTokenInstance}/${notification.receiptId}`,
        method: 'DELETE',
      })
    })
  })
})

export const {useReceiveNotificationQuery, useSendMessageMutation, useDeleteNotificationMutation} = chatAPI