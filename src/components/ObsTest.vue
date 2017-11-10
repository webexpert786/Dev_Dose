<template>
  <div class="obs">

      <div style="text-align: center; padding: 10px; width: 400px; height: 400px; background-color: red;">
        <p class="title">{{ text }}</p>
      </div>

  </div>
</template>

<script>
/* global firebase */

export default {
  name: 'ObsTest',
  data () {
    return {
      text: 'Loading...'
    }
  },
  beforeDestroy () {
    if (this.firestore_unsubscribe) {
      this.firestore_unsubscribe()
    }
    document.body.classList.remove('obs')
  },
  mounted () {
    document.body.classList.add('obs')
    var db = firebase.firestore()
    this.firestore_unsubscribe = db.collection('obs_test').doc('obs')
    .onSnapshot((doc) => {
      if (doc && doc.data()) {
        this.text = doc.data().text
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
