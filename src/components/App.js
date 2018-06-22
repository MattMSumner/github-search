import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const App = () => (
  <Query query={SEARCH}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return <div>{data.search.keys}</div>
    }}
  </Query>
)

const SEARCH = gql`
  query searchIssues {
    search(query: "thoughtbot", type: ISSUE, first: 100) {
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
        }
      }
    }
  }
`

export default App
