<template>
    <div class="product-card sticky-sidemenu" v-bind:class="[filter.name == 'admin'  ? 'admin-navbar' : 'home-navbar']" >
        <div class="options" :id="filter.name">
            <div class="text-uppercase" v-on:click="$emit('callProductList', 0,0)"> 
                <a href="javascript:void(0)" v-bind:class="[isClearAll  ? 'blue' : 'black']" 
                @click="toggleMainCat('all')"> ALL</a>
            </div>
            <ul class="list-group" v-for="item in categoryList" :key="item.main_category_id">
                <li class="list-group-item text-uppercase  p-0 py-0 border-top" > 
                    <span class="text-uppercase" 
                        v-on:click="$emit('callProductList', item.main_category_id, 0)" >
                        <a v-bind:href="filteritem" v-bind:class="[item.main_category_id == isActive  ? 'blue' : 'black']" @click="toggleMainCat(item.main_category_id)">{{item.main_category_name}}</a>
                    </span>   
                    <ul class="list-group" > 
                        <li class="list-group-item subCategory-text text-uppercase py-0 border-top "
                            v-for="subitem in item.sub_category" :key="subitem.subcatgory_id"
                            v-on:click="$emit('callProductList', item.main_category_id, subitem.subcategory_id);toggleSubCat(subitem.subcategory_id,item.main_category_id)">
                            <a v-bind:href="filteritem"  v-bind:class="[(subitem.subcategory_id == isSubActive && item.main_category_id == isActive) ? 'blue' : 'gray']" > {{subitem.subcategory_name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        
    </div>
  
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
            this.isLogin();
            this.activeItem=0;
            this.getCategories();
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