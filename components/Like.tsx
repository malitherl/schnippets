import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useUser } from './UserContext';


export default function Like ( props: any) {
    const [liked, setLiked] = useState('');

    useEffect(() => {
        renderBackground()
    }, [])

    const handlePress= (id: number ) =>{
      changeBackground()
      props.handleLike(id)
     
    } 
    
    const renderBackground = () => {
        props.isLiked(props.snippet.id).then((like: any[]) => {
            let snipLikes = like ? like.length : 0;
            if(snipLikes > 0) {
              setLiked('pink')
            } else {
              setLiked('#fff')
            }
        })
    }
    const changeBackground = () => {
        props.isLiked(props.snippet.id).then((like: any[]) => {
            let snipLikes = like ? like.length : 0;
            if(snipLikes > 0) {
              setLiked('#fff')
            } else {
              setLiked('#ffcccc')
            }
        })
    }



    return(

            <AntDesign
              style={{ alignSelf: 'center' }}
              name="heart"
              size={35}
              color= {liked}
              onPress={() => { handlePress(props.snippet.id)}}
            />
      
    )




}