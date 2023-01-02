//this is the prop that will fetch the books from likes and it will do this with the useEffect hook. the next thing that we will need to do is pass a prop that will determine the number of books to return.
import { Text } from '@rneui/themed'; 
import { useState, useEffect } from "react";
import { useUser } from "../UserContext"
import { Alert, View } from "react-native";
import { supabase } from '../../lib/initSupabase';
import { Book } from '../../services/backend';

export default function RecentActivity (props : any) {

    const [titles, setTitles] = useState<Array<string>>([])
    const [loading, setLoading] = useState(true);    
    const {user} = useUser()
    const [ids, setIds] = useState<Array<number>>([])
    const [books, setBooks] = useState<Array<Book>>([])
    useEffect(() => {
        if (user) {
            getIds()        
        } 
    }, [])
    useEffect(()=> {
        if(books.length < props.number) {
            getBook(ids)
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
        <View>
            {books.length === props.number && 
                books.map((book, index) => 
                <Text key={index}>{book.title}</Text>)}
        </View>
    )
}