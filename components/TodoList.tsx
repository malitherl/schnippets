import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet,Text, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { Styles } from '../lib/constants'
import { supabase } from '../lib/initSupabase'
import { useUser } from '../components/UserContext'
import { Snippet } from './style' 
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'
import Like from './Like'
import ReaderView from './ReaderView'

 
type Snippet = {
  id: number
  created_at: Date
  isbn: string
  snippet: string
}

 
type Like = {
  id: number
  inserted_at: Date
  snippet_id: number
  user_id: string
}

export default function TodoList({navigation} : any) {
  const { user } = useUser()
  const [snippets, setSnippet] = useState<Array<Snippet>>([])
  const [texts, setTexts] = useState<Array<String>>([])
  useEffect(() => {
    fetchSnippets()
  }, [])

  const handleLike = (id: number) => {
    isLiked(id).then(like => {
      let snipLikes = like ? like.length : 0; 
      if(snipLikes > 0) {
        console.log('removing like')
        removeLike(id)
      } else {
        console.log('adding like')
        addLike(id)
      }
    })
  }


 
  const fetchSnippets = async() => {
    const { data: snippets, error } = await supabase
      .from<Snippet>('snippets')
      .select('*')
      .range(0, 9)
    if (error) {
      console.log('error', error)
    } else {
      setSnippet(snippets!)
      const textFromSnippet = snippets.map(s => s.snippet)
      setTexts(textFromSnippet!)
    }
  }
 
  const isLiked = async(snippet_id: number) => {
    const { data: like, error } = await supabase
      .from<Like>('likes')
      .select('*')
      .eq('user_id', user!.id)
      .eq('snippet_id', snippet_id)
    if (error) {
      console.log('error', error)
    } else {
      setSnippet(snippets!)
      return like
    }
  }

  const addLike = async (snippet_id: number) => {
    console.log('newLike:', snippet_id)
    const { data: like, error } = await supabase
      .from<Like>('likes')
      .insert({ snippet_id, user_id: user!.id })
      .single()
    if (error) {
      console.log(error.message)
    } else {
      console.log('liked!')
    }
  }

  const removeLike = async (snippet_id: number) => {
    console.log('removedLike:', snippet_id)
    const { data: like, error} = await supabase
      .from<Like>('likes')
      .delete()
      .eq('user_id', user!.id)
      .eq('snippet_id', snippet_id)
    if(error) {
      console.log('error', error)
    } else {
      setSnippet(snippets!)
    }    
  }


  return (
    <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button title={'Home'} onPress={() => navigation.goBack()}/>
          </View>
          <View 
             style={styles.snippetList}
            > 
            <ReaderView handleLike={handleLike} snippets={snippets} isLiked={isLiked}/>
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
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1, 
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