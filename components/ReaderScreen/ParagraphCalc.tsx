import { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Dimensions, FlatList } from "react-native";
import { supabase } from "../../lib/initSupabase";
import { Text } from '@rneui/themed';

export type Paragraph = {
    num: number 
    paragraph: string
    paragraph_length: number
  }

export const ParagraphCalc = () => {

    /**
     * Create a function that will find the average length of a book's paragraphs 
     * and we can do some of the same calculations under the hood again 
     */

    const start= 0;
    const goal = 40; 
    const book_num = 33; 
    const [paragraphs, setParagraphs] = useState<Array<Paragraph>>([])
    const [displayedPara, setDisplayedPara] = useState<Array<Paragraph>>([]); 
    const [numPara, setNumPara] = useState<number>(0);

    useEffect(() => {
        if(book_num){
            getParagraphs()
            console.log(1)
        }
    }, [])

    useEffect(() => {
        const avg= Math.round(paragraphs.map(p => p.paragraph)
        .map(para => para.split(' ').length)
        .reduce((a, b) => a +b, 0) / paragraphs.length)
        const num = Math.round((250*goal) / avg); 
        setNumPara(num);
        console.log(2)
    }, [paragraphs]);

    useEffect(() => {
        const displayed = paragraphs.slice(start, numPara);
        setDisplayedPara(displayed);
        console.log(3)
    }, [numPara])

    async function getParagraphs() {
        try {
              let {data, error} = await supabase
              .from('paragraphs')
              .select('*')
              .eq('num', book_num)
              if(error) {
                  throw error 
              } 
              if (data) {
                setParagraphs(data)
              }   
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        }
    }

    const renderText = ({item, index} : any) => {
        return (
          <View style={styles.snippet}>
               <Text style={styles.para}>{item.paragraph}</Text> 
          </View>
        )
    }
    return (
        <View style={styles.snippetList}>
            <FlatList pagingEnabled={true} data={displayedPara} renderItem={(item) => renderText(item)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    para: {
        letterSpacing: 2,
    },
    snippet: {
        borderBottomColor: "black",
        padding: 12, 
        margin: 6
      },
    snippetList: {
        overflow: "hidden",
        height: Dimensions.get("window").height,
        justifyContent: 'center', 
        alignItems: "center",
      },
      viewerText: {
        fontSize: 16,
        lineHeight: 25,
      },
})