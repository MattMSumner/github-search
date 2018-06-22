import React, { Fragment, Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const EdgeComponent = ({ edge: { textMatches, node: { title, url } } }) => {
  return (
    <div>
      <a href={url}><h3>{title}</h3></a>
      <ul>
        {textMatches.map(({ fragment, highlights }, i) => {
          let startingIndice = 0
          const strings = highlights.map(({ beginIndice, endIndice }, j) => {
            const unHighlighted = fragment.slice(startingIndice, beginIndice);
            const highlighted = fragment.slice(beginIndice, endIndice);
            startingIndice = endIndice;
            return (<Fragment key={j}>{unHighlighted} < mark > {highlighted}</mark></Fragment>)
          })

          return <li key={i}>{strings}{fragment.slice(startingIndice)}</li>
        })}
      </ul>
    </div>
  )
}

class App extends Component {
  state = {
    query: null
  }

  updateQuery = (query) => {
    this.setState({
      query
    })
  }

  render() {
    return (
      <div>
        <SearchBox query={this.state.query} updateQuery={this.updateQuery} />
        {this.state.query &&
          <ResultView query={this.state.query} />
        }
      </div>
    )
  }
}

const SearchBox = ({ query, updateQuery }) => (
  <input
    value={query || ''}
    onChange={(e) => { updateQuery(e.target.value) }}
  ></input>
)

const queryMore = (data, fetchMore) => {
  fetchMore({
    variables: {
      cursor: data.search.edges.slice(-1)[0].cursor
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev;
      return Object.assign({}, prev, {
        search: {
          ...prev.search,
          edges: [...prev.search.edges, ...fetchMoreResult.search.edges]
        }
      });
    }
  })
}

const ResultView = ({ query }) => (
  <Query query={SEARCH} variables={{ query: query }}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return <div>
        <h1>Showing {data.search.edges.length}</h1>
        {data.search.edges.map(edge => <EdgeComponent edge={edge} key={edge.cursor} />)}
        <button onClick={() => queryMore(data, fetchMore)}>Get More!</button>
      </div>
    }}
  </Query>
)

const SEARCH = gql`
  query searchIssues($query: String!, $cursor: String) {
    search(query: $query, type: ISSUE, first: 5, after: $cursor) {
      edges {
        cursor
        textMatches {
          fragment
          highlights {
            beginIndice
            endIndice
            text
          }
          property
        }
        node {
          ... on Issue {
            title
            url
          }
          ... on PullRequest {
            title
            url
          }
        }
      }
    }
  }
`

export default App
