<template>
    <div class="obs">
        <router-link to="Trivia">Trivia</router-link>
        <router-link to="GamesScreen">Team trivia</router-link>
        
    </div>
</template>

<script>
/* global firebase */
export default {
  name: 'GamesScreen',
  data () {
    return {
      persons: firebase.firestore().collection('games')
    }
  },
  beforeDestroy () {
    if (this.firestore_unsubscribe) {
      this.firestore_unsubscribe()
    }
    document.body.classList.remove('obs')
  },
  mounted () {
    console.log(this.persons)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
