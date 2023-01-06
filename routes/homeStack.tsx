import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from "react-navigation";
import Home from "../components/HomeScreen/Home";
import TodoList from "../components/ForYouScreen/ForYou";

const screens = {
    Home: {
        screen: Home
    },
    TodoList : {
        screen: TodoList
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)

