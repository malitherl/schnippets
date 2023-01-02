import { View } from "react-native";
import Opener from "./Opener";
import Separator from '../Separator';
import ActivityFeed from "./ActivityFeed";
import ReadingStats from "./ReadingStats";
import Explore from "./Explore";

export default function Home({ navigation }: any) {
  return (
    <View style={{ padding: 25 }}>
      <Opener />
      <Separator />
      <ActivityFeed navigation={navigation}/>
      <ReadingStats />
      <Explore navigation={navigation}/>        
    </View>
  );
}
