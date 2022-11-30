import { View, Text } from "react-native";
import { DrawerLayout } from "react-native-gesture-handler";


export default function Drawer () {
   const handleDrawerSlide = (status: number) => {
      // outputs a value between 0 and 1
      console.log(status);
    };
  
   const renderDrawer = () => {
      return (
        <View>
          <Text>I am in the drawer!</Text>
        </View>
      );
    };
  
      return (
        <View style={{ flex: 1 }}>
          <DrawerLayout
            drawerWidth={200}
            drawerPosition={'right'} 
            drawerType="front"
            drawerBackgroundColor="#ddd"
            renderNavigationView={renderDrawer}
            onDrawerSlide={handleDrawerSlide}>
            <View>
              <Text>Hello, it's me</Text>
            </View>
          </DrawerLayout>
        </View>
      );
  }