<template lang='html'>
  <a class='card' :href='link'>
    <div class='title'>{{ title }}</div>
    <div class='year'>{{ year }}</div>
    <div class='location'>{{ location }}</div>
    <div class='director'>{{ director }}</div>
  </a>
</template>

<script>
  export default {
    props: [ 'director', 'location', 'title', 'year' ],
    data () {
      return {
        link: 'https://maps.google.com/?q=' + encodeURI(this.location)
      }
    }
  }
</script>

<style lang='css'>
  @media (max-width: 600px) {
    .card {
      background-color: #EEEEEE;
      box-sizing: border-box;
      border-radius: 1rem 0 1rem 0;
      border: 1px solid #9F9F9F;
      width: 45%;
      height: 4.5rem;
      margin: 1.5%;
      padding: 2.5%;
    }

    .title {
      margin-top: .5rem;
      font-weight: bold;
      font-size: .8rem;
      text-overflow: ellipsis;
    }

    .year {
      margin-top: .25rem;
      color: #797979;
      font-weight: lighter;
      font-size: .75rem;
    }

    .location {
      display: none;
    }

    .director {
      display: none;
    }
  }
</style>
