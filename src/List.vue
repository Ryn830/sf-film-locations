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
  @media (max-width: 600px) {
    .list {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      padding: 2% 1% 0 1%;
    }

    .more_results {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 2.5rem;
      cursor: pointer;
      color: blue;
    }
  }
</style>
