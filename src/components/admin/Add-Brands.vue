<template>
    <div class="brand-container pt-3 mx-auto">
                <div class="col-md col pt-4 container-body"  v-if="isCreate">
                    <section>
                        <div class="pt-2">
                            <div class="h4 pb-2 text-uppercase" >
                              Add brand
                            </div>
                            <div class="brand-container border p-5 pt-5 pl-3">
                                <div class="row">
                                    <div class="col">
                                        <label class="col-md col"> New brand </label>
                                    </div>
                                    <div class="col">
                                        <input class="form-group border-bottom default-input col-md col" v-model="addBrands.brand_name" 
                                        placeholder="Enter the name" 
                                        @change = "getvalid($event)">
                                        <div class="text-danger" v-if="!validation_status">enter valid brand name</div>
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
                                <!-- <button :disabled='!isComplete' data-toggle="modal" class="btn btn-primary" data-target="#isAddBrand">Add</button> -->
                                <button type="button" v-if="isComplete" data-toggle="modal" class="btn btn-primary" data-target="#isAddBrand">ADD</button>
                                <button type="button" v-if="!isComplete" class="btn btn-disabled">ADD </button> 
                            </div>
                    </div>
                    <div class="modal fade" id="isAddBrand" role="dialog">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Add new Brands</h4>
                                </div>
                                <div class="modal-body">
                                    <p class="body-text"> Do you confirm to add the Brand?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default border"  data-dismiss="modal">No</button>
                                    <button type="button" class="btn btn-primary" @click="createBrands()" data-dismiss="modal">YES</button>
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
                                    Brands
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
                                    <th>Brands</th>
                                    <th>edit</th>
                                    <th>status</th>
                                    </tr>
                                </tbody>
                                <tbody >
                                    <tr  v-for="(brand,index) in brandsList" :key="index">
                                    <td> <span  class="">{{index+1}} </span></td>
                                    <td><span  class="">{{brand.brand_desc}}</span></td>
                                    <td>
                                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#isUpdateBrand"
                                            @click="selected_brand_id=brand.brand_id,selected_brand_name=brand.brand_desc">
                                            <span class="glyphicon glyphicon-plus" >
                                                <fa-icon :icon="['fas','pencil-alt']"/> 
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                            <toggle-button v-model="brand.status" :value="brand.status" class=" pt-1"
                                            :color ="{checked: '#007bff', unchecked: '#858585'}"
                                            @change="updateBrandActive(brand.brand_id,brand.status)"/>
                                    </td>
                                    </tr>
                                
                                    </tbody>
                                </table>
                            </div>
                        </div>               
                    </section>
                </div> 

                <!-- info: modal for Edit brand name -->
                <div class="modal fade" id="isUpdateBrand" role="dialog">
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit Brand</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col">
                                    <input class="form-group border-bottom default-input col-md col" v-model="selected_brand_name" 
                                    @change = "getvalid($event)">
                                    <div class="text-danger" v-if="!validation_status">enter valid brand name</div>
                                </div>                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default border"  data-dismiss="modal">No</button>
                                <button v-if="isValidStatus" type="button" class="btn btn-primary" @click="updateBrandName()" data-dismiss="modal">YES</button>
                                <button v-if="!isValidStatus" type="button" class="btn btn-disabled" data-dismiss="modal">YES</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script src="vuelidate/dist/vuelidate.min.js"></script>
<script lang="ts">
    import Vue from 'vue'
    import VueToast from 'vue-toast-notification';
    // Import one of available themes
    import 'vue-toast-notification/dist/theme-default.css';
    //import 'vue-toast-notification/dist/theme-sugar.css';
 
    import AddCategoriesService from '../../shared/services/addCategory.service'
    import ProductService from '../../shared/services/product.service'

    const addCategoriesService = new AddCategoriesService();
    const productService = new ProductService();

    Vue.use(VueToast)


    export default { 
    components : {
    },
         data()  {
            return {
                toast:Vue.$toast,
                productList:{},
                addBrands:{},
                brandsList:{},
                brand_name:'',
                brandStatus:Boolean,
                active_status:true,
                validation_status:true,
                sc_id:0,
                mc_id:0,
                isCreate:false,
                selected_brand_id:0,
                selected_brand_name:''
            }
        },
        
        computed: {
            isComplete () {
                if(this.validation_status)
                return this.addBrands.brand_name;
                else return false
            },
            isValidStatus(){
                if(this.validation_status)
                    return  this.selected_brand_name
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
            createBrands(){
                let _brandsForm = new FormData()
                    Object.keys(this.addBrands).forEach((key) => {
                        _brandsForm.append(key, this.addBrands[key])
                    })
                addCategoriesService.createBrands(_brandsForm)
                .then(response => {
                    this.addBrands={};
                   console.log("response is reponse is",response);
                    this.toast.success("New brand is added",{
                        position:'top-right'
                    })
                    this.getbrands();
                    this.isCreate=false;
                    // this.$router.go();
                })
                .catch(e => {
                    this.toast.error("Error occured while adding",{
                        position:'top-right'
                    })  
                     this.errors.push(e)
                })

            },
            getbrands(){
                productService.getAdminBrands()
                    .then(response => {
                        this.brandsList = response.data.output.success[0].data 
                        console.log("getBrandsList is",this.brandsList)
                    })
                    .catch(e => {
                    this.errors.push(e)
                    })
            },
            updateBrandActive(brand_id,activeFlag){
                // init
                let obj = {};

                obj['brand_id'] = brand_id;
                obj['status'] = (activeFlag)? 1 : 0;

                let activeStatusText = (activeFlag)? 'Active' : 'Inactive';

                console.log(obj);

                
                productService.activeBrand(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getbrands(0,0);
                   this.toast.success("The brand is now " + activeStatusText,{
                        position:'top-right'
                    })
                    
                })
                .catch(e => {
                    this.toast.error("Main brand or Status is Invalid",{
                        position:'bottom-right'
                    })  
                    this.errors.push(e)
                }) 
            },
            updateBrandName(){
                // init
                let obj = {};

                obj['brand_id'] = this.selected_brand_id;
                obj['brand_name'] = this.selected_brand_name;

                console.log(obj);

                
                productService.updateBrand(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getbrands(0,0);
                   this.toast.success("The Brand name is updated " ,{
                        position:'top-right'
                    })
                    this.isCreate = false
                })
                .catch(e => {
                    this.toast.error("Brand value is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },
        },
        
         created() {
                productService.getAdminBrands()
                .then(response => {
                    this.brandsList = response.data.output.success[0].data 
                    console.log("getBrandsList is",this.brandsList)
                })
                .catch(e => {
                this.errors.push(e)
                })
         }
    }
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

   .closebtn {
        position: absolute;
        top: 0;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer;
    }
     .container-body{
        overflow-y: auto;
        /* height: fit-content; */
        /* height: 700px; */
        overflow-x: hidden;
    }

    
    .logo{
        width:50%;
        margin-bottom: -20%;
    }

    input{
        line-height: 30px;
        border:0px;
    }
    input:active{
        border:0px;
        border-bottom: 1px solid grey;
    }
    .header-options{
        margin-left: auto;
    }   
    .container-header{
      margin-left: -15px;
    }
    th{
        text-align:center;
        font-family: 'Barlow', sans-serif;
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
    .brand-container{
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