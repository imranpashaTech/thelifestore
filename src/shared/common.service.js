//Use the window object to make it available globally.
// window.axios = axiosURL;
// export default class CommonService {
//     getbaseUrl() {
//         return `http://localhost:3001/api/v1/`
//     }
// }

'use strict'

// export const baseURL = `http://kwt.madlab.in/api/v1/`
export const baseURL = `http://localhost:3001/api/v1/`

export const ServiceURLs = {
    createCategory:"products/create/main/category",
    createSubCategory: "products/create/sub/category",
    createBrands:"products/create/brand",
    createProduct:"products/create",
    createComment:"products/create/comment",

    activeProduct:"products/update/active",
    activeMainCatagory:"products/update/main/category/active",
    activeSubCatagory:"products/update/sub/category/active",
    activeBrand:"products/update/brand/active",
    
    updateBrand:"products/update/brand/name",
    updateMainCategoryName:"products/update/main/category/name",
    updateSubCategoryName:"products/update/sub/category/name",

    downloadZip:"products/download/zip",

    updateProduct:"products/update",

    getBrands:"products/brand/list",
    getAdminBrands:"products/admin/brand/list",
    
    getCategories:"products/catagory/list",
    
    getComments:"products/comment/list/",

    getAdminCategories:"products/admin/catagory/list",


    getProductList:"products/list/",
    getProductAdminList:"products/admin/list/",
    getProductDetails:"products/",
}