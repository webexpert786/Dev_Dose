<template>
  <section class="section">
    <div class="container is-fluid">
      <router-link to="Create">Create Game</router-link>
      <!-- <router-link to="GamesScreen">GamesScreen</router-link> -->
    </div>
  </section>
</template>

<script>
import FacebookSubscriptions from '@/components/subscriptions/FacebookSubscriptions'

export default {
  name: 'Trivia',
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
