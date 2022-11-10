import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from "react-navigation";
import Home from "../components/Home";
import TodoList from "../components/TodoList";

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

