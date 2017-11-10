<template>

  <div>
    <span class="icon" v-show="loading"><i class="fa fa-spinner fa-pulse fa-fw"></i></span>
    <facebook-page v-for="page in pages" v-bind:key="page.id" v-bind:page="page"></facebook-page>
  </div>

</template>

<script>
import FacebookPage from '@/components/subscriptions/FacebookPage'

export default {
  name: 'FacebookSubscriptions',
  data () {
    return {
    }
  },
  components: {
    'facebook-page': FacebookPage
  },
  computed: {
    pages () {
      return this.$store.state.facebook.pages
    },
    loading () {
      return !this.$store.state.facebook.ready || this.$store.state.facebook.logging_in || this.$store.state.facebook.loading_pages
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
