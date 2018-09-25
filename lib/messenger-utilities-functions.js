const messengerAPI = require('../config/config.js')
const fetch = require('node-fetch')
const typing = {
  recipient: {
    id: '',
  },
  /*
  mark_seen: Marca el último mensaje como leído.
  typing_on: Activa los indicadores de escritura.
  typing_off: Desactiva los indicadores de escritura.
  */
  sender_action: "typing_on", 
}
const response = {
  recipient: {
    id: '',
  },
  message: {
    text: "Bienvenido! soy TechnoBot, el Asistente digital de Technology Corps y estoy aquí para ayudarte en lo que necesites ;)",
    quick_replies: [
      {
        content_type: "text",
        title: "Me amas :3?",
        payload: "Start_Conversation"
      }
    ]
  } 
}
function handleEvent(senderId, event){
  /** 
  * Handle Event : get the Id of the Messenger User and the Event he send
  * @param {string} [senderId] - id of the User in Facebook Messenger
  * @param {object} [event] - event that user send, is an object
  * @return {object} 200 {code,message,data{transaction_id,user_id,email}}
  */
  //If is text
  if(event.message){
    handleMessage2(senderId, event.message)
  }else if(event.postback){
    handlePostback(senderId, event.postback.payload)
  }
}
function handlePostback(senderId, payload){
  switch(payload){
    case 'Start_Conversation':
      response.recipient.id = senderId
      typing.recipient.id = senderId
      response.message.text = "Vamos a iniciar con las últimas noticias de Tecnología!"
      callSendApi(typing)
      callSendApi(response)
    default:
  }
}
function handleMessage(event){
  /** 
  * Handle Message : get the event sended by User in order to do something
  * @param {object} [event] - event that user send, is an object
  */
  const senderId = event.sender.id
  const messageText = event.message.text
  const messageData = {
      recipient: {
          id: senderId        
      },
      message: {
          text: messageText
      }
  }
  callSendApi(messageData)
}
function handleMessage2(senderId, event){
  if(event.text){
    defaultMessage(senderId)
  } else if(event.attachmenta){
    handleAttachments(senderId, event)
  }

}
function handleAttachments(senderId, event){
  let attachmentType = event.attachments[0].type
  switch(attachmentType){
    case 'image':
    break
    case 'video':
    break
    case 'audio':
    break
    case 'file':
    break
    default:
    break
  
  }
}

function defaultMessage(senderId){
  response.recipient.id = senderId

  callSendApi(response)
}
function callSendApi(response){
  /** 
  * Call Send Api : This function receive the data of the message, and response to the user
  * @param {object} [event] - event that user send, is an object
  */

  //Data of the Message
  //console.log(response)
  fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${messengerAPI.ACCESS_TOKEN}`, {
    method: 'POST',
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',                   
    }
  })            
  .then(res => res.json())     
  .then(data => {
    //Response of the data
    console.log("Message Sent")
    console.log(data)
    
  })
  .catch(err => {
    console.log("Message Not Sended")
    console.log(err.message)
  })
  
}
module.exports = {
  handleEvent
  
}