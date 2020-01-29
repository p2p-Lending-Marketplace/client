import React, {  useEffect } from 'react'
import Navigation from './navigation'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './API/graphAPI'

import { Notifications } from 'expo'

export default function App() {
  useEffect(() => {
    Notifications.addListener(({ data }) => {
      navigation.navigate('ApplicationDetail', { id: data.application_id })
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  )
}
