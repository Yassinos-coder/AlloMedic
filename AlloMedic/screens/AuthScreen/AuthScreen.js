import { SafeAreaView } from 'react-native-safe-area-context'
import {AuthStyles} from './AuthStyles'
import React from 'react'
import { Text } from 'react-native'

const AuthScreen = () => {
  return (
    <SafeAreaView> 
      <Text style={AuthStyles.text}> Auth Screen </Text>
    </SafeAreaView>
  )
}

export default AuthScreen