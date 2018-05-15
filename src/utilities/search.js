const Fuse = require('fuse.js')

const options = {
  caseSensitive: true,
  threshold: 0.4,
  location: 0,
  distance: 10,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "release_year"
  ]
}

let index = null

module.exports.index_movies = function (records) {
  index =  new Fuse(records, options)
}

module.exports.search_movie_index = function (target) {
  return index.search(target)
}
