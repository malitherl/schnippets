import { useEffect, useState } from "react"
import {View} from "react-native"
import { supabase } from "../lib/initSupabase"
import { useUser } from "./UserContext"

export default function UserBooks () {

    type Like = {
        id: number
        inserted_at: Date
        snippet_id: number
        user_id: string
    }

    type Snippet = {
        id: number
        created_at: Date
        isbn: string
        snippet: string
    }

    const [likedBooks, setLikedBooks] = useState<Array<number>>([])
    const user = useUser()
    const fetchUserLikes = async() => {
        const { data: likes, error } = await supabase
          .from<Like>('likes')
          .select('*')
          .range(0, 9)
        if (error) {
          console.log('error', error)
        } else {
            setLikedBooks(likes.map(like => like.snippet_id))
            console.log(likedBooks)
        }   
      }
    const fetchBook = async () => {
        const { data: books, error} = await supabase 
            .from<Snippet>('snippets')
            .select('*')
            .eq('id', likedBooks[0])
        if(error) {
            console.log('error', error)
        } else {}
    }


      useEffect(() => {
        fetchUserLikes()
      }, [])

    return ( 
        <View>
            
        </View>

    )


}