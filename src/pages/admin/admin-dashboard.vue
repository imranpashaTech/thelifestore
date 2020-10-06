<template>
    <div class="product container p-3 mx-auto">
            <nav class="navbar sticky-top navbar-light bg-white row  font-weight-bold p-0 pb-2" style="display:flow-root">
                <div class="top-menu top-menu-borders border-bottom border-dark">
                <app-sm-side-nav class="d-block d-md-none pl-5" v-on:callProductList = "getProductList" :filter= "filter"></app-sm-side-nav>
                        <div class="offset-md-3 d-none d-md-block admin-topnav">
                            <!-- <img class="logo" src="@/assets/KWorkTech_new_logo.jpg"> -->
                        </div> 
                        <div class="offset-md-9 dropdown-items pb-4">
                                <div class="btn-group dropdown-nav text-uppercase">
                                    <a class="dropdown-toggle btn-block" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">Admin<span class="caret"></span></a>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li class="dropdown-item text-uppercase" type="button" v-on:click="component='product-list'">Product</li>
                                        <li class="dropdown-item text-uppercase" type="button" v-on:click="component='add-category'"> Category</li>
                                        <li class="dropdown-item text-uppercase" type="button" v-on:click="component='add-subcategory'">SubCategory</li>
                                        <li class="dropdown-item text-uppercase" type="button" v-on:click="component='add-brand'">Brands</li>
                                        <li class="dropdown-item text-uppercase" type="button" v-on:click="component='add-graph'">Graph</li>
                                        <li class="dropdown-item text-uppercase" type="button" @click="logout()"> Logout</li>
                                    </ul>
                                </div>
                        </div> 
                </div>
            </nav>
        
            <div class="row">
                <div class="col-md-3 admin-nav">
                    <app-side-nav class="d-none d-md-block pt-5" v-on:callProductList = "getProductList" :filter= "filter" :user="admin"></app-side-nav>
                </div>
                <div class="col-md-9 container-body">
                    <component v-bind:is="component" :productList="productList"></component>
                </div> 
            </div>  
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueToast from 'vue-toast-notification';
    // Import one of available themes
    import 'vue-toast-notification/dist/theme-default.css';
    //import 'vue-toast-notification/dist/theme-sugar.css';

    import sideNav from '../../components/layout/side-nav.vue'
    import smSideNav from '../../components/layout/sm-side-nav.vue';

    import Addbrand from '../../components/admin/Add-Brands.vue';
    import Productlist from '../../components/admin/Product-list.vue';
    import AddCategory from '../../components/admin/Add-Category.vue';
    import AddSubCategory from '../../components/admin/Add-SubCategory.vue';
    import Graph from '../../components/admin/graph.vue';

    import ProductService from '../../shared/services/product.service'


    const productService = new ProductService();

    Vue.use(VueToast)

    export default Vue.extend ({ 
    components : {
        'app-side-nav':sideNav,
        'app-sm-side-nav':smSideNav,
        'add-brand':Addbrand,
        'add-category':AddCategory,
        'add-subcategory':AddSubCategory,
        'add-graph':Graph,
        'product-list':Productlist
    },
         data() {
            return {
               component:'product-list',
               isLoginUser:String,
               productList:{},
               sc_id:0,
               mc_id:0,
               filter:{
                   name:'admin'
               },
            }
        },
        
        methods: {
            getProductList(mc_id,sc_id) {
                this.component = 'product-list';
                productService.getProductAdminList(mc_id,sc_id)
                .then(response => {
                    // console.log("hell ohello admin",response.data.output.success[0].data)
                this.productList = response.data.output.success[0].data.list;
                })
                .catch(e => {
                this.errors.push(e)
                })  
            },
            isLogin(){
                this.isLoginUser =  localStorage.getItem('isLoginUser');
            },
            logout(){
                    this.clear_localStorage();
                    this.$router.push({path:'/'})
            },
             clear_localStorage(){
                // localStorage.removeItem('token');
                localStorage.removeItem('isLoginUser');
                // localStorage.removeItem('username');
            }
        }, 
         created() {
            this.isLogin();
            productService.getProductAdminList(this.mc_id,this.sc_id)
            .then(response => {
            this.productList = response.data.output.success[0].data.list;
            })
            .catch(e => {
            this.errors.push(e)
            })  
        } 
    })
</script>

<style  scoped>
 @import '../../style.css';


.dropdown-menu{
   font-size: 14px;
}
    .dropdown-nav{
        /* float:right; */
        margin-bottom: -2%;
    }
   /* .table td, .table th {
        padding: .75rem;
        vertical-align: top;
        border: 1px solid #e5e5e5;
   } */

   /* .closebtn {
        position: absolute;
        top: 0;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer;
    } */
    /* .status-title {
        text-transform: uppercase;
    } */
    .admin-nav{
        padding-left: 0px;
    }
   
   a:hover{
        text-decoration:none;
        color:#000000
    }
    a {
        color: #000000;
    }
    .logout{
        color:#007bff
    }
    .logo{
        /* width:18% !important; */
        width: 14% !important;
    }
    .container-body{
        padding-right: 0px;
    }
    .top-menu{
        display: flex;
    }
    
    /* .top-menu-borders{
        margin-left:0px !important;
    } */
    @media(max-width:600px){
        .top-menu-borders{
            margin-left: -16px !important;
        }
    }
.dropdown-items{
  font-family: 'Barlow', sans-serif;
  margin-top: auto;
  margin-left: auto;
}
.watchlist-block{
   margin-left: auto;
}
  
.admin-topnav{
  margin-left: 0% !important;
}
.nav-bar{
  padding-left: 0px !important;
}
 
</style>