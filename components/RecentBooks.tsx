import { useEffect, useState } from 'react'
import { Text, ListItem, Card, Button } from '@rneui/base'
import { StyleSheet, Dimensions, View, Alert, } from 'react-native'

import {Book} from '../services/backend'
import { Styles } from '../lib/constants'
import { useUser } from './UserContext'
import { supabase } from '../lib/initSupabase'
export default function RecentBooks ({navigation} : any) {
  const { user } = useUser();  



    return ( 

        <View style={styles.container}>
           
            <Card>
              <Card.Title>Title</Card.Title>
                <Card.Divider/>
                <Text>Progress Listed Here</Text>
                <Button>Continue</Button>
            </Card>
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
