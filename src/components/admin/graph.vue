<template>
    <div class="brand-container pt-3 mx-auto">
                
        <table id="q-graph">
            <caption>Negative Reviews</caption>
            <thead>
            <tr>
            <th></th>
            <th class="sent">Positive</th>
            <th class="paid">Negative</th>
            </tr>
            </thead>
            <tbody>
            <tr class="qtr" id="q1">
            <th scope="row">week-1</th>
            <td class="sent bar" style="height: 111px;"><p> 
            </p></td>
            <td class="paid bar" style="height: 99px;"><p></p></td>
            </tr>
            <tr class="qtr" id="q2">
            <th scope="row">week-2</th>
            <td class="sent bar" style="height: 206px;"><p></p></td>
            <td class="paid bar" style="height: 194px;"><p></p></td>
            </tr>
            <tr class="qtr" id="q3">
            <th scope="row">week-3</th>
            <td class="sent bar" style="height: 259px;"><p></p></td>
            <td class="paid bar" style="height: 193px;"><p></p></td>
            </tr>
            <tr class="qtr" id="q4">
            <th scope="row">week-4</th>
            <td class="sent bar" style="height: 110px;"><p></p></td>
            <td class="paid bar" style="height: 195px;"><p></p></td>
            </tr>
            </tbody>
        </table>

        <div id="ticks">
        <div class="tick" style="height: 59px;"><p>50</p></div>
        <div class="tick" style="height: 59px;"><p>40</p></div>
        <div class="tick" style="height: 59px;"><p>30</p></div>
        <div class="tick" style="height: 59px;"><p>20</p></div>
        <div class="tick" style="height: 59px;"><p>10</p></div>
        </div>
    </div>
</template>
<script src="vuelidate/dist/vuelidate.min.js"></script>
<script lang="ts">
    import Vue from 'vue'
    import VueToast from 'vue-toast-notification';
    // Import one of available themes
    import 'vue-toast-notification/dist/theme-default.css';
    //import 'vue-toast-notification/dist/theme-sugar.css';
 
    import AddCategoriesService from '../../shared/services/addCategory.service'
    import ProductService from '../../shared/services/product.service'

    const addCategoriesService = new AddCategoriesService();
    const productService = new ProductService();

    Vue.use(VueToast)


    export default { 
    components : {
    },
         data()  {
            return {
                toast:Vue.$toast,
                productList:{},
                addBrands:{},
                brandsList:{},
                brand_name:'',
                brandStatus:Boolean,
                active_status:true,
                validation_status:true,
                sc_id:0,
                mc_id:0,
                isCreate:false,
                selected_brand_id:0,
                selected_brand_name:''
            }
        },
        
        computed: {
            isComplete () {
                if(this.validation_status)
                return this.addBrands.brand_name;
                else return false
            },
            isValidStatus(){
                if(this.validation_status)
                    return  this.selected_brand_name
                else return false
            }
        },
       
        methods: {     
            getvalid(event){
                let value = event.target.value
                var re = new RegExp("^[ A-Za-z_@./#&+-]*$");
                if (re.test(value)) {
                    this.validation_status=true
                } else {
                    this.validation_status=false
                }
            },
            createBrands(){
                let _brandsForm = new FormData()
                    Object.keys(this.addBrands).forEach((key) => {
                        _brandsForm.append(key, this.addBrands[key])
                    })
                addCategoriesService.createBrands(_brandsForm)
                .then(response => {
                    this.addBrands={};
                   console.log("response is reponse is",response);
                    this.toast.success("New brand is added",{
                        position:'top-right'
                    })
                    this.getbrands();
                    this.isCreate=false;
                    // this.$router.go();
                })
                .catch(e => {
                    this.toast.error("Error occured while adding",{
                        position:'top-right'
                    })  
                     this.errors.push(e)
                })

            },
            getbrands(){
                productService.getAdminBrands()
                    .then(response => {
                        this.brandsList = response.data.output.success[0].data 
                        console.log("getBrandsList is",this.brandsList)
                    })
                    .catch(e => {
                    this.errors.push(e)
                    })
            },
            updateBrandActive(brand_id,activeFlag){
                // init
                let obj = {};

                obj['brand_id'] = brand_id;
                obj['status'] = (activeFlag)? 1 : 0;

                let activeStatusText = (activeFlag)? 'Active' : 'Inactive';

                console.log(obj);

                
                productService.activeBrand(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getbrands(0,0);
                   this.toast.success("The brand is now " + activeStatusText,{
                        position:'top-right'
                    })
                    
                })
                .catch(e => {
                    this.toast.error("Main brand or Status is Invalid",{
                        position:'bottom-right'
                    })  
                    this.errors.push(e)
                }) 
            },
            updateBrandName(){
                // init
                let obj = {};

                obj['brand_id'] = this.selected_brand_id;
                obj['brand_name'] = this.selected_brand_name;

                console.log(obj);

                
                productService.updateBrand(obj)
                .then(response => {
                this.productList = response.data.output.success[0].data;
                   this.getbrands(0,0);
                   this.toast.success("The Brand name is updated " ,{
                        position:'top-right'
                    })
                    this.isCreate = false
                })
                .catch(e => {
                    this.toast.error("Brand value is Invalid",{
                        position:'top-right'
                    })  
                    this.errors.push(e)
                }) 
            },
        },
        
         created() {
                productService.getAdminBrands()
                .then(response => {
                    this.brandsList = response.data.output.success[0].data 
                    console.log("getBrandsList is",this.brandsList)
                })
                .catch(e => {
                this.errors.push(e)
                })
         }
    }
