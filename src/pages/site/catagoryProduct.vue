<template>
     <div class="catagoryProduct  ">
         <section class="row  m-0">
           <div class="col-md-12 p-0">
              <img :src="catagory_obj.catagory_img" alt="art and craft" class="w-100  c-img">
              <div class="d-flex align-items-center c-header col-6">
                <div class="row p-5">
                  <h1 class="m-auto col-12 p-1">{{catagory_obj.catagory_title}} </h1> 
                  <h4 class="col-12 p-1">{{catagory_obj.catagory_desc}} </h4>
                </div>
              </div>
           </div>
          </section> 
           <section class="container  mx-auto">
            <div class="row col pt-4">
              <div class="row"> 
                <div class="col-lg-4 col-md-4 col-sm-6 col-12 p-2 "  v-for="(product, i)  in productList.list" :key="product.brand_id">
                  <app-product-card :id="product.product_id" :pos="i" :in_data="product"   v-on:storeSelProduct = "storeSelProduct" v-on:addProductList = "addProductWatchList" v-on:removeProductList = "removeProductWatchList"></app-product-card>
                </div>
              </div>            
            </div>
          </section>    
    </div> 
   
</template>

<script>
// components
import ProductCard from '@/components/common/product-card'
// import sideNav from '@/components/layout/side-nav'
// import smSideNav from '@/components/layout/sm-side-nav'
// import ProductView from '@/pages/site/Product'
import ProductService from '../../shared/services/product.service'
// import carousel from 'vue-owl-carousel'
import {globalMixin,ontimeMixin} from '@/mixin.js'

const productService = new ProductService();


export default {
  mixins: [globalMixin,ontimeMixin],
  name: 'Home',
  components: {
    'app-product-card': ProductCard,
    // 'app-product-view': ProductView,
    // 'app-side-nav': sideNav,
    // 'app-sm-side-nav': smSideNav,
    // 'carousel': carousel,
  },
  props: {
    msg: String,
    listData:Object
  },
   data() {
      return {
        // init
        catagory_name:null,
        catagory_obj:{},
        catagory_list:[],
        catagory_prod_list:{},
        selected_download:this.$selected_download,
        productList:this.$store_app_data,
        sc_id:0,
        mc_id:0,
        loading_flag : 1,
        download_loading_flag : 1,
        select_collection:"My Collection",
        status_hide : 2,  //info: used to hide the check box while download,
        filter:{
            name:'/'
        },
      }
    },
  methods: {
    topFunction() {
                window.scroll({
                   top: document.body.scrollTop,
                    behavior: 'smooth'
                });
      },
      getProductList(mc_id,sc_id) {
        this.productList.list=[]
        productService.getProductList(mc_id,sc_id)
        .then(response => {
          this.productList = response.data.output.success[0].data;
          this.productList = this.check_is_sel_prod(this.productList);
        })
        .catch(e => {
          this.errors.push(e)
        }) 
        
        // this.setCollection(sel_name);
      },

      goto(){
                this.goto_last_product();
      },


      storeSelProduct(product,i){
        // :to="'product/'+in_data.product_id"
        this.set_store_sel_product(product,i);
        this.$router.push({path:'product/'+product.product_id})

      },
 
      downloadZip(){

          this.download_loading_flag = 0;
          let obj = {"product_list" : this.selected_download};

          productService.downloadZip(obj)
          .then( async response => {


            const blob = new Blob([response.data], { type: 'application/zip' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = "kworktech.zip"
            link.click()
            URL.revokeObjectURL(link.href)
          this.download_loading_flag = 1;

          })
          .catch(e => {
          this.download_loading_flag = 1;

              this.toast.error("Error occured while adding",{
                  position:'top-right'
              })  
                this.errors.push(e)
          })

      },

      sel_dwn_prod(e,pos){
        let status = e.target.checked;

        if(this.selected_download[pos].d_2d != this.status_hide) 
          this.selected_download[pos].d_2d = status;

        if(this.selected_download[pos].d_3d != this.status_hide) 
          this.selected_download[pos].d_3d = status;

          this.selected_download[pos].d_pdf = status ;
      },

      setCollection(sel_name){
        this.select_collection = sel_name;
      },

      setProductList(){
           console.log("this is setProductList outside .... ",this);
      },
      
      set_loading_flag(flag){
           console.log("this is set_loading_flag outside .... ",flag);
           this.loading_flag = flag;
      },

      about(){
           this.$router.push({path:'/about'})
      }
  },
  
  created() {
            this.catagory_name = String(this.$route.params.catagory_name);
            this.catagory_list = [{
              catagory_title : "art & craft",
              catagory_img : "/img/art_and_craft.6e8ea954.jpg",
              catagory_desc : "We art & craft  for many reasons: It makes us happy :), to experience something new, or we need something. In fact, it is possible to tick all these boxes. But, what if we also want to be responsible with our buying habits? "
            },
            {
              catagory_title : "clothing",
              catagory_img : "/img/clothing.3a1962e4.png",
              catagory_desc : "We clothing for many reasons: It makes us happy :), to experience something new, or we need something. In fact, it is possible to tick all these boxes. But, what if we also want to be responsible with our buying habits? "
            }]; 

            this.catagory_list.forEach(element => {
              if(element.catagory_title == this.catagory_name)
                this.catagory_obj = element;
            });

    // this.logMsg();
    // this.setStatus(2);
    // this.logMsg();
   

    // let loc_this =this;
    // console.log("this is outside .... ",this);

    
    // console.log("first_status",this.$first_status);
    // console.log("appName",this.productList);

    // if(this.$first_status){
    //   // this.getProductList(this.mc_id,this.sc_id);
    //     let out_data;

    //    productService.getProductList(this.mc_id,this.sc_id)
    //   .then( (response) => {
        
    //     console.log(loc_this,"this is inside .... ",this);

    //           out_data = response.data.output.success[0].data;
    //           this.set_loading_flag(0);
    //           this.productList = out_data;

    //           // if(this.productList.new){
    //           //   this.productList.new.forEach(element => {
    //           //       element['product_status']='new' 
    //           //   });
    //           // this.set_first_status(0);
    //           // }
    //           this.set_first_status(0);
    //           this.set_store_app_data(this.productList);

    //   })
    //   .catch((e) => {
    //   loc_this.errors.push(e)
    //   })  

      

    // }else{
    //   this.productList = this.$store_app_data;
    //   this.set_loading_flag(0);
    // }

    // this.getElement();
    // window.onscroll = function() {this.scrollFunction()};

    
  },

  mounted(){
    // this.$nextTick(function () {
    //     // DOM is now updated
    //     // `this` is bound to the current instance
    //     this.goto_last_product();
    // //   })
    //   this.goto();
      // window.onscroll = function() {this.scrollFunction()}
   
  }
}

</script>
<style  scoped>

  @import '../../style.css';


/* latest  */
.c-header {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  /* visibility: hidden; */
  opacity: 1;

  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
}

</style>