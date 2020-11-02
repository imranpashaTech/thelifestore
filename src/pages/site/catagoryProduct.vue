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
                  <router-link to="/catagory/product/12">
                    <app-product-card :id="product.product_id" :pos="i" :in_data="product"   v-on:storeSelProduct = "storeSelProduct" v-on:addProductList = "addProductWatchList" v-on:removeProductList = "removeProductWatchList"></app-product-card>
                  </router-link>
                </div>
              </div>            
            </div>
          </section>    
    </div> 
   
</template>

<script>
// components
import ProductCard from '@/components/common/product-card'



export default {
  name: 'Home',
  components: {
    'app-product-card': ProductCard,
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
        productList:{}


      }
    },
  methods: {
    topFunction() {
                window.scroll({
                   top: document.body.scrollTop,
                    behavior: 'smooth'
                });
      },

      goto(){
                this.goto_last_product();
      },
       storeSelProduct(product,i){
        // :to="'product/'+in_data.product_id"
        this.set_store_sel_product(product,i);
        this.$router.push({path:'catagory/product/'+product.product_id})

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

            this.productList.list=[{
              brand_id:	1,
              brand_desc:	"Actiu",
              main_category_id:	3,
              sub_category_id:	41,
              product_id:	748,
              threed_file_url:	null,
              twod_file_url:	null,
              selected:	0,
              product_status:	"new",
              product_name:	"TALENT 500",
              product_desc:	"Talent is a mobile, foldable and height-adjustable desk system that doesn't need any electrical connection.",
              product_images_url:	"./images/products/TALENT 500_1.jpg"
            },{
              brand_id:	1,
              brand_desc:	"Actiu",
              main_category_id:	3,
              sub_category_id:	41,
              product_id:	748,
              threed_file_url:	null,
              twod_file_url:	null,
              selected:	0,
              product_status:	"new",
              product_name:	"TALENT 500",
              product_desc:	"Talent is a mobile, foldable and height-adjustable desk system that doesn't need any electrical connection.",
              product_images_url:	"./images/products/TALENT 500_1.jpg"
            },{
              brand_id:	1,
              brand_desc:	"Actiu",
              main_category_id:	3,
              sub_category_id:	41,
              product_id:	748,
              threed_file_url:	null,
              twod_file_url:	null,
              selected:	0,
              product_status:	"new",
              product_name:	"TALENT 500",
              product_desc:	"Talent is a mobile, foldable and height-adjustable desk system that doesn't need any electrical connection.",
              product_images_url:	"./images/products/TALENT 500_1.jpg"
            },{
              brand_id:	1,
              brand_desc:	"Actiu",
              main_category_id:	3,
              sub_category_id:	41,
              product_id:	748,
              threed_file_url:	null,
              twod_file_url:	null,
              selected:	0,
              product_status:	"new",
              product_name:	"TALENT 500",
              product_desc:	"Talent is a mobile, foldable and height-adjustable desk system that doesn't need any electrical connection.",
              product_images_url:	"./images/products/TALENT 500_1.jpg"
            },{
              brand_id:	1,
              brand_desc:	"Actiu",
              main_category_id:	3,
              sub_category_id:	41,
              product_id:	748,
              threed_file_url:	null,
              twod_file_url:	null,
              selected:	0,
              product_status:	"new",
              product_name:	"TALENT 500",
              product_desc:	"Talent is a mobile, foldable and height-adjustable desk system that doesn't need any electrical connection.",
              product_images_url:	"./images/products/TALENT 500_1.jpg"
            }]
  },

  mounted(){

   
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
  opacity: 1;

  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
}

</style>