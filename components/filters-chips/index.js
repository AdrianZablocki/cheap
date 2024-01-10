const FiltersChips = ({ filters, setFilters }) => {
  return (
    <div>
      
      {
        Object.keys(filters)?.map((key, index) => {
          if (filters[key]) {
            return <span key={`filter-${key}`}>
              {filters[key]} <button type="button" onClick={() => setFilters({...filters, [key]: ''})}>X</button>
            </span>
          }
        })
      }

    </div>
  )
}

export default FiltersChips
