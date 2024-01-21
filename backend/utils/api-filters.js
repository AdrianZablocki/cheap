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

  sort() {
    const sort = {[this.queryStr.sortBy]: Number(this.queryStr.sortDir)}
    if (Object.keys(sort).length) {
      this.query = this.query.sort(sort)      
    }
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }
    const removeFields = ['keyword', 'page', 'sortBy', 'sortDir']
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
