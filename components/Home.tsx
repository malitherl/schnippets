import {View, StyleSheet} from 'react-native'
import { supabase } from '../lib/initSupabase'
import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { useUser } from './UserContext';
import UserBooks from './UserBooks';
export default function Home( {navigation} : any ) {    
    const user = useUser()
    const Separator = () => <View style={styles.separator}/>
    return(
        <View style={{padding: 25}}>
            <View style={styles.homeFeed}>
                <Text h1={true}>Home</Text>
                <Button title={'Sign out'} 
                        buttonStyle= {{ 
                            backgroundColor: "rgba(25,25,25, .7)",
                            borderRadius: 20,
                        }} 
                        containerStyle={{
                            width: 100,
                            marginVertical: 10,
                        }}
                        size="sm"
                        titleStyle={{ color: "white"}}
                        onPress={() => supabase.auth.signOut()} />      
            </View>
            <Separator/>
            
                <View 
                  style={styles.activityFeed}>
                    <View
                      style={styles.card}
                    >
                        <UserBooks />
                        <Text h2={true}>Recent Books</Text>
                        <Text>Pick up where you left off</Text>
                            <View>
                                        <Text>Norwegian Wood</Text>
                                        <Text>Norwegian Wood</Text>
                                        <Text>Norwegian Wood</Text>
                                    </View> 
                                <Separator/>    
                        </View>
                      </View>
                    <View style={styles.card}>
                          <Text h2={true}>Statistics</Text>
                          <Text>Track your reading process here</Text>
                              <View>
                                 <Text>Goal: 10k Words</Text>
                                 <Text>Goal: 10k Words</Text>
                                 <Text>Goal: 10k Words</Text>    
                               </View>
                          <Separator/>
                    
                    </View>
                    <View style={styles.card}>   
                        <Text h2={true}>Explore</Text>
                        <Text>Find a new book to read based on your interests</Text> 
                            <View>
                                <Button title={"Read New Snippets"}
                                        titleStyle={{ fontWeight: "300", fontSize: 18}}
                                        color="secondary"
                                        size='md'
                                        buttonStyle={{ 
                                            borderRadius: 20, 
                                            margin: 20
                                        }}
                                        onPress={() => navigation.navigate('Snippets')}/>
                            </View>
                        <Separator/>
                    </View>
                </View>
       
    )
}

const styles = StyleSheet.create({
    homeFeed: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        height: 50,
        width: 100,
        display:"flex",
        justifyContent:"center",
        alignSelf: "center",
        textAlign: "center",
        border:"1px black solid",
        borderRadius: 25,
        padding: 0,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    activityFeed: {
        display: "flex",
        flexDirection: "column",
    },
    card: {
        flexGrow: 1,
    }
    
})