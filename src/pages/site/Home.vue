<template>
     <div class="home  p-3 mx-auto">
    
      
       <section>

        <div v-if="loading_flag==0">
         
          <section class="row m-0 ">
      
                <div class="col-md-12 ">                 
                  <carousel class="row" :autoplay="true" :nav="true" :responsive="{0:{items:1,nav:true},720:{items:1,nav:true},1000:{items:1,nav:true}}">
                      <div class="p-0" >
                           <img src="@/assets/slider/Hartley-Chair-Banner.jpg" alt="life" class="w-100">
                      </div> 
                      <div class="p-0"  >
                           <img src="@/assets/slider/slider2.jpg" alt="life" class="w-100">
                      </div>                 
                  </carousel> 
                </div> 
          </section>

         <section class="coatorgires container" >
            <div class=" text-center m-5">
              <h3>Shop By Categories</h3>
            </div>
              <div class="row bg-dark">
                 <div class="col-md-6 p-2 bg-warning c-item">
                   <router-link to="/catagory/art & craft">
                    <img src="@/assets/catagory/art_and_craft.jpg" alt="art and craft" class="w-100  c-img">
                    <div class="d-flex align-items-center c-title">
                       <h1 class="m-auto">Art and Craft</h1> 
                    </div>
                   </router-link>
                 </div>
                <div class="col-md-6 p-2 bg-info c-item">
                  <router-link  to="/about">
                    <img src="@/assets/catagory/clothing.png" alt="clothing" class="w-100 c-img">
                    <div class="d-flex align-items-center c-title ">
                       <h1 class="m-auto">Clothing</h1> 
                    </div>
                  </router-link>
                </div>
                <!-- info -->
                <!-- <div class="col-md-4 h-auto p-0">
                  <div class="col h-75 bg-warning border">
                  </div>
                  <div class="col h-50 bg-danger border">2</div>
                </div>
                <div class="col-md-4 h-auto p-0">
                  <div class="col h-25 bg-dark border">3</div>
                  <div class="col h-75 bg-info border">4</div>
                  <div class="col h-25 bg-secondary border">5</div>
                </div>
                <div class="col-md-4 h-auto p-0">
                  <div class="col h-50 bg-success border">6</div>
                  <div class="col h-25 bg-danger border">7</div>
                  <div class="col h-50 bg-primary border">8</div>
                </div> -->
              </div>      
          </section>

           <section class="container">
                <div class=" text-center m-5">
                    <h3>Trending Products</h3>
                </div>
                <div class="col-12">                 
                  <carousel class="row" :autoplay="true" :nav="true" :responsive="{0:{items:2,nav:false},720:{items:3,nav:false},1000:{items:4,nav:true}}">
                      <div class="p-2" >
                           <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
                      </div> 
                      <div class="p-2"  >
                           <img src="@/assets/prod.jpg" alt="chair" style="width:100%;">
                      </div> 
                     <div class="p-2" >
                           <img src="@/assets/prod.jpg" alt="chair" style="width:100%;">
                      </div> 
                      <div class="p-2"  >
                           <img src="@/assets/prod.jpg" alt="chair" style="width:100%;">
                      </div> 
                      <div class="p-2"  >
                           <img src="@/assets/prod.jpg" alt="chair" style="width:100%;">
                      </div> 
                      <div class="p-2"  >
                           <img src="@/assets/prod.jpg" alt="chair" style="width:100%;">
                      </div> 
                
                  </carousel> 
                </div> 
          </section>
          <section class="newsletter bg-light ">
            <div class="content container p-5 ">
            <div class="row p-5">
            <div class="col-9 m-auto">
              <div class="text-center">
                <h2>BE THE FIRST TO KNOW </h2>
                <h5 class="py-2">Subscribe to the <b>life.</b> Newsletter to get timely updates on products & trends.</h5>
                <div class="input-group">
                     <input type="email" class="form-control" placeholder="Enter your email">
                    <span class="input-group-btn">
                    <button type="button" class="btn btn-secondary">Subscribe Now</button>
                    </span>
                </div>
              </div>
            </div>
            </div>
            </div>
          </section>


          <!-- <section :ref="home_nav" class="navbar sticky-top navbar-light bg-white row font-weight-bold p-0 pb-2 nav-bar">
            <div class="top-menu top-menu-borders border-top border-bottom border-dark nav-bar-items">
              <app-sm-side-nav class="d-block d-md-none pl-5" v-on:callProductList = "getProductList" :filter="filter"></app-sm-side-nav>
              <div class="offset-md-3 p-2 aboutus-block "> 
                  <div class=" watchlist-exist text-uppercase">
                    <a href="javascript:void(0)"><span @click="about()">Profile </span></a>

                  </div> 
              </div>
              <div class="offset-md-3 p-2 watchlist-block" data-toggle="modal" data-target="#isProductWatchList" v-if="productWatchList.length != 0"> 
                  <div class=" watchlist-exist">
                    <a href="javascript:void(0)"><span> MY CART </span> <span class="watchlistcount pl-2">{{this.productWatchList.length}}</span></a>
                  </div> 
              </div>
              <div class="offset-md-3 p-2 watchlist-block" v-if="productWatchList.length == 0">
                  <div class=" watchlist-none">
                    <span>MY CART </span> 
                  </div>
              </div> 
            </div>
          </section> -->
          <!-- <section class="d-none  row m-0">
            <div class="col-md-3 ">
                <app-side-nav class="d-none d-md-block pt-4" v-on:callProductList = "getProductList" :filter= "filter"></app-side-nav>
            </div>
            <div class="col-md-9 pt-4 container-body">
              <div class="row"> 
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 p-2"  v-for="(product, i)  in productList.list" :key="product.brand_id">
                  <app-product-card :id="product.product_id" :pos="i" :in_data="product"   v-on:storeSelProduct = "storeSelProduct" v-on:addProductList = "addProductWatchList" v-on:removeProductList = "removeProductWatchList"></app-product-card>
                </div>
              </div>            
            </div>
          </section> -->
          <button @click="topFunction()"  title="Go to top">
            <a title="Back to top" id="myBtn" href="#">&#10148;</a>
          </button>
        </div>
        <div v-if="loading_flag==1">
          loading .... .....
        </div>
       </section>
   
    </div> 
   
