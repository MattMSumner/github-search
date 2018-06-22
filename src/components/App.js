import React, { Component } from 'react'
import SearchBox from './SearchBox'
import ResultView from './ResultView'

class App extends Component {
  state = {
    query: null,
  }

  updateQuery = query => {
    this.setState({
      query,
    })
  }

  render() {
    const { query } = this.state
    return (
      <div>
        <SearchBox query={query} updateQuery={this.updateQuery} />
        {query && <ResultView query={query} />}
      </div>
    )
  }
}

export default App
