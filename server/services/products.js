var session = require('../helper/session');
const pool = require('../helper/config');
const globalConst = require('../const/globalConst');
const query = require('../const/query');


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

  async getProductDetails(product_id) {
    console.log("getProductDetails : "+product_id);

    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductDetials, [product_id],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                  const data=result[0][0];
                 
                if(data){
                  await connection.query(query.getProductFeaturesList, [product_id],async (err,result)=>{
                    const feature_data = (result)?result[0]:[];
                    data["features"] = feature_data;
                    console.log("data",data);
                  });
                  await connection.query(query.getProductImagesList, [product_id],async (err,result)=>{
                    console.log(result);
                    const images_data = (result)?result[0]:[];
                    data["images"] = images_data;
                    output = globalConst.sucess(globalConst.sucess_msg.get,data);
                    resolve(output);
                  });
                }else{
                  resolve(data);
                  
                }
                  
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getProductList(in_data) {

    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output = null;
              let data_p_latest_list = null;
              await connection.beginTransaction();

              await connection.query(query.getProductLatestList, [],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                } 

                data_p_latest_list = result[0];
                
              });

              await connection.query(query.getProductList, [in_data.main_catagory_id,in_data.sub_catagory_id],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                } 

                const data_p_list = result[0];
                // console.log(data);
                 
                if(data_p_list){
                  let data = {"new":data_p_latest_list,"list":data_p_list}
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getProductAdminList(in_data) {

    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output = null;
              let data_p_latest_list = null;
              await connection.beginTransaction();

              await connection.query(query.getProductLatestList, [],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                } 

                data_p_latest_list = result[0];
                
              });

              await connection.query(query.getProductAdminList, [in_data.main_catagory_id,in_data.sub_catagory_id],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                } 

                const data_p_list = result[0];
                // console.log(data);
                 
                if(data_p_list){
                  let data = {"list":data_p_list}
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  
  async getProductComentList(in_data) {


    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductComentList, [in_data.product_id],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const data = result[0];
                console.log(data);
                 
                if(data){
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getProductCategoryList() {


    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductCategoryList, [],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const data = result[0];
                console.log(data);
                 
                if(data){
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getProductAdminCategoryList() {


    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductAdminCategoryList, [],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const data = result[0];
                console.log(data);
                 
                if(data){
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getProductBrandList() {


    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductBrandList, [active],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const data = result[0];
                console.log(data);
                 
                if(data){
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getProductAdminBrandList() {


    let response = {};
    let active = 0;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductBrandList, [active],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const data = result[0];
                console.log(data);
                 
                if(data){
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }

  async genPdf4ProductList() {


    let response = {};
    let active = 0;
    const puppeteer = require('puppeteer');

    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.getProductListGenPdf, [508,25],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const data = result[0];
                console.log(data);
                 
                if(data){

                  data.forEach(async element => {
                    // setTimeout(async () => { 
                      console.log(element.product_id);
                      console.log(element.product_name);
                      let pdf_path = globalConst.path.view_pdf_file+element.product_name+'.pdf';
                      console.log(pdf_path);

                       
                        
     
                        (async () => {
                          const browser = await puppeteer.launch();
                          const page = await browser.newPage();
                          await page.goto( globalConst.path.gen_pdf_file+element.product_id, {waitUntil: 'networkidle2'});
                          await page.pdf({path: globalConst.path.upload_pdf_file+element.product_name+'.pdf', format: 'A4', scale: 0.75 });  
                          await browser.close();
                        })();
return;
                        // await connection.query(query.getProductPdfUrl, [
                        //   element.product_id,
                        //   pdf_path
                        // ],async (err,result)=>{
                        //   if(err) { 
                        //      output = globalConst.error(err,"connection");
                        //      reject(output);
                             
                        //   } 
          
                        //   const data = result[0];
                        //   console.log(data);
                          
                        // });
                  
                      //  },5000);

                     

                     
                  });

                  
                  output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  resolve(output);
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async getDownloadZipUrl(in_data) {

    const path = require('path');

    let response = {};
    let sel_dwn_arr = [];
    
    response = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              // for await (const element of in_data) {
              //   console.log(element);
              //   if(element.row)
              //     await connection.query(query.getDownloadZipLink, [
              //       element.product_id,
              //       element.d_2d,
              //       element.d_3d,
              //     ],async (err,result)=>{
              //       if(err) { 
              //         output = globalConst.error(err,"connection");
              //         reject(output);                   
              //       } 
    
              //       let out_data = result[0][0];
              //       // console.log(out_data);
                    
              //         if(out_data.twod_file_url){
              //           let twod_obj = { path: out_data.twod_file_url, name: '/'+out_data.product_name+'/2D/kprod.zip' };
              //           sel_dwn_arr.push(twod_obj);
              //         }
              //         if(out_data.threed_file_url){
              //           let threed_obj = { path: out_data.threed_file_url, name: '/'+out_data.product_name+'/3D/kprod.zip' };
              //           sel_dwn_arr.push(threed_obj);
              //         }
              //         console.log(sel_dwn_arr);
              //         // output= globalConst.sucess(globalConst.sucess_msg.get,data);
              //         // resolve(output);


                    
              //     });
              //     if()
              //     resolve(sel_dwn_arr);

              // }

              for (let index = 0; index < in_data.length; index++) {
                const element = in_data[index];
                if(element.row)
                  await connection.query(query.getDownloadZipLink, [
                    element.product_id,
                    element.d_2d,
                    element.d_3d,
                    element.d_pdf
                  ],async (err,result)=>{
                    if(err) { 
                      output = globalConst.error(err,"connection");
                      reject(output);    
                    } 
    
                    let out_data = result[0][0];
                    console.log(out_data);
                    // if(out_data.twod_file_url){
                    //   let twod_obj = { path: path.join('./public',out_data.twod_file_url).replace(/\\/g, "\/"), name: '/'+out_data.product_name+'/2D/kprod.zip' };
                    //   sel_dwn_arr.push(twod_obj);
                    // }
                    // if(out_data.threed_file_url){
                    //   let threed_obj = { path: path.join('./public',out_data.threed_file_url).replace(/\\/g, "\/"), name: '/'+out_data.product_name+'/3D/kprod.zip' };
                    //   sel_dwn_arr.push(threed_obj);
                    // }

                    if(out_data.twod_file_url){
                      let twod_obj = { path: path.join('public', out_data.twod_file_url), name: '/'+out_data.product_name+'/2D/'+out_data.product_name+'.zip' };
                      sel_dwn_arr.push(twod_obj);
                    }
                    if(out_data.threed_file_url){
                      let threed_obj = { path: path.join('public', out_data.threed_file_url), name: '/'+out_data.product_name+'/3D/'+out_data.product_name+'.zip' };
                      sel_dwn_arr.push(threed_obj);
                    }
                    if(out_data.pdf_file_url){
                      let threed_obj = { path: path.join('public', out_data.pdf_file_url), name: '/'+out_data.product_name+'/PDF/'+out_data.product_name+'.pdf' };
                      sel_dwn_arr.push(threed_obj);
                    }

                    if(index+1 == in_data.length)
                      resolve(sel_dwn_arr);

                    
                  });
              }

              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });

    return response;
  }
  
  
  async createProduct(in_data) {
    // console.log(in_data);
    
    let userId = 22;

    let response = {};
    let active = 1;

    let features_arr = in_data.product_features.split(",")
    console.log("features_arr",features_arr);
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.createProduct, [
                in_data.product_name,
                in_data.brand_id,
                in_data.main_category_id,
                in_data.sub_category_id,
                in_data.third_party_url,
                in_data.threed_file,
                in_data.twod_file,
                in_data.pdf_file,
                in_data.hero_image,
                in_data.brand_image,
                in_data.dimension_depth,
                in_data.dimension_height,
                in_data.dimension_width,
                in_data.multiple_flag,
                in_data.product_desc,
                in_data.brand_desc,
                in_data.product_designer,
                userId
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   console.log(err);
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log("out_data",out_data);
                 
                if(out_data){
                  const gen_product_id = out_data.product_id
                  for (let index = 0; index < features_arr.length; index++) {
                    const feature_element = features_arr[index];
                    await connection.query(query.insertProductFeature, [
                      feature_element,
                      gen_product_id
                    ],async (err,result)=>{
                      if(err) { 
                        output = globalConst.error(err,"connection");
                        reject(output);   
                      } 
              
                      const data = result[0];
                      console.log(data);
                      
                      // if(data){
                      //   output= globalConst.sucess(globalConst.sucess_msg.get,data);
                      //   resolve(output);
                      // }
                      // else{
                      //   output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                      //   reject(output);
                      // }
                      
                    });
                  }
              
                  for (let index = 0; index < in_data.product_images.length; index++) {
                    const img_element = in_data.product_images[index];
                    await connection.query(query.insertProductImage, [
                      img_element,
                      gen_product_id
                    ],async (err,result)=>{
                      if(err) { 
                        output = globalConst.error(err,"connection");
                        reject(output);
                        
                      } 
              
                      const data = result[0];
                      console.log("output",output);
                    
                      resolve({"product_id": gen_product_id});

                      // if(data){
                      //   output= globalConst.sucess(globalConst.sucess_msg.get,data);
                      //   resolve(output);
                      // }
                      // else{
                      //   output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                      //   reject(output);
                      // }
                      
                    });
                  }

                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateProduct(in_data) {
    console.log("------------------------");
    
    let userId = 22;

    let response = {};

    let product_image_ids =  in_data.product_image_ids.split(",");
    console.log(product_image_ids);
   
    // return;

    let features_arr = in_data.features.split(",")
    console.log("features_arr",features_arr);
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              // let i = 0;

              await connection.beginTransaction();

              in_data.product_image_urls.forEach(async (element,i) => {
                if(element != "null")
                  if(product_image_ids[i])
                  {
          
                    console.log(i,"i pos",product_image_ids[i],"update",element);
                    await connection.query(query.updateProductImage, [
                      element,
                      product_image_ids[i]
                    ],async (err,result)=>{
                      if(err) { 
                        output = globalConst.error(err,"connection");
                        reject(output);
                      } 
                      const data = result[0];
                      console.log("output",output);
                    });
          
                  }else{
          
                    console.log("create",element);
                    await connection.query(query.insertProductImage, [
                      element,
                      in_data.product_id
                    ],async (err,result)=>{
                      if(err) { 
                        output = globalConst.error(err,"connection");
                        reject(output);
                      } 
                      const data = result[0];
                      console.log("output",output);
                      
                    });
          
                  }
          
                  // i = i+1;
              });
              console.log(" in_data.product_desc", in_data.product_desc)
              await connection.query(query.updateProduct, [
                in_data.product_id,
                in_data.product_name,
                in_data.brand_id,
                in_data.main_category_id,
                in_data.sub_category_id,
                in_data.third_party_url,
                in_data.threed_file,
                in_data.twod_file,
                in_data.pdf_file,
                in_data.hero_img,
                in_data.brand_img,
                in_data.dimension_depth,
                in_data.dimension_height,
                in_data.dimension_width,
                in_data.multiple_flag,
                in_data.dimension_id,
                in_data.product_desc,
                in_data.brand_desc,
                in_data.product_designer,
                in_data.product_data_id
              
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   console.log(err);
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log("out_data",out_data);
                 
                if(out_data){
                  output= globalConst.sucess(globalConst.sucess_msg.get,out_data);

                  for (let index = 0; index < features_arr.length; index++) {
                    const feature_element = features_arr[index];
                    await connection.query(query.insertProductFeature, [
                      feature_element,
                      in_data.product_id,
                    ],async (err,result)=>{
                      if(err) { 
                        output = globalConst.error(err,"connection");
                        reject(output);   
                      } 
              
                      const data = result[0];
                      console.log(data);
                      
                      // if(data){
                      //   output= globalConst.sucess(globalConst.sucess_msg.get,data);
                      // }
                      // else{
                      //   output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                      //   reject(output);
                      // }
                      
                    });
                  }

                  resolve(output);

              
                  // for (let index = 0; index < in_data.product_images.length; index++) {
                  //   const img_element = in_data.product_images[index];
                  //   await connection.query(query.insertProductImage, [
                  //     img_element,
                  //     out_data.product_id,
                  //   ],async (err,result)=>{
                  //     if(err) { 
                  //       output = globalConst.error(err,"connection");
                  //       reject(output);
                        
                  //     } 
              
                  //     const data = result[0];
                  //     console.log(data);
                  //     resolve(output);

                  //     // if(data){
                  //     //   output= globalConst.sucess(globalConst.sucess_msg.get,data);
                  //     //   resolve(output);
                  //     // }
                  //     // else{
                  //     //   output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  //     //   reject(output);
                  //     // }
                      
                  //   });
                  // }
                }
                else{
                  output = globalConst.error(globalConst.error_msg[data.MYSQL_NO],data.MYSQL_NO,globalConst.loc.reg);   
                  reject(output);
                }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async createMainCategory(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.createMainCategory, [
                in_data.main_category_name,
                userId
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateMainCategoryActive(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateMainCategoryActive, [
                in_data.main_category_id,
                in_data.status
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });

    return response;
  }
  
  async updateMainCategoryName(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateMainCategoryName, [
                in_data.main_category_id,
                in_data.main_category_name
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async createSubCategory(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.createSubCategory, [
                in_data.sub_category_name,
                in_data.main_category_id,
                userId
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateSubCategoryActive(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateSubCategoryActive, [
                in_data.sub_category_id,
                in_data.status
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateSubCategoryName(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateSubCategoryName, [
                in_data.sub_category_id,
                in_data.sub_category_name
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async createBrand(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.createBrand, [
                in_data.brand_name,
                userId
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }

  async createComment(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.createComment, [
                in_data.product_id,
                userId,
                in_data.comment,
                in_data.status
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  async createBrand(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.createBrand, [
                in_data.brand_name,
                userId
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateBrandActive(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateBrandActive, [
                in_data.brand_id,
                in_data.status
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateBrandName(in_data) {
    console.log(in_data);
    
    let userId = 22;
    let response = {};
    let active = 1;
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateBrandName, [
                in_data.brand_id,
                in_data.brand_name
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });
    console.log("getProductDetails : "+response);

    return response;
  }
  
  async updateProductStatus(in_data) {
    console.log(in_data);
    
    let response = {};
    
    response.output = await new Promise((resolve,reject)=>{
      pool.getConnection(async (err,connection) =>{
            if(err) { 
              console.log(err); 
            } 
            try{
              let output=null;
              await connection.beginTransaction();

              await connection.query(query.updateProductStatus, [
                in_data.product_id,
                in_data.active_status
              ],async (err,result)=>{
                if(err) { 
                   output = globalConst.error(err,"connection");
                   reject(output);
                   
                } 

                const out_data = result[0][0];
                console.log(out_data);
                 
                   if(out_data.MYSQL_NO == 200){
                        output= globalConst.sucess(globalConst.sucess_msg.get,out_data);
                        resolve(output);
                      }
                      else{
                        output = globalConst.error(globalConst.error_msg[out_data.MYSQL_NO],out_data.MYSQL_NO,globalConst.loc.reg);   
                        reject(output);
                      }
                
              });
              await connection.commit();
            }catch(e){
              await connection.rollback();
            }finally{
              await connection.release();
            }   
        });
    });

    return response;
  }


}

