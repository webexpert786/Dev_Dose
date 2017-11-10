<template>
  <section class="section">
    <div class="container is-fluid">

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Email" v-bind:disabled="$store.state.auth.logging_in" v-model="email">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" placeholder="Password" v-bind:disabled="$store.state.auth.logging_in" v-model="password" v-on:keyup.enter="login">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
        </div>
      </div>

      <div class="notification is-danger" v-show="$store.state.auth.error">
        {{ $store.state.auth.error }}
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" v-on:click="login" v-bind:disabled="$store.state.auth.logging_in">
            <span class="icon" v-show="$store.state.auth.logging_in">
              <i class="fa fa-spinner fa-pulse fa-fw"></i>
            </span>
            <span>
              Login
            </span>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginScreen',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  watch: {
    '$store.state.auth.user' () {
      this.redirect()
    }
  },
  methods: {
    redirect () {
      // Once we have a user, redirect to previous url or /
      if (this.$store.state.auth.user) {
        this.$router.push({path: this.$store.state.auth.login_redirect})
        // Reset redirects after use
        this.$store.commit('auth/setLoginRedirect', {path: '/'})
      }
    },
    login () {
      this.$store.dispatch('auth/goLogin', {
        email: this.email,
        password: this.password
      })
    }
  },
  mounted () {
    this.redirect()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
