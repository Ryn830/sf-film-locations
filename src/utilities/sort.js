const sort_functions = {
  default_order: (a, b) => { return a['default_order'] - b['default_order'] },
  release_year: (a, b) => { return b['release_year'] - a['release_year'] },
  title: (a, b) => {
    if (a['title'] < b['title']) return -1
    if (a['title'] > b['title']) return 1
    return 0
  }
}

module.exports.sort_movies = function (list, criteria) {
  if (!criteria.length) {
    return list.sort(sort_functions.default_order)
  } else if (criteria.length === 1) {
    return list.sort(sort_functions[criteria[0]])
  } else {
    let group_by_year = list.reduce((index, movie) => {
      index[movie['release_year']] = index[movie['release_year']] || []
      index[movie['release_year']].push(movie)
      return index
    }, {})
    Object.values(group_by_year).forEach(year => year.sort(sort_functions.title))
    return Object.keys(group_by_year).sort().reverse().reduce((all, year) => {
      return all.concat(...group_by_year[year])
    }, [])
  }
}
