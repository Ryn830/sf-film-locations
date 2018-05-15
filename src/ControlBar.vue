<template lang='html'>
  <div class='control-container'>
    <div class='app-title'>Movies Filmed in SF</div>
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
  @media (max-width: 600px) {
    .control-container {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 7rem;
      background-color: #EEEEEE;
    }

    .app-title {
      position: relative;
      top: 4%;
      height: 40%;
      font-size: 1.25rem;
      font-weight: bold;
    }

    .search-box {
      box-sizing: border-box;
      width: 90%;
      margin: 0 5% 0 5%;
    }

    .sorting-container {
      display: flex;
      box-sizing: border-box;
      width: 90%;
      margin: 2% 5% 0 5%;
      font-size: .85rem;
    }

    .sort-label {
      align-self: flex-start;
      width: 45%;
      padding-top: .5%;
    }

    .checkbox-container {
      align-self: flex-end;
      width: 25%
    }
  }
</style>
