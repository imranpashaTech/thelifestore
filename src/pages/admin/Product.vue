<template>

    <div class="product">
        <div class="product container pt-0 pb-2">
            <div class="row pt-3">
                    <span class="backbutton"  @click="isBack()">
                        <img class="add-image" src="@/assets/Back.png">
                    </span>
                    <section class="pl-3 pr-3 d-none">
                        <div class="row border border-bottom-0">
                            <img  :src="main_url" class="w-100 h-100  header-bg-image p-2" />
                            <input type="file" @change="onMainFileChange($event);getvalid($event,'banner_image')" class="w-100 p-2" accept=".png, .jpg, .jpeg" id="fileChooser"/>
                            <div class="text-danger" v-if="!validation_status.banner_status">Please choose the banner image</div>
                            <!-- <div class="text-danger" v-if="imageType">Accept png jpeg jpg only</div> >return ValidateFileUpload()-->
                        </div>
                    </section>
                    <section class="pl-3 pr-3">
                        <div class="row border p-2 border-bottom-0"> 
                            <div class="col">
                                <div class="row">
                                    <div class="col p-2">
                                        <img  :src="url[0]" class="w-100 product-bg-image "/>
                                        <input type="file" @change="onFileChange($event,0)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                    <div class="col p-2">
                                        <img  :src="url[1]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,1)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                <!-- </div>
                                <div class="row"> -->
                                    <div class="col p-2">
                                        <img  :src="url[2]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,2)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                    <div class="col p-2">
                                        <img  :src="url[3]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,3)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                </div>
                            <!-- <div class="col-12 col-md-8 min-w-80 p-0">
                                <img  :src="url[0]" class="w-100 p-2" />
                            </div> -->
                            </div> 
                        </div>
                    </section>
                    <section class="pl-3 pr-3">
                        <div class="row">
                            <div class="col p-0 border">
                                <div class="p-2 border-bottom">
                                    <div class="p-2 title">
                                        Product Description
                                    </div>
                                    <div class="content p-2">
                                            <textarea v-model="productDetails.product_desc" @change="getvalid($event,'product_desc')" maxlength="150" class="w-100"></textarea>
                                            <div class="text-danger" v-if="!validation_status.product_desc">please fill out the description</div>
                                    </div>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item border-bottom title">FEATURES :  <input type="number" class="form-control w-25" v-model="features_count" value="2">
                                        <ul class="pl-4 pt-4">
                                            <li class="content" v-for="(n,index) in Number(features_count)" :key="index">
                                            <input class="form-control p-1 m-1" type="text" :key="n"  @change="onFeatureChange($event,index)" placeholder="Enter feature"/>
                                            </li>
                                        </ul>
                                    </li> 
                                    <li class="list-group-item title border-bottom">CATEGORY
                                        <select class="form-control" v-model="productDetails.main_category_id" @change="getCategoryIndex($event.target.value);getvalid($event,'category')">
                                            <option :value="undefined" selected disabled>SELECT</option>
                                            <option v-for="(item,index) in categoryList" :value="item.main_category_id" :key="index">{{ item.main_category_name.toUpperCase()}}</option>
                                        </select>
                                        <div class="text-danger" v-if="!validation_status.main_category_status">Select the category</div>
                                    </li> 
                                    <li class="list-group-item title border-bottom">SUB CATEGORY
                                        <select class="form-control" v-model="productDetails.sub_category_id" @change="getvalid($event,'subcategory')">
                                            <option :value="undefined" selected disabled>SELECT</option>
                                            <option v-for="(subitem,subindex) in subcategoryList" :value="subitem.subcategory_id" :key="subindex">{{ subitem.subcategory_name.toUpperCase()}}</option>
                                        </select>
                                        <div class="text-danger" v-if="!validation_status.sub_category_status">Select the Sub category</div>
                                    </li>
                                    <li class="list-group-item title border-bottom">BRAND
                                        <select class="form-control" v-model="productDetails.brand_id" @change="getvalid($event,'brand')">
                                            <option :value="undefined" selected disabled>SELECT</option>
                                            <option v-for="(item,index) in brandsList" :value="item.brand_id" :key="index">{{ item.brand_desc.toUpperCase() }}</option>
                                        </select>
                                        <div class="text-danger" v-if="!validation_status.brand_status">Brand  name is missing</div>
                                    </li>
                                    <li class="list-group-item title border-bottom"> PRODUCT NAME : 
                                        <div class="">
                                        <input class="form-control" v-model="productDetails.product_name" @change="getvalid($event,'product_name')">
                                            <div class="text-danger" v-if="!validation_status.product_name_status">Product name is missing</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-none title border-bottom">DESIGNER NAME : 
                                        <div class="">
                                            <input class="form-control" value="Designer" v-model="productDetails.product_designer" @change="getvalid($event,'designer_name')">
                                            <div class="text-danger text-lowercase small" v-if="!validation_status.product_designer_status">Designer name is missing</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-none title border-bottom">SIZE :
                                        <input class="pb-2" type="checkbox" id="Multiple"  v-model="productDetails.multiple_flag">
                                        <label class="pl-1" for="Multiple">Multiple</label>
                                        <div class="p-2" v-if="!productDetails.multiple_flag">
                                                <div class="col p-2">
                                                    D : <input class="form-control w-25" type="number" v-model="productDetails.dimension_depth" @change="getvalid($event,'depth')" 
                                                        placeholder="0">
                                                        <div class="text-danger text-lowercase small" v-if="!validation_status.depth_status">Depth is missing</div>
                                                </div>
                                                <div class="col p-2">
                                                    H : <input class="form-control w-25" type="number" v-model="productDetails.dimension_height" @change="getvalid($event,'height')" placeholder="0">
                                                        <div class="text-danger text-lowercase small" v-if="!validation_status.height_status">Height is  missing</div>
                                                </div>
                                                <div class="col p-2">
                                                    W : <input class="form-control w-25" type="number" v-model="productDetails.dimension_width" @change="getvalid($event,'width')" placeholder="0">
                                                        <div class="text-danger text-lowercase small" v-if="!validation_status.width_status">Width is missing</div>
                                                </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-none title border-bottom">LINK TO {{productDetails.product_name}}  : 
                                        <input class="form-control w-100" value="https://www.w3schools.com/bootstrap/bootstrap_carousel.asp" v-model="productDetails.third_party_url" @change="getvalid($event,'third_party_url')">
                                        <div class="text-danger text-lowercase small" v-if="!validation_status.third_party_status">Url is missing</div>
                                    </li> 
                                </ul>
                                <div class="p-2 d-none">
                                    <div class="p-2 title">
                                        UPLOAD
                                    </div>
                                        <div class="col p-2 ">
                                            2D FILE :
                                            <input type="file" id="file" ref="file" accept=".zip,.rar,.7zip" v-on:change="handleFileUpload($event,'2dfile')"/>
                                        </div>
                                        <div class="col p-2">
                                            3D FILE :
                                            <input type="file" ref="3dfile" accept=".zip,.rar,.7zip" v-on:change="handleFileUpload($event,'3dfile')">
                                        </div>
                                </div>
                            </div>

                            <div class="col border border-left-0 d-none">
                                    <div class="col content">
                                        <div class="title p-2">
                                            About the brand
                                        </div>
                                        <div class="content p-2">
                                            <textarea v-model="productDetails.brand_desc" value="brand description" @change="getvalid($event,'branddesc')"  maxlength="300" class="w-100"></textarea>
                                            <div class="text-danger text-lowercase small" v-if="!validation_status.branddesc_status">Desctiption is missing</div>
                                        </div>
                                    </div>
                                    <div class="col p-2">
                                        <img  :src="brand_url" class="w-100  brand-bg-image" />
                                        <input type="file" @change="onBrandFileChange($event);getvalid($event,'brandimage')" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                        <div class="text-danger text-lowercase small" v-if="!validation_status.brand_image_status">Brand Image is missing</div>
                                    </div>
                            </div>
                        </div>
                    </section>
            </div>
            <footer class="text-center p-3">
                <button type="button"  class="btn btn-primary" data-toggle="modal" data-target="#isAddProduct">ADD PRODUCT</button> 
            </footer>
            <div class="modal fade" id="isAddProduct" role="dialog">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Add new Product</h4>
                        </div>
                        <div class="modal-body">
                            <p class="body-text"> Would you like to add new brand?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default"  data-dismiss="modal">No</button>   
                            <button type="button" class="btn btn-primary" @click="addProduct()" data-dismiss="modal">YES</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css';
    import ProductService from '../../shared/services/product.service'

    Vue.use(VueToast)
    const productService = new ProductService();

    export default Vue.extend ({ 
        
    components : {
    },
        data() {
            
            return {
                productDetails :{},
                categoryList:{},
                brandsList:{},
                subcategoriesList:{},
                subcategoryList:[],
                features_count:2,
                url:  new Array(4),
                main_url: null,
                brand_url: null,
                item:null,
                isSubcategory :false,
                product_image : [],
                product_features:[],
                imageType : false,
                // productDetails:{product_features:[]},
                product_feature : [],
                product_feature_status:[],
                toast:Vue.$toast,
                validation_status:{
                    banner_status:true,
                    product_image1:true,
                    product_desc:Boolean,
                    main_category_status:Boolean,
                    sub_category_status:Boolean,
                    brand_status:Boolean,
                    product_name_status:Boolean,
                    product_designer_status:Boolean,
                    depth_status:Boolean,
                    height_status:Boolean,
                    width_status:Boolean,
                    third_party_status:Boolean,
                    branddesc_status:Boolean,
                    brand_image_status:Boolean
                }
                
            }
        }, 

        computed: {
            isComplete() {
                
                return this.productDetails.product_desc && this.productDetails.hero_image && this.productDetails.main_category_id
                        && this.productDetails.sub_category_id && this.productDetails.brand_id  && this.productDetails.product_name
                        && this.productDetails.product_designer && (this.productDetails.multiple_flag || ( this.productDetails.dimension_depth && this.productDetails.dimension_height
                        && this.productDetails.dimension_width )) && this.productDetails.third_party_url && this.productDetails.brand_desc
                       
            }
        },
        methods: {
            getvalid(event,item){
                console.log('event event evnet',event.target.value,item)
                if(item == 'banner_image')
                {
                    let value = event.target.value;
                    if(value)
                    this.validation_status.banner_status = true;
                    else 
                    this.validation_status.banner_status = false;
                }
                if(item == 'product_desc'){
                    let value = event.target.value;
                    if (value) {
                        this.validation_status.product_desc=true
                    } else {
                        this.validation_status.product_desc=false
                    }
                }
                if(item == 'category'){
                    let value = event.target.value;
                    if(value){
                        this.validation_status.main_category_status = true
                    } else{
                        this.validation_status.main_category_status = false
                    }
                }
                if(item == 'subcategory'){
                    let value = event.target.value;
                    if(value){
                        this.validation_status.sub_category_status = true
                    }
                    else{
                        this.validation_status.sub_category_status = false
                    }
                }
                if(item == 'brand'){
                    let value = event.target.value;
                    if(value){
                        this.validation_status.brand_status = true
                    }
                    else{
                        this.validation_status.brand_status = false
                    }
                }
                if(item == 'product_name'){
                    let value = event.target.value;
                    if(value){
                        this.validation_status.product_name_status = true
                    }
                    else this.validation_status.product_name_status = false
                }
                if(item == 'designer_name'){
                    let value = event.target.value;
                    if(value){
                        this.validation_status.product_designer_status = true
                    }
                    else this.validation_status.product_designer_status = false
                }
                if(item == 'depth'){
                    let value = event.target.value;
                    if(value)
                    this.validation_status.depth_status = true
                    else this.validation_status.depth_status = false
                }
                if(item == 'width'){
                    let value = event.target.value;
                    if(value)
                    this.validation_status.width_status = true 
                    else this.validation_status.width_status = false
                }
                if(item == 'height'){
                    let value = event.target.value;
                    if(value) 
                    this.validation_status.height_status = true
                    else this.validation_status.height_status = false
                }
                if(item == 'third_party_url' ){
                    let value = event.target.value;
                    if (value)
                    this.validation_status.third_party_status = true
                    else this.validation_status.third_party_status = false
                }
                if( item == 'branddesc'){
                    let value = event.target.value;
                    if(value)
                    this.validation_status.branddesc_status = true
                    else this.validation_status.branddesc_status =false
                }
                if(item == 'brandimage'){
                    let value = event.target.value;
                    if(value)
                    this.validation_status.brand_image_status = true
                    else this.validation_status.brand_image_status = false
                }
            },
                ValidateFileUpload() {
                            var fuData = document.getElementById('fileChooser');
                            console.log("validauplioadfile",fuData)
                            var FileUploadPath = fuData.value;

                    //To check if user upload any file
                            if (FileUploadPath == '') {
                                // alert("Please upload an image");

                            } else {
                                var Extension = FileUploadPath.substring(
                                        FileUploadPath.lastIndexOf('.') + 1).toLowerCase();

                    //The file uploaded is an image

                    if ( Extension == "png" 
                                        || Extension == "jpeg" || Extension == "jpg") {
                                            // alert ("images area valid imagesfdfdfd")
                    // To Display
                                    // if (fuData.files && fuData.files[0]) {
                                    //     var reader = new FileReader();

                                    //     // reader.onload = function(e) {
                                    //     //     $('#blah').attr('src', e.target.result);
                                    //     // }

                                    //     reader.readAsDataURL(fuData.files[0]);
                                    // }

                                } 

                    //The file upload is NOT an image
                            else {  
                                this.imageType = true
                                // alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");

                                }
                            }
                        },
            isBack(){
                this.$router.push({path:'/admin'})
            },
            
            onFileChange(e,i) {
               
                const file = e.target.files[0];
                this.product_image[i] = e.target.files.item(0);
                this.$set(this.url,i, URL.createObjectURL(file));

            },

            handleFileUpload(e, isFile){

                if(isFile == '2dfile')
                    this.productDetails.twod_file = e.target.files.item(0);
                else if(isFile == '3dfile')
                    this.productDetails.threed_file = e.target.files.item(0);

            },
            
            onMainFileChange(e) {

                const file = e.target.files[0];
                this.productDetails.hero_image = e.target.files.item(0);
                this.main_url = URL.createObjectURL(file);

            },
            
            onFeatureChange(e,i) {
                console.log("hello helo hello e",e.target.value,i)
                this.product_feature[i] = e.target.value;
                    if(e.target.value){
                        this.product_feature_status[i] = true
                        console.log("product feature status of VALID", i , this.product_feature_status)
                    }
                    else 
                    {
                        this.product_feature_status[i] = false
                     console.log("product feature status of iNVALID ", i , this.product_feature_status)
                    }
                // this.productDetails.product_features = this.product_feature[i]
                this.product_features[i] = this.product_feature[i];
            },
            
            onBrandFileChange(e) {

                const file = e.target.files[0];
                this.productDetails.brand_image = e.target.files.item(0);
                this.brand_url = URL.createObjectURL(file);

            },        

            getCategory() {
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
                        this.categoryList[index]['sub_category'] = this.subcategoriesList[element['sub_category']]
                        console.log("categorylist",this.categoryList)
                    }); 
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },

            getCategoryIndex(mc_id){
                this.categoryList.forEach((element) => {
                if(element.main_category_id == mc_id)
                    this.subcategoryList=element.sub_category;
                });
            },

            getBrands(){
                productService.getBrandsList()
                .then(response => {
                    this.brandsList = response.data.output.success[0].data 
                    console.log("getBrandsList is",this.brandsList)
                })
                .catch(e => {
                this.errors.push(e)
                })
            },

            addProduct() {
                this.productDetails.third_party_url = "https://www.w3schools.com/bootstrap/bootstrap_carousel.asp";
                this.productDetails.product_designer = "Designer";
                this.productDetails.brand_desc = "brand description";

                // product images
                this.productDetails.product_image_1 = this.product_image[0];
                this.productDetails.product_image_2 = this.product_image[1];
                this.productDetails.product_image_3 = this.product_image[2];
                this.productDetails.product_image_4 = this.product_image[3];
                // product feature
                this.productDetails.product_features = this.product_feature;
                //flag
                if(!this.productDetails.multiple_flag) 
                    this.productDetails.multiple_flag = false;

                // return true; 
                let _productData  = new FormData();
                for(var key in this.productDetails) {
                    _productData.append(key, this.productDetails[key]);
                } 
                console.log("detail of product",this.productDetails);
                productService.createProductDetails(_productData)
                .then(response => {
                   console.log("hello response hello ",response);
                   this.toast.success("New product is added",{
                        position:'top-right'
                    })
                // this.product_image = [];
                // this.product_feature = [];
                // this.productDetails={};
                // window.location.href='/admin/product/1'
                this.product_feature_status=[];
                this.$router.push({path:'/admin'})
                    
                })
                .catch(e => {
                    console.log("error is error error",e)
                    this.toast.error("please fill the all mandatory fields",{
                        position:'top-right'
                    })
                    this.errors.push(e)
                    console.log("errors erros erros id",this.errors)
                })
            }

        },
        
        created() {
            this.getCategory();
            this.getBrands();
            // let product_id = Number(this.$route.params.product_id) 
            // this.getProductDetails(product_id)
        } 
    })