</script>

<style  scoped>
  @import '../../style.css';

 body, html {
	height: 100%;
}

body {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: "fira-sans-2", Verdana, sans-serif;
}

#q-graph {
	display: block;
  /* fixes layout wonkiness in FF1.5 */
	position: relative;
	width: 600px;
	height: 300px;
	margin: 1.1em 0 0;
	padding: 0;
	background: transparent;
	font-size: 11px;
}

#q-graph caption {
	caption-side: top;
	width: 600px;
	text-transform: uppercase;
	letter-spacing: .5px;
	top: -40px;
	position: relative;
	z-index: 10;
	font-weight: bold;
}

#q-graph tr, #q-graph th, #q-graph td {
	position: absolute;
	bottom: 0;
	width: 150px;
	z-index: 2;
	margin: 0;
	padding: 0;
	text-align: center;
}

#q-graph td {
	transition: all .3s ease;
}

#q-graph td:hover {
	background-color: #4d4d4d;
	opacity: .9;
	color: white;
}

#q-graph thead tr {
	left: 100%;
	top: 50%;
	bottom: auto;
	margin: -2.5em 0 0 5em;
}

#q-graph thead th {
	width: 7.5em;
	height: auto;
	padding: 0.5em 1em;
}

#q-graph thead th.sent {
	top: 0;
	left: 0;
	line-height: 2;
}

#q-graph thead th.paid {
	top: 2.75em;
	line-height: 2;
	left: 0;
}

#q-graph tbody tr {
	height: 296px;
	padding-top: 2px;
	border-right: 1px dotted #C4C4C4;
	color: #AAA;
}

#q-graph #q1 {
	left: 0;
}

#q-graph #q2 {
	left: 150px;
}

#q-graph #q3 {
	left: 300px;
}

#q-graph #q4 {
	left: 450px;
	border-right: none;
}

#q-graph tbody th {
	bottom: -1.75em;
	vertical-align: top;
	font-weight: normal;
	color: #333;
}

#q-graph .bar {
	width: 60px;
	border: 1px solid;
	border-bottom: none;
	color: #000;
}

#q-graph .bar p {
	margin: 5px 0 0;
	padding: 0;
	opacity: .4;
}

#q-graph .sent {
	left: 13px;
	background-color: #39cccc;
	border-color: transparent;
}

#q-graph .paid {
	left: 77px;
	background-color: #7fdbff;
	border-color: transparent;
}

#ticks {
	position: relative;
	top: -300px;
	left: 2px;
	width: 596px;
	height: 300px;
	z-index: 1;
	margin-bottom: -300px;
	font-size: 10px;
	font-family: "fira-sans-2", Verdana, sans-serif;
}

#ticks .tick {
	position: relative;
	border-bottom: 1px dotted #C4C4C4;
	width: 600px;
}

#ticks .tick p {
	position: absolute;
	left: -5em;
	top: -0.8em;
	margin: 0 0 0 0.5em;
}
</style>


        // <table id="q-graph">
        //     <caption>Negative Reviews</caption>
        //     <thead>
        //     <tr>
        //     <th></th>
        //     <th class="sent">Invoiced</th>
        //     <th class="paid">Collected</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     <tr class="qtr" id="q1">
        //     <th scope="row">week-1</th>
        //     <td class="sent bar" style="height: 111px;"><p> 
        //         <!-- 18 -->
        //     </p></td>
        //     <td class="paid bar" style="height: 99px;"><p>16</p></td>
        //     </tr>
        //     <tr class="qtr" id="q2">
        //     <th scope="row">week-2</th>
        //     <td class="sent bar" style="height: 206px;"><p>34</p></td>
        //     <td class="paid bar" style="height: 194px;"><p>32</p></td>
        //     </tr>
        //     <tr class="qtr" id="q3">
        //     <th scope="row">week-3</th>
        //     <td class="sent bar" style="height: 259px;"><p>43</p></td>
        //     <td class="paid bar" style="height: 193px;"><p>32</p></td>
        //     </tr>
        //     <tr class="qtr" id="q4">
        //     <th scope="row">week-4</th>
        //     <td class="sent bar" style="height: 110px;"><p>18</p></td>
        //     <td class="paid bar" style="height: 195px;"><p>32</p></td>
        //     </tr>
        //     </tbody>
        // </table>