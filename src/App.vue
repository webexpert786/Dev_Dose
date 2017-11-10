<template>
  <div id="app">
    <app-header v-show="!$router.currentRoute.path.startsWith('/obs/')"></app-header>
    <router-view/>
    <app-footer v-show="!$router.currentRoute.path.startsWith('/obs/')"></app-footer>
  </div>
</template>

<script>
import header from '@/components/Header'
import footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    'app-header': header,
    'app-footer': footer
  }
}
</script>

<style>
/* Important For OBS BrowserSource overlays. Keep these: */
html {
  background-color: transparent;
}
body.obs {
  background-color: transparent;
  overflow: hidden;
}
body.obs::-webkit-scrollbar { 
  width: 0 !important 
}
</style>
