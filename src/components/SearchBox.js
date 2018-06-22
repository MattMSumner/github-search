import React from 'react'

const SearchBox = ({ query, updateQuery }) => (
  <input
    value={query || ''}
    onChange={e => {
      updateQuery(e.target.value)
    }}
  />
)

export default SearchBox
