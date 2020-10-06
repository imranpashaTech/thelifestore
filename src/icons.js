import Vue from 'vue';

// import { library } from '@fortawesome/free-solid-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPencilAlt, faPlusCircle, faPen, faPenAlt, faPencilRuler, faSpinner, faPlus, faLongArrowAltLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

// we need to access all icons 
// import { fas} from '@fortawesome/free-solid-svg-icons'
// library.add(fas)
library.add(faPencilAlt, faPen, faPenAlt, faPencilRuler,faSpinner,faPlusCircle,faPlus,faLongArrowAltLeft,faPlusSquare)

Vue.component('fa-icon', FontAwesomeIcon)