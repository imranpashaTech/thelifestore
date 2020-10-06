<template>
    <div class="About-us" >
         <!-- <span class="backbutton"  @click="isBack()">
            <img class="back-image" src="@/assets/Back.png">
        </span> -->
        <section>
            <div class="d-flex align-items-center  py-5 bg-light">
                    <h1 class="mx-auto my-5">About us</h1> 
            </div>
        </section>
                    
        <div ref="content" class=" m-5">
            <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="@/assets/logo.png" class="w-100" alt="prifle"/>
                    </div>
                    <div class="col-md-6">
                       <p>We shop for many reasons: It makes us happy :), to experience something new, 
                        or we need something. In fact, it is possible to tick all these boxes. But,
                        what if we also want to be responsible with our buying habits? </p>

                        <p><b>life.</b> is the place where we enable you to do this. It is where you can buy
                        sustainable, eco-friendly, ethical/fair trade, healthy/organic and handcrafted
                        products that are either traditional or modern in inspiration. 
                        They are created by artisans, designers, makers and inventors either in their individual 
                        capacity, as a small-scale enterprise, as a collective or as a large enterprise.</p>

                        <p>Buy responsibly. Live responsibly.</p>

                    </div>
                    <div class="col-md-2">
                        <!-- <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/> -->
                    </div>
                </div>
             
            </form>           
        </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend ({  
        name: 'about-us',
        
        data() {
            return {
                
            }
        },
      

        methods: {
              isBack(){
                this.$router.push({path:'/'})
            },
            
        },
          
    })
</script>

<style  scoped>
  @import '../../style.css';
  
.About-us{
    font-family: 'Barlow', sans-serif;
    color:#858585;
    text-align:justify
}
  .about-desc{
    font-weight: bold;
    font-size: 25px;
  }
  .specil-about{
      color:dodgerblue;
  }
  .company-desc{
    font-size: 18px;
  }
  .founder-name{
      font-size: 24px;
      font-weight: 600;
  }

  .logo{
      width: 70% !important;
  }
  .special{
      font-style: italic;
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
    .back-image{
        width: 22px;
        background:transparent;
    }
    .ceo-image{
        background: none;
    }
    @media(max-width:600px){
        .company-desc-image{
            padding-right: 15px !important;
        }
    }

</style>