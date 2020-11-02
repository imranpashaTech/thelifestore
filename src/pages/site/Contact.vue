<template>
    <div class="Contact" >
        <section>
            <div class="d-flex align-items-center  py-5 bg-light">
                    <h1 class="mx-auto my-5">Contact us</h1> 
            </div>
        </section>
        
        <section class="container">
            <div class="row">
            <div class="col-md-8">
                <form action="/post" method="post">
                    <input class="form-control" name="name" placeholder="Name..." /><br />
                    <input class="form-control" name="phone" placeholder="Phone..." /><br />
                    <input class="form-control" name="email" placeholder="E-mail..." /><br />
                    <textarea class="form-control" name="text" placeholder="How can we help you?" style="height:150px;"></textarea><br />
                    <input class="btn btn-primary" type="submit" value="Send" /><br /><br />
                </form>
            </div>
            <div class="col-md-4">
                <b>CONTACT INFO:</b> <br />
                Phone: +91 829 783 8522<br />
                E-mail: <a href="mailto:hello@lifethestore.com">hello@lifethestore.com</a><br />
                <br /><br />
                <b>Headquarter:</b><br />
                Company Inc, <br />
                -37/4 Street 3, Habsiguda,<br />
                55Hyderabad, India<br />


                <br /><br />
                <b>WORKING DAYS/HOURS</b><br />
                Mon-Sat / 9AM-8PM (IST)<br />
 


            </div>
            </div>
        </section>
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