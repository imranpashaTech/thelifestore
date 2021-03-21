import shop from '@/api/shop'

export default {

    namespaced: true,

    state:{
        cart:[],
        checkoutStatus: null
    },

    // getters
    getters: {

        cartProducts (state, getters, rootState) {
           return state.cart.map(cartItem => {
               
                const product = rootState.products.products.find(product => product.id === cartItem.id);

               return {
                   title: product.title,
                   price: product.price,
                   quantity: cartItem.quantity
               }
           })
        },

        cartTotal (state, getters) {
            return getters.cartProducts.reduce((total,product) => total + product.price * product.quantity, 0);
        },
    },

    // actions
    actions: {
        
        addProductToCart({state, getters, commit, rootGetters}, product){
            if (rootGetters['products/productIsInStock'](product)) {

                const cartItem = state.cart.find(item => item.id === product.id);
                if (!cartItem) {
                    commit('pushProductToCart',product.id);
                } else {
                    commit('incrementItemQuantity',cartItem);
                }   

                commit('products/decrementItemQuantity',product,{root: true});
            }
        },

        checkout({state,commit}){
            shop.buyProducts(
                state.cart,

                () => {

                    commit('emptyCart');

                    commit('setCheckoutStatus', 'success');

                },

                () => {

                    commit('setCheckoutStatus', 'fail');

                }
            )
        }

        
    },

    
    // mutations
    mutations: {
        // setProducts (state, products) {
        //     state.products = products
        // },

        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        
        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++;
        },

        // decrementItemQuantity (state, product) {
        //     product.inventory--;
        // },

        emptyCart (state) {
            state.cart = [];
        },

        setCheckoutStatus (state, status) {
            state.checkoutStatus = status;
        },
    
    }
}