</template>

<script>
// components
// import ProductCard from '@/components/common/product-card'
// import sideNav from '@/components/layout/side-nav'
// import smSideNav from '@/components/layout/sm-side-nav'
// import ProductView from '@/pages/site/Product'
// import ProductService from '../../shared/services/product.service'
import carousel from 'vue-owl-carousel'
// import {globalMixin,ontimeMixin} from '@/mixin.js'

// const productService = new ProductService();


export default {
  // mixins: [globalMixin,ontimeMixin],
  name: 'Home',
  components: {
    // 'app-product-card': ProductCard,
    // 'app-product-view': ProductView,
    // 'app-side-nav': sideNav,
    // 'app-sm-side-nav': smSideNav,
    'carousel': carousel,
  },
  props: {
    msg: String,
    listData:Object
  },
   data() {
      return {
        // productWatchList:this.$productWatchList,
        // selected_download:this.$selected_download,
        // productList:this.$store_app_data,
        // sc_id:0,
        // mc_id:0,
        loading_flag : 1,
        // download_loading_flag : 1,
        // select_collection:"My Collection",
        // status_hide : 2,  //info: used to hide the check box while download,
        // filter:{
        //     name:'/'
        // },
      }
    },
  methods: {
    topFunction() {
                window.scroll({
                   top: document.body.scrollTop,
                    behavior: 'smooth'
                });
      },
      // getProductList(mc_id,sc_id) {
      //   this.productList.list=[]
      //   productService.getProductList(mc_id,sc_id)
      //   .then(response => {
      //     this.productList = response.data.output.success[0].data;
      //     this.productList = this.check_is_sel_prod(this.productList);
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   }) 
        
      //   // this.setCollection(sel_name);
      // },

      // goto(){
      //           this.goto_last_product();
      // },
      // topFunction(){
      //   document.body.scrollHeight = 0;
      //   document.documentElement.scrollHeight = 0;
      //                 console.log("hello top function")
      // },
      
      // getElement()
      // {
      //         console.log("hello getelement")
      //         return document.getElementById("myBtn")


      // },

      // scrollFunction() {
      //   if (document.body.scrollHeight > 20 || document.documentElement.scrollHeight > 20) {
      //     this.getElement().style.display = "block";
      //     console.log("scroll funciton block")
      //   } else {
      //     console.log("scroll funciton none")
      //     this.getElement().style.display = "none";
      //   }
      // },

      // addProductWatchList(product,i){

      //   let index =  this.productWatchList.findIndex(obj => obj.product_id == product.product_id);

      //   // info: check if 3d or 2d file exists
      //   let status_2d = (product.twod_file_url)? true: this.status_hide;
      //   let status_3d = (product.threed_file_url)? true: this.status_hide;

      //   if (index === -1){
      //     this.selected_download.push({
      //         'product_id' : product.product_id,
      //         'row' : true,
      //         'd_2d' : status_2d,
      //         'd_3d' : status_3d,
      //         'd_pdf' : true
      //         });

      //     this.productWatchList.push(product)

      //     if(product.product_status){ //info: product_status if 'new'
      //       this.productList.new[i]['selected'] = 1;
      //       let p_list_pos =  this.productList.list.findIndex(obj => obj.product_id == product.product_id);
      //         if(p_list_pos > -1)
      //           this.productList.list[p_list_pos]['selected'] = 1;
      //     }else{
      //       this.productList.list[i]['selected'] = 1;
      //       let p_new_pos =  this.productList.new.findIndex(obj => obj.product_id == product.product_id);
      //         if(p_new_pos > -1)
      //           this.productList.new[p_new_pos]['selected'] = 1;
      //     }


      //     // this.productList.list[i]['selected'] = 1;
      //     // this.productList.new[i]['selected'] = 1;

      //   }

      // },
      
      // removeProductWatchList(product,i){
      //   let index =  this.productWatchList.findIndex(obj => obj.product_id == product.product_id)

      //   if (index > -1) {
      //     this.productWatchList.splice(index, 1);
      //     // this.productList.list[i]['selected'] = 0;

      //     if(product.product_status){ //info: product_status if 'new'
      //       this.productList.new[i]['selected'] = 0;
      //       let p_list_pos =  this.productList.list.findIndex(obj => obj.product_id == product.product_id);
      //         if(p_list_pos > -1)
      //           this.productList.list[p_list_pos]['selected'] = 0;
      //     }else{
      //       this.productList.list[i]['selected'] = 0;
      //       let p_new_pos =  this.productList.new.findIndex(obj => obj.product_id == product.product_id);
      //         if(p_new_pos > -1)
      //           this.productList.new[p_new_pos]['selected'] = 0;
      //     }
      //   }

      // },

      // storeSelProduct(product,i){
      //   // :to="'product/'+in_data.product_id"
      //   this.set_store_sel_product(product,i);
      //   this.$router.push({path:'product/'+product.product_id})

      // },
 
      // downloadZip(){

      //     this.download_loading_flag = 0;
      //     let obj = {"product_list" : this.selected_download};

      //     productService.downloadZip(obj)
      //     .then( async response => {


      //       const blob = new Blob([response.data], { type: 'application/zip' })
      //       const link = document.createElement('a')
      //       link.href = URL.createObjectURL(blob)
      //       link.download = "kworktech.zip"
      //       link.click()
      //       URL.revokeObjectURL(link.href)
      //     this.download_loading_flag = 1;

      //     })
      //     .catch(e => {
      //     this.download_loading_flag = 1;

      //         this.toast.error("Error occured while adding",{
      //             position:'top-right'
      //         })  
      //           this.errors.push(e)
      //     })

      // },

      // sel_dwn_prod(e,pos){
      //   let status = e.target.checked;

      //   if(this.selected_download[pos].d_2d != this.status_hide) 
      //     this.selected_download[pos].d_2d = status;

      //   if(this.selected_download[pos].d_3d != this.status_hide) 
      //     this.selected_download[pos].d_3d = status;

      //     this.selected_download[pos].d_pdf = status ;
      // },

      // setCollection(sel_name){
      //   this.select_collection = sel_name;
      // },

      // setProductList(){
      //      console.log("this is setProductList outside .... ",this);
      // },
      
      // set_loading_flag(flag){
      //      console.log("this is set_loading_flag outside .... ",flag);
      //      this.loading_flag = flag;
      // },

      // about(){
      //      this.$router.push({path:'/about'})
      // }
  },
  
  created() {
    this.loading_flag = 0;
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
    //   })
      // this.goto();
      // window.onscroll = function() {this.scrollFunction()}
   
  }
}

</script>
<style  scoped>

  @import '../../style.css';

  /* template{
    padding:2%;
  } */
 
  .watchlistcount{
    color: #007bff;
  }

  .watchlist-exist{
    color:#000000
  }
  .watchlist-none{
    color: #858585
  }
  a, a:hover{
    color:#000000
  }
  .logo{
    width:120%;
    margin-left:-10%;
    min-height:60%;
    margin-top:5%;
  }

/* make design for watchlist for web adn mobile view */
.top-menu{
  display: flex;
}
  .watchlist-block{
    margin-left: auto;
  }

.email{
    font-size: 12px;
    font-family: Barlow, 'san-serif';
    margin-top: -6%;
}

.top-menu-borders{
  margin-left:0px !important;
}

@media(max-width:600px){
    .top-menu-borders{
        margin-left: -16px !important;
        margin-right: -17px !important;
    }
  }



.sticky-top{
  top:-2px;
}
 .nav-bar{
   margin-left: 11px;
   display: flow-root !important;
 }
 .nav-bar-items{
   margin-right: 23px;
 }

 @media(max-width:600px){
     .nav-bar{
        margin-left: 0px;
      }
      .watchlist-block{
        margin-right: 20px;
      }
  }

  
  @media(max-width: 767px){
    .aboutus-block{
      margin-left: auto;
    }
  }
 

  #myBtn {
    /* display: none; */
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #858585;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
    -moz-transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    text-decoration:none;
  }
  #myBtn:hover {
    background-color: #858585;
  }
  #footer h5{
	padding-left: 10px;
    border-left: 3px solid #333;
    padding-bottom: 6px;
    margin-bottom: 20px;
    color:#333;
}
  /* .home {
   background: #0073c5 !important;
 }
 .product-title, .project-title, .product-description{
   color:#ffffff !important;
 } */

/* latest  */
.c-title {
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

.c-item:hover .c-img {
  opacity: 0.5;
  
}



/* .div:hover .c-title {
  visibility: visible;
  opacity: 1;
} */

</style>