import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import App from './components/App'
import fragmentMatcher from './utils/fragmentMatcher'

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
  cache,
  link: new HttpLink(),
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    operation.setContext({
      headers: { authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
    })
  },
})

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
)

ReactDOM.render(ApolloApp(App), document.getElementById('root'))
