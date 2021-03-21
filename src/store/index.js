import Vue from 'vue'
import Vuex from 'vuex'
// import shop from '@/api/shop'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        cart,
        products
    },

    state:{
        // products:[],
        // cart:[],
        // checkoutStatus: null
    },

    // getters
    getters: {
        // availableProducts (state, getters) {
        //    return state.products.filter(product => product.inventory > 0)
        // },

        // cartProducts (state) {
        //    return state.cart.map(cartItem => {
               
        //         const product = state.products.find(product => product.id === cartItem.id);

        //        return {
        //            title: product.title,
        //            price: product.price,
        //            quantity: cartItem.quantity
        //        }
        //    })
        // },

        // cartTotal (state, getters) {
        //     return getters.cartProducts.reduce((total,product) => total + product.price * product.quantity, 0);
        // },

        // productIsInStock () {
        //     return (product) => {
        //         return product.inventory > 1
        //     }
        // },
    },

    // actions
    actions: {
        // fetchProducts ({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         shop.getProducts(products => {
        //             commit('setProducts', products)
        //             resolve();
        //         });
        //     });
        // },
        
        // addProductToCart({state, getters, commit}, product){
        //     if (getters.productIsInStock(product)) {

        //         const cartItem = state.cart.cart.find(item => item.id === product.id);
        //         if (!cartItem) {
        //             commit('pushProductToCart',product.id);
        //         } else {
        //             commit('incrementItemQuantity',cartItem);
        //         }   

        //         commit('decrementItemQuantity',product);
        //     }
        // },

        // checkout({state,commit}){
        //     shop.buyProducts(
        //         state.cart,

        //         () => {

        //             commit('emptyCart');

        //             commit('setCheckoutStatus', 'success');

        //         },

        //         () => {

        //             commit('setCheckoutStatus', 'fail');

        //         }
        //     )
        // }

        
    },

    // mutations
    mutations: {
        // setProducts (state, products) {
        //     state.products = products
        // },

        // pushProductToCart (state, productId) {
        //     state.cart.cart.push({
        //         id: productId,
        //         quantity: 1
        //     })
        // },
        
        // incrementItemQuantity (state, cartItem) {
        //     cartItem.quantity++;
        // },

        // decrementItemQuantity (state, product) {
        //     product.inventory--;
        // },

        // emptyCart (state) {
        //     state.cart = [];
        // },

        // setCheckoutStatus (state, status) {
        //     state.checkoutStatus = status;
        // },
    
    }

})