# VTOL ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

VTOL is a Node.js middleware designed to handle and manage the generating logs and the special events associated with your application

## Installation
`npm install vtol`

## Usage

```javascript
const vtol = require("vtol")

//for general purpose

app.use(vtol.vtolEngine({
  "serverName" : "TC Labs",
  "enableSlack" : true,
  "resTime" : "1",
  "slackWebHook" : " your slack webhook",
}))

resTime is the threshold value which you can set, if any request takes
more time than resTime then you will be notified and that particular
event will be logged ( default value = 2 ms )
  
enableSlack will send notifications to slack

//for registering special events - just add this middleware
//to that particular route

//example - >

router.post('/login',vtol.vtolSpecialEvents({
    "enableSlack" : true, //true or false
    "slackWebHook" : "your slack webhhok",
    specialEventObj : {
        "eventName" : "order placed"
    }
}),function(req,res,next){
    res.send("Order Confirmed")
}

 
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
[Source Code](https://github.com/Pravandan/vtol)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Authors and Contributors
Pravandan Chand - [LinkedIn Profile](https://linkedin.com/in/pravandan)


