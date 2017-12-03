var PubNub = require('pubnub'),
        fs = require('fs'),
publishConfig = {
  channel : "byd_mettler_server",
  message : null
}
var stage = 0

var pubnub = new PubNub({
  publishKey : "pub-c-d4bc2df8-e09f-4111-9b5d-7577fabc0d6a",
  subscribeKey : "sub-c-39613f3c-d4ae-11e7-9701-cada06921ea8",
  uuid : "test-listener-mettler-server-1234",
  ssl : true
})

pubnub.subscribe({channels: ['byd_mettler_server']})

pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            var payload = {
                my: 'payload'
            }
            pubnub.publish(
                {
                    message: payload
                },
                function (status) {null}
            )
        }
    },
    message: function(message) {
      console.log(message.message)
        if ( message.message == 'Are you ok?' )
          awakening : {
            publishConfig.message = 'Yeah, I\'m alive!'
            senderData()
          }
        else if ( message.message.text == 'Here comes the data' )
          showing : {
            fs.writeFileSync( __dirname + '/' + message.message.fileOne,message.message.fileOneContent)
            fs.writeFileSync( __dirname + '/' + message.message.fileTwo,message.message.fileTwoContent)
            publishConfig.message = 'Information saved'
            senderData()
          }
    },
    presence: function(presenceEvent) {null}
})

function senderData(){
  pubnub.publish(publishConfig, function(status, response) {
    ( ! status.error ) ? stage++ : stage = 0
  })
}
