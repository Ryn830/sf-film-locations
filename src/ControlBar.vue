<template lang='html'>
  <div class='control-bar'>
    <div class='app-title'>Movies Filmed in SF</div>
    <div class='control-container'>
      <input
        type='text'
        placeholder='Search Titles, Years'
        class='search-box'
        @keyup='(event) => { $emit("search", event.target.value) }'
      />
      <div class='sorting-container'>
        <label class='sort-label'>Sort movies</label>
        <div class='checkbox-container'>
          <input
            type='checkbox'
            class='checkbox'
            v-model='sort_year'
            @click='() => { $emit("sort", "release_year", !sort_year) }'
          />
          <label>by Year</label>
        </div>
        <div class='checkbox-container'>
          <input
            type='checkbox'
            class='checkbox'
            v-model='sort_title'
            @click='() => { $emit("sort", "title", !sort_title) }'
          />
          <label>by Title</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sort_year: false,
        sort_title: false
      }
    }
  }
</script>

<style lang='css'>
  @import './styles/control_bar/control_bar.mobile.css';
  @import './styles/control_bar/control_bar.tablet.css';
  @import './styles/control_bar/control_bar.desktop.css';
</style>
