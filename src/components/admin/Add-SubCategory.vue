<template>
    <div class="product-container pt-3 mx-auto">
            <div class="col-md col pt-4 container-body" v-if="isCreate">
                <section>
                    <div class="pt-2">
                        <div class="h4 pb-2 text-uppercase" >
                            Add Sub Category
                        </div> 
                        <div class="subcategory-container border p-5 pt-2 pl-3">
                            <div class="row form-group-items ">
                                <div class="col-md col ">
                                    <label class="text-capitalize"> category</label> 
                                </div>
                                <div class="col-md col ">
                                    <select class="form-group border-bottom default-input col-md col" 
                                        v-model="AddSubcategory.main_category_id" @change= "getvalidation($event,'category')">
                                        <option :value="undefined" selected disabled>SELECT</option>
                                        <option v-for="(item,index) in categoryList" :value="item.main_category_id" :key="index" >{{ item.main_category_name.toUpperCase() }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col text-capitalize">
                                        <label> New subcategory </label>
                                    </div>
                                    <div class="col">
                                        <input class="form-group border-bottom default-input col-md col" v-model="AddSubcategory.sub_category_name" 
                                        placeholder="Enter the name" 
                                        @change = "getvalidation($event,'subcategory')">
                                        <div class="text-danger" v-if="!validation_status.sub_categroy_status">enter valid subcategory name</div>
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
                            <button   v-if='isComplete' class="btn btn-primary" data-toggle="modal" data-target="#isAddSubCategory">Add</button>
                            <button   v-if='!isComplete' class="btn btn-disabled">Add</button>
                        </div>
                </div>
                <div class="modal fade" id="isAddSubCategory" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Add new Sub category</h4>
                            </div>
                            <div class="modal-body">
                                <p class="body-text"> Do you confirm to add the sub category?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default border"  data-dismiss="modal">No</button>
                                <button type="button" class="btn btn-primary" @click="createSubCategory();isCreate= false" data-dismiss="modal">YES</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md col container-body"  v-if="!isCreate">
                <section>                    
                    <div class="emplate-body tab-bg pt-3">
                        <div class="row">
                            <div class=" h4 col-7 col-md-7 pt-3 pb-4 text-uppercase" >
                                Sub Categories
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
                                <th>Sub Category</th>
                                <th>Edit</th>
                                <th>Status</th>
                                </tr>
                            </tbody>

                            <tbody >
                                <tr v-for="(item,index) in subcategoriesList" :key="index" >
                                    <td>{{index+1}}</td>
                                    <td>{{item.main_category_name}}</td>
                                    <td>{{item.sub_category_name}}</td>
                                     <td>
                                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#isUpdateSubCategory"
                                            @click="sel_sc(item.sub_category_id,item.sub_category_name)">
                                            <span class="glyphicon glyphicon-plus" >
                                                <fa-icon :icon="['fas','pencil-alt']"/> 
                                            </span>
                                        </button>
                                    </td>
                                    <td>

                                        <toggle-button v-model="item.status" :value="item.status" class="pt-1"
                                        :color ="{checked: '#007bff', unchecked: '#858585'}"
                                        @change="updateSubCategoryActive(item.sub_category_id,item.status)"/>

                                    </td>

                                </tr>
                            </tbody>
                            <!-- <tbody v-for="(category,index) in categoryList" :key="index">
                                <tr v-for="(subitem,jndex) in category.sub_category" :key="index+''+jndex" >
                                    <td>{{(++pntr)%100}} </td>
                                    <td>{{category.main_category_name}}</td>
                                    <td>{{subitem.sub_category_name}}</td>
                                    <td>
                                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#isUpdateSubCategory"
                                            @click="sel_sc(subitem.sub_category_id,subitem.sub_category_name)">
                                            <span class="glyphicon glyphicon-plus" >
                                                <fa-icon :icon="['fas','pencil-alt']"/> 
                                            </span>
                                        </button>
                                    </td>
                                    <td>

                                        <toggle-button v-model="subitem.status" :value="subitem.status" class="pt-1"
                                        :color ="{checked: '#007bff', unchecked: '#858585'}"
                                        @change="updateSubCategoryActive(subitem.sub_category_id,subitem.status,index,jndex)"/>

                                    </td>
                                </tr>
                            </tbody> -->
                            </table>
                        </div>
                    </div>               
               </section>
            </div> 
        <!-- </div> -->

                <!-- info: modal for Edit Sub Category  name -->
                <div class="modal fade" id="isUpdateSubCategory" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit Sub Category</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col">
                                    <input type="text" class="form-group border-bottom default-input col-md col" v-model="selected_sc_name" 
                                    @change = "getvalid($event)">
                                    <div class="text-danger" v-if="!validation_status.sub_categroy_status">enter valid sub category name</div>
                                </div>                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default border"  data-dismiss="modal">No</button>
                                <button v-if="isupdateValid" type="button" class="btn btn-primary" @click="updateSubCategoryName()" data-dismiss="modal">YES</button>
                                <button v-if="!isupdateValid" type="button" class="btn btn-disabled" data-dismiss="modal">YES</button>
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

    // const sidenav = new sideNav();

    export default Vue.extend ({ 
        
    components : {
    
    },
         data() {
            return {
                toast:Vue.$toast,
                productList:{},
                categoryList:{},
                AddSubcategory:{},
                subcategoriesList:[],
                subcategorylength:[],
                isCreate:false,
                active_status:true,
                totalCount:0,
                sc_id:0,
                mc_id:0,
                pntr:0,
                validation_status:{
                    category_status:true,
                    sub_categroy_status:true,
                },
                loop_i:0,
                loop_ele:{},
                selected_sc_id:0,
                selected_sc_name:''
                // headerOptions: {
                //     createProduct:'true',
                //     createCategory:'true',
                //     createSubcategory:'false',
                //     createBrand:'true'
                // }
            }
        },
        computed: {
            isComplete() {
                if(this.validation_status.category_status && this.validation_status.sub_categroy_status)
                     return this.AddSubcategory.main_category_id && this.AddSubcategory.sub_category_name
                else return false
            },
             isupdateValid(){
                if(this.validation_status.sub_categroy_status)
                 return this.selected_sc_name;
                else return false
            }

        },

        methods: {
            getvalidation(event,item){
                if(item == 'category')
                this.validation_status.category_status = true
                if(item == 'subcategory'){
                    let value = event.target.value
                    // var re = new RegExp("^[a-zA-Z]+$");
                var re = new RegExp("^[ A-Za-z0-9_@./#&+-]*$");
                    if (re.test(value)) {
                        this.validation_status.sub_categroy_status=true
                    } else {
                        this.validation_status.sub_categroy_status=false
                    }
                }
                
            },
            incr(val){return this.pntr = val+1;},
            getvalid(event){
                let value = event.target.value
                var re = new RegExp("^[ A-Za-z0-9_@./#&+-]*$");
                    if (re.test(value)) {
                        this.validation_status.sub_categroy_status=true
                    } else {
                        this.validation_status.sub_categroy_status=false
                    }
            },
            getCategory() {
                console.log("category category get category statrts status")
                productService.getAdminCategoryList()
                .then(response => {
                    
                    this.categoryList = response.data.output.success[0].data;
                    // this.categoryList = JSON.parse(this.categoryList);
                    this.categoryList.forEach((element,index)=>{

                    
                        this.categoryList[index].sub_category = JSON.parse(element.sub_category);
                        this.categoryList[index].sub_category.forEach((element,i)=>{

                            let temp_obj = {
                                "main_category_name":this.categoryList[index].main_category_name,
                                "sub_category_name":element.sub_category_name,
                                "sub_category_id":element.sub_category_id,
                                "status":parseInt(element.status)
                            }

                            this.subcategoriesList.push(temp_obj);


                            this.categoryList[index].sub_category[i]['status']=(Number(this.categoryList[index].sub_category[i].status) ==1 ?true:false)
                        })
                    }); 



                })
                .catch(e => {
                this.errors.push(e)
                })
            },

            createSubCategory(){
                let _subcategoryForm = new FormData()
                    Object.keys(this.AddSubcategory).forEach((key) => {
                        _subcategoryForm.append(key, this.AddSubcategory[key])
                    })
                addCategoriesService.createSubCategory(_subcategoryForm)
                .then(response => {
                   console.log("response is reponse is",response);
                    this.toast.success("The Subcategory is added Successfully " ,{
                            position:'top-right',
                            duration:3000
                    })
                    this.clearForm()
                //    this.AddSubcategory = {}
                //    this.getCategory();
                //    this.isCreate= false;
                //    this.$router.go()
                })
                .catch(e => {
                    this.toast.error("Error occured while adding",{
                        position:'top-right'
                   })
                     this.errors.push(e)
                })

            },
            clearForm(){
                this.AddSubcategory={}
                // this.getCategory();
            },  
            updateSubCategoryActive(sc_id,activeFlag){
                // init
                // newly added
                let obj = {};
                obj['sub_category_id'] = sc_id;
                obj['status'] = (activeFlag)? 1 : 0;

                let activeStatusText = (activeFlag)? 'Active' : 'Inactive';

                productService.activeSubCatagory(obj)
                .then(response => {

                    this.productList = response.data.output.success[0].data;
                    this.getCategory();
                    this.toast.success("The Subcategory is now " + activeStatusText,{
                            position:'top-right'
                    })
                    })
                .catch(e => {
                    this.toast.error("Sub Catagory or Status is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },
            updateSubCategoryName(){
                // init
                let obj = {};

                obj['sub_category_id'] = this.selected_sc_id;
                obj['sub_category_name'] = this.selected_sc_name;

                console.log(obj);

                
                productService.updateSubCategoryName(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getCategory();
                   this.toast.success("The Subcategory name is updated " ,{
                        position:'top-right'
                    })
                })
                .catch(e => {
                    this.toast.error("Brand Subcategory is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },
            sel_sc(sub_category_id,sub_category_nam){
                this.selected_sc_id = sub_category_id;
                this.selected_sc_name = sub_category_nam;
            }
        },
         created() {
             this.getCategory();
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
    select{
            background: white;
    border: none;
    border-bottom: 1px solid #858585;
    }
    input {
        line-height: 30px;
        border:none;
    }
    .subcategory-container{
        line-height: 45px;
        font-family: 'Barlow', sans-serif;
    }
    .logo{
        width:50%;
        margin-bottom: -20%;
    }
    input{
        line-height: 30px;
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
    .btn-disabled{
        color:#fff;
        background:lightgray;
        border-color:lightgray;
        cursor:not-allowed;
    }
    .btn-disabled:hover{
        color:#fff;
        background:lightgray;
        border-color:lightgray;
        cursor:not-allowed;
    }    
    .container-body{
        padding-right: 0px;
    }
   .text-uppercase{
        font-family: 'Barlow', sans-serif;
   }
   .add-image{
        width:22px;
        background:transparent
    }
    table tbody+tbody {
        border-top: 0px solid #dee2e6;
    }
</style>