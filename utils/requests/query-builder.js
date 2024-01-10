class QueryBuilder {
  keyword = '';
  pagination = '';
  filters = ''
  
  withKeyword(keyword) {
    this.keyword = keyword ? `keyword=${keyword}` : ''
    return this
  }

  withPagination(page) {
    this.pagination = page ? `page=${page}` : ''
    return this
  }

  withFilters(filters) {
    let query = ''
    if (filters) {
      const keys = Object.keys(filters)
      
      keys.forEach((key, index) => {
        console.log(index, keys.length, index === keys.length - 1)
        query += filters[key] ? `${key}=${filters[key]}&` : ''
      })
    }
    this.filters = query ? query : ''
    return this
  }

  build() {
    let query = `&${this.pagination}`

    if (this.keyword) {
      query += `&${this.keyword}`
    }

    if (this.filters) {
      query += `&${this.filters}`
    }
    console.log(query)
    return query
  }
}

export default QueryBuilder
