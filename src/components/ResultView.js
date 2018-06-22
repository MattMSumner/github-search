import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Waypoint from 'react-waypoint'

import EdgeComponent from './EdgeComponent'

const queryMore = (data, fetchMore) => {
  fetchMore({
    variables: {
      cursor: data.search.edges.slice(-1)[0].cursor,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev
      return Object.assign({}, prev, {
        search: {
          ...prev.search,
          edges: [...prev.search.edges, ...fetchMoreResult.search.edges],
        },
      })
    },
  })
}

const ResultView = ({ query }) => (
  <Query query={SEARCH} variables={{ query }}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return (
        <div>
          <div>
            <h1>Showing {data.search.edges.length}</h1>
            {data.search.edges.map(edge => (
              <EdgeComponent edge={edge} key={edge.cursor} />
            ))}
          </div>
          <Waypoint onEnter={() => queryMore(data, fetchMore)} />
        </div>
      )
    }}
  </Query>
)

const SEARCH = gql`
  query searchIssues($query: String!, $cursor: String) {
    search(query: $query, type: ISSUE, first: 100, after: $cursor) {
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

export default ResultView
