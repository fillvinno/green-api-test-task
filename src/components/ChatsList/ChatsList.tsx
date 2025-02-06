import styles from './ChatsList.module.scss'
import ChatsListItem from "./ChatsListItem/ChatsListItem.tsx";
import logo from '../../assets/logo.svg'
import {SubmitHandler, useForm} from "react-hook-form";
import arrowIcon from '../../assets/arrow.svg'
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {TChat} from "../../models/types.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {chatSlice} from "../../store/reducers/chatSlice.ts";
import {useSendMessageMutation} from "../../api/chatAPI.ts";
import {getFromLocalStorage, saveToLocalStorage} from "../../utils/localstorage.ts";


type Inputs = {
  phone: number
  message: string
}

const renderSendBtn = (condition: boolean) => {
  if (condition) {
    return (
      <button
        className={styles.sendBtn}
      >
        <img src={arrowIcon} alt='sendMessage'/>
      </button>
    )
  }
  return null
}

const ChatsList = () => {
  const [sendMessage] = useSendMessageMutation()
  const {register, handleSubmit, formState: {errors}, resetField, watch} = useForm<Inputs>()
  const {chats} = useAppSelector(state => state.chatReducer)
  const {setChats, addChat, setCurrentChat} = chatSlice.actions
  const dispatch = useAppDispatch()

  const localChats: TChat[] = getFromLocalStorage('chats') || []
  const isMessageEmpty = !watch('message')

  useEffect(() => {
    if (localChats) {
      dispatch(setChats([...localChats]))
    }
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (fields) => {
    try {
      const message = {
        message: fields.message,
        chatId: fields.phone.toString() + '@c.us',
      }

      await sendMessage({message, instance: getFromLocalStorage('instance')})

      dispatch(addChat({chatId: fields.phone.toString(), messages: []}))
      dispatch(setCurrentChat({chatId: fields.phone.toString(), messages: []}))

      saveToLocalStorage('chats', [...localChats, {chatId: fields.phone.toString(), messages: []}] as TChat[])

      resetField('message')
      resetField('phone')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <img src={logo} alt='logo' className={styles.logoImg}/>
      </div>
      <div className={styles.chats}>
        {chats && chats.map((chat: TChat, index) => <ChatsListItem key={index} chat={chat} />)}
      </div>
      <form
        className={styles.addChat}
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className={styles.error}>{errors.phone && 'Обязательное поле'}</span>
        <input
          type='number'
          className={styles.numberInput}
          placeholder={'Введите номер телефона'}
          autoComplete="off"
          {...register('phone', {required: true})}
        />
        <div className={styles.sendMessageWrap}>
          <input
            type='text'
            className={styles.sendMessageInput}
            placeholder={'Введите сообщение'}
            autoComplete="off"
            {...register('message', {required: true})}
          />
          {renderSendBtn(!isMessageEmpty)}
        </div>
      </form>
    </div>
  );
};

export default ChatsList;