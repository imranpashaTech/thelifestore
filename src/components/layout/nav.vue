<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
        <div class="row navbar col-12 col-lg-10 m-auto">
            <router-link  to="/" class="navbar-brand" href="">The Life</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    
                    <li class="nav-item">
                        <router-link  class="nav-link" to="/about">About</router-link>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                        </a>
                        <div class="dropdown-menu dropdown-content" aria-labelledby="navbarDropdownMenuLink">
                            <div >
                                <div class="row" style="width:1000px;">
                                    <div class="col-md-4">
                                        <h4><a class="dropdown-item" href="#">Cherial mask</a></h4>
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                    <div class="col-md-4">
                                        <h4><a class="dropdown-item" href="#">Cherial mask</a></h4>
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                    <div class="col-md-4">
                                        <h4><a class="dropdown-item" href="#">Cherial mask</a></h4>
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                    
                                </div>
                               
                            </div>
                        
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" to="/catagory/art & craft">ART & CRAFT</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" to="/catagory/clothing">CLOTHING</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" to="/blog/home">BLOG</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link  class="nav-link" to="/Contact">CONTACT</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
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
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: cal(100vw -10%);
  left: 0;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
</style>