import {createNativeStackNavigator} from '@react-navigation/native-stack'
import{
    ROUTE
} from './RouteName'
import BottomTab from '../navigation/Drawer'
const MainStack = createNativeStackNavigator();

const MainNav=()=>(

    <MainStack.Navigator
    screenOptions={{headerShown:false}}
    initialRouteName={ROUTE?.BottomTab}>
   <MainStack.Screen name={ROUTE?.BottomTab} component={BottomTab}/>

    </MainStack.Navigator>
)

export default MainNav