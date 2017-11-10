<template>

  <nav class="navbar is-warning" style="background-color: #fffb77;" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item" style="background-color: #fffb77;" >
        <img src="../assets/dose.png" alt="Dose Insights logo"> <span style="color: #29384b; font-size: 28px; padding-left: 0px; position: relative; top: 1px; font-weight: 600;">Live</span>
      </router-link>

      <button class="button navbar-burger" v-on:click="expand_hamburger_menu = !expand_hamburger_menu" v-bind:class="{ 'is-active': expand_hamburger_menu }">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

    <!-- This "nav-menu" is hidden on mobile -->
    <!-- Add the modifier "is-active" to display it on mobile -->
    <div class="navbar-menu" v-bind:class="{ 'is-active': expand_hamburger_menu }">

      <div class="navbar-start">
      <!-- navbar items -->
      </div>

      <div class="navbar-end">
        <span class="navbar-item" v-if="user">
          {{ user.email }}
        </span>

        <span class="navbar-item" v-if="facebook_user">
          <img v-if="facebook_avatar" v-bind:src="facebook_avatar" />
        </span>

        <a v-show="user" v-on:click="logout" class="navbar-item"><span class="icon" v-show="$store.state.auth.logging_out">
          <i class="fa fa-spinner fa-pulse fa-fw"></i>
        </span>
        <span>
          Logout
        </span></a>

        <router-link to="/login" v-show="!user && $router.currentRoute.path != '/login'" class="navbar-item">Login</router-link>
        
      </div>

    </div>

    <div id="popup_blocker_aid" v-show="!facebook_user && $store.state.facebook.logging_in" style="color: black;">
      Stuck? Please disable any adblockers, allow the facebook popup window, and then refresh your browser <i class="fa fa-arrow-up"></i>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      expand_hamburger_menu: false
    }
  },
  watch: {
    '$route' () {
      // Collapse menu on navigation
      this.expand_hamburger_menu = false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/goLogout', {})
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    facebook_user () {
      return this.$store.state.facebook.user
    },
    facebook_avatar () {
      if (this.user) {
        return 'https://graph.facebook.com/' + this.facebook_user.id + '/picture?type=normal'
      }
      return ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#popup_blocker_aid {
    position: absolute;
    top: 5px;
    right: 100px;
    color: white;
    width: 100%;
    text-align: center;
}
</style>
