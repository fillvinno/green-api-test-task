import styles from './ChatsListItem.module.scss'
import {FC} from "react";
import {chatSlice} from "../../../store/reducers/chatSlice.ts";
import {TChat} from "../../../models/types.ts";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";

type Props = {
  chat: TChat
}

const ChatsListItem: FC<Props> = ({chat}) => {
  const dispatch = useAppDispatch()
  const {setCurrentChat} = chatSlice.actions
  const {currentChat} = useAppSelector(state => state.chatReducer)

  const openChat = (chat: TChat) => {
    dispatch(setCurrentChat(chat))
    console.log(chat)
    console.log(currentChat)
  }


  return (
    <div className={styles.chat} onClick={() => openChat(chat)}>
      <img
        src='https://console.green-api.com/chat/assets_0.0.47/emptyAvatar-CPuf6Jvx.png'
        alt='chat-icon'
        className={styles.icon}
      />
      <div className={styles.chatInfo}>
        <div className={styles.chatId}>{chat.chatId}</div>
        <div className={styles.lastMessage}>text</div>
      </div>
    </div>
  );
};

export default ChatsListItem;