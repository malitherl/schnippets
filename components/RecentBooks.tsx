import { useEffect, useState } from 'react'
import { ListItem } from '@rneui/base'
import { StyleSheet, Dimensions, Text , View, } from 'react-native'

import backendService, {Book} from '../services/backend'
import { Styles } from '../lib/constants'

export default function RecentBooks ({route, navigation} : any) {
    const nums = route.params.keys
    /**
     * What we do here is take the snippet_ids from the likes table 
     * and we match them back to the books that they are related to, 
     * to allow us to display the books the user has most recently liked 
     */
    const [books, setBooks] = useState<Array<Book>>([])
    

    useEffect(() => {
        setBooks([])
        nums.forEach((n: number) => {
            backendService
            .fetchBook(n)
            .then(book => {
                setBooks(prevState => prevState.concat(book!))
            })
        })
    }, [])



    return ( 

        <View>
            <View style={styles.headerNav}>
              <Text onPress={() => navigation.goBack()}>back </Text>
              <Text > For You </Text>
           </View>  

                    {books.length > 0 ?
                        books.map((book, i) =>{
                            return <ListItem key={i}>
                               <Text>{book.title} by {book.author}</Text> 
                            </ListItem>
                        })
                        
                        
                        : <Text>Like some snippets and they'll appear here</Text>}
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
