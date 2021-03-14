<template>
  <div id="app" class="bgprimary">
        <title>Abc dhte sfdasdf</title>
        <app-nav></app-nav>
        <router-view   :key="$route.fullPath"/>
        <app-footer></app-footer>
        <!-- <router-view name="Home" :productLists="productList"></router-view> -->
  </div>
</template>

<script>
import footer from '@/components/layout/footer'
import nav from '@/components/layout/nav'


export default {
  name: 'App',
  components: {
    'app-footer': footer,
    'app-nav': nav
  },
  data() {
      return {
        
      }
    },
  created() {
    document.title = "life. Online Shopping site for sustainable, eco-friendly, ethical/fair trade, healthy/organic and handcrafted products - lifethestore.com";
  }
}
</script>

<style>

</style>
