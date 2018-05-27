const notifyModule = require('./notify')
const writeLocalModule = require('./writeLocal')

function writeRouteAccessToConsole (route,resTime){
    let date = new Date()
    console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + route + " " + resTime + " ms")
}



module.exports = {
    vtolEngine : function (options){
        return function(req,res,next){

            let startTime = process.hrtime()

            if(options && options.serverName && options.serverName!=""){
                res.header("X-powered-by",options.serverName)
            }
            
            next()

            let resTime = process.hrtime(startTime)[1]/1000000

            let accessObj = {
                "route" : req.path,
                "method" : req.method,
                "resTime" : resTime,
                "IP" : req.IP?req.IP:"",
                "protocol" : req.protocol,
            }

            if(options.enableSlack){
                if(options.resTime){
                    if(parseInt(resTime) >= parseInt(options.resTime)){
                        notifyModule.sendToSlack(req.path,resTime,options.slackWebHook)
                        writeLocalModule.writeToDebug(accessObj)
                    }
                }else{
                    if(parseInt(resTime) >= 2){
                        notifyModule.sendToSlack(req.path,resTime,options.slackWebHook)
                        writeLocalModule.writeToDebug(accessObj)
                    }
                }
            }

            writeLocalModule.accessLog(accessObj)
            writeRouteAccessToConsole(req.path,resTime)
            

        }
    },

    vtolSpecialEvents : function(options){
        return function(req,res,next){
            
            let accessObj = {
                "route" : req.path,
                "method" : req.method,
                "IP" : req.IP?req.IP:"",
                "protocol" : req.protocol,
                specialEventObj : options.specialEventObj
            }

            if(options.enableSlack && options.slackWebHook){
                notifyModule.sendSpecialEventNotification(options.slackWebHook,accessObj)   
            }

            writeLocalModule.writeSpecialEvents(accessObj)

            next()
        }
    }
}