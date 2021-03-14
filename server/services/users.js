var session = require('../helper/session');
const pool = require('../helper/config');
const globalConst = require('../const/globalConst');
const query = require('../const/query');
const Mailer = require('../helper/mailer');


module.exports = class Users {
  
  constructor() {}

  set username(username) {
    this._username = username;
  }

  get username() {
    return this._username;
  }

  set password(password) {
    this._password = password;
  }

  get password() {
    return this._password;
  }

  set supplierDetails(supplierDetails) {
    this._supplierDetails = supplierDetails;
  }

  get supplierDetails() {
    return this._supplierDetails;
  }

  set userDetails(userDetails) {
    this._userDetails = userDetails;
  }

  get userDetails() {
    return this._userDetails;
  }

  async subscribeEmail(in_data) {

    const mailer = new Mailer();

    mailer.sendeMail({
      from: 'test', // sender address
      to: in_data.email_id, // list of receivers
      subject: 'test', // Subject line
      html: `<h1>Hello</h1>
      <img src="https://media.giphy.com/media/RDOROM6Au8IoKoyK88/giphy.gif" alt="test">`// html body
    }).then((result) => {
      console.log(result.messageId);
    }).catch((err) => {
      console.log(err);
    });
    return { sucess : "sucess"}
  }

  // async login() {
  //   let username = this._username;
  //   let password = this._password;
  //   const crypt = new Crypt();
  //   let response = {};
    
  //   response.output = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //           if(err) { 
  //             console.log(err); 
  //           } 
  //           try{
  //             let output=null;
  //             await connection.beginTransaction();

  //             await connection.query(query.getLogin, [username],async (err,result)=>{
  //               if(err) { 
  //                  output = globalConst.error(err,"connection");
  //                  reject(output);
                   
  //               } else if(!result[0][0]){
  //                  output = globalConst.error(globalConst.error_msg.login,username,globalConst.loc.auth);                  //  reject(output);
  //                  reject(output);
  //               } else{
  //                 const data=result[0][0];
                 
  //                 if(await crypt.decryptCompare(password,data.auth_password)){
                    
  //                   //genrate the token
  //                   const tokenOTP = crypt.generateOTP();
  //                   const entoken = await crypt.generateOTPEncrypt(tokenOTP);
  //                   output=globalConst.sucess(globalConst.sucess_msg.login,{'token':entoken,'flag':-1,'type':data.auth_type});

  //                   //storing session
  //                   response.userId = data.auth_id;
  //                   response.token = entoken;
  //                   response.type = data.auth_type;
  //                 }
  //                 else{
  //                   output = globalConst.error(globalConst.error_msg.login,'***',globalConst.loc.auth);
  //                   reject(output);
  //                 }
  //               }
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return response;
  // }

  // async blockUser(data) {
  //   let response = {};
  //   response.output = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
  //             await connection.beginTransaction();
  //             await connection.query(query.blockUser, [data.flag,data.userId],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //               } 
  //               console.log(result);
  //               const data =(result)? result[0][0]: null;
  //               if(data.MYSQL_NO == 200){
  //                 output= globalConst.sucess(globalConst.sucess_msg.get,data);
  //                 resolve(output);
  //               }
  //               else{
  //                 output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
  //                 reject(output);
  //               }
                
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return response;
  // }

  // async adminDaashboard(data) {
  //   let response = {};
  //   response.output = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
  //             await connection.beginTransaction();
  //             await connection.query(query.getAdminDashboard, [data.userId],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //               } 
  //               console.log(result);
  //               const data =(result)? result[0][0]: null;;
  //               if(data){
  //                 output= globalConst.sucess(globalConst.sucess_msg.get,data);
  //               }
  //               else 
  //                 output = globalConst.error(globalConst.error_msg.duplicate,data.MYSQL_NO,globalConst.loc.reg);   
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return response;
  // }

  // async getAreas(data) {
  //   let response = {};
  //   response.output = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
  //             await connection.beginTransaction();
  //             await connection.query(query.getAreas, [],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //               } 
  //               console.log(result);
  //               const data = result[0];
  //               if(data){
  //                 output= globalConst.sucess(globalConst.sucess_msg.get,data);
  //               }
  //               else 
  //                 output = globalConst.error(globalConst.error_msg.duplicate,data.MYSQL_NO,globalConst.loc.reg);   
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return response;
  // }
 

  // async setForgotPassword(userData) {
  //   console.log(userData);
  //   let status = null;
  //   //set data
  //   this.userDetails = userData;

  //   const crypt = new Crypt();
  //   //encrypt the password
  //   crypt.password = userData.password;
  //   const hash_pwd = await crypt.generatePwd();

  //   status = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
             
  //             await connection.beginTransaction();
  //             await connection.query(query.setForgotPassword, [
  //                                   userData.userId, 
  //                                   hash_pwd],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //                 reject(output);
  //               } 
  //               const data =(result)? result[0][0]: null;;
  //               //info: MYSQL_ERR has error msg
  //               console.log(result[0][0].MYSQL_NO);
  //               if(data.MYSQL_NO==200){
  //                 output=globalConst.sucess(globalConst.sucess_msg.updated,data.MYSQL_NO);
  //               }
  //               else {
  //                 console.log(data.MYSQL_ERR);

  //                 output =globalConst.error(globalConst.error_msg.updated,data.MYSQL_NO,globalConst.loc.reg);   
  //                 reject(output);
  //               }
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return status;
  // }

  // async resetPassword(userData) {
  //   // resetPassword
  //   console.log(userData);
  //   let status = null;
  //   //set data
  //   this.userDetails = userData;

  //   const crypt = new Crypt();
  //   //encrypt the password
  //   crypt.password = userData.password;
  //   const hash_pwd = await crypt.generatePwd();

  //   status = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
             
  //             await connection.beginTransaction();
  //             await connection.query(query.getAuthPwd, [userData.userId],async (err,result)=>{
  //               if(err) { 
  //                  output = globalConst.error(err,"connection");
  //                  reject(output);
                   
  //               } else if(!result[0][0]){
  //                  output = globalConst.error(globalConst.error_msg.login,username,globalConst.loc.auth);                  //  reject(output);
  //                  reject(output);
  //               } else{
  //                 const data=result[0][0];
  //                   if(await crypt.decryptCompare(userData.current_password,data.auth_password)){
  //                     output = await new Promise(async (resolve,reject)=>{
  //                      await connection.query(query.resetPassword, [
  //                       userData.userId, 
  //                       hash_pwd],(err,result)=>{
  //                         if(err) { 
  //                           output = globalConst.error(err,"connection");
  //                           reject(output);
  //                         } 
  //                         const data =(result)? result[0][0]: null;;
  //                         //info: MYSQL_ERR has error msg
  //                         console.log(result[0][0].MYSQL_NO);
  //                         if(data.MYSQL_NO==200){
  //                           output=globalConst.sucess(globalConst.sucess_msg.updated,data.MYSQL_NO);
  //                           const notify = new Notify();
  //                           notify.sendPasswordResetInfo(userData.userId).then(result => {
  //                             console.log(result);
  //                           });
  //                           resolve(output);

  //                         }
  //                         else {
  //                           console.log(data.MYSQL_ERR);
  //                           output =globalConst.error(globalConst.error_msg.updated,data.MYSQL_NO,globalConst.loc.reg);
  //                           reject(output)   
  //                         }
  //                           // resolve(output);
  //                       });
  //                     //storing session
  //                   });
  //                   }
  //                   else{
  //                     output = globalConst.error(globalConst.error_msg.invalid,'***',globalConst.loc.auth);
  //                     reject(output)   
  //                   }
                 
                 
  //               }
  //               resolve(output);
  //             });
              
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return status;
  // }

  // async createUser(userData) {
  //   console.log(userData);
  //   let status = null;
  //   //set data
  //   this.userDetails = userData;

  //   const crypt = new Crypt();
  //   //encrypt the password
  //   crypt.password = this.userDetails.password;
  //   const hash_pwd = await crypt.generatePwd();
  //   //genrate the mobile OTP
  //   const mobileOTP = crypt.generateOTP();
  //   const mobile_en_otp = await crypt.generateOTPEncrypt(mobileOTP);
  //   console.log(mobileOTP+" : "+mobile_en_otp);
  //   // :TODO send mail();
  //   //genrate the email OTP
  //   const email_en_otp = (await crypt.generateOTPEncrypt(this.userDetails.email)).replace(/\//g, "");//to overcome the issue in url
  //   const emailUrl = crypt.genrateUrl(email_en_otp);
  //   console.log(email_en_otp+" : "+emailUrl);
  

  //   status = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
             
  //             await connection.beginTransaction();
  //             await connection.query(query.userReg, [this.userDetails.userType, 
  //                                   this.userDetails.email,
  //                                   this.userDetails.mobile, 
  //                                   hash_pwd, 
  //                                   globalConst.flag.not_verified,
  //                                   globalConst.flag.emp_active,
  //                                   email_en_otp,
  //                                   mobile_en_otp,
  //                                   this.userDetails.firstName,
  //                                   this.userDetails.lastName],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //                 reject(output);
  //               } 
  //               const data =(result)? result[0][0]: null;;
  //               //info: MYSQL_ERR has error msg
  //               console.log(result[0][0].MYSQL_NO);
  //               if(data.MYSQL_NO==200){
  //                 output=globalConst.sucess(globalConst.sucess_msg.reg,data.MYSQL_NO);
  //                 const notify = new Notify();
  //                 notify.sendUserCreate(this.userDetails,emailUrl).then(result => {
  //                   console.log(result);
  //                 });
  //                 // :TODO verification email code
  //                 // const mailer = new Mailer();
  //                 // mailer.sendeMail(emailTemplate.c_verify_email([this.userDetails.email],this.userDetails.firstName,emailUrl)).then((result) => {
  //                 //   console.log(result.messageId);
  //                 //   // if(result.messageId==200)
  //                 //   //   mailer.sendeMail(emailTemplate.a_user_details(this.userDetails)).then((result) => {
  //                 //   //     console.log(result.messageId);
  //                 //   //   }).catch((err) => {
  //                 //   //     console.log(err);
  //                 //   //   });
  //                 // }).catch((err) => {
  //                 //   console.log(err);
  //                 // });
  //                 // :TODO verification phone code
  //                 // :TODO web notification
                
  //                 // <supplier_name> just registered as a supplier on EQUIPR
                  
  //               }
  //               else {
  //                 console.log(data.MYSQL_ERR);

  //                 output =globalConst.error(globalConst.error_msg.reg,data.MYSQL_NO,globalConst.loc.reg);   
  //                 reject(output);
  //               }
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return status;
  // }

  // async resendEmailVerify(data) {
  //   console.log(data);
  //   let status = null;
  //   //set data
  //   this.userDetails = data;

  //   const crypt = new Crypt();
  //   //encrypt the password
   
  //   // :TODO send mail();
  //   //genrate the email OTP
  //   const email_en_otp = (await crypt.generateOTPEncrypt(this.userDetails.email)).replace(/\//g, "");//to overcome the issue in url
  

  //   status = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
             
  //             await connection.beginTransaction();
  //             await connection.query(query.sendEmailVerification, [data.email,email_en_otp],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //                 reject(output);
  //               } 
  //               console.log(result);
  //               const data =(result)? result[0][0]: null;;
  //               //info: MYSQL_ERR has error msg
  //               if(data.MYSQL_NO==200){

  //                 const emailUrl = crypt.genrateUrl(email_en_otp);
  //                 output=globalConst.sucess(globalConst.sucess_msg.resentEmailVer,data.MYSQL_NO);
  //                 // :TODO verification email code
  //                 console.log(email_en_otp+" : "+emailUrl);

  //                 // const mailer = new Mailer();
  //                 // mailer.sendeMail({
  //                 //   from: 'Equipr labs', // sender address
  //                 //   to: this.userDetails.email, // list of receivers
  //                 //   subject: 'verify your email', // Subject line
  //                 //   text: emailUrl, // plain text body
  //                 //   html: '<b>Hello world?</b>' // html body
  //                 // }).then((result) => {
  //                 //   console.log(result.messageId);
  //                 // }).catch((err) => {
  //                 //   console.log(err);
  //                 // });


  //                 const mailer = new Mailer();
  //                 mailer.sendeMail(emailTemplate.c_verify_email([this.userDetails.email],"User",emailUrl)).then((result) => {
  //                   console.log(result.messageId);
  //                 }).catch((err) => {
  //                   console.log(err);
  //                 });

  //                 resolve(output);

  //                 // :TODO verification phone code
  //               }
  //               else {
  //                 console.log(data.MYSQL_ERR);
                  
  //                 output =globalConst.error(globalConst.error_msg.resentEmailVer,data.MYSQL_NO,globalConst.loc.reg);   
  //                 reject(output);
  //               }
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return status;
  // }

  // async authForgotPassword(data) {
  //   console.log(data);
  //   let status = null;
  //   //set data
  //   this.userDetails = data;

  //   const crypt = new Crypt();
  //   //genrate the email OTP
  //   const email_en_otp = (await crypt.generateOTPEncrypt(this.userDetails.email)).replace(/\//g, "");//to overcome the issue in url
  

  //   status = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
             
  //             await connection.beginTransaction();
  //             await connection.query(query.authForgotPassword, [data.email,email_en_otp],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //                 reject(output);
  //               } 
  //               const data =(result)? result[0][0]: null;;
  //               //info: MYSQL_ERR has error msg
  //               console.log(result);
  //               if(data.MYSQL_NO==200){
  //                 output =globalConst.sucess(globalConst.sucess_msg.resentEmailVer,data.MYSQL_NO,globalConst.loc.reg);   
  //                 const emailUrl = crypt.genrateforgorPasswordUrl(email_en_otp);
  //                 // :TODO verification email code
  //                 console.log(email_en_otp+" : "+emailUrl);
  //                 const mailer = new Mailer();
  //                 mailer.sendeMail(emailTemplate.u_forgot_password([this.userDetails.email],emailUrl)).then((result) => {
  //                   console.log(result.messageId);
  //                 }).catch((err) => {
  //                   console.log(err);
  //                 });

  //                 // const mailer = new Mailer();
  //                 // mailer.sendeMail({
  //                 //   from: 'Equipr labs', // sender address
  //                 //   to: this.userDetails.email, // list of receivers
  //                 //   subject: 'reset your password', // Subject line
  //                 //   text: emailUrl, // plain text body
  //                 //   html: '<b>Hello world?</b>' // html body
  //                 // }).then((result) => {
  //                 //   console.log(result.messageId);
  //                 // }).catch((err) => {
  //                 //   console.log(err);
  //                 // });
  //                 resolve(output);

  //                 // :TODO verification phone code
  //               }
  //               else {
  //                 console.log(data.MYSQL_ERR);
  //                 output =globalConst.error(globalConst.error_msg.resendEmailVerify,data.MYSQL_NO,globalConst.loc.reg);   
  //                 reject(output);
  //               }
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });

  //   return status;
  // }

  // async createState(state,dist) {
    
  
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //           } 
  //           try{
             
  //             await connection.beginTransaction();
  //             await connection.query(query.createDistrict, 
  //             [state,dist],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //               } 
  //               console.log(result);
  //               console.log(err);
               
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
   

  // }

  // async verifyEmail(id) {
  //   let status = null;
  //   status = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //       try{
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //             // reject(output);
  //           } 
           
             
  //             await connection.beginTransaction();
  //             await connection.query(query.emailVerification, [id,
  //                                 globalConst.time.email_exp],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //                 // reject(output);
  //               } 
                
  //               const data = result[0][0];
  //               //info: MYSQL_ERR has error msg
  //               console.log(data.MYSQL_NO);
  //               if(data.MYSQL_NO==200){
  //                 output=globalConst.sucess(globalConst.sucess_msg.verify,data.MYSQL_NO);
  //               }
  //               else {
  //                 output =globalConst.error(globalConst.error_msg.verify,data.MYSQL_NO,globalConst.loc.verf);   
  //                 reject(output);
  //               }
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //             reject(e);
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });
    
  //   return status;
  // }



  // async verifyForgotPassword(id) {
  //   let status = null;
  //   let response = {};
  //   response.output = await new Promise((resolve,reject)=>{
  //     pool.getConnection(async (err,connection) =>{
  //       let output=null;
  //       try{
  //           if(err) { 
  //             output = globalConst.error(err,"connection");
  //             // reject(output);
  //           } 
           
             
  //             await connection.beginTransaction();
  //             await connection.query(query.verifyForgotPassword, [id,
  //                                 globalConst.time.forgot_pwd_exp],(err,result)=>{
  //               if(err) { 
  //                 output = globalConst.error(err,"connection");
  //                 // reject(output);
  //               } 
                
  //               const data = result[0][0];
  //               //info: MYSQL_ERR has error msg
  //               console.log(data.MYSQL_NO);
  //               if(data.MYSQL_NO==200){
  //                 output=globalConst.sucess(globalConst.sucess_msg.verify,data.MYSQL_NO);
  //                 response.userId = data.auth_id;
  //               }
  //               else {
  //                 output =globalConst.error(globalConst.error_msg.verify,data.MYSQL_NO,globalConst.loc.verf);   
  //                 reject(output);
  //               }
  //               resolve(output);
  //             });
  //             await connection.commit();
  //           }catch(e){
  //             await connection.rollback();
  //             reject(e);
  //           }finally{
  //             await connection.release();
  //           }   
  //       });
  //   });
    
  //   return response;
  // }

}

