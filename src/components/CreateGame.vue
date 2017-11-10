<template>
  <section class="section">
    <div class="container is-fluid">

      <div class="field">
        <label class="label">Game Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Game Name" v-model="name">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">Facebook Page ID</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Facebook Page ID" v-model="page_id">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </div>
      </div>
      <div class="notification is-danger" v-show="$store.state.auth.error">
        {{ $store.state.auth.error }}
      </div>
      <br>
      <div class="field">
        <div class="control">
          <button class="button is-link" v-on:click="create_game">
            <span>
              Save
            </span>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

export default {
  name: 'CreatGame',
  data () {
    return {
      name: '',
      active: false,
      page_id: '',
      air_date: Date.now(),
      is_complete: false,
      post_id: '',
      results: ''
    }
  },
  methods: {
    create_game () {
      this.$store.dispatch('game/create', {
        name: this.name,
        active: this.active,
        page_id: this.page_id,
        air_date: this.air_date,
        is_complete: this.is_complete,
        post_id: this.post_id,
        results: this.results
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .field.answ {
      width: 48%;
      float: left;
      margin: 0 24px 1px 0;
  }
</style>
