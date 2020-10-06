import axios from 'axios';
import * as commonConstant from '../common.service'

export default class AddCategoriesService {

    createCategory(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['createCategory'],data)
    }

    createSubCategory(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['createSubCategory'],data)
    }

    createBrands(data){
        return axios.post(commonConstant.baseURL + commonConstant.ServiceURLs['createBrands'],data)
    }
    
}