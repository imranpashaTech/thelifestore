<template>
  <div id="app">
        <title>Abc dhte sfdasdf</title>
        <app-nav></app-nav>
        <router-view :key="$route.fullPath"/>
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
 
  }
}
</script>

<style>

</style>
