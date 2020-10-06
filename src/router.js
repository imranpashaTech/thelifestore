
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Router from 'vue-router'

Vue.use(VueRouter);

// component
import Login from "@/components/authentication/login";
import Reg from "@/components/authentication/reg";
import Home from "@/pages/site/Home";
import Product from "@/pages/site/Product";
import catagoryProduct from "@/pages/site/catagoryProduct";
import Aboutus from "@/pages/site/About-us"

import AddProduct from "@/pages/admin/Product";
import ProductList from "@/components/admin/Product-list"
import EditProduct from "@/pages/admin/Edit-Product"
import AddCategory from "@/components/admin/Add-Category"
import AddSubCategory from "@/components/admin/Add-SubCategory"
import AddBrands from "@/components/admin/Add-Brands"
import AdminDashboard from "@/pages/admin/admin-dashboard"

import _404 from "@/pages/404";


export default new VueRouter({
    routes:[
     
      {
          path: '/',
          name: 'Home', 
          component: Home
        },
        {
          path: '/about',
          name: 'About-us',
          component: Aboutus
        },
        {
          path: '/reg',
          name: 'Reg',
          component: Reg
        },
        {
          path: '/catagory/product/:product_id',
          name: 'Product', 
          component:Product
        },
        {
          path: '/catagory/:catagory_name',
          name: 'catagory', 
          component:catagoryProduct
        },
        {
          path:'/admin/login',
          name: 'Login',
          component:Login,
        },   
        {
          path:'/admin',
          name: 'AdminDashboard',
          component:AdminDashboard
        } ,
        {
          path: '/admin/productlist',
          name:'ProductList',
          component:ProductList
        },
        {
          path: '/admin/product/:product_id',
          name: 'AddProduct', 
          component:AddProduct
        },
        {
          path: '/admin/product/edit/:product_id',
          name: 'Edit Product',
          component: EditProduct
        },
        {
          path:'/admin/add-category',
          name: 'AddCategory',
          component:AddCategory
        },
        {
          path:'/admin/add-subcategory',
          name: 'AddSubCategory',
          component: AddSubCategory
        },
        {
          path:'/admin/add-brands',
          name: 'AddBrand',
          component:AddBrands
        },
        { 
          path: '*', 
          name: '_404', 
          component:_404
        }    
    ]
  });
// let router = new Router({
//   routes:[     
//           {
//               path: '/',
//               name: 'Home', 
//               component: Home
//             },
//             {
//               path: '/product/:product_id',
//               name: 'Product', 
//               component:Product
//             },
//             {
//               path:'/admin/login',
//               name: 'Login',
//               component:Login,
//             },    
//             {
//               path: '/admin/productlist',
//               name:'ProductList',
//               component:ProductList,
//               meta: {
//                 requiresAuth: true
//               }
//             },
//             {
//               path: '/admin/product/:product_id',
//               name: 'AddProduct', 
//               component:AddProduct,
//               meta: {
//                 requiresAuth: true
//               }
//             },
//             {
//               path: '/admin/product/edit/:product_id',
//               name: 'Edit Product',
//               component: EditProduct,
//               meta: {
//                 requiresAuth: true
//               }
//             },
//             {
//               path:'/admin/add-category',
//               name: 'AddCategory',
//               component:AddCategory,
//               meta: {
//                 requiresAuth: true
//               }
//             },
//             {
//               path:'/admin/add-subcategory',
//               name: 'AddSubCategory',
//               component: AddSubCategory,
//               meta: {
//                 requiresAuth: true
//               }
//             },
//             {
//               path:'/admin/add-brands',
//               name: 'AddBrand',
//               component:AddBrands,
//               meta: {
//                 requiresAuth: true
//               }
//             },
//             { 
//               path: '*', 
//               name: '_404', 
//               component:_404
//             }    
//         ]
// })

// router.beforeEach((to,from,next)=> {

// })
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     let user = JSON.parse(localStorage.getItem('isLoginUser'))
//     console.log("get teh logged in user helo hello hello",user,localStorage.getItem('isLoginUser'))
//     // if (localStorage.getItem('isLoginUser')) {
//       next()
//       return
//     // }
//     // next('/admin/login')
//   } else {
//     next()
//   }
// })
// export default router