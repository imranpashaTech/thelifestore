module.exports= { 
    username : "imranpashates@gmail.com",
    password : "learnBotCoding",
   //  username : "no-reply@equipr.in",
   //  password : "rapidrentals123",
    path:{
       root:"/api/v1"
    },
    rounds:{
      salt:10,
      otp:1,
   },
   SESS:{
      LIFETIME : 1000 * 60 * 60 * 1,
      NAME : "sid",
      SECRET : "XRR",
   },

 }
 