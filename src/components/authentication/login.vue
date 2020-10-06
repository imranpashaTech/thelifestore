<template>
    <section class="sign-up">
        <form class="signup-screen" >
            
            <h3 class="text-center">Welcome</h3>
            <div class="form-group border-bottom">
                    <input class="col-md-12" v-model="loginDetails.username" placeholder="username">
            </div>
            <div class="form-group  border-bottom">
                <input :type="type" v-model="loginDetails.password" placeholder="password" />
                    <span  class="show-password" type="password" @click="switchVisibility">
                        {{buttontext}}
                    </span>
            </div>

            <div class="form-group text-center pt-4">
                <button type="button" class="btn btn-primary" @click="Login()">LOGIN</button> 
            </div>
        </form>
        </section>
</template>


<script>
// components
    import Vue from 'vue'
    import VueToast from 'vue-toast-notification';
    // Import one of available themes
    import 'vue-toast-notification/dist/theme-default.css';
    //import 'vue-toast-notification/dist/theme-sugar.css';
     Vue.use(VueToast)

export default Vue.extend({
    name: 'Login',

    components: {
    
    },
    props: {
       
    },
    data() {
      return {
        toast:Vue.$toast,
        loginDetails:{},
        type:'password',
        buttontext:'SHOW',
      }
    },
    methods: {
      switchVisibility(){
        //   this.type = this.type === 'password' ? 'text' : 'password'
          if(this.type === 'password'){
              this.type = 'text'
              this.buttontext = 'HIDE'
          }
          else{
              this.type = 'password'
              this.buttontext = 'SHOW'
          }
      },
      Login() {
        console.log("Login Details for user",this.loginDetails)
        if(this.loginDetails.username == 'admin' && this.loginDetails.password=="1234567890"){
            this.toast.success("Logged in",{
                        position:'top-right'
            })
            localStorage.setItem('token', this.loginDetails);
            localStorage.setItem('isLoginUser', this.loginDetails.username);
            // window.location.href = "/admin/productlist"
            this.$router.push({path:'/admin'})
        }
        else {
            this.toast.error("Login credentials are incorrect",{
                        position:'top-right'
            })
        }
      }
    },
  
    created() {
          
    }
  })
</script>
<style  scoped>
template{
  padding:2%;
}
img{
    width: 50%;
}

input{
    border-bottom:none;
}
.sign-up {
  display: flex;
  align-items: center;
  background-color: #F2F2F2;
  min-height: calc( 100vh - 50px);
  background-color: #F2F2F2;
}

.signup-screen {
  width: 450px;
  display: table;
  margin: 0 auto;
  /* background-color: #f2f2f2; */
  background: white;
  padding: 32px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 2px #e5e5e5;
}

.signup-screen .login-with-google {
  height: 40px;
  line-height: 40px;
  border: 1px solid #858585;
  border-radius: 5px;
  text-align: center;
  margin: 20px 0px 30px 0px;
  cursor: pointer;
}

.signup-screen .login-with-google img {
  display: initial;
}

.signup-screen .or {
  font-size: 15px;
  text-align: center;
  margin-bottom: 30px;
  color: #000000;
  font-family: 'Barlow', sans-serif;
}
.signup-screen input {
  border-color: transparent;
  box-shadow: none;
  border-bottom-color: #ccc;
  border-radius: 0;
  padding: 0;
  border-width: 0.5px;
}

.signup-screen .show-password {
  float: right;
  margin-top: 0px;
  cursor: pointer;
  color: #d83334;
  font-size: 12px;
  text-transform: capitalize;
  padding-right: 2px;
  position: relative;
  z-index: 1;
}
/* @media(max-width:768px){
    .show-password{
        margin-top:-24px;
    }
} */
.signup-screen .sign-in-btn {
  height: 40px;
  /* background: #f36; */
  border: none;
  width: 100%;
  background: #d83334;
  float: unset;
  /* text-transform: uppercase; */
  border-radius: 5px;
  letter-spacing: 3.75px;
  font-weight: normal;
  font-size: 12px;
  margin-top: 15px;
  opacity: 1;
  font-family: 'Barlow', sans-serif;
}
.signup-screen .forgot-password {
  color: #d83334;
  text-align: center;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
}
.signup-screen .create-account {
  color: #000000;
  text-align: center;
  padding: 15px;
  font-size: 12px;
  font-family: 'Barlow', sans-serif;
}
.signup-screen .create-account span {
  /*color: #f36;*/
  color: #d83334;
  cursor: pointer;
}

/* for mobile phones  */

@media only screen and (max-width: 768px) {
  .signup-screen {
    width: 100%;
  }
  /* .show-password{
        margin-top:-24px;
    } */
}

.img-responsive{
  display: block;
  max-width: 36%;
  height: auto;
  margin-bottom: 32px;
  margin-left: 32%;
}
</style>