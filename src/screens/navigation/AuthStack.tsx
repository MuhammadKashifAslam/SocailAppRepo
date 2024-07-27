
import LoginScreen from '../Authentication/LoginScreen';
import SignUpScreen from '../Authentication/SignUpScreen'
import { ROUTE } from './RouteName';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const AuthStack = createNativeStackNavigator();

const AuthNav=()=>(

    <AuthStack.Navigator
    screenOptions={{headerShown:false}}>
   <AuthStack.Screen name={ROUTE?.Login} component={LoginScreen}/>
   <AuthStack.Screen name={ROUTE?.SignUP} component={SignUpScreen}/>

    </AuthStack.Navigator>
)


export default AuthNav