import React from 'react'
import Navigation from './navigation'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './API/graphAPI'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  )
}
