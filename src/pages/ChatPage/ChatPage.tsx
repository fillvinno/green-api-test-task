import styles from './ChatPage.module.scss'
import ChatsList from "../../components/ChatsList/ChatsList.tsx";
import Chat from "../../components/Chat/Chat.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useEffect} from "react";
import {Message, TChat} from "../../models/types.ts";
import {useDeleteNotificationMutation, useReceiveNotificationQuery} from "../../api/chatAPI.ts";
import {getFromLocalStorage, saveToLocalStorage} from "../../utils/localstorage.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {chatSlice} from "../../store/reducers/chatSlice.ts";

const renderChat = (chat: TChat | null) => {
  if (chat) return <Chat chat={chat}/>
  return (
    <div className={styles.noChat}>
      <span>Выберите чат</span>
    </div>
  )
}

const ChatPage = () => {
  const {currentChat, chats} = useAppSelector(state => state.chatReducer)
  const dispatch = useAppDispatch()
  const {setChats, addMessageToChat} = chatSlice.actions
  const [deleteNotification] = useDeleteNotificationMutation()
  const {data: notification, refetch} = useReceiveNotificationQuery({
    instance: getFromLocalStorage('instance'),
    receiveTimeout: 1
  })

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 1000)

    return () => clearInterval(interval)
  }, [refetch])

  useEffect(() => {
    async function fetchData() {
      if (notification) {
        const localChats: TChat[] = getFromLocalStorage('chats') || []
        const chatId: string = notification?.body?.senderData?.chatId?.split('@')[0] || notification?.body?.chatId?.split('@')[0] || 'User'
        const idMessage = notification?.body?.idMessage
        const chatIndex = localChats.findIndex((chat) => chat.chatId === chatId);

        const isMessageExists = localChats.some(
          (chat) => chat.messages.some((message) => message?.body?.idMessage === idMessage)
        );

        if (!isMessageExists) {
          if (chatIndex === -1) {
            // Если чата нет
            localChats.push({ chatId, messages: [] })
          } else {
            // Существующий чат
            if (notification?.body?.typeWebhook === 'outgoingAPIMessageReceived'
              || notification?.body?.typeWebhook === 'incomingMessageReceived') {
              localChats[chatIndex].messages.push(notification as Message)
              dispatch(setChats(localChats))
              dispatch(addMessageToChat(notification))
            }
          }

          saveToLocalStorage('chats', localChats)
        }

        await deleteNotification({receiptId: notification.receiptId, instance: getFromLocalStorage('instance')})
      }
    }
    fetchData()
  }, [notification, deleteNotification, currentChat, chats, dispatch, setChats]);

  return (
    <div className={styles.wrap}>
      <ChatsList/>
      {renderChat(currentChat)}
    </div>
  );
};

export default ChatPage;