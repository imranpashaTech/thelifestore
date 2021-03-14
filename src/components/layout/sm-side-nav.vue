<template>

    <div class="sm-side-nav">
        <div class="row" style="margin-left: -23px;">
            <span style="font-size:30px;cursor:pointer" @click="openNav()">&#9776;</span>
        </div>
        <div id="mySidenav" class="row sidenav">
                <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
                <div class="sub-heading  pl-4" :id="filter.name">
                    <div class="col pb-2">
                        <!-- <img class="w-75 bg-white" src="@/assets/KWorkTech_new_logo.jpg"> -->
                    </div> 
                    <div class="small pb-5">
                         <div class="email"><a class="email" href="mailto:george.browny@kaizenworktech.com">george.browny@kaizenworktech.com</a></div>
                         <div class="email"><a class="email" href="mailto:raj.menon@kaizenworktech.com">raj.menon@kaizenworktech.com</a></div>
                    </div>
                    <div class="text-uppercase" v-on:click="$emit('callProductList', 0,0)">
                        <a href="javascript:void(0)" v-bind:class="[isClearAll  ? 'blue' : 'black']" @click="toggleMainCat('all')"> ALL</a>
                    </div>
                     <ul class="list-group" v-for="item in categoryList" :key="item.main_category_id">
                        <li class="list-group-item text-uppercase  p-0 py-0 border-top" > 
                            <span class="text-uppercase" href="javascript:0oid(0)" 
                                v-on:click="$emit('callProductList', item.main_category_id, 0)" >
                                <a v-bind:href="filteritem" v-bind:class="[item.main_category_id == isActive  ? 'blue' : 'black']" @click="toggleMainCat(item.main_category_id)">{{item.main_category_name}}</a>
                            </span>   
                            <ul class="list-group" > 
                                <li class="list-group-item subCategory-text text-uppercase py-0 border-top"
                                    v-for="subitem in item.sub_category" :key="subitem.subcategory_id" 
                                    v-on:click="$emit('callProductList', item.main_category_id, subitem.subcategory_id)">
                                <a v-bind:href="filteritem" v-bind:class="[(subitem.subcategory_id == isSubActive && item.main_category_id == isActive) ? 'blue' : 'gray']" @click="toggleSubCat(subitem.subcategory_id,item.main_category_id)"> {{subitem.subcategory_name}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
        </div>
    </div>

</template>
<script>

import Vue from 'vue'
import ProductService from '../../shared/services/product.service'
   
    const productService = new ProductService();

    export default Vue.extend ({  
        data() {
            return {
                categoryList :{},
                subcategoriesList:{},
                isLoginUser:String,
                maincat:Boolean,
                isActive:Number,
                isSubActive:Number,
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
            this.isLogin();
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
        methods: {
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
                else this.isClearAll =false
                this.isSubActive = 0
                this.closeNav()
                // this.$router.push('/admin/productlist')
            },
            toggleSubCat(event,mainCat){
                this.isSubActive = event
                this.isActive = mainCat
                // this.$router.push('/admin/productlist')
                // this.isActive = null
                this.closeNav()
            },
            openNav() {
                document.getElementById("mySidenav").style.width = "75%";
            },
            closeNav() {
                document.getElementById("mySidenav").style.width = "0";
            },
            getLogin(){
                this.$router.push({path:'/admin/login'})
            },
            isLogin(){
                this.isLoginUser =  localStorage.getItem('isLoginUser');
                console.log('login user fjdkfjdafjlj',this.isLoginUser)
            },
            logout(){
                this.clear_localStorage();
                this.$router.push({path:'/'})
            },
            clear_localStorage(){
                localStorage.removeItem('token');
                localStorage.removeItem('isLoginUser');
                localStorage.removeItem('username');
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

.sidenav {
  height: 100%;
  width: 0px;
  /* margin-left: 2%; */
  margin-left: auto;
  position: fixed;
  background:#fff;
  /* border-left: 2px solid black; */
  z-index: 10;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: none;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: auto;
}
.closebtn{
    position: relative;
}

.logo{
    margin-top:-25% !important;
  }

a{
    color:#858585;
    font-family: 'Barlow', san-serif;
}
.subCategory-text{
    color: #858585 !important;
    font-weight:400 !important;
}
a:hover{
    text-decoration:none;
    color:#858585;
    font-family: 'Barlow', san-serif;
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
.email:hover {
    /* color: #0056b3 !important; */
    color : #000000 !important;
    text-decoration: underline;
}
.email:active {
    text-decoration: none;
}
.email{
    color:#000000 !important;
}
</style>