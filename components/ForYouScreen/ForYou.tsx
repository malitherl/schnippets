import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from '@rneui/base'
import { Styles } from '../../lib/constants'
import { supabase } from '../../lib/initSupabase'
import { useUser } from '../UserContext'
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'
import Like from './Like'
import ReaderView from './ReaderView'
import backendService from '../../services/backend'


type Paragraph = {
  num: number 
  paragraph: string
}
 
type Snippet = {
  id: number
  created_at: Date
  isbn: string
  snippet: string
}

export default function TodoList({navigation} : any) {
  const { user } = useUser()
  const indicesForBooks = [121, 33, 26]
  const [snippets, setSnippet] = useState<Array<Snippet>>([])
  const [paragraphs, setParagraphs] = useState<Array<Paragraph>>([]);
  const [texts, setTexts] = useState<Array<String>>([])
   useEffect(() => {
     setParagraphs([])
     indicesForBooks.forEach(i =>  
        backendService
        .fetchParagraphs(i)
        .then(p => {
            setParagraphs(prevState => prevState.concat(p!))
          })
        )
   }, [])

   const handleLike = (id: number) => {
      backendService
      .isLiked(id, user!)
      .then(like => like)
   }

  return (
    <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerNav}>
              <Text onPress={() => navigation.goBack()}>back </Text>
              <Text > For You </Text>
           </View>  
          </View>
          <View 
             style={styles.snippetList}
            > 
            <ReaderView handleLike={handleLike} snippets={paragraphs} isLiked={true}/>
          </View>
        </View>
      </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    padding: Styles.spacing,
    backgroundColor: "transparent",

  },
  header: {
    backgroundColor: "transparent",
    color: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1, 
  },
  headerNav: {
    width: Dimensions.get("window").width - (Dimensions.get('window').width)*.5,
    height: 45,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16

  },
  logoutButton: {
    backgroundColor: "transparent",
    width: 100,
    borderColor: "fff", 
    borderStyle: "dashed",
    padding: 15, 
  },
  snippetList: {
    overflow: "hidden",
    height: Dimensions.get("window").height,
    justifyContent: 'center', 
    alignItems: "center",
  },
  snippet: {
    fontSize: 24,
    width: "80svw",
    height: "100vh", 
    alignContent:"flex-start",
    justifyContent:"center",
    margin: 50,
    lineHeight: "50%"
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative', 
    height: 250,
    width: '100%',
    backgroundColor: 'transparent',
    padding: 10,
  },
  buttons: {
    backgroundColor: 'transparent',
    padding: 10,
    height: '25%',
    width: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
})