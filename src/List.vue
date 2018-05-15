<template lang='html'>
  <div class='list-container'>
    <div class='list'>
      <card
        v-for='movie in movies'
        :key='movie.uid'
        :director='movie.director'
        :location='movie.locations'
        :title='movie.title'
        :year='movie.release_year'
      />
    </div>
    <div class='more_results' @click='$emit("next-page")'>
      <div>More</div>
    </div>
  </div>
</template>

<script>
  import Card from './Card.vue'
  export default {
    props: [ 'movies' ],
    components: {
      Card
    }
  }
</script>

<style lang='css'>
  @import './styles/list/list.mobile.css';
  @import './styles/list/list.tablet.css';
  @import './styles/list/list.desktop.css';
</style>
