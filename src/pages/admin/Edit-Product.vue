<template>
    <div class="product">
        <!-- <nav class="navbar sticky-top navbar-light bg-white top-menu top-menu-borders border-bottom border-top font-weight-bold p-0 pt-2 pb-2" style="display:flow-root">
                <div class="admin-topnav">
                    <button type="button" class="btn btn-default border text-left back-button" @click="isBack()">
                        <fa-icon :icon="['fas','long-arrow-alt-left']"/>
                    </button>
                </div>
        </nav> -->
        <div class="product container pt-0 pb-2">
            <div class="row pt-3">
                    <span class="backbutton"  @click="isBack()">
                        <!-- <fa-icon :icon="['fas','long-arrow-alt-left']"/> -->
                            <img class="add-image" src="@/assets/Back.png">
                        <!-- <button type="button" class="btn btn-default border text-left back-button" @click="isBack()">
                                    <fa-icon :icon="['fas','long-arrow-alt-left']"/>
                        </button> -->
                    </span>
                    <!-- <span class="closebtn d" @click="$router.go(-1)">&times;</span> -->
                    <section class="pl-3 pr-3">
                        <div class="row  border d-none border-bottom-0">
                            <img  :src="main_url" class="w-100 h-100  header-bg-image p-2" />
                            <input type="file" @change="onMainFileChange($event)" class="w-100 p-2" accept=".png, .jpg, .jpeg"/>
                            <!-- <div class="text-danger" v-if="!validation_status.banner_status">Please choose the banner image</div> -->
                        </div>
                    </section>
                    <section class="pl-3 pr-3">
                        <div class="row border border-bottom-0 p-2">
                            <div class="col" >
                                <div class="row">
                                    <div class="p-2 col">
                                        <img  :src="url[0]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,0)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>  
                                    <div class="p-2 col"> 
                                        <img  :src="url[1]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,1)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                    <div class="p-2 col">
                                        <img  :src="url[2]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,2)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                    <div class="p-2 col">
                                        <img  :src="url[3]" class="w-100 product-bg-image"/>
                                        <input type="file" @change="onFileChange($event,3)" class="w-100 pt-2" accept=".png, .jpg, .jpeg"/>
                                    </div>
                                    <!-- <div class="col col-md-12 p-0"  v-for="(image,index) in productDetails.images" :key="index">
                                        <input type="file" @change="onFileChange($event,index)" class="w-100 p-2" />
                                        <img  :src="url[index]" class="w-100 p-2" />
                                    </div> -->
                                </div>
                            </div> 
                        </div> 
                    </section>
                    <section class="pl-3 pr-3">
                        <div class="row">
                            <div class="col-12 col-sm p-0 border">
                                <div class="p-2 border-bottom">
                                    <div class="p-2 title">
                                        Product Description
                                    </div>
                                    <div class="content p-2 ">
                                        <textarea v-model="productDetails.product_desc" @change="getvalid($event,'product_desc')" placeholder="Enter the product description." maxlength="150" class="w-100"></textarea>
                                        <div class="text-danger" v-if="!validation_status.product_desc">please fill out the description</div>
                                    </div>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item border-bottom title">FEATURES :  <input type="number" class="w-25" v-model="features_count" value="2">
                                        <ul class="pl-4 pt-4">
                                            <li class="content" v-for="(n,index) in Number(features_count)" :key="index">
                                                <input type="text" class="w-100 p-1 m-1" :key="n" v-model="product_feature[index]"   placeholder="Enter feature"/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="list-group-item title border-bottom">CATEGORY
                                        <select class="form-control" v-model="productDetails.main_category_id" @change="getCategoryIndex($event.target.value);getvalid($event,'category')">
                                            <option value="" selected disabled>SELECT</option>
                                            <option v-for="(category,subindex) in categoryList" :value="category.main_category_id" :key="subindex">{{ category.main_category_name.toUpperCase() }}</option>
                                        </select>
                                        <div class="text-danger" v-if="!validation_status.main_category_status">Select the category</div>
                                    </li>
                                    <li class="list-group-item title border-bottom">SUB CATEGORY
                                        <select class="form-control" v-model="productDetails.sub_category_id" @change="getvalid($event,'subcategory')">
                                            <option value="" selected disabled>SELECT</option>
                                            <option v-for="(subitem,subindex) in subcategoryList" :value="subitem.subcategory_id" :key="subindex">{{ subitem.subcategory_name.toUpperCase() }}</option>
                                        </select>
                                        <div class="text-danger" v-if="!validation_status.sub_category_status">Select the Sub category</div>
                                    </li>
                                    <li class="list-group-item title d-none border-bottom">BRAND
                                        <select class="form-control" v-model="productDetails.brand_id" @change="getvalid($event,'brand')">
                                            <option value="" selected disabled>SELECT</option>
                                            <option v-for="(item,index) in brandsList" :value="item.brand_id" :key="index">{{ item.brand_desc.toUpperCase() }}</option>
                                        </select>
                                        <div class="text-danger" v-if="!validation_status.brand_status">Brand  name is missing</div>
                                    </li>
                                    <li class="list-group-item title border-bottom">PRODUCT NAME:
                                        <div class="">
                                            <input class="form-control" v-model="productDetails.product_name" @change="getvalid($event,'product_name')"> 
                                            <div class="text-danger" v-if="!validation_status.product_name_status">Product name is missing</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-none title border-bottom">DESIGNER NAME: 
                                        <div class="">
                                            <input class="form-control" v-model="productDetails.product_designer" @change="getvalid($event,'designer_name')"> 
                                            <div class="text-danger text-lowercase small" v-if="!validation_status.product_designer_status">Designer name is missing</div>
                                        </div> 
                                    </li>

                                    <!-- <li class="list-group-item title">SIZE : 
                                        <span v-if="!productDetails.multiple_flag">
                                            <input class="w-25" v-model="productDetails.dimension_depth" placeholder="0">[D] * 
                                            <input class="w-25" v-model="productDetails.dimension_height" placeholder="0">[H] * 
                                            <input class="w-25" v-model="productDetails.dimension_width" placeholder="0">[w]
                                        </span>
                                        <input type="checkbox" id="Multiple"  v-model="productDetails.multiple_flag">
                                        <label for="Multiple">Multiple</label>
                                    </li> -->
                                    <li class="list-group-item d-none title border-bottom">SIZE :
                                        <input class="pb-2" type="checkbox" id="Multiple"  v-model="productDetails.multiple_flag">
                                        <label class="pl-1" for="Multiple">Multiple</label>
                                        <div class="p-2" v-if="!productDetails.multiple_flag">
                                                <div class="col p-2">
                                                    D : <input class="w-25 p-1" v-model="productDetails.dimension_depth" @change="getvalid($event,'depth')" placeholder="0">
                                                        <div class="text-danger text-lowercase small" v-if="!validation_status.depth_status">Depth is missing</div>
                                                </div>
                                                <div class="col p-2">
                                                    H : <input class="w-25 p-1" v-model="productDetails.dimension_height" @change="getvalid($event,'height')" placeholder="0">
                                                        <div class="text-danger text-lowercase small" v-if="!validation_status.height_status">Height is  missing</div>
                                                </div>
                                                <div class="col p-2">
                                                    W : <input class="w-25 p-1" v-model="productDetails.dimension_width" @change="getvalid($event,'width')" placeholder="0">
                                                        <div class="text-danger text-lowercase small" v-if="!validation_status.width_status">Width is missing</div>
                                                </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-none title border-bottom">LINK TO {{productDetails.product_name}} :
                                        <input class="w-100 form-control" v-model="productDetails.third_party_url" @change="getvalid($event,'third_party_url')">
                                        <div class="text-danger text-lowercase small" v-if="!validation_status.third_party_status">Url is missing</div>
                                    </li>
                                </ul>
                                <div class="p-2 d-none">
                                    <div class="p-2 title">
                                        UPLOAD
                                    </div>
                                        <div class="col p-2">
                                            <!-- 2D FILE : {{ (productDetails.twod_file != "null")? productDetails.twod_file.split("/").pop() : 'Not Uploaded'  }}<br/> -->
                                            2D FILE : {{ (productDetails.twod_file)? productDetails.twod_file : 'Not Uploaded'  }}<br/>
                                            <input type="file" id="file" ref="file" accept=".zip,.rar,.7zip" v-on:change="handleFileUpload($event,'2dfile')"/>
                                        </div>
                                        <div class="col p-2">
                                            <!-- 3D FILE : {{ (productDetails.threed_file != "null")? productDetails.threed_file.split("/").pop() : 'Not Uploaded' }} <br/> -->
                                            3D FILE : {{ (productDetails.threed_file)? productDetails.threed_file: 'Not Uploaded' }} <br/>
                                            <input type="file" ref="3dfile" accept=".zip,.rar,.7zip" v-on:change="handleFileUpload($event,'3dfile')">
                                        </div>
                                </div>
                            </div>
                            <div class="col border d-none border-left-0"> 
                                    <div class="col content">
                                        <div class="title p-2">
                                            About the brand
                                        </div>
                                        <div class="content p-2">
                                            <textarea v-model="productDetails.brand_desc"  @change="getvalid($event,'branddesc')"  placeholder="Enter the brand description."  maxlength="250" class="w-100"></textarea>
                                            <div class="text-danger text-lowercase small" v-if="!validation_status.branddesc_status">Desctiption is missing</div>
                                        </div>
                                    </div>
                                    <div class="col p-2">
                                        <img  :src="brand_url" class="w-100  brand-bg-image" />
                                        <input type="file" @change="onBrandFileChange($event);getvalid($event,'brandimage')" class="w-100 p-2" accept=".png, .jpg, .jpeg"/>
                                        <!-- <img  :src="brand_url" class="w-100 p-2" /> -->
                                        <div class="text-danger text-lowercase small" v-if="!validation_status.brand_image_status">Brand Image is missing</div>
                                    </div>
                            </div>
                        </div>
                    </section>
            </div>
            <footer class="p-3 text-center">
                <button  v-if="isComplete" data-toggle="modal" class="btn btn-primary text-center" data-target="#isAddProduct">update Product</button>
                <button  v-if="!isComplete" class="btn btn-disabled text-center">update Product</button>
            </footer>
            <div class="modal fade" id="isAddProduct" role="dialog">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Update Product</h4>
                        </div>
                        <div class="modal-body">
                            <!-- <p>Would you like to {{equipmentView.equipment_active? 'INACTIVE' : 'ACTIVE'}} the Equipment?</p> -->
                            <p class="body-text"> Would you like to update the product?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default"  data-dismiss="modal">No</button>   
                            <button type="button" class="btn btn-primary" @click="updateProduct()" data-dismiss="modal">YES</button>
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
                product_feature : [],
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
                
                return this.productDetails.product_desc 
                //  && this.productDetails.hero_image 
                && this.productDetails.main_category_id
                        && this.productDetails.sub_category_id && this.productDetails.brand_id  && this.productDetails.product_name
                        && this.productDetails.product_designer && this.productDetails.third_party_url && this.productDetails.brand_desc
                        // && this.productDetails.dimension_depth && this.productDetails.dimension_height
                        // && this.productDetails.dimension_width 
                       
            }
        },
        methods: {
            getvalid(event,item){
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
                this.productDetails.hero_img = e.target.files.item(0);
                this.main_url = URL.createObjectURL(file);
            },
            
            onFeatureChange(e,i) {

                this.product_feature[i] = e.target.value;

            },
            
            onBrandFileChange(e) {

                const file = e.target.files[0];
                this.productDetails.brand_img = e.target.files.item(0);
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
                    }); 
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },

            getCategoryIndex(mc_id){
                let getmc_id = this.productDetails.main_category_id
                console.log(getmc_id)
                this.categoryList.forEach((element) => {
                if(element.main_category_id == mc_id)
                    this.subcategoryList=element.sub_category;
                });
            },

            getBrands(){
                productService.getBrandsList()
                .then(response => {
                    this.brandsList = response.data.output.success[0].data 
                })
                .catch(e => {
                this.errors.push(e)
                })
            },

            updateProduct() {
               
                // info: check and send the uploaded product images
                this.productDetails.product_image_ids = [];
                const prod_img_len = 4;
                for (let i = 0; i < prod_img_len; i++) {

                    //info: to insert the img
                    if(this.product_image[i]){
                        this.productDetails['product_image_'+(i+1)] = this.product_image[i];
                    }else if(this.url[i] && this.url[i] == this.productDetails.images[i].product_images_url){
                        this.productDetails['product_image_'+(i+1)] = this.productDetails.images[i].product_images_url;
                    }else{
                        this.productDetails['product_image_'+(i+1)] = null;
                    }

                    //info: to insert img id
                    if(this.productDetails.images[i])
                        this.productDetails.product_image_ids.push(this.productDetails.images[i].product_images_id);

                }

                


                this.productDetails.features = [];
                if(this.product_feature.length == this.features_count)    
                    this.productDetails.features = this.product_feature; 
                else
                    for (let index = 0; index < this.features_count; index++) {
                        this.productDetails.features.push(this.product_feature[index]);
                    }   

                this.productDetails.multiple_flag = (this.productDetails.multiple_flag)? 1 : 0;

                if(this.productDetails.dimension_depth == null){
                    this.productDetails.dimension_depth = 0;
                }
                if(this.productDetails.dimension_height == null){
                    this.productDetails.dimension_height = 0;
                }
                if(this.productDetails.dimension_width == null){
                    this.productDetails.dimension_width = 0;
                }
                // return true; 
                let _productData  = new FormData();
                for(var key in this.productDetails) {
                    _productData.append(key, this.productDetails[key]);
                } 
                productService.updateProduct(_productData)
                .then(response => {
                    console.log(response)
                   this.toast.success("Product details are edited",{
                        position:'top-right'
                    })
                this.$router.push({path:'/admin'})
                    
                })
                .catch(e => {
                    this.toast.error('you are entering incorrrent details',{
                        position:'top-right'
                    })
                    this.errors.push(e)
                }) 
            },

            getProductDetails(product_id){
                productService.getProductDetails(product_id)
                .then(response => {
                    this.productDetails = response.data.output.success[0].data;
                    
                    // init
                    for(let i in this.productDetails.features){
                        this.product_feature.push( this.productDetails.features[i].features_name);
                    }
                    this.features_count = this.productDetails.features.length;
                    // init img url
                    this.main_url = this.productDetails.hero_img;
                    this.brand_url = this.productDetails.brand_img;
                    for(let i in this.productDetails.images){
                        this.url[i] = this.productDetails.images[i].product_images_url;
                    }
                    this.getCategoryIndex(this.productDetails.main_category_id)
                })
                .catch(e => {
                    this.errors.push(e);
                })
            }
        },
        
        created() {
            this.getCategory();
            this.getBrands();
            let product_id = Number(this.$route.params.product_id) 
            this.getProductDetails(product_id)
        } 
    })
</script>

<style  scoped>
  @import '../../style.css';
/* .list-group{
    border:0 !important;
} */
    .list-group-item {
        border:0
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
      box-shadow:0 1px 2px 0 #dee2e6
    }
    .back-button{
        margin-left: 4px;
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
    .add-image{
        width:22px;
        background:transparent
    }
</style>