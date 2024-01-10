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
    return query
  }
}

export default QueryBuilder
