<template>
    <div class="product container pb-3" id="product" >
        <!-- <span class="closebtn" @click="$router.go(-1)">&times;</span> -->
        <span class="backbutton"  @click="isBack()">
            <img class="back-image" src="@/assets/Back.png">
        </span>
         <span class="product addbutton">
            <a  class="addwatchlist text-right" v-on:click="addProductWatchList($store_sel_product, $store_sel_product_pos)" v-if="!$store_sel_product.selected" > 
                <span class="text-right">
                    <img class="add-image" src="@/assets/Plus.png">
                </span>
            </a>
                    
            <a class="removewatchlist"  v-on:click="removeProductWatchList($store_sel_product, $store_sel_product_pos)"    v-if="$store_sel_product.selected"> 
                    <span class="text-right">
                        <img class="add-image" src="@/assets/Cross.png">
                    </span>
            </a>
         </span>       
        <div ref="content ">
            <section>
                  <h4 class="mt-3 pl-5">{{productDetails.product_name}} </h4>
            </section>
            <section class="row">
                <div class=" col-12 col-md-6 border border-bottom-0 border-top-0 p-2">
                    <div class="col" >
                        <div class="row">
                            <div class="col-3  p-0"  v-for="(product, index) in productDetails.images" :key="index">
                                <img src="@/assets/prod.jpg"  :alt="productDetails.product_name" @click="updateImg(index)" class="w-100 p-2 cursor-pointer"/> 
                                <!-- <img src="@/assets/KWorkTech_new_logo.jpg"  :alt="productDetails.product_name" @click="updateImg(index)" class="w-100 p-2 cursor-pointer"/>  -->
                            </div>
                        </div>
                    </div> 
                    <div class="col-12 col-md-12 min-w-80 p-0">
                        <img src="@/assets/prod.jpg" class="w-100 p-2">
                    </div>
                </div> 
                 <div class="col-12 col-md-6  p-0 border">
                        <div class="p-2 border-bottom">
                            <div class="p-2 title">
                                Description
                            </div>
                            <div class="col p-2 content">
                                {{productDetails.product_desc}}
                            </div>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item  border-bottom ">
                                <span class="title"> Features </span>
                                <ul class="pl-4 pt-4">
                                    <li class="content" v-for="(feature,index) in productDetails.features" :key="index">
                                        {{feature.features_name}}
                                    </li>
                                </ul>
                            </li>
                            <!-- <li class="list-group-item title border-bottom ">BRAND : <span>{{productDetails.brand_name}}</span></li> -->
                            <li class="list-group-item title border-bottom ">PRICE : <span> Rs: {{2000+this.$route.params.product_id*1}} </span></li>
                         
                        </ul>
                      
                    </div>
            </section>
                         <section>
                <div class="row">
                   <h2 class="col-12 border-bottom  ">Comments</h2>
                    <div class="row col-12 text-center ">
                        <div class=" col-10 content p-2">
                            <textarea v-model="in_data.comment" placeholder="enter your comment here" maxlength="300" class="w-75"></textarea>
                        </div>
                        <div class="col-9 text-right">
                          <button type="button"  class="col-1 btn btn-primary"  @click="addComment()">ADD</button> 

                        </div>

                    </div>
                    
                   <div class="content pl-5 pt-5 col-8" v-for="(comment,index) in comments" :key="index">
                          <div class="row">
                              <div class="col-3 text-right border-right border-dark">
                                  <!-- {{comment.user_id}} -->
                                 <img src="@/assets/profile.png" alt="prdfe"  class="w-50 p-2 cursor-pointer"/> 

                                </div>
                              <div class="col-9 border" >{{comment.comment}}</div>
                          </div>                           
                           <span class="text-right">{{comment.timestamp }}</span>
                    </div>
                </div>
            </section>


        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import jspdf from 'jspdf'
    import html2canvas from "html2canvas"
    import {globalMixin} from '../../mixin.js'

    import * as commonConstant from '../../shared/common.service'
    import ProductService from '../../shared/services/product.service' 
    
    const productService = new ProductService()

    export default Vue.extend ({  
        
        mixins: [globalMixin],
        name: 'product',
        data() {
            return {
                productDetails :{},
                product_index:0,
                comments:{}, 
                in_data:{}, 
                baseURL: commonConstant.baseURL,
                itemDetails : {
                    name:'dummy'
                } 
            }
        },
      

        methods: {
            updateImg(index) {
                this.product_index = index;
            },
             isBack(){
                this.$router.push({path:'/'})
            },
            

             getComments(product_id) {
                productService.getComments(product_id)
                .then(response => {
                    this.comments = response.data.output.success[0].data;

                })
                .catch(e => {
                    this.errors.push(e)
                })
            },

              addComment() {

                  if(this.in_data.comment == ""){
                      alert("Comment cannot be empty");
                      return;
                  }
                  let negative_dataset = this.getDataset();
                  let res = this.in_data.comment.split(" ");
                  let rank = 0;
                  let prev_ptr = -1,current_ptr = -1;
                  res.forEach((word,pos) => {
                      current_ptr = pos;
                      negative_dataset.forEach(neg_word => {
                          if(neg_word == word){
                            if((current_ptr-1) == prev_ptr){
                                rank--;
                            }else{
                                rank++;
                            }
                            prev_ptr = current_ptr;
                          }
                      });
                  });
                  if(rank>0){
                      alert("Look like you are trying to spam the product comment, kindly re=edit");
                      return;
                  }


                  this.in_data.product_id = Number(this.$route.params.product_id);
                  this.in_data.user_id = 1;
                  this.in_data.status = 1;
  
                productService.createComment(this.in_data)
                .then(response => {
                   console.log("hello response hello ",response);
                   this.toast.success("New cooment is added",{
                        position:'top-right'
                    })
                    this.in_data.comment = null;
                    this.getComments(Number(this.$route.params.product_id));

                    
                })
                .catch(e => {
                    console.log("error is error error",e)
                    this.toast.error("please fill the all mandatory fields",{
                        position:'top-right'
                    })
                    this.errors.push(e)
                    console.log("errors erros erros id",this.errors)
                })
            },
            
            download(){
                const doc = new jspdf()
                var canvasElement = document.createElement('canvas');
                html2canvas(this.$refs.content, { canvas: canvasElement }).then(function (canvas) {
                    const img = canvas.toDataURL("/../../assets/logo.png", 0.8);
                    doc.addImage(img,'png',20,20);
                    doc.save("sample.pdf");
                });
            },
            getDataset(){
                return ["bad","stupid","horrible","poor","crap","foul","disgusting","terribly","not"];
            }
        },
        created() {
            
    // this.logMsg();
    // this.setStatus(2);
    // this.logMsg();
            console.log("adfsd view");
                
    
            const product_id = Number(this.$route.params.product_id) 
            productService.getProductDetails(product_id)
            .then(response => {
                this.productDetails = response.data.output.success[0].data;
            })
            .catch(e => {
                this.errors.push(e);
            })

            this.getComments(Number(this.$route.params.product_id));
        },   
    })
