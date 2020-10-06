const base_url = "http://localhost:3001/";

// const base_url = "http://kwt.madlab.in/";
// 
module.exports= {
   path:{
      root:"/api/v1",
      login: base_url+"#/login",
      home:base_url,
      view_product_img:"./images/products/",
      upload_product_img:"./public/images/products/",
      view_hero_img:"./images/hero/",
      upload_hero_img:"./public/images/hero/",
      view_brand_img:"./images/brands/",
      upload_brand_img : "./public/images/brands/",
      view_3d_file : "./files/3d/",
      upload_3d_file : "./public/files/3d/",
      view_2d_file : "./files/2d/",
      upload_2d_file : "./public/files/2d/",
      view_pdf_file : "./files/pdf/",
      view_pdf_file : "./files/pdf/",
      upload_pdf_file : "./public/files/pdf/",
      // gen_pdf_file : "http://localhost:8080/#/product/",
      gen_pdf_file : base_url+"#/product/",
   },
   flag:{
      emp_active:1,
      not_verified:0,
      mobile_verified:1,
      email_verified:2,
      all_verified:3,
      jobsite_delete:0,
      delete:0,
      onboard_active:1,
      verified:1
   },
   time:{
      sms_exp: 60*15,//15 minutes
      email_exp: 60*60*3, //3 hours
      forgot_pwd_exp: 60*60*3 //3 hours
   },
   val:{
      supplier:'S',
      customer:'C',
      equip_min_rental_days_floor:1,
      equip_min_rental_days_ceil:365,
      equip_operating_hrs_floor:1,
      equip_operating_hrs_ceil:24,
      GST:18,
   },
   sucess_msg:{
      insert:"Sucessfully Inserted",
      login:"Sucessfully Logged In",
      verify:"Sucessfully Verified",
      reject:"Sucessfully Rejected",
      cancel:"Sucessfully Cancelled",
      accept:"Sucessfully Accepted",
      created:"Sucessfully Created",
      updated:"Sucessfully Updated",
      store:"Sucessfully Stored",
      sent:"Sucessfully Sent",
      get:"Action Performed",
      reg:"Verification link sent to your Email",
      resentEmailVer:"Verification link sent to your Email",
      forgotPassword:"Request link sent to your Email",
   },
   error_msg:{
      login:"Invalid Username or Password",
      reg:"Email ID or Mobile No. already exists",
      invalid:"Something is not valid",
      insert:"Insertion failed",
      duplicate:"Duplicate Data",
      verify:"Unable to Verify",
      reject:"Unable to Reject",
      cancel:"Unable to Cancel",
      accept:"Unable to Accept",
      sent:"Unable to send",
      get:"Action Unsuccessful",
      updated:"Unable to Update",
      panUpload:'No PAN file uploaded',
      gstUpload:'No GST file uploaded',
      insuranceUpload:'No Insurance file uploaded',
      rcUpload:'RC not uploaded',
      pollutionUpload:'Pollution Certificate not uploaded',
      thirdpartyUpload:'TPC not uploaded',
      siteImgUpload:'Site image not uploaded',
      logsheetUpload:'Logsheet not uploaded',
      server_err:"Something went wrong",
      resentEmailVer:"Email Verified or ID not registered",
      434:"Clear existing orders",
      41741:"Equipments return is not assigned",

   },
   loc:{
      auth:"authentication",
      reg:"registration",
      verf:"verification",
      cret:"creation",
      updt:"updation",
      ordr:"ordeer",
   },
   code:{
      sucess_ok:200,
      sucess_created:201,
      sucess_accepted:202,
      sucess_authorise:203,
      sucess_noContent:204,
      error_badRequest:400,
      error_unAuth:401,
      error_notFound:404,
      server_internal:500
   },
   support:{
      language:{
         1:"English",
         2:"Tamil"
      },
   },
   array:{
      s_verification_li:['user','email','mobile'],
   },
   error(status,msg,value,location,param) {
      return {
         "errors": [{
           "status":status,
           "value": value,
           "msg": msg,
           "location": location,
           "param":param
         }]
       };
   },
   sucess(status,msg,data,location,param) {
      return {
         "success": [{
           "status":status,
           "data": data,
           "msg": msg,
           "location": location,
           "param":param
         }]
       };
   },
   error(msg,value,location,param) {
      return {
         "errors": [{
           "value": value,
           "msg": msg,
           "location": location,
           "param":param
         }]
       };
   },
   sucess(msg,data,location,param) {
      return {
         "success": [{
           "data": data,
           "msg": msg,
           "location": location,
           "param":param
         }]
       };
   }

}
