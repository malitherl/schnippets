import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from "@rneui/themed"

export default function ParagraphView(props: any) {
    //Just so the amount of words don't overflow the screen 
    
    const wordCount = () => {
        const wordArray = props.paragraphText.split(' ')
        return wordArray.slice(0, 100).join(' ').trim() + '...'
    }

    return (
        <View>       
            <Text style={styles.para}>
                {wordCount()}
            </Text>
        </View>    
    )
}


const styles = StyleSheet.create({
    para: {
        letterSpacing: 2,
        height: Dimensions.get('window').height - 50 
    }
})