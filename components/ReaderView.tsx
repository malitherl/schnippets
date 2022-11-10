import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import  Like from './Like';


export default function ReaderView( props: any) {
    return(
        <View style={styles.reading} key={props.id}>
            <View style= {styles.snippetList}>
                <Text style={styles.viewerText}>{props.section.snippet}</Text>
            </View>
            <View style= {styles.panel}>
            <View style={styles.buttons}>
              <Like handleLike= {props.handleLike} snippet= {props.section} isLiked={props.isLiked} />
              <FontAwesome
                style={{ alignSelf: 'center' }}
                name="commenting"
                size={35}
                color="#fff"
                />
              <FontAwesome
                style={{ alignSelf: 'center' }}
                name="user"
                size={35}
                color="#fff"         
                />  
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    reading: {
        padding: 30,
    },
    snippetList: {
        width: "100%",
        height: "100%"
      },
      viewerText: {
        fontSize: 24,
        lineHeight: 40,
      },
      snippet: {
        fontSize: 24,
        width: "80svw",
        height: "100vh", 
        alignContent:"flex-start",
        justifyContent:"center",
        margin: 50,
        
      },
      panel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', 
        height: 50,
        width: '100%',
        backgroundColor: 'transparent',
        padding: 10,
      },
      buttons: {
        backgroundColor: 'transparent',
        padding: 10,
        height: '25%',
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
    }
)