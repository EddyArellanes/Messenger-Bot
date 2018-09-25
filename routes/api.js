const express = require('express')
const messengerAPI = require('../config/config')
const messengerUtilities = require('../lib/messenger-utilities-functions')
//To Define Routes
const router = express.Router()

router.get('/webhook', function(req, response){
  if(req.query['hub.verify_token'] === messengerAPI.TOKEN_NAME){
      response.send(req.query['hub.challenge'])
  }else{
      response.send("You don't have Permissiones :P")
  }

})

router.post('/webhook/', function(req, res){
  const webhook_event = req.body.entry[0]
  if(webhook_event.messaging){
      webhook_event.messaging.forEach(event => {
          console.log('Message Received')
          console.log(event)
          
          messengerUtilities.handleEvent(event.sender.id, event)
      })
  }
  res.sendStatus(200)
})

//Re-utilize in all app
module.exports = router