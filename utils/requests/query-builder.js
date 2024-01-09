class QueryBuilder {
  keyword = '';
  pagination = '';
  
  withKeyword(keyword) {
    this.keyword = keyword ? `keyword=${keyword}` : ''
    return this
  }

  withPagination(page) {
    this.pagination = page ? `page=${page}` : ''
    return this
  }

  build() {
    let query = `&${this.pagination}`

    if (this.keyword) {
      query += `&${this.keyword}`
    }
    console.log(query)
    return query
  }
}

export default QueryBuilder
