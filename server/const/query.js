module.exports= {
    
    getProductDetials :"CALL `p_get_details`(?)" ,//CALL p_get_details(product_id)
    getProductFeaturesList :"CALL `p_get_feature_list`(?)" ,//CALL p_get_feature_list(product_id)
    getProductImagesList :"CALL `p_get_image_list`(?)" ,//CALL p_get_image_list(product_id)
    getProductList :"CALL `p_get_list`(?,?)" ,//CALL p_get_list(mc,sc)
    getProductAdminList :"CALL `p_admin_get_list`(?,?)" ,//CALL p_admin_get_list(mc,sc)
    getProductLatestList :"CALL `p_get_latest_list`()" ,//CALL p_get_latest_list()
    
    getProductComentList :"CALL `p_get_comments`(?)" ,//CALL p_get_comments()
    getProductCategoryList :"CALL `getCategories`()" ,//CALL getCategories()
    getProductAdminCategoryList :"CALL `getAdminCategories`()" ,//CALL getAdminCategories()
    getProductBrandList :"CALL `getBrands`(?)" ,//CALL getBrands(status)

    getProductListGenPdf :"CALL `get_list_gen_pdf`(?,?)" ,//CALL get_list_gen_pdf()
    getProductPdfUrl :"CALL `update_p_pdf_url`(?,?)" ,//CALL update_p_pdf_url(pid,pdf_url)
    
    getDownloadZipLink :"CALL `getDownloadLink`(?,?,?,?)" ,//CALL getDownloadLink(p_id,2d_flag,3d_flag)
    
    updateProductStatus :"CALL `p_update_active`(?,?)" ,//CALL p_update_active(p_id,active)
    
    createMainCategory :"CALL `create_main_category`(?,?)" ,//CALL create_main_category(mc name,createdby)
    updateMainCategoryActive :"CALL `update_main_category_active`(?,?)" ,//CALL update_main_category_active(mc id,status)
    updateMainCategoryName :"CALL `update_main_category_name`(?,?)" ,//CALL update_main_category_name(mc id,mc name)
    
    createSubCategory :"CALL `create_sub_category`(?,?,?)" ,//CALL create_sub_category(mc id,sc name,createdby)
    updateSubCategoryActive :"CALL `update_sub_category_active`(?,?)" ,//CALL update_sub_category_active(sc id,status)
    updateSubCategoryName :"CALL `update_sub_category_name`(?,?)" ,//CALL update_sub_category_name(sc id,sc name)
    
    createComment :"CALL `p_create_comment`(?,?,?,?)" ,//CALL p_create_comment(brand name,createdby)
    createBrand :"CALL `create_brand`(?,?)" ,//CALL create_brand(brand name,createdby)
    updateBrandActive :"CALL `update_brand_active`(?,?)" ,//CALL update_brand_active(brand id,status)
    updateBrandName :"CALL `update_brand_name`(?,?)" ,//CALL update_brand_name(brand id,brand name)

    updateProduct :"CALL `p_update`(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ,//CALL p_update(pname,bid,mcid,scid,turl,3d,2d,d_id,pdesc,pdesign,c_by)
    createProduct :"CALL `p_create`(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ,//CALL p_create(pname,bid,mcid,scid,turl,3d,2d,d_id,pdesc,pdesign,c_by)
    insertProductFeature :"CALL `p_feature_insert`(?,?)" ,//CALL p_feature_insert(feature_name,product_id)
    insertProductImage :"CALL `p_image_insert`(?,?)" ,//CALL p_image_insert(img_url,product_id)
    updateProductImage :"CALL `p_image_update`(?,?)" ,//CALL p_image_update(img_url,product_img_id)
     
    }