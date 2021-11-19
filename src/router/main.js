//react
import React from 'react';

//libs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

//components
import MainRoute from './private'
import Login from '../components/account/login'

//reducers
import { getIsLoggedIn } from '../redux/reducers/ui'

//config
const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={() => {
            return {
                headerShown: false
            }
        }}>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
}

export default RouterMain = () => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        isLoggedIn ? <MainRoute/>
        : <LoginStack/>
    )
}