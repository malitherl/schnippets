import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import  backendService from '../services/backend'

export default function SnippetView({navigation}: any) {
    //to be extremely similar to the readerview except the 
    //sections of reading will be a good bit longer 
    //TO-DO: Chapter Viewer, which pull a section of text depending on what the reader would like 
    //So say, the reader would like to try reading about 1000 words, 2000 words, or even 10,000 
    //we could convert this into pages as well to try and make it a bit simpler 
    //so the reader could request to read a chapter, a few, or many 
    const [book , setBook] = useState('')
   
    return(
        <View>
            <View style={styles.headerNav}>
              <Text onPress={() => navigation.goBack()}>back </Text>
              <Text > For You </Text>
           </View>  
            <Text>
                {book}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({

    headerNav: {
        width: Dimensions.get("window").width - (Dimensions.get('window').width)*.5,
        height: 45,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 16
    
      },




})