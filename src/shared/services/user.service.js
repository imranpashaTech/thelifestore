import axios from 'axios';
import * as commonConstant from '../common.service'

export default class UserService {

    subscribeNewsletter(data) {
        return axios.post(commonConstant.baseURL +commonConstant.ServiceURLs['subscribeNewsletter'],data);
    }
}