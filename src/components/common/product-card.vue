<template>
    <div class="product-card p-1">
        <div class="cursor-pointer" v-on:click="$emit('storeSelProduct', in_data, pos)">
            <!-- <img v-bind:src="in_data.product_images_url" :alt="in_data.product_name" class="mx-auto d-block w-100"> -->
            <img src="@/assets/prod.jpg" :alt="in_data.product_name" class="mx-auto d-block w-100">
        </div>   
        <section class="">
            <div class="row  m-2">
                <div class="col col-md-12 p-desc" >
                    <div class="row product-cards-items ">
                        <div class="col-9 col-md-9 p-0">
                            <span class="product-title"> {{in_data.product_name}}</span>
                                /
                            <span class="brand-title"> {{in_data.brand_desc}}</span>
                        </div>
                        <div class="col-3 col-md-3 p-1  product-status text-danger text-right" >
                            {{in_data.product_status=='new' ? 'new' : ''}}
                        </div> 
                    </div>
                    <div class="row product-cards-items">
                        <div class="col-9 col-md-9 p-0 product-description" >
                            {{in_data.product_desc.substring(0,100)}} <span v-if="in_data.product_desc.length >= 100">...</span>
                            
                        </div>
                        <div class="col-3 col-md-3 p-1" > 
                                <a  class="addwatchlist text-right" v-on:click="$emit('addProductList', in_data, pos)" v-if="!in_data.selected"> 
                                    <span class="text-right">
                                        <img class="add-image" src="@/assets/Plus.png">
                                    </span>
                                </a>
                                   
                            <a class="removewatchlist" v-on:click="$emit('removeProductList', in_data, pos)" v-if="in_data.selected"> 
                                    <span class="text-right">
                                        <img class="add-image" src="@/assets/Cross.png">
                                    </span>
                            </a>
                        </div>
                    </div>
                </div> 
            </div> 
        </section>
    </div>
</template>
<script>
import Vue from 'vue'
   export default Vue.extend ({
    data(){
        return{
        }
    },
    props: {
        in_data: Object,
        pos:Number
    },
    methods:{
        
    },

    created(){
        // console.log('is data for products',this.in_data)
    }
   
})
</script>

<style scoped>
    .product-cards-items{
        margin-left: -9px !important;
        margin-right: -12px !important;
        font-family: 'Barlow', sans-serif;
    }
    .product-title{
        /* font-size: small; */
        /* color: #000000; */
        font-size: small;
        color:#000000;
        font-weight: 400 !important;
        text-transform: uppercase;
    }
    .brand-title{
        font-size: small;
        font-weight: 400 !important;
        color: #858585;
        text-transform: uppercase;
    }
    .product-description {
        font-family: 'Barlow', sans-serif;
        text-transform: inherit;
        font-size: x-small;
        /* font-weight:400; */
        color:#858585;
    }
    .product-status{
        font-family: 'Barlow', sans-serif;
        text-transform: uppercase;
        font-size: x-small;
        color:red;
    }
    
    .product-details{
        padding-left: 0px;
        padding-right: 0px;
    }
    .add-button{
        border: 1px solid gray;
    }
    .btn{
        /* padding: 0.0rem .5rem; */
        padding: 0px 7px !important;
    }
    .add-image{
        width: 30%;
        background: white;
    }
    .addwatchlist{
        cursor: pointer;
    }
   .removewatchlist{
       cursor: pointer;
   }
   .owl-carousel .owl-item img{
          width: 30%;
        background: white;
        float:right
   }
    .product-title, .project-title, .brand-title, .product-description{
   color:#ffffff !important;
 }

 /* latest  */
.p-desc {
  position: absolute;
  /* top: 0; */
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  visibility: hidden;
  background: #3a3a3aaa;
  opacity: 1;
  width:100%;
  height: 0;

  /* transition effect. not necessary */
  transition: .2s ease;
}

.product-card:hover .p-desc{
    visibility: visible;
    height: 20%;
}


</style>