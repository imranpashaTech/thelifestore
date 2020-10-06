<template>
    <div class="product-container pt-3 mx-auto">
            <div class="col-md col container-body">
                <section>                    
                    <div class="template-body tab-bg pt-3">
                        <div class="row">
                            <div class=" h4 col-7 col-md-7 pt-3 pb-4 text-uppercase" >
                                Products
                            </div>
                            <div class=" col-5 col-md-5 pt-2 pb-2 text-uppercase" >
                                <button type="button" class="btn btn-default text-right text-uppercase font-weight-bold pr-1" @click="$router.push('/admin/product/1')">
                                    <fa-icon :icon="['fas','plus']"/> Add new 
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table  class="table border pt-5 text-uppercase">
                                <tbody  >
                                    <tr>
                                    <th>S NO</th>
                                    <th>Brand</th>
                                    <th>Product</th>
                                    <th>Edit</th>
                                    <th>Status</th>
                                    </tr>
                                </tbody>
                                <tbody >
                                    <tr  v-for="(product,index) in productList" :key="index">
                                    <td >{{index+1}} </td>
                                    <td>{{product.brand_desc}}</td>
                                    <td>{{product.product_name}}</td>
                                    <td>
                                        <button type="button" class="btn btn-default">
                                            <span class="glyphicon glyphicon-plus" @click="editProduct(product.product_id)">
                                                <fa-icon :icon="['fas','pencil-alt']"/> 
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                        <toggle-button v-model="product.active_status" :value="product.active_status" class=" pt-1"
                                        :color ="{checked: '#007bff', unchecked: '#858585'}"
                                        @change="updateProductStatus(product.product_id,product.active_status)"/>
                                    </td>
                                    </tr>
                                
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
               </section>
            </div> 
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueToast from 'vue-toast-notification';
    // Import one of available themes
    import 'vue-toast-notification/dist/theme-default.css';
    //import 'vue-toast-notification/dist/theme-sugar.css';
    import ProductService from '../../shared/services/product.service'

    Vue.use(VueToast)   
 

    const productService = new ProductService();


    export default Vue.extend ({ 
        
    components : {

    },
         data() {
            return {
                toast:Vue.$toast,
                productListdata:{},
                activeProductForm:{},
                sc_id:0,
                mc_id:0,
                activeStatusText:String,
                activeProductId:Number,
                activeProductStatus:String,
                headerOptions: {
                    createProduct:'false',
                    createCategory:'true',
                    createSubcategory:'true',
                    createBrand:'true'
                },
                productlistflag:false,
            }
        },
        props:{
            productList:Object
        },
        methods: {
            updateProductStatus(productId,activeFlag){
             
                 let obj = {};

                obj['product_id'] = productId;
                obj['active_status'] = (activeFlag)? 1 : 0;

                this.activeStatusText = (activeFlag)? 'Active' : 'Inactive';
              
                productService.activeProduct(obj)
                .then(response => {
                    console.log("response",response)
                   this.toast.success("The product is now " +this.activeStatusText,{
                        position:'top-right'
                    })
                })
                .catch(e => {
                    this.toast.error("Product Id or Status is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },

            editProduct(id){
                let prodid = id;
                this.$router.push({path:'/admin/product/edit/'+prodid})
            }
        },
         created() {
        }   
    })
</script>

<style  scoped>

@import '../../style.css';


.header-bg-image{
       height: 400px !important;
}

.container-body{
    padding-right:0px;
    font-family: 'Barlow', sans-serif;
}
table tbody+tbody {
        border-top: 0px solid #dee2e6;
}

</style>