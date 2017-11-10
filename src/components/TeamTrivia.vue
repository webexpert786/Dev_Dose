<template>
  <section class="section">
    <div class="container is-fluid">
      
      <h4 class="title is-4">Step 1 : Install Dose Live On Facebook Pages</h4>

      <facebook-subscriptions></facebook-subscriptions>
      <p>&nbsp</p>

      <h4 class="title is-4">Step 2 : Create a Game</h4>

      
      <!-- only show the following link if user has at least one subscribed fb page -->
      <div v-show="$store.state.facebook.subscribed_pages.length > 0">
        <div>TODO - create link to a new GamesScreen component <a href="https://trello.com/c/uDIgflO5/8-implement-vue-components-to-allow-user-to-list-create-update-delete-games">as described on trello</a></div>
      </div>
      <div v-show="!$store.state.facebook.subscribed_pages.length > 0">
        <div>You must install the Dose Live app on at least one of your pages above before you can create a game.</div>
      </div>
      <p>&nbsp</p>

      <h4 class="title is-4">Development/Testing</h4>

      <router-link to="/obs/test">OBS Test</router-link>
      <router-link to="GamesScreen">GamesScreen</router-link>

    </div>
  </section>
</template>

<script>
import FacebookSubscriptions from '@/components/subscriptions/FacebookSubscriptions'

export default {
  name: 'LoginScreen',
  watch: {
    '$store.state.auth.user' () {
      // If user logs out while on this screen, go to login
      if (!this.$store.state.auth.user) {
        this.$router.push({path: '/login'})
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
    'facebook-subscriptions': FacebookSubscriptions
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
