const request = require('request')


module.exports = {
        sendToSlack : async function (path,resTime,webhook,options) {
            let payload = {
                "username" : "vtol",
                "text" : "Unexpected increase response time for accessing -> " + path + " \nResponse Time = " + resTime + " ms"   
            }

            payload = JSON.stringify(payload)

            request.post({
                    url : webhook, 
                    form: payload
                }, function(err, httResponse, body){
                    //console.log(body)
            })

        },

        sendSpecialEventNotification : async function(webhook,specialEventObj) {
            let payload = {
                "username" : "vtol",
                "text" : "Special Event registered \n" + JSON.stringify(specialEventObj)
            }

            payload = JSON.stringify(payload)

            request.post({
                url : webhook,
                form : payload
            }, function(err, httResponse, body){
                //console.log(body)
            })
        }

}