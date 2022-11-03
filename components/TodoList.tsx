import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native'
import { Styles } from '../lib/constants'
import { Text } from 'react-native-elements'
import { supabase } from '../lib/initSupabase'
import { useUser } from '../components/UserContext'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Button, Input, ListItem, CheckBox } from 'react-native-elements'
import { Snippet } from './style' 
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'
import Like from './Like'

 
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

export default function TodoList() {
  const { user } = useUser()
  const [snippets, setSnippet] = useState<Array<Snippet>>([])
 

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
            <Text h1>Snimbo</Text>
            <Button buttonStyle={styles.logoutButton} title="Sign out" onPress={() => supabase.auth.signOut()} />
          </View>
          <ScrollView 
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center', 
            alignItems: "center", }}
            style={styles.snippetList}> 
            { 
              snippets.map(snippet => 
              <View key={snippet.id}>
                <Text style={styles.snippet} key={snippet.id}>{snippet.snippet}</Text>
                <View style= {styles.panel}>
                  <View style={styles.buttons}>
                    <Like handleLike= {handleLike} snippet= {snippet} isLiked={isLiked} />
                    <FontAwesome
                      style={{ alignSelf: 'center' }}
                      name="commenting"
                      size={35}
                      color="#fff"
                    />
                    <FontAwesome
                      style={{ alignSelf: 'center' }}
                      name="user"
                      size={35}
                      color="#fff"         
                    />  
                    </View>
                </View>
            </View>)
            
            
            
            
            
            }
           
          </ScrollView>
         
      </View>
      
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    padding: Styles.spacing,
    backgroundColor: "#bbb",
    display: "flex"
  },
  header: {
    backgroundColor: "#bbb",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white"
  },
  logoutButton: {
    backgroundColor: "transparent",
    width: 100,
    borderColor: "fff", 
    borderStyle: "dashed",
    padding: 15, 
  },
  snippetList: {
    width: "100%",
    height: "100%"
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
  }
  
  ,
})