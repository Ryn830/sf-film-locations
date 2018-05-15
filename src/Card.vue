<template lang='html'>
  <a class='card' :href='link'>
    <div class='title'>{{ title | trim }}</div>
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
    },
    filters: {
      trim (title) {
        if (title.length > 20) {
          return title.slice(0, 20) + '...'
        }
        return title
      }
    }
  }
</script>

<style lang='css'>
  @import './card.mobile.css';
  @import './card.tablet.css';
  @import './card.desktop.css';
</style>
