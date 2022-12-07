import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Styles } from './lib/constants'
import { ThemeProvider, createTheme } from '@rneui/themed';
import { UserContextProvider, useUser } from './components/UserContext'
import Auth from './components/Auth'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home'
import TodoList from './components/TodoList';
import SnippetView from './components/SnippetView';
import RecentBooks from './components/RecentBooks';

//the main issue here: We don't have the useContextProvider wrapped around <TodoList> which means we lose Context 

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});



const Login = ({navigation} : any) => {
  const { user } = useUser()
  return user ? <Home navigation={navigation}/> : <Auth />
}


const Container = ({navigation} : any) => {
  return (
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <Login navigation={navigation}/>
            <StatusBar style="auto" />
          </View>
        </ThemeProvider>
    </UserContextProvider>
  )
} 



const Reader = ({navigation} : any) => {
  
  return <TodoList navigation={navigation}/>
}



const Content = ({navigation} : any) => {
  console.log('navigation in Content')
  return (
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <Reader navigation={navigation}/>
            <StatusBar style="auto" />
          </View>
        </ThemeProvider>
    </UserContextProvider>
  )
}

const Current = ({navigation} : any) => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <SnippetView navigation={navigation}/>
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
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
        <Stack.Screen name="Home" component={Container} />
        <Stack.Screen name="Snippets" component={Content}/>
        <Stack.Screen name="CurrentBook" component={Current} />
        <Stack.Screen name="RecentBooks" component={RecentBooks}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: Styles.spacing,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
})
