import { View, StyleSheet } from 'react-native';
import {Card, Text} from '@rneui/themed'; 
import Separator from '../Separator';

export default function ReadingStats() {
    return (
      <View style={styles.card}>
        <Text h2={true}>Statistics</Text>
        <Text>Track your reading process here</Text>
        <View>
            <Card>
                <Text>Read 40 pages (23/40)</Text>
            </Card>
        </View>
        <Separator />
    </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexGrow: 1,
      },
})
