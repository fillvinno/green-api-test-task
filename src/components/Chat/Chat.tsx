import styles from './Chat.module.scss'
import emptyAvatar from '../../assets/emptyAvatar.png'
import arrowIcon from '../../assets/arrow.svg'
import {SubmitHandler, useForm} from "react-hook-form";
import {useSendMessageMutation} from "../../api/chatAPI.ts";
import {FC, useEffect, useRef} from "react";
import {Message, TChat} from "../../models/types.ts";
import {getFromLocalStorage} from "../../utils/localstorage.ts";


type Inputs = {
  message: string
}

type Props = {
  chat: TChat
}

const renderMessage = (message: Message) => {
  if (message.body?.typeWebhook === "incomingMessageReceived") {
    return (
      <div
        key={message.body?.idMessage}
        className={styles.receivedMessage}
      >
        {message.body?.messageData?.textMessageData?.textMessage}
      </div>
    )
  }
  return (
    <div
      key={message.body?.idMessage}
      className={styles.ownMessage}
    >
      {message.body?.messageData?.extendedTextMessageData?.text}
    </div>
  )
}

const Chat: FC<Props> = ({chat}) => {
  const {register, handleSubmit, resetField} = useForm<Inputs>()

  const [sendMessage] = useSendMessageMutation()
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);


  const onSubmit: SubmitHandler<Inputs> = async (fields) => {
    try {
      const message = {
        chatId: chat.chatId + '@c.us',
        message: fields.message,
      }
      await sendMessage({message, instance: getFromLocalStorage('instance')})
      resetField('message')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.chat}>
      <header className={styles.chatInfoWrap}>
          <div className={styles.chatInfo}>
            <img src={emptyAvatar} alt='avatar' className={styles.avatar}/>
            <div className={styles.chatId}>{chat.chatId}</div>
          </div>
      </header>
      <div className={styles.messages}>
        {chat.messages.map((message: Message) => renderMessage(message))}
        <div ref={messagesEndRef}/>
      </div>
      <div className={styles.inputs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            className={styles.messageInput}
            placeholder={'Введите сообщение'}
            autoComplete="off"
            {...register('message')}
          />
          <button
            className={styles.sendMessageBtn}
          >
            <img src={arrowIcon} alt='sendMessageBtn'/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;