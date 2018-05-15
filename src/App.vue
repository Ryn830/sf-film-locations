<template>
  <div id="app">
    <control-bar
      v-on:sort="capture_sort_criteria"
      v-on:search="handle_search"
    >
  </control-bar>
    <list
      :movies="displayed_movies"
      v-on:next-page="update_movies"
    >
    </list>
  </div>
</template>

<script>
  import { get } from 'axios'
  import { chunk } from 'lodash'
  import ControlBar from './ControlBar.vue'
  import List from './List.vue'

  export default {
    name: 'app',
    components: {
      ControlBar,
      List
    },
    data: function () {
      return {
        constants: {
          movie_url: 'https://data.sfgov.org/resource/wwmu-gmzc.json'
        },
        all_movies: [],
        all_displayed_movies: [],
        movie_page: 0,
        displayed_movies: [],
        sort_functions: {
          default_order: (a, b) => { return a['default_order'] - b['default_order'] },
          release_year: (a, b) => { return b['release_year'] - a['release_year'] },
          title: (a, b) => {
            if (a['title'] < b['title']) return -1
            if (a['title'] > b['title']) return 1
            return 0
          }
        },
        sort_criteria: []
      }
    },
    mounted: function () {
      get(this.constants.movie_url)
        .then(({ data }) => {
          this.all_movies = data.map((movie, index) => {
            return Object.assign(movie, { default_order: index })
          })
          this.process_movies_for_display()
        })
        .catch(console.error)
    },
    methods: {
      update_movies: function () {
        if (this.movie_page === this.all_displayed_movies.length - 1) this.movie_page = -1
        this.movie_page++
        this.displayed_movies = this.all_displayed_movies[this.movie_page]
      },
      capture_sort_criteria: function (sort_term, toggle) {
        if (toggle) {
          this.sort_criteria.push(sort_term)
        } else {
          let index = this.sort_criteria.indexOf(sort_term)
          this.sort_criteria.splice(index, 1)
        }
        this.sort_movies()
        this.process_movies_for_display()
      },
      process_movies_for_display: function () {
        this.movie_page = 0
        this.all_displayed_movies = chunk(this.all_movies, 25)
        this.displayed_movies = this.all_displayed_movies[this.movie_page]
      },
      sort_movies: function () {
        // TODO: Move this into it's own functional module
        if (!this.sort_criteria.length) {
          this.all_movies.sort(this.sort_functions.default_order)
        } else if (this.sort_criteria.length === 1) {
          this.all_movies.sort(this.sort_functions[this.sort_criteria[0]])
        } else {
          let group_by_year = this.all_movies.reduce((index, movie) => {
            index[movie['release_year']] = index[movie['release_year']] || []
            index[movie['release_year']].push(movie)
            return index
          }, {})
          Object.values(group_by_year).forEach(year => year.sort(this.sort_functions.title))
          this.all_movies = Object.keys(group_by_year).sort().reverse().reduce((all, year) => {
            return all.concat(...group_by_year[year])
          }, [])
        }
      },
      handle_search: function (substring) {
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    background-color: yellow;
  }

  /* For Phones */
  @media (max-width: 600px) {
    #app {
      display: flex;
      flex-flow: column;
      font-family: 'Helvetica';
    }
  }

  /* For Tablets */
  @media (max-width: 800px) {

  }

  /* For Monitors */
  @media (min-width: 801px) {

  }
</style>