</script>

<style  scoped>
  @import '../../style.css';


   .header-bg-image{
       height: 400px !important;
   }
    .list-group-item:first-child {
        border-top-left-radius: .0rem !important; 
        border-top-right-radius: .0rem !important;
    }
    .content{
        font-weight: 400 !important;
    }
    .item-description{
        text-transform: inherit;
        font-family: 'Barlow', sans-serif;
        font-size: 24px;
        color:#858585;
        font-weight: 400;
        padding: 0px;
        float: right;
        width: 65%;
    }

    .list-group-item {
        border:0px;
    }
    .footer-body{
        font-size: 12px;
    }
    .footer-email{
        display: flex;
        padding-right: 0px !important;
    }

     .add-image{
        width:22px;
        background:white
    }
    .back-image{
        width: 22px;
        background:transparent;
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
        .addbutton{
            right:10px !important;
        }
        .backbutton{
            left: 0px !important;
        }
    }

    @media(min-width: 1024px) and (max-width: 1024px){
        .addbutton{
            right: 35px !important;
        }
        .backbutton{
            left: 33px !important;
        }
    }
    @media(min-width: 768px) and (max-width: 768px){
        .addbutton{
            right: 28px !important;
        }
        .backbutton{
            left: 26px !important;
        }
    }
     @media(min-width: 320px) and (max-width: 320px){
        .addbutton{
            right: 21px !important;
        }
    }
    .addbutton{
        position: fixed;
        top: -11px;
        right: 55px;
        font-size: 55px;
        margin-left: 50px;
        cursor: pointer;
        z-index: 1;
    }
    .centered {
        position: absolute;
        top: 15%;
        left: 50%;
        font-weight: bold;
        font-size: 5rem;
        color:white;
        font-family: 'Barlow', sans-serif;
        transform: translate(-50%, -50%);
    }
    
    @media only screen and (max-width: 700px) {
        .centered {
            font-size: 1.5rem;
        }
    }

</style>