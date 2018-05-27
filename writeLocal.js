const fs = require("fs")

module.exports = {
    writeToDebug : function(accessObj){ 

        fs.writeFile("./debug.log",JSON.stringify(accessObj) + "\n",{"encoding" : "utf8","flag":"a"}, function(err) {
            if(err){
                console.log(err)
            }else{
                //console.log("File has been written out - success ~~~~")
            }
        })
    },

    accessLog : function(accessObj){
        fs.writeFile("./access.log",JSON.stringify(accessObj) + "\n",{"encoding" : "utf8","flag":"a"}, function(err) {
            if(err){
                console.log(err)
            }else{
                //console.log("File has been written out - success ACCESS~~~~")
            }
        })
    },

    writeSpecialEvents : function(accessObj){
        let fileName = accessObj.specialEventObj.eventName + ".log"

        fs.writeFile(fileName,JSON.stringify(accessObj) + "\n",{"encoding" : "utf8","flag":"a"}, function(err){
            if(err){
                console.log(err)
            }else{

            }
        })
    }
}



