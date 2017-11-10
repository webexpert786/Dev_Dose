<template>

  <div>

    <div class="box facebook-page">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img v-if="picture" v-bind:src="picture" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ page.name }}</strong> <small>{{ page.id }}</small>
              <br>
              <span class="icon" v-show="page.loading">
                <i class="fa fa-spinner fa-pulse fa-fw"></i>
              </span>
              <span v-show="!page.loading">

              </span>
              <span v-show="page.error" class="has-text-danger">
                <span class="icon"><i class="fa fa-exclamation-triangle"></i></span>
                <span>{{ page.error }}</span>
              </span>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left" v-show="!page.loading">
              <a class="level-item" v-show="!page.subscribed">
                <button class="button is-small is-primary" v-on:click="subscribe">
                  <span class="icon" v-show="!page.subscribing"><i class="fa fa-plus"></i></span>
                  <span class="icon" v-show="page.subscribing"><i class="fa fa-spinner fa-pulse fa-fw"></i></span>
                  <span>Install Dose Live</span>
                </button>
              </a>
              <a class="level-item" v-show="page.subscribed">
                <button class="button is-small is-danger" v-on:click="unsubscribe">
                  <span class="icon" v-show="!page.unsubscribing"><i class="fa fa-times"></i></span>
                  <span class="icon" v-show="page.unsubscribing"><i class="fa fa-spinner fa-pulse fa-fw"></i></span>
                  <span>Uninstall Dose Live</span>
                </button>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>

  </div>

</template>

<script>
const _ = require('lodash')

export default {
  name: 'FacebookPage',
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    subscribe () {
      this.$store.dispatch('facebook/goSubscribeToPage', {page: this.page})
      .then(() => {
        console.log('subscribed')
      })
    },
    unsubscribe () {
      this.$store.dispatch('facebook/goUnsubscribeFromPage', {page: this.page})
      .then(() => {
        console.log('unsubscribed')
      })
    }
  },
  computed: {
    picture () {
      if (_.has(this.page, 'picture.data.url')) {
        return this.page.picture.data.url
      }
      return ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.facebook-page {
  margin-bottom: 10px;
}
</style>
