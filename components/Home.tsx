import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { supabase } from '../lib/initSupabase'

export default function Home() {    

    const Separator = () => <View style={styles.separator}/>

    return(
        <View>
            <View style={styles.homeFeed}>
                <Text><h1>Home :)</h1></Text>
                <TouchableOpacity style={styles.button} onPress={() => supabase.auth.signOut()}><Text>Logout</Text></TouchableOpacity>        
            </View>
            <Separator/>
            
                <ScrollView style={styles.activityFeed}>
                    <View>
                        <h2>Recent Books</h2>
                        <p>Pick up where you left off</p>
                    </View>
                    <Separator/>
                    <View>
                        <h2>Statistics</h2>
                        <p>Track your reading process here</p>
                    </View>
                    <Separator/>
                    <View>
                        <h3>Find more books by reading new snippets?</h3>

                    </View>
                </ScrollView>
                
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
        fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;",
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
        fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;",
        display: "flex",
        flexDirection: "column",

    }
})