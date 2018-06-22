import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const EdgeComponent = ({ edge: { textMatches, node: { title, url } } }) => {
  return (
    <div>
      <a href={url}><h3>{title}</h3></a>
      <ul>
        {textMatches.map(({ fragment, highlights }, i) => {
          let startingIndice = 0
          const strings = highlights.map(({ beginIndice, endIndice }) => {
            const unHighlighted = fragment.slice(startingIndice, beginIndice);
            const highlighted = fragment.slice(beginIndice, endIndice);
            startingIndice = endIndice;
            return (<Fragment>{unHighlighted} < mark > {highlighted}</mark></Fragment>)
          })

          return <li>{strings}{fragment.slice(startingIndice)}</li>
        })}
      </ul>
    </div>
  )
}


const App = () => (
  <Query query={SEARCH} variables={{}}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return <div>
        {data.search.edges.map(edge => <EdgeComponent edge={edge} key={edge.cursor} />)}
      </div>
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
