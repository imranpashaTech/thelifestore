<template>
 <div class="container h-100">
     <div class="row">
         <nav class="col-10 m-auto navbar fixed-top navbar-expand   lg navbar-light bg-light ">
            <router-link  to="/" class="navbar-brand" href="">The Life</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">About</a> -->
                    <router-link  class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link  class="nav-link" to="/catagory/art & craft">ART & CRAFT</router-link>
                </li>
                <li class="nav-item">
                    <router-link  class="nav-link" to="/catagory/clothing">CLOTHING</router-link>
                </li>
                <li class="nav-item">
                    <router-link  class="nav-link" to="/catagory/abc">BLOG</router-link>
                </li>
                <li class="nav-item">
                    <router-link  class="nav-link" to="/catagory/abc">CONTACT</router-link>
                </li>
                </ul>
            </div>
        </nav>
     </div>
</div>
</template>
<script>

import Vue from 'vue'

// import Homecard from '../../pages/site/Home'


    export default Vue.extend ({  

        data() {
            return {
  
            }
          
        },
        
       
        created() {
            console.log("aaaa");

        },
        
        methods:{
          
        }

   
})
</script>

<style scoped>

</style>