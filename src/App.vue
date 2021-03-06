<template>
  <div id="app">
    <control-bar
      v-on:sort="capture_sort_criteria"
      v-on:search="handle_search"
      v-on:next-page="update_movies"
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
  import uid from 'uid'
  import ControlBar from './ControlBar.vue'
  import List from './List.vue'
  import { sort_movies } from './utilities/sort'
  import { index_movies, search_movie_index } from './utilities/search'

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
        raw_movies: [],
        all_movies: [],
        all_displayed_movies: [],
        movie_page: 0,
        displayed_movies: [],
        sort_criteria: []
      }
    },
    mounted: function () {
      get(this.constants.movie_url)
        .then(({ data }) => {
          this.raw_movies = this.all_movies = data.map((movie, index) => {
            return Object.assign(movie, {
              default_order: index,
              uid: uid(10)
            })
          })
          index_movies(this.raw_movies)
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
      process_movies_for_display: function () {
        this.movie_page = 0
        this.all_displayed_movies = chunk(this.all_movies, 25)
        this.displayed_movies = this.all_displayed_movies[this.movie_page]
      },
      capture_sort_criteria: function (sort_term, toggle) {
        if (toggle) {
          this.sort_criteria.push(sort_term)
        } else {
          this.sort_criteria.splice(this.sort_criteria.indexOf(sort_term), 1)
        }
        this.all_movies = sort_movies(this.all_movies, this.sort_criteria)
        this.process_movies_for_display()
      },
      handle_search: function (substring) {
        this.all_movies = !substring.length ? this.raw_movies : search_movie_index(substring)
        this.all_movies = sort_movies(this.all_movies, this.sort_criteria)
        this.process_movies_for_display()
      }
    }
  }
</script>

<style>
  @import './styles/app.css';
</style>
