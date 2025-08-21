const Search = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
  const onChangeTerm = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search Icon" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => onChangeTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search