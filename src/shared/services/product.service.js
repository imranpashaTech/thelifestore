import axios from 'axios';
import * as commonConstant from '../common.service'

export default class ProductService {

    getProductList(mainid,subid){
        console.log("id id service",mainid,subid)
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getProductList']+mainid+'/'+subid)
    }

    getProductAdminList(mainid,subid){
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getProductAdminList']+mainid+'/'+subid)
    }

    getProductDetails(id) {
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getProductDetails']+ id + '/details');
    }

    createProductDetails(data) {
        return axios.post(commonConstant.baseURL +commonConstant.ServiceURLs['createProduct'],data);
    }
    
    createComment(data) {
        return axios.post(commonConstant.baseURL +commonConstant.ServiceURLs['createComment'],data);
    }

    getCategoriesList(){
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getCategories'])
    }
    
    getComments(pid){
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getComments']+pid)
    }

    getAdminCategoryList(){
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getAdminCategories'])
    }

    getBrandsList(){
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getBrands'])
    }

    getAdminBrands(){
        return axios.get(commonConstant.baseURL + commonConstant.ServiceURLs['getAdminBrands'])
    }
    activeProduct(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['activeProduct'], data)
    }
    activeMainCatagory(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['activeMainCatagory'], data)
    }
    activeSubCatagory(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['activeSubCatagory'], data)
    }
    activeBrand(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['activeBrand'], data)
    }
    updateBrand(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['updateBrand'], data)
    }
    updateMainCategoryName(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['updateMainCategoryName'], data)
    }
    updateSubCategoryName(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['updateSubCategoryName'], data)
    }
    downloadZip(in_data){
        return axios({

            url: commonConstant.baseURL + commonConstant.ServiceURLs['downloadZip'],
        
            method: 'post',

            data: in_data,
        
            responseType: 'blob',
        
        });
        // return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['downloadZip'], data)
    }
    updateProduct(data) {
        return axios.post(commonConstant.baseURL +commonConstant.ServiceURLs['updateProduct'],data);
    }
}