<template>
     <!-- Footer -->
          <footer id="footer">
            <div class="container p-5">
              <div class="row text-center text-xs-center text-sm-left text-md-left">
                <div class="col-xs-12 col-sm-4 col-md-4">
                  <h5>Quick links</h5>
                  <ul class="list-unstyled quick-links">
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Home</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>About</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>FAQ</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Get Started</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Videos</a></li>
                  </ul>
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4">
                  <h5>Quick links</h5>
                  <ul class="list-unstyled quick-links">
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Home</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>About</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>FAQ</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Get Started</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Videos</a></li>
                  </ul>
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4">
                  <h5>Quick links</h5>
                  <ul class="list-unstyled quick-links">
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Home</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>About</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>FAQ</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i>Get Started</a></li>
                    <li><a href="https://wwwe.sunlimetech.com" title="Design and developed by"><i class="fa fa-angle-double-right"></i>Imprint</a></li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                  <div class="col-6 col-md-4 m-auto text-center d-flex">
                       <a href="https://www.facebook.com/Life-100910538491130/?modal=admin_todo_tour
" target="_blank"><img src="@/assets/social/facebook.png" alt="life" class="w-25"></a> 
                       <a href="https://www.instagram.com/lifethestore/"  target="_blank"><img src="@/assets/social/instagram.png" alt="life" class="w-25"></a> 
                       <a href="#"  target="_blank"><img src="@/assets/social/medium.png" alt="life" class="w-25"></a> 
                       <a href="https://in.pinterest.com/lifethestore/"  target="_blank"><img src="@/assets/social/pinterest.png" alt="life" class="w-25"></a> 
                  </div>
                </div>
                <hr>
              </div>	
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center">
                  <!-- <p><u><a href="https://www.nationaltransaction.com/">National Transaction Corporation</a></u> is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly owned subsidiary of U.S. Bancorp, Minneapolis, MN]</p> -->
                  <p class="h6">© 2020 <a class="text-green ml-2" href="www.lifethestore.com" target="_blank">www.lifethestore.com.</a></p>
                </div>
                <hr>
              </div>	
            </div>   
                  <button @click="topFunction()"  title="Go to top">
                    <a title="Back to top" id="myBtn" href="#"><img src="@/assets/back_to_top.png" alt="life" class="w-25"></a>
                </button>
          </footer>
          <!-- ./Footer -->
</template>
<script>

import Vue from 'vue'

import ProductService from '../../shared/services/product.service'
// import Homecard from '../../pages/site/Home'

    const productService = new ProductService();

    export default Vue.extend ({  

        data() {
            return {
                categoryList :{},
                subcategoriesList:{},
                isLoginUser:String,
                maincat:Boolean,
                isActive:0,
                isSubActive:0,
                isCreateProd:false,
                isProductList:false,
                isClearAll:false
            }
          
        },
        
        props :{
            filter:Object
        },
        computed:{
            filteritem(){
            return '#' + this.filter.name
            }
        },
        created() {
            console.log("aaaa");
            // this.isLogin();
            // this.activeItem=0;
            // this.getCategories();
            //  interval(1).subscribe((x =>{
            //      console(x)
            //      this.getCategories();
            // }));
        },
        
        methods:{
            getCategories() {
                productService.getCategoriesList()
                .then(response => {
                    this.categoryList = response.data.output.success[0].data
                    this.categoryList.forEach((element, index) => {
                        var tempObj = JSON.parse(this.categoryList[index].sub_category);
                        this.subcategoriesList[element['sub_category']]=[];
                            for(var i in tempObj){
                                var obj = {};
                                obj['subcategory_id'] = i;
                                obj['subcategory_name'] = tempObj[i];
                                this.subcategoriesList[element['sub_category']].push(obj);
                            }
                        this.categoryList[index]['sub_category']=this.subcategoriesList[element['sub_category']]
                    }); 
                })
                .catch(e => {
                this.errors.push(e)
                })
            },

            toggleMainCat(event){
                this.isActive = event
                if(event == 0)
                this.isProductList = true;    
                else
                this.isProductList = false; 
                if(event == -1)
                this.isCreateProd = true ;
                else
                this.isCreateProd = false;
                if (event == 'all')
                this.isClearAll = true
                else
                this.isClearAll =false
                this.isSubActive = 0
                console.log("islogin user",this.isLoginuser,event)
                // if(this.isLoginUser === "admin")
                // this.$router.push('/admin/productlist')
            },

            toggleSubCat(event,mainCat){
                this.isSubActive = event
                this.isActive = mainCat
                console.log("ids is ",this.isSubActive , this.isActive)
                // if(this.isLoginUser === 'admin')
                // this.$router.push('/admin/productlist')
                // this.isActive = null
            },
            getLogin(){
                // window.location.href="/admin/login"
                this.$router.push({path:'/admin/login'})
            },
            isLogin(){
                this.isLoginUser =  localStorage.getItem('isLoginUser');
                console.log('login user fjdkfjdafjlj',this.isLoginUser)
            },
            logout(){
                console.log("islogin user logout calling")
                this.clear_localStorage();
                // window.location.href = "/admin/login"
                // window.location.href="/"
                this.$router.push({path:'/'})
            },
            clear_localStorage(){
                console.log("islogin user logout calling")
                localStorage.removeItem('token');
                localStorage.removeItem('isLoginUser');
                // localStorage.removeItem('username');
                console.log("localstoreg logout ",localStorage.getItem('isLoginUser'))
            }
        }

   
})
</script>

<style scoped>
.list-group-item{
    border: none;
    line-height: 1.8;
} 
.dropdown-toggle::after {
    display: none !important;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
}
.subCategory-text{
    color: #858585 !important;
}
.dropdown-menu{
    border:0px !important;
    margin:-0.875rem 0 0 !important;
}

a{
    color:#858585
}
a:hover{
    text-decoration:none
}


.Active{
    color:red;
}
.gray{
    color:#858585;
}
.black{
    color:#000000;
}
.blue{
    color:#007bff;
}
/* .sticky-sidemenu{
    padding-top:6% !important;
    height: 550px; 
    overflow-y:scroll ;
} */
.home-navbar {
    padding-top:6% !important;
    height: 630px; 
    height: 93%;
    height: 93vh;
    overflow-y:scroll ;
}
.admin-navbar{
    /* padding-top:6% !important; */
    /* height: 550px; 
    overflow-y:scroll ; */
    height: 93vh;
    overflow-x: hidden;
    /* position: fixed; */
    /* width:19%; */
}
.sticky-sidemenu::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Chrome/Safari/Webkit */
}

.sticky-sidemenu {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */
}
</style>