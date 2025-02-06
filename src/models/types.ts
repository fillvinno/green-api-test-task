export type Message = {
  receiptId: number
  body?: {
    typeWebhook?: string
    instanceData?: {
      idInstance?: number
      wid?: string
      typeInstance?: string
    }

    chatId?: string
    sendByApi?: boolean
    status?: string

    timestamp?: number
    idMessage?: string
    senderData?: {
      chatId?: string
      chatName?: string
      sender?: string
      senderName?: string
      senderContactName?: string
    };
    messageData?: {
      textMessageData?: {
        textMessage: string
      }

      typeMessage?: string
      extendedTextMessageData?: {
        text?: string
        description?: string
        title?: string
        previewType?: string
        jpegThumbnail?: string
        forwardingScore?: number
        isForwarded?: string
      }
    }
  }
}

export type TChat = {
  chatId: string
  messages: Message[]
}

export type Instance = {
  idInstance: number
  apiTokenInstance: string
}