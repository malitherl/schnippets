import {View, StyleSheet} from 'react-native'
import {Text} from "@rneui/themed";
import SignoutButton from "../SignoutButton";

export default function Opener() {
    
    return( 
        <View style={styles.homeFeed}>
            <Text h1={true}>Home</Text>
            <SignoutButton />
      </View>
    )
}

const styles = StyleSheet.create({
    homeFeed: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }
});