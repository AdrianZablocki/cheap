class APIFilters {

  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      searchedFields: {
        $regex: this.queryStr.keyword,
        $options: 'i'
      }
    } : {};
    this.query = this.query.find(keyword);

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr }
    const removeFields = ['keyword', 'page']
    removeFields.forEach(el => delete queryCopy[el])

    this.query = this.query.find(queryCopy)

    return this
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = resPerPage * (currentPage - 1)

    this.query = this.query.limit(resPerPage).skip(skip)

    return this
  }
}

export default APIFilters
