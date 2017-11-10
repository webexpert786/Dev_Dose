<template>
  <footer class="footer">
    <div class="container">
        <div class="content has-text-centered">
        <p>
          {{ project_id }}
        </p>
        </div>
    </div>
    </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {}
  },
  computed: {
    project_id () {
      return this.$store.state.auth.project_id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>