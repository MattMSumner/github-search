import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export default fragmentMatcher
