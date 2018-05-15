<template lang='html'>
  <a class='card' :href='link'>
    <div class='title'>{{ title | trim }}</div>
    <div class='year'>{{ year }}</div>
    <div class='location'>{{ location | trim }}</div>
    <div class='director'><div>Directed by:</div>{{ director }}</div>
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
      trim (string) {
        if (string && string.length > 25) {
          return string.slice(0, 25) + '...'
        }
        return string
      }
    }
  }
</script>

<style lang='css'>
  @import './styles/card/card.mobile.css';
  @import './styles/card/card.tablet.css';
  @import './styles/card/card.desktop.css';
</style>
