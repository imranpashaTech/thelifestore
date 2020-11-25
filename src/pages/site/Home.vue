<template>
  <div class="home  p-3 mx-auto">

  <section class="row m-0 ">
    <div class="col-md-12 p-0">                 
      <carousel class="row" :autoplay="true" :nav="false" :dots="false" :responsive="{0:{items:1,nav:true},720:{items:1,nav:true},1000:{items:1,nav:false}}">
        <template slot="prev" ><span class="prev d-none d-lg-block"> <img src="@/assets/Right.png" alt="life" class="w-100"/> </span></template>
        <template slot="next" ><span class="next d-none d-lg-block"> <img src="@/assets/Right.png" alt="life" class="w-100"/> </span></template>  
        <div class="p-0" >
          <img src="@/assets/slider/05Nov_Jashn_e_jaypore_slider.jpg" alt="life" class="w-100">
        </div> 
        <div class="p-0"  >
          <img src="@/assets/slider/5599_201052014_PURPLE_Outright_slider.jpg" alt="life" class="w-100">
        </div>
        <div class="p-0"  >
          <img src="@/assets/slider/20201031_Lamp_slider.jpg" alt="life" class="w-100">
        </div>
        <div class="p-0"  >
          <img src="@/assets/slider/5245200819020_Suresh_Hand_Print_Outright_slider.jpg" alt="life" class="w-100">
        </div>
        <div class="p-0"  >
          <img src="@/assets/slider/5345200918021_RAVISHING_CREATIONS_slider.jpg" alt="life" class="w-100">
        </div>
        <!-- <div class="p-0"  >
          <img src="@/assets/slider/slider2.jpg" alt="life" class="w-100">
        </div> -->
                       
      </carousel> 
    </div> 
  </section>

  <section class="coatorgires container" >
    <div class=" text-center m-3 m-md-5">
      <h3>Shop By Categories</h3>
    </div>
    <div class="row bg-dark">
      <div class="col-md-6 p-2 bg-warning c-item">
        <router-link to="/catagory/art & craft">
          <img src="@/assets/catagory/art_and_craft.jpg" alt="art and craft" class="w-100  c-img">
          <div class="d-flex align-items-center c-title">
            <h1 class="m-auto">Art & Craft</h1> 
          </div>
        </router-link>
      </div>
      <div class="col-md-6 p-2 bg-info c-item">
        <router-link  to="/about">
          <img src="@/assets/catagory/clothing.png" alt="clothing" class="w-100 c-img">
          <div class="d-flex align-items-center c-title ">
            <h1 class="m-auto">Clothing</h1> 
          </div>
        </router-link>
      </div>
      <!-- info -->
      <!-- <div class="col-md-4 h-auto p-0">
      <div class="col h-75 bg-warning border">
      </div>
      <div class="col h-50 bg-danger border">2</div>
      </div>
      <div class="col-md-4 h-auto p-0">
      <div class="col h-25 bg-dark border">3</div>
      <div class="col h-75 bg-info border">4</div>
      <div class="col h-25 bg-secondary border">5</div>
      </div>
      <div class="col-md-4 h-auto p-0">
      <div class="col h-50 bg-success border">6</div>
      <div class="col h-25 bg-danger border">7</div>
      <div class="col h-50 bg-primary border">8</div>
      </div> -->
    </div>      
  </section>

  <section class="container">
    <div class=" text-center m-3 m-md-5">
      <h3>Trending Products</h3>
    </div>
    <div class="col-12">                 
      <carousel class="row" :autoplay="true" :nav="false" :responsive="{0:{items:2},720:{items:3},1000:{items:4}}">
        <template slot="prev" ><span class="prev d-none d-lg-block"> <img src="@/assets/Right.png" alt="life" class="w-100"/> </span></template>
        <template slot="next" ><span class="next d-none d-lg-block"> <img src="@/assets/Right.png" alt="life" class="w-100"/> </span></template> 
        <div class="p-2" >
          <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
        </div>
        <div class="p-2" >
          <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
        </div> 
        <div class="p-2" >
          <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
        </div> 
        <div class="p-2" >
          <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
        </div>
        <div class="p-2" >
          <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
        </div> 
        <div class="p-2" >
          <img src="@/assets/prod.jpg"  alt="chair" style="width:100%;">
        </div>   
      </carousel> 
    </div> 
  </section>

  <section class="newsletter bg-light ">
    <div class="content container p-2 p-lg-5 ">
      <div class="row p-2 p-lg-5 ">
        <div class="col-12 col-md-9 m-auto">
          <div class="text-center">
            <h2>BE THE FIRST TO KNOW </h2>
            <h5 class="py-2">Subscribe to the <b>life.</b> Newsletter to get timely updates on products & trends.</h5>
            <div class="input-group">
              <input type="email" class="form-control" placeholder="Enter your email">
              <span class="input-group-btn">
                <button type="button" class="btn btn-secondary">Subscribe Now</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



  </div> 
</template>

<script>
// components

import carousel from 'vue-owl-carousel'

export default {
  name: 'Home',
  components: {
    'carousel': carousel
  },
  props: {
    msg: String,
    listData:Object
  },
   data() {
      return {
      }
    },
  methods: {
    topFunction() {
                window.scroll({
                   top: document.body.scrollTop,
                    behavior: 'smooth'
                });
      },
  },
  
  created() {

  },

  mounted(){

  }
}

</script>
<style  scoped>

  @import '../../style.css';


/* latest  */
.c-title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  opacity: 1;
  transition: opacity .2s, visibility .2s;
}

.c-item:hover .c-img {
  opacity: 0.5;
  
}
.prev,.next{
  position: absolute;
  top: 50%;
  z-index: 2;
  padding: 0 15px 0 15px;
}
.prev{
  left: 2%;
  transform: rotate(180deg);
}
.next{
  right: 2%;
}
</style>