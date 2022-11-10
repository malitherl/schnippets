import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Platform } from 'react-native'
import { colors, Text } from 'react-native-elements'
import { ThemeProvider } from 'styled-components'
import { Styles } from './lib/constants'
import { UserContextProvider, useUser } from './components/UserContext'
import Auth from './components/Auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home'
const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
}

const Container = () => {
  const { user } = useUser()

  return user ? <Home /> : <Auth />
}

const Content = () => {
  return (
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <Container />
            <StatusBar style="auto" />
          </View>
        </ThemeProvider>
    </UserContextProvider>
  )
}



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Content} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
})
