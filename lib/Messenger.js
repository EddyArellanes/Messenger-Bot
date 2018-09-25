//Prototype For class
const messengerAPI = require('../config/config.js')
const fetch = require('node-fetch')
const response = {
  recipient: {
    id: '',
  },
  message: {
    text: "Bienvenido! soy TechnoBot, el Asistente digital de Technology Corps y estoy aquí para ayudarte en lo que necesites ;)"
  } 
}
/*Here will construct Class
I Visualized a Very Class Object to do everything, we need Postback Switch case separated and return the postback, and has predesigned responses like typing, texts and cards
*/
class MessengerBot{

  constructor(senderId, event){
    this.senderId = senderId
    this.event = event
    this.messageResponse = {
      recipient: {
        id: senderId,
      },
      message: {
        text: "Bienvenido! soy TechnoBot, el Asistente digital de Technology Corps y estoy aquí para ayudarte en lo que necesites ;)",
        quick_rplies: [
          {
            content_type: "text",
            title: "Me amas :3?",
            payload: "Start_Conversation"
          }
        ]
      } 
    }
  }
  handleEvent(){
    /** 
    * Handle Event : get the Id of the Messenger User and the Event he send
    * @param {string} [senderId] - id of the User in Facebook Messenger
    * @param {object} [event] - event that user send, is an object
    * @return {object} 200 {code,message,data{transaction_id,user_id,email}}
    */
    //If is text
    if(this.event.message){
      this.handleMessage2()
    }else if(event.postback){
      this.handlePostback()
    }
  }
  handlePostback(payload){
    switch(payload){
      case 'Start_Conversation':
        response.recipient.id = senderId
        response.message.text = "Vamos a iniciar con las últimas noticias de Tecnología!"
        this.callSendApi(response)
      default:
    }
  }
  handleMessage(event){
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
    this.callSendApi(messageData)
  }
  handleMessage2(senderId, event){
    if(event.text){
      this.defaultMessage(senderId)
    } else if(event.attachmenta){
      this.handleAttachments(senderId, event)
    }
  
  }
  handleAttachments(senderId, event){
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
  
  defaultMessage(senderId){
    const messageData = response
    this.callSendApi(messageData)
  }
  callSendApi(response){
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
    
  
}


module.exports = MessengerBot