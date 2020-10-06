// Contains functionalites of 
  // User Registration 
  // Set User Credentials
  // Authentication of User
  // Reset the lost Password
  var express = require('express');
  var session = require('../helper/session');
  const globalConst = require('../const/globalConst');
  const { validationRules, validate } = require('../helper/validator.js');
  let Users = require('../services/users');
  
  var router = express.Router();
  
  const user = new Users();
  
  
  router.get('/ver/:id', (req, res) => {
      
    let id = req.params.id;
  
  
    let v_email = user.verifyEmail(id).then((result) => {
      console.log("then : "+result);
      res.redirect(globalConst.path.login);
      // res.status(200).json(result).end();
    }).catch((result) => {
     //  res.status(200).json(result).end();
      res.redirect(globalConst.path.login);
  
    });
  });
  
  router.get('/forgot/pwd/ver/:id', (req, res) => {
      
     let id = req.params.id;
   
     user.verifyForgotPassword(id).then((result) => {
       console.log("then : "+result);
       req.session.userId = result.userId;
       res.redirect(globalConst.path.set_forgot_pwd);
       // res.status(200).json(result).end();
     }).catch((err) => {
        res.redirect(globalConst.path.home);
  
     //   res.status(200).json(err).end();
     });
   });
  
   router.get('/session', (req, res) => {
     if(req.session.userId)
        res.status(200).json({"status":true}).end();
     else
        res.status(200).json({"status":false}).end();
   });
  
  

   
  router.get('/logout',session.logout, (req, res) => {
  });
  

  

  

  
  
  module.exports = router;
  
  