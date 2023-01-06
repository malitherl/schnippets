
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/initSupabase";
import { useBooks } from "./useBooks";

export type Reader = {
    id: number,
    progress: number, 
}


export const useReaderInfo = (user: User) => {

    const [bookProgress, setBookProgress] = useState<Array<Reader>>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(user){
            getReaderData();
        }
    }, [])

    async function getReaderData () {
        try {
            setLoading(true)
            if(!user) throw new Error('No valid user!');
            
              let {data, error} = await supabase
              .from('reader_data')
              .select('*')
              .eq('user_id', user?.id)
              if(error) {
                  throw error 
              } 
              if (data) {
                    setBookProgress(data.map( d => {
                    return { id: d.num, progress: d.progress_read}}))
              }   
              
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)  
        }
    }


    return bookProgress ;
}