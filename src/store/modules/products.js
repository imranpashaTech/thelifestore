import shop from '@/api/shop'

export default {

    namespaced: true,

    state:{
        products:[],
        // cart:[],
        // checkoutStatus: null
    },

    // getters
    getters: {
        availableProducts (state, getters) {
           return state.products.filter(product => product.inventory > 0)
        },

       
        productIsInStock () {
            return (product) => {
                return product.inventory > 1
            }
        },
    },

    // actions
    actions: {
        fetchProducts ({ commit }) {
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve();
                });
            });
        },
        
        
    },

    // mutations
    mutations: {
        setProducts (state, products) {
            state.products = products
        },

        // incrementItemQuantity (state, cartItem) {
        //     cartItem.quantity++;
        // },

        decrementItemQuantity (state, product) {
            product.inventory--;
        },

    
    }
}