var express = require('express');
var zip = require('express-zip');

var session = require('../helper/session');
const globalConst = require('../const/globalConst');
const { validationRules, validate } = require('../helper/validator.js');
let Products = require('../services/products');

var router = express.Router();

const product = new Products();

const getFileExtention = filename => {
  return filename.split('.').pop();
};

router.get('/list/:main_catagory_id/:sub_catagory_id', (req, res) => {
    
  product.getProductList(req.params).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.get('/admin/list/:main_catagory_id/:sub_catagory_id', (req, res) => {
    
  product.getProductAdminList(req.params).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.get('/comment/list/:product_id', (req, res) => {
    
  product.getProductComentList(req.params).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.get('/catagory/list', (req, res) => {
    
  product.getProductCategoryList().then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.get('/admin/catagory/list', (req, res) => {
  
  product.getProductAdminCategoryList().then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.get('/brand/list', (req, res) => {
    
  product.getProductBrandList().then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.get('/admin/brand/list', (req, res) => {
    
  product.getProductAdminBrandList().then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/download/zip', validationRules.downloadZip(), validate, (req, res) => {

  console.log("product_list",req.body.product_list[0]);

  product.getDownloadZipUrl(req.body.product_list).then((result) => {

    console.log(result);

    // res.zip([
    //   { path: './public/files/2d/VAKO.zip', name: '/path/in/zip/kprod.zip' },
    //   { path: './public/files/3d/VAKO.zip', name: 'kprod.zip' }
    // ],"imran.zip",(err,bytesZipped) =>{
    //   console.log("err",err);
    //   console.log("bytesZipped",bytesZipped);
    // });

    res.zip(result,"kworktech.zip",(err,bytesZipped) =>{
      console.log("err",err);
      console.log("bytesZipped",bytesZipped);
    });

    // res.zip([ { path: 'D:/project/k-work-tech/k-work-tech/server/public/files/2d/JKRUMA.zip',
    // name: '/JKRUMA/2D/kprod.zip' } ],"imran.zip",(err,bytesZipped) =>{
    //   console.log("err",err);
    //   console.log("bytesZipped",bytesZipped);
    // });

    // res.status(200).json(result).end();
  }).catch((err) => {

    res.status(433).json(err).end();
  });

    


  // res.zip([
  //   { path: './public/files/2d/kprod.zip', name: '/path/in/zip/file1.name' },
  //   { path: './public/files/3d/kprod.zip', name: 'file2.name' }
  // ],"imran.zip",(err,bytesZipped) =>{
  //   console.log("err",err);
  //   console.log("bytesZipped",bytesZipped);
  // });

});

router.get('/:product_id/details', (req, res) => {
    
  let product_id = req.params.product_id;

  product.getProductDetails(product_id).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
  res.status(433).json({"aaa":err}).end();
  });

});

router.get('/:product_id/:product_name/pdf', (req, res) => {

  let product_id = parseInt(req.params.product_id);
  console.log(product_id);
  let product_name = req.params.product_name;
    
  const puppeteer = require('puppeteer');
 
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#/product/'+product_id, {waitUntil: 'networkidle2'});
    await page.pdf({path: 'product.pdf', format: 'A4', scale: 0.75 });

    // await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/home/me/stuff'});
  
    await browser.close();

    res.download('product.pdf',product_name+'.pdf')
  })();


});

router.get('/gen/pdf/list', (req, res) => {
    
  product.genPdf4ProductList(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/create/main/category', validationRules.createMainCategory(), validate,(req, res) => {
    
  product.createMainCategory(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/main/category/active', validationRules.updateMainCategoryActive(), validate,(req, res) => {
    
  product.updateMainCategoryActive(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/main/category/name', validationRules.updateMainCategoryName(), validate,(req, res) => {
    
  product.updateMainCategoryName(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/create/sub/category', validationRules.createSubCategory(), validate,(req, res) => {
    
  product.createSubCategory(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/sub/category/active', validationRules.updateSubCategoryActive(), validate,(req, res) => {
    
  product.updateSubCategoryActive(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/sub/category/name', validationRules.updateSubCategoryName(), validate,(req, res) => {
    
  product.updateSubCategoryName(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/active', validationRules.updateProductStatus(), validate,(req, res) => {
    
  product.updateProductStatus(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/create/brand', validationRules.createBrand(), validate,(req, res) => {
    
  product.createBrand(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/create/comment', validationRules.createComment(), validate,(req, res) => {
    
  product.createComment(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/brand/active', validationRules.updateBrandActive(), validate,(req, res) => {
    
  product.updateBrandActive(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/update/brand/name', validationRules.updateBrandName(), validate,(req, res) => {
    
  product.updateBrandName(req.body).then((result) => {
    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

router.post('/create', validationRules.productCreate(), validate,(req, res) => {

  // init
  const puppeteer = require('puppeteer');
  let product_images = [];
  
  console.log("create product",req.files);
  console.log("received",req.files);

  //Upload Product image
  // start
  if (!req.files.product_image_1 || Object.keys(req.files.product_image_1).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_1 = globalConst.path.upload_product_img+req.body.product_name+'_1.'+getFileExtention(req.files.product_image_1.name);
    req.body.product_image_1=globalConst.path.view_product_img+req.body.product_name+'_1.'+getFileExtention(req.files.product_image_1.name);
    console.log("received",product_image_1);

    req.files.product_image_1.mv(product_image_1, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });

    product_images.push(req.body.product_image_1);

  }

  if (!req.files.product_image_2 || Object.keys(req.files.product_image_2).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_2 = globalConst.path.upload_product_img+req.body.product_name+'_2.'+getFileExtention(req.files.product_image_2.name);
    req.body.product_image_2 = globalConst.path.view_product_img+req.body.product_name+'_2.'+getFileExtention(req.files.product_image_2.name);
    console.log("received",product_image_2);

    // // Use the mv() method to place the file somewhere on your server
    req.files.product_image_2.mv(product_image_2, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });
    product_images.push(req.body.product_image_2);

  }

  if (!req.files.product_image_3 || Object.keys(req.files.product_image_3).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_3 = globalConst.path.upload_product_img+req.body.product_name+'_3.'+getFileExtention(req.files.product_image_3.name);
    req.body.product_image_3 = globalConst.path.view_product_img+req.body.product_name+'_3.'+getFileExtention(req.files.product_image_3.name);
    console.log("received",product_image_3);

    // // Use the mv() method to place the file somewhere on your server
    req.files.product_image_3.mv(product_image_3, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });
    product_images.push(req.body.product_image_3);

  }

  if (!req.files.product_image_4 || Object.keys(req.files.product_image_4).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_4 = globalConst.path.upload_product_img+req.body.product_name+'_4.'+getFileExtention(req.files.product_image_4.name);
    req.body.product_image_4 = globalConst.path.view_product_img+req.body.product_name+'_4.'+getFileExtention(req.files.product_image_4.name);
    console.log("received",product_image_4);

    // // Use the mv() method to place the file somewhere on your server
    req.files.product_image_4.mv(product_image_4, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });
    product_images.push(req.body.product_image_4);

  }
  // end

  // hero image upload
  if (!req.files.hero_image || Object.keys(req.files.hero_image).length === 0) {
    console.log("cancel");
  } else {  
    
    let hero_image = globalConst.path.upload_hero_img + req.body.product_name+'.'+getFileExtention(req.files.hero_image.name);
    req.body.hero_image = globalConst.path.view_hero_img+req.body.product_name+'.'+getFileExtention(req.files.hero_image.name);
    console.log("received",hero_image);

    // // Use the mv() method to place the file somewhere on your server
    req.files.hero_image.mv(hero_image, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });

  }

  // brand image upload
  if (!req.files.brand_image || Object.keys(req.files.brand_image).length === 0) {
    console.log("cancel");
  } else {  
    
    let brand_image = globalConst.path.upload_brand_img+req.body.product_name+'.'+getFileExtention(req.files.brand_image.name);
    req.body.brand_image = globalConst.path.view_brand_img+req.body.product_name+'.'+getFileExtention(req.files.brand_image.name);
    console.log("received",brand_image);

    // // Use the mv() method to place the file somewhere on your server
    req.files.brand_image.mv(brand_image, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });

  }

  // 3d upload
  if (!req.files.threed_file || Object.keys(req.files.threed_file).length === 0) {
    console.log("cancel");
  } else {  
    
    let threed_file = globalConst.path.upload_3d_file + req.body.product_name+'.'+getFileExtention(req.files.threed_file.name);
    req.body.threed_file = globalConst.path.view_3d_file+req.body.product_name+'.'+getFileExtention(req.files.threed_file.name);
    console.log("received",threed_file);

    // // Use the mv() method to place the file somewhere on your server
    req.files.threed_file.mv(threed_file, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });

  }

  // 2d upload
  if (!req.files.twod_file || Object.keys(req.files.twod_file).length === 0) {
    console.log("cancel");
  } else {  
    
    let twod_file = globalConst.path.upload_2d_file+req.body.product_name+'.'+getFileExtention(req.files.twod_file.name);
    req.body.twod_file = globalConst.path.view_2d_file+req.body.product_name+'.'+getFileExtention(req.files.twod_file.name);
    console.log("received",twod_file);

    // // Use the mv() method to place the file somewhere on your server
    req.files.twod_file.mv(twod_file, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });

  }

  req.body.pdf_file = globalConst.path.view_pdf_file+req.body.product_name+'.pdf';

  console.log(req.body.pdf_file);

  req.body.multiple_flag = (req.body.multiple_flag)? 1 : 0;

  req.body.product_images = product_images;

  // console.log("received",__dirname);
  // console.log("received",req.body);
  // return;

  product.createProduct(req.body).then((result) => {

    console.log(result.output.product_id);
    let product_id = result.output.product_id;
    console.log(product_id);
    console.log(globalConst.path.gen_pdf_file);
    console.log(globalConst.path.gen_pdf_file+product_id);

    setTimeout(() => { 

     
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto( globalConst.path.gen_pdf_file+product_id, {waitUntil: 'networkidle2'});
        await page.pdf({path: globalConst.path.upload_pdf_file+req.body.product_name+'.pdf', format: 'A4', scale: 0.75 });  
        await browser.close();
      })();
 

     }, 1000);
  
     res.status(200).json(result).end();
    }).catch((err) => {
      res.status(433).json(err).end();
    });

});

router.post('/update', validationRules.productUpdate(), validate,(req, res) => {

  let product_images = [];
  // let abc = JSON.parse(req.body.product_images)
  
  console.log("create product",req.body);
  // console.log("create product",req.body.product_image_ids);
  console.log("received",req.files);

  // for (let index = 0; index < req.body.images.length; index++) {
  //   const img_element = in_data.images[index];
  //   console.log(img_element);
  // }
  req.body.product_image_urls = [];
  // let adbc =  req.body.product_image_ids.split(",")
  // adbc.forEach(element => {
  //   console.log("element",element);
  // });


  // return;

  if (!req.files || !req.files.product_image_1 || Object.keys(req.files.product_image_1).length === 0) {
    console.log("cancel");
    
  } else {  
    
    let product_image_1 = globalConst.path.upload_product_img+req.body.product_name+'_1.'+getFileExtention(req.files.product_image_1.name);
    req.body.product_image_1=globalConst.path.view_product_img+req.body.product_name+'_1.'+getFileExtention(req.files.product_image_1.name);
    console.log("received",product_image_1);

    req.files.product_image_1.mv(product_image_1, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });

    product_images.push(req.body.product_image_1);

  }
  req.body.product_image_urls.push(req.body.product_image_1);

  if (!req.files || !req.files.product_image_2 || Object.keys(req.files.product_image_2).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_2 = globalConst.path.upload_product_img+req.body.product_name+'_2.'+getFileExtention(req.files.product_image_2.name);
    req.body.product_image_2 = globalConst.path.view_product_img+req.body.product_name+'_2.'+getFileExtention(req.files.product_image_2.name);
    console.log("received",product_image_2);

    // // Use the mv() method to place the file somewhere on your server
    req.files.product_image_2.mv(product_image_2, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });
    product_images.push(req.body.product_image_2);

  }
  req.body.product_image_urls.push(req.body.product_image_2);

  if (!req.files || !req.files.product_image_3 || Object.keys(req.files.product_image_3).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_3 = globalConst.path.upload_product_img+req.body.product_name+'_3.'+getFileExtention(req.files.product_image_3.name);
    req.body.product_image_3 = globalConst.path.view_product_img+req.body.product_name+'_3.'+getFileExtention(req.files.product_image_3.name);
    console.log("received",product_image_3);

    // // Use the mv() method to place the file somewhere on your server
    req.files.product_image_3.mv(product_image_3, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });
    product_images.push(req.body.product_image_3);

  }
  req.body.product_image_urls.push(req.body.product_image_3);

  if (!req.files || !req.files.product_image_4 || Object.keys(req.files.product_image_4).length === 0) {
    console.log("cancel");
  } else {  
    
    let product_image_4 = globalConst.path.upload_product_img+req.body.product_name+'_4.'+getFileExtention(req.files.product_image_4.name);
    req.body.product_image_4 = globalConst.path.view_product_img+req.body.product_name+'_4.'+getFileExtention(req.files.product_image_4.name);
    console.log("received",product_image_4);

    // // Use the mv() method to place the file somewhere on your server
    req.files.product_image_4.mv(product_image_4, function(err) {
      console.log(err)
      if (err)
        return res.status(500).send(err);
    });
    product_images.push(req.body.product_image_4);

  }
  req.body.product_image_urls.push(req.body.product_image_4);

  console.log("111");

  // console.log("2222",req.files);
  // console.log("3333",Object.keys(req.files).length);

  // hero image upload
  if (!req.files || !req.files.hero_img || Object.keys(req.files.hero_img).length === 0) {
    console.log("cancel");
  } else {  
    console.log("in else");

    let hero_img = globalConst.path.upload_hero_img + req.body.product_name+'.'+getFileExtention(req.files.hero_img.name);
    req.body.hero_img = globalConst.path.view_hero_img+req.body.product_name+'.'+getFileExtention(req.files.hero_img.name);
    console.log("received",hero_img);

    // // Use the mv() method to place the file somewhere on your server
    req.files.hero_img.mv(hero_img, function(err) {
      console.log(err)
      if (err)
        res.status(500).json(err).end();
      return;
        // return res.status(500).json(err);
    });

  }

  // brand image upload
  if (!req.files || !req.files.brand_img || Object.keys(req.files.brand_img).length === 0) {
    console.log("cancel");
  } else {  
    
    let brand_img = globalConst.path.upload_brand_img+req.body.product_name+'.'+getFileExtention(req.files.brand_img.name);
    req.body.brand_img = globalConst.path.view_brand_img+req.body.product_name+'.'+getFileExtention(req.files.brand_img.name);
    console.log("received",brand_img);

    // // Use the mv() method to place the file somewhere on your server
    req.files.brand_img.mv(brand_img, function(err) {
      console.log(err)
      if (err)
        return res.status(500).json(err);
    });

  }

  // 3d upload
  if (!req.files || !req.files.threed_file || Object.keys(req.files.threed_file).length === 0) {
    console.log("cancel");
  } else {  
    
    let threed_file = globalConst.path.upload_3d_file + req.body.product_name+'.'+getFileExtention(req.files.threed_file.name);
    req.body.threed_file = globalConst.path.view_3d_file+req.body.product_name+'.'+getFileExtention(req.files.threed_file.name);
    console.log("received",threed_file);

    // // Use the mv() method to place the file somewhere on your server
    req.files.threed_file.mv(threed_file, function(err) {
      console.log(err)
      if (err)
        return res.status(500).json(err).end();;
    });

  }

  // 2d upload
  if (!req.files || !req.files.twod_file || Object.keys(req.files.twod_file).length === 0) {
    console.log("cancel");
  } else {  
    
    let twod_file = globalConst.path.upload_2d_file+req.body.product_name+'.'+getFileExtention(req.files.twod_file.name);
    req.body.twod_file = globalConst.path.view_2d_file+req.body.product_name+'.'+getFileExtention(req.files.twod_file.name);
    console.log("received",twod_file);

    // // Use the mv() method to place the file somewhere on your server
    req.files.twod_file.mv(twod_file, function(err) {
      console.log(err)
      if (err)
        return res.status(500).json(err);
    });

  }

  req.body.pdf_file = globalConst.path.view_pdf_file+req.body.product_name+'.pdf';

  req.body.product_images = product_images;
  // console.log("received kkk",req.body);

  


    
  product.updateProduct(req.body).then((result) => {
    console.log("sucess catch",result);
    setTimeout(() => { 

     
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto( globalConst.path.gen_pdf_file+req.body.product_id, {waitUntil: 'networkidle2'});
        await page.pdf({path: globalConst.path.upload_pdf_file+req.body.product_name+'.pdf', format: 'A4', scale: 0.75 });  
        await browser.close();
      })();
      

     }, 1000);

    res.status(200).json(result).end();
  }).catch((err) => {
    res.status(433).json(err).end();
  });

});

module.exports = router;
