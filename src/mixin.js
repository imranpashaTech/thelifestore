import Vue from 'vue'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast)

export const globalMixin = {
    created() {
        console.log("globalMixin");
    },
    data(){
      
        return {
            toast:Vue.$toast,
            productWatchList: this.$productWatchList,
            selected_download: this.$selected_download,
            productList: this.$store_app_data,
            index:0,

        }
    },
    methods: {
       
          addProductWatchList(product_data,i){

            this.index =  this.productWatchList.findIndex(obj => obj.product_id == product_data.product_id);
    
            // info: check if 3d or 2d file exists
            let status_2d = (product_data.twod_file_url)? true: this.status_hide;
            let status_3d = (product_data.threed_file_url)? true: this.status_hide;
    
            if (this.index === -1){
              this.selected_download.push({
                  'product_id' : product_data.product_id,
                  'row' : true,
                  'd_2d' : status_2d,
                  'd_3d' : status_3d,
                  'd_pdf' : true
                  });
    
              this.productWatchList.push(product_data)
              this.toast.success("product added to collection",{
                position:'top-right',
                duration:3000
              })    
              if(product_data.product_status){ //info: product_status if 'new'
                this.productList.new[i]['selected'] = 1;
                let p_list_pos =  this.productList.list.findIndex(obj => obj.product_id == product_data.product_id);
                  if(p_list_pos > -1)
                    this.productList.list[p_list_pos]['selected'] = 1;
              }else{
                this.productList.list[i]['selected'] = 1;
                let p_new_pos =  this.productList.new.findIndex(obj => obj.product_id == product_data.product_id);
                  if(p_new_pos > -1)
                    this.productList.new[p_new_pos]['selected'] = 1;
                    
              }
    
    
              // this.productList.list[i]['selected'] = 1;
              // this.productList.new[i]['selected'] = 1;
    
            }
    
          },
          

          removeProductWatchList(product,i){
            this.index =  this.productWatchList.findIndex(obj => obj.product_id == product.product_id)
    
            if (this.index > -1) {
              this.productWatchList.splice(this.index, 1);
              this.selected_download.splice(this.index, 1);
              // this.productList.list[i]['selected'] = 0;
              this.toast.success("product removed from collection",{
                position:'top-right',
                duration:3000
              })    
              if(product.product_status){ //info: product_status if 'new'
                this.productList.new[i]['selected'] = 0;
                let p_list_pos =  this.productList.list.findIndex(obj => obj.product_id == product.product_id);
                  if(p_list_pos > -1)
                    this.productList.list[p_list_pos]['selected'] = 0;
              }else{
                this.productList.list[i]['selected'] = 0;
                let p_new_pos =  this.productList.new.findIndex(obj => obj.product_id == product.product_id);
                  if(p_new_pos > -1)
                    this.productList.new[p_new_pos]['selected'] = 0;
              }
            }
    
          },

          set_store_sel_product(data,pos){
            Vue.prototype.$store_sel_product = data;
            Vue.prototype.$store_sel_product_pos = pos;
          },

          check_is_sel_prod(latest_product_list){
            
                for (this.index = 0; this.index < this.selected_download.length; this.index++) {

                  const element = this.selected_download[this.index];
                  let p_list_pos =  latest_product_list.list.findIndex(obj => obj.product_id == element.product_id);

                  if(p_list_pos > -1)
                    latest_product_list.list[p_list_pos]['selected'] = 1;

                  let p_new_pos =  latest_product_list.new.findIndex(obj => obj.product_id == element.product_id);

                  if(p_new_pos > -1)
                    latest_product_list.new[p_new_pos]['selected'] = 1;

                }
               
                return this.productList = latest_product_list;
    
          },

          goto_last_product(){

            let product_id =  this.$store_sel_product.product_id;

            if(!product_id)
              return;

              // let element = document.getElementById(product_id);
              // let top = element.offsetTop;
              // window.scrollTo(0, top);
              // let element = this.$refs[product_id];
            // this.$refs.home_nav.$el.scrollTop = 0;
            // this.$refs[product_id].$el.scrollTop = 0;
            let elmnt = document.getElementById(product_id);
            elmnt.scrollIntoView(false);

            // var top = element.offsetTop;
            // window.scrollTo(0, top);
            // element.scrollIntoView();

          }
          
          
    },

    beforeDestroy () {
        console.log("beforeDestroy");
        Vue.prototype.$productWatchList = this.productWatchList;
        Vue.prototype.$selected_download = this.selected_download; 
        Vue.prototype.$store_app_data = this.productList; 
    }
}

export const ontimeMixin = {

    methods: {
    
          set_first_status(flag){
            Vue.prototype.$first_status = flag;
          },

          set_store_app_data(productList){
            Vue.prototype.$store_app_data = productList;
          },
    },

}