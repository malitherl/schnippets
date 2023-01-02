import { useEffect, useState } from 'react'
import { Text, ListItem, Card, Button } from '@rneui/base'
import { StyleSheet, Dimensions, View, Alert, } from 'react-native'

import {Book} from '../services/backend'
import { Styles } from '../lib/constants'
import { useUser } from './UserContext'
import { supabase } from '../lib/initSupabase'
export default function RecentBooks ({navigation} : any) {
  const { user } = useUser();  
    const [ids, setIds] = useState<Array<number>>([])
    const [books, setBooks] = useState<Array<Book>>([])
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
      if (user) {
          getIds()        
      } 
  }, [])
    useEffect(()=> {
        if(books.length < ids.length) {
            getBook(ids)
        } else {
        }
    }, [ids])

    async function getIds () {
      try {
          setLoading(true)
          if(!user) throw new Error('No valid user!');
          
          let {data, error} = await supabase
              .from('likes')
              .select('*')
              .eq('user_id', user?.id)
          if(error) {
              throw error 
          } 
          if (data) {
              setIds(data.map(likes => likes.snippet_id))
          }   
      } catch (error) {
          if (error instanceof Error) {
              Alert.alert(error.message)
          }
      } finally {
          setLoading(false)
          
      }
  }

  async function getBook (ids: number[]) {
      try {
          setLoading(true);
          if(!ids) throw new Error('ids invalid')
          if(!user) throw new Error('invalid user')
          ids.forEach( async id => {
              let {data, error} = await supabase
                  .from('all_data')
                  .select('*')
                  .eq('num', id)
                  .limit(1)
                  .single()
              if(error) {
                  console.log('error', error)
              } else {
                  setBooks(prev => prev.concat(data))
              }
      })
      }   catch (error) {
          if (error instanceof Error) {
              Alert.alert(error.message)
          }
      } finally {
          setLoading(false)
      }
  }



    return ( 

        <View style={styles.container}>
           
           {books.length === ids.length ? 
            books.map(book => 
            <Card>
              <Card.Title>{book.title}</Card.Title>
                <Card.Divider/>
                <Text>Progress Listed Here</Text>
                <Button>Continue</Button>
            </Card>)
            : <Text>Like some snippets and they'll appear here</Text> 
          }
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
  
    }
})
