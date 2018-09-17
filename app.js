'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const messengerAPI = require('./config/config.js')
const app = express()
app.set('port', 5000)
app.use(bodyParser.json())


app.get('/', function(req, response){
    response.send('Hello Man/Woman')
})
app.get('/webhook', function(req, response){
    if(req.query['hub.verify_token'] === 'techno_token'){
        response.send(req.query['hub.challenge'])
    }else{
        response.send("You don't have Permissiones :P")
    }

})

app.post('/webhook/', function(req, res){
    const webhook_event = req.body.entry[0]
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(event => {
            console.log('Message Received')
            console.log(event)
            handleMessage(event)
        })
    }
    res.sendStatus(200)
})

function handleMessage(event){
    const senderId = event.sender.senderId
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
function callSendApi(response){
    request(
        {
        "uri": "https://graph.facebook.com/me/messages",
        "qs": {
            "access_token": messengerAPI.ACCESS_TOKEN
        },
        "method": "POST",
        "json": response
        },
        function(err){
            if(err){
                console.log("Ha ocurrido un error")
                console.log(err)
            }else{
                console.log("Message Sent")
            }
        }
    )
}
app.listen(app.get('port'), function(){
    console.log(`Server Listening ${app.get('port')}`)
})