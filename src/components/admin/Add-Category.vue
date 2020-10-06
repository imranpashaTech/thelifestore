<template>
    <div class="product-container pt-3  mx-auto">
            <div class="col-md col pt-4 container-body "  v-if="isCreate">
                <section>
                    <div class="pt-2">
                        <div class="h4 pb-2 text-uppercase" >
                            Add Category
                        </div> 
                        <div class="category-container border p-5 pt-5 pl-3">
                            <div class="row ">
                                <div class="col col-md col">
                                    <label > New Category </label>
                                </div>
                               <div class="col">
                                    <input class="form-group border-bottom default-input col-md col" v-model="addCategories.main_category_name" 
                                        placeholder="Enter the name" 
                                        @change = "getvalid($event)">
                                    <div class="text-danger" v-if="!validation_status">enter valid category name</div>
                               </div>
                            </div>
                        </div>
                    </div>
                </section>
                 <div class="p-4 text-center row">
                        <div class="col-md col text-right">
                            <button type="button" class="btn btn-default text-right back-button" @click="isCreate=false">
                                <!-- <fa-icon :icon="['fas','long-arrow-alt-left']"/> -->
                                <img class="add-image" src="@/assets/Back.png">
                            </button>
                        </div>
                        <div class="col-md col text-left">
                            <button v-if='isComplete' data-toggle="modal" class="btn btn-primary"  data-target="#isAddCategory">Add </button>
                            <button v-if='!isComplete' class="btn btn-disabled border">Add </button>
                        </div>
                </div>
                <div class="modal fade" id="isAddCategory" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add new Category</h4>
                            </div>
                            <div class="modal-body">
                                <p class="body-text">Do you confirm to add the Category?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default border"  data-dismiss="modal">No</button>
                                <button type="button" class="btn btn-primary" @click="createCategory()" data-dismiss="modal">YES</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 


            <div class="col-md col container-body"  v-if="!isCreate">
                <section>                    
                    <div class="template-body tab-bg pt-3">
                        <div class="row">
                            <div class=" h4 col-7 col-md-7 pt-3 pb-4 text-uppercase" >
                                Categories
                            </div>
                            <div class=" col-5 col-md-5 pt-2 pb-2 text-uppercase text-right " >
                                <button type="button" class="btn btn-default text-left text-uppercase font-weight-bold add-button" @click="isCreate=true">
                                    <fa-icon :icon="['fas','plus']"/> Add new 
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table  class="table border pt-5 text-uppercase">
                            <tbody  >
                                <tr>
                                <th>S NO</th>
                                <th>Category</th>
                                <th>Edit</th>
                                <th>Status</th>
                                </tr>
                            </tbody>
                            <tbody >
                                <tr  v-for="(category,index) in categoryList" :key="index">
                                <td> <span  class="">{{index+1}} </span></td>
                                <td><span  class="">{{category.main_category_name}}</span></td>
                                <td>
                                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#isUpdateMainCategory"
                                        @click="selected_mc_id=category.main_category_id,selected_mc_name=category.main_category_name">
                                        <span class="glyphicon glyphicon-plus">
                                            <fa-icon :icon="['fas','pencil-alt']"/> 
                                        </span>
                                    </button>
                                </td>
                                <td>
                                        <toggle-button v-model="category.status" :value="category.status" class=" pt-1"
                                        :color ="{checked: '#007bff', unchecked: '#858585'}"
                                        @change="updateMainCategoryActive(category.main_category_id,category.status)"/>
                                </td>
                                </tr>
                            
                                </tbody>
                            </table>
                        </div>
                    </div>               
               </section>
            </div> 
            
        <!-- </div>-->

                 <!-- info: modal for Edit Main Category  name -->
                <div class="modal fade" id="isUpdateMainCategory" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit Main Category</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col">
                                    <input class="form-group border-bottom default-input col-md col" v-model="selected_mc_name" 
                                    @change = "getvalid($event)">
                                    <div class="text-danger" v-if="!validation_status">enter valid Category name</div>
                                </div>                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default border"  data-dismiss="modal">No</button>
                                <button v-if='isupdateValid'  type="button" class="btn btn-primary" @click="updateMainCategoryName()" data-dismiss="modal">YES</button>
                                <button v-if='!isupdateValid' type="button" class="btn btn-disabled border">YES </button>
                            </div>
                        </div>
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
    
    import AddCategoriesService from '../../shared/services/addCategory.service'
    import ProductService from '../../shared/services/product.service'
    
    Vue.use(VueToast)
    const addCategoriesService = new AddCategoriesService();
    const productService = new ProductService();

    export default Vue.extend ({ 
        
    components : {
        
    },
         data() {
            return {
                toast:Vue.$toast,
                productList:{},
                addCategories:{},
                categoryList :{},
                subcategoriesList:{},
                main_category_name:'',
                sc_id:0,
                mc_id:0,
                isCreate:false,
                active_status:true,
                validation_status:true,
                selected_mc_id:0,
                selected_mc_name:''
            }
        },
      
        computed: {
            isComplete() {
                if(this.validation_status)
                    return this.addCategories.main_category_name;
                else return false
            }, 
            isupdateValid(){
                if(this.validation_status)
                 return this.selected_mc_name;
                else return false
            }
        },

        methods: {                  
            getvalid(event){
                let value = event.target.value
                var re = new RegExp("^[ A-Za-z_@./#&+-]*$");
                if (re.test(value)) {
                    this.validation_status=true
                } else {
                    this.validation_status=false
                }
            },
            createCategory(){
                let _categoryForm = new FormData()
                    Object.keys(this.addCategories).forEach((key) => {
                        _categoryForm.append(key, this.addCategories[key])
                    })
                addCategoriesService.createCategory(_categoryForm)
                .then(response => {
                   console.log("response is reponse is",response);
                   this.toast.success("New category is added",{
                        position:'top-right'
                    })
                    this.addCategories={}
                    this.isCreate = false;
                    this.getAdminCategoryList()
                })
                .catch(e => {
                    this.toast.error("Error occured while adding",{
                        position:'top-right'
                    })
                    this.errors.push(e)
                })
            },
            updateMainCategoryActive(mc_id,activeFlag){
                // init
                let obj = {};

                obj['main_category_id'] = mc_id;
                obj['status'] = (activeFlag)? 1 : 0;

                let activeStatusText = (activeFlag)? 'Active' : 'Inactive';

                console.log(obj);

                
                productService.activeMainCatagory(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getAdminCategoryList();
                   this.toast.success("The Main Catagory is now " + activeStatusText,{
                        position:'top-right'
                    })
                })
                .catch(e => {
                    this.toast.error("Main Catagory or Status is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },
            updateMainCategoryName(){
                // init
                let obj = {};

                obj['main_category_id'] = this.selected_mc_id;
                obj['main_category_name'] = this.selected_mc_name;

                console.log(obj);

                
                productService.updateMainCategoryName(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getAdminCategoryList(0,0);
                   this.toast.success("The Category name is updated " ,{
                        position:'top-right'
                    })
                    this.isCreate = false;
                })
                .catch(e => {
                    this.toast.error("Category value is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },
            getAdminCategoryList() {
                productService.getAdminCategoryList()
                .then(response => {
                    this.categoryList = response.data.output.success[0].data
                    console.log("categories categories categories",this.categoryList)
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
            }
        },
       
         created() {
                productService.getAdminCategoryList()
                .then(response => {
                    this.categoryList = response.data.output.success[0].data
                    console.log("categories categories categories",this.categoryList)
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
         }
    })
</script>

<style  scoped>
  @import '../../style.css';


   .header-bg-image{
       height: 400px !important;
   }

   .table td, .table th {
        padding: .75rem;
        vertical-align: top;
        border: 1px solid #e5e5e5;
   }
    .logo{
        width:50%;
        margin-bottom: -20%;
    }
    .category-container{
        /* line-height: 50px; */
        font-family: 'Barlow', sans-serif;
    }
    input{
        line-height: 30px;
        border:0px;
    }
    .header-options{
        margin-left: auto;
    }   
    .container-header{
      margin-left: -15px;
    }
    th{
        text-align:center;
        font-weight: bold;
        font-family: 'Barlow', sans-serif;
        font-size: 110%;
    }
    td{
        text-align:center;
        font-family: 'Barlow', sans-serif;
    }
    .add-button{
        float: right;
        padding-right:1%;
    }
   
    .container-body{
        padding-right: 0px;
        font-family: 'Barlow', sans-serif;
    }
    .btn-disabled{
        color:#fff;
        background:lightgray;
        border-color:lightgray;
        cursor:not-allowed;
        text-transform: uppercase;
    }
    .btn-disabled:hover{
        color:#fff;
        background:lightgray;
        border-color:lightgray;
        text-transform: uppercase;
        cursor:not-allowed;
    }
    .add-image{
        width:22px;
        background:transparent
    }
    table tbody+tbody {
        border-top: 0px solid #dee2e6;
    }
</style>