</script>

<style  scoped>
  @import '../../style.css';

   .header-bg-image{
       /* height: 400px !important; */
       height: auto !important;
   }

   .form-control {
    display: initial;
   }

   .closebtn {
        position: fixed;
        top: 0;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer;
    
    }   
   .backbutton{
        position: fixed;
        top: 15px;
        left: 55px;
        font-size: 28px;
        margin-right: 50px;
        cursor: pointer;
        z-index: 1;


    }

    @media(max-width: 660px){
        .backbutton{
            left: 0px !important;
        }
    }

    @media(min-width: 1024px) and (max-width: 1024px){
        .backbutton{
            left: 33px !important;
        }
    }
    @media(min-width: 768px) and (max-width: 768px){
        .backbutton{
            left: 26px !important;
        }
    }
    /* .addbutton{
        position: fixed;
        top: -10px;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer;
    } */
    .list-group-item {
        border:0px;
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
    .border-bottom{
      /* box-shadow:0 2px 4px 0 rgba(0,0,0,0.13) */
      /* box-shadow: 0 2px 4px 0 #dee2e6; */
      /* box-shadow:0 1px 2px 0 #dee2e6 */
    }
    /* .navbar{
        margin-left: -60px;
        margin-right: -60px;
    }
    @media (max-width: 660px) {
        .navbar{
            margin-left: -15px !important;
            margin-right: -15px !important;
        }
    
    } */
    .back-button{
        margin-left: 4px;
        margin-top:3px;
    }
    .add-button{
        margin-right: 4px;
        padding-left: 9px;
        padding-right: 9px;
        padding-bottom:9px;
        /* width: 8%; */
    }
    .add-image{
        width:22px;
        background:transparent
    }
    /* nav::after{
        box-shadow:0 1px 2px 0 #dee2e6
    } */
    .navbar{
        width:100%;
        /* position: absolute;
        top: 0;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer; */
    }
    /* .centered {
        position: absolute;
        top: 20%;
        left: 50%;
        font-weight: bold;
        font-size: xx-large;
        color:white;
        font-family: 'Barlow', sans-serif;
        transform: translate(-50%, -50%);
    } */
</style>