import { supabase } from '../lib/initSupabase'
import { User} from '@supabase/supabase-js'

export type Like = {
    id: number
    inserted_at: Date
    snippet_id: number
    user_id: string
  }


  export type Paragraph = {
    num: number 
    paragraph: string
  }

  export type Book = {
    num: number 
    author: string,
    title: string, 
    author_birth: string,
    author_death: string, 
    length: number, 
  }

  const fetchBook = async (num : number ) => {
    const { data: book, error} = await supabase
      .from<Book>('all_data')
      .select('*')
      .eq('num', num)
      .limit(1)
      .single()
    if(error) {
      console.log('error', error)
    } else {
      return book 
    }
  }

  const fetchLikes = async(user: User) => {
      const { data: likeArray, error } = await supabase
      .from<Like>('likes')
      .select('*')
      .range(0,2)
      if(error) {
        console.log('error', error)
      } else {
        return likeArray
      }
  }

  //we should make a modified version of this function 
  //that will take a range and this range will be 
  /** given from what the user has already read at the moment 
   * probably stored in maybe a context hook? 
   * 
   */

  const fetchReading = async (num: number, start: number, end: number) => {
    const { data: paragraphs, error} = await supabase 
      .from<Paragraph>('paragraphs')
      .select('*')
      .eq('num', num)
      .range(start, end)
      if(error) {
        console.log('error', error)
      } else {
        return paragraphs; 
      }
  }




  const fetchParagraphs = async (num : number) => {
    const { data: paragraphs, error} = await supabase 
      .from<Paragraph>('paragraphs')
      .select('*')
      .eq('num', num)
      .limit(1)
      .single()  
    if(error) {
      console.log('error', error)
    } else {
      return paragraphs!;
    }
  }


const isLiked = async(snippet_id: number, user: User) => {
    const { data: like, error } = await supabase
      .from<Like>('likes')
      .select('*')
      .eq('user_id', user!.id)
      .eq('snippet_id', snippet_id)
    if (error) {
      console.log('error', error)
    } else {
      return like.length > 0 ; 
    }
  }


  const addLike = async (snippet_id: number, user: User) => {
    console.log('newLike:', snippet_id)
    const { data: like, error } = await supabase
      .from<Like>('likes')
      .insert({ snippet_id: snippet_id, user_id: user!.id })
      .single()
    if (error) {
      console.log(error.message)
    } else {
      console.log('liked!')
      return like;
    }
  }

  const removeLike = async (snippet_id: number, user: User) => {
    console.log('removedLike:', snippet_id)
    const { data: like, error} = await supabase
      .from<Like>('likes')
      .delete()
      .eq('user_id', user!.id)
      .eq('snippet_id', snippet_id)
    if(error) {
      console.log('error', error)
    } else {
      return like;
    }    
  }


  const exportObj = {
    fetchParagraphs: fetchParagraphs, 
    isLiked: isLiked, 
    addLike: addLike,
    removeLike: removeLike,
    fetchBook: fetchBook,
    fetchLikes: fetchLikes
  }

  export default exportObj