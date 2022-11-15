import { Dimensions, View, Text, StyleSheet, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import  Like from './Like';


export default function ReaderView( props: any) {
    const Separator = () => <View style={styles.separator}/>

    const renderText = ({item, index} : any, props: any) => {
        return (
          <View style={styles.snippet}>
                <Text style={styles.viewerText}>
                  {item.snippet}
                </Text>
                
              <View>
                <View style={styles.panel}>
                  <Like id= {item.id} handleLike= {props.handleLike} snippet= {item} isLiked={props.isLiked} />
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
            <Separator />
        </View>
        )
    }
          
    return(
        <View style= {styles.snippetList} key={props.id}>
          <FlatList pagingEnabled={true} data={props.snippets} renderItem={(item) => renderText(item, props)}/>
        </View>
    )
}

const styles = StyleSheet.create({ 
    snippetList: {
        flexGrow: 1,
        width: "100%",
        height: Dimensions.get('window').height
      },
      viewerText: {
        fontSize: 16,
        lineHeight: 25,
      },
      snippet: {
        borderBottomColor: "black",
        margin: 20,
      },
      panel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative', 
        height: 60,
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
      separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }
)