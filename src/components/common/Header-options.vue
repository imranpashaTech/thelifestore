<template>
        <div class="row">
            <div class="col-md-9">
                <section style="display:flex">
                    <div class="btn-group  text-uppercase">
                        <a class="dropdown-toggle btn-block" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">Admin<span class="caret"></span></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <button class="dropdown-item text-uppercase" type="button" v-if="in_data.createProduct == 'true'">
                                 <router-link to="/admin/productlist" >Product</router-link>
                            </button>
                            <button class="dropdown-item text-uppercase" type="button" v-if="in_data.createCategory == 'true'"> <router-link to="/admin/add-category" >Category</router-link></button>
                            <button class="dropdown-item text-uppercase" type="button" v-if="in_data.createSubcategory == 'true'"> <router-link to="/admin/add-subcategory">Sub Category</router-link></button>
                            <button class="dropdown-item text-uppercase" type="button" v-if="in_data.createBrand == 'true'"> <router-link to="/admin/add-brands"> Brands</router-link></button>
                            <button class="dropdown-item text-uppercase" type="button" @click="logout()"> Logout</button>
                        </ul>
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
    
    Vue.use(VueToast)   


    export default Vue.extend ({ 

    props :{
        in_data: Object
    },
         data() {
            return {
                isLoginUser:String
            }
        },
        methods: {
            isLogin(){
                this.isLoginUser =  localStorage.getItem('isLoginUser');
                console.log('login user fjdkfjdafjlj',this.isLoginUser)
            },
            logout(){
                    this.clear_localStorage();
                    console.log("islogout  islogout is logut")
                    this.$router.push({path:'/'})
            },
             clear_localStorage(){
                console.log("islogin user logout calling")
                // localStorage.removeItem('token');
                localStorage.removeItem('isLoginUser');
                // localStorage.removeItem('username');
                console.log("localstoreg logout ",localStorage.getItem('isLoginUser'))
            }
        },
         created() {
             this.isLogin()
        
        }   
    })
</script>

<style  scoped>
  @import '../../style.css';


   .header-bg-image{
       height: 400px !important;
   }

   .dropdown-menu{
       font-size: 14px;
   }

   .table td, .table th {
        padding: .75rem;
        vertical-align: top;
        border: 1px solid #e5e5e5;
   }

   .closebtn {
        position: absolute;
        top: 0;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer;
    }
    .status-title {
        text-transform: uppercase;
    }
   
   a:hover{
    /* color:#858585; */
    text-decoration:none;
        color:#000000
    }
    a {
        color: #000000;
    }
    .logout{
        color:#007bff
    }
    /* .dropdown-item{
        text-transform: uppercase;
    } */
</style>