//react
import React from 'react';

//libs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

//components
import Login from '../components/account/login'
import DietScreen from '../components/diet'
import Supplements from '../components/supplements'
import DietSearchScreen from '../components/search/diet'
import SupplementSearchScreen from '../components/search/supplement'

//reducers
import { getIsLoggedIn } from '../redux/reducers/ui'

//config
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DietStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Diet" component={DietScreen} />
            <Stack.Screen name="Diet Search" component={DietSearchScreen} />
        </Stack.Navigator>
    );
}

const SuplementsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Supplements" component={Supplements} />
            <Stack.Screen name="Supplements Search" component={SupplementSearchScreen} />
        </Stack.Navigator>
    );
}

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
        isLoggedIn ? <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'DietStack') {
                        iconName = focused
                            ? 'food-apple'
                            : 'food-apple-outline';
                    } else if (route.name === 'SupplementsStack') {
                        iconName = focused ? 'nutrition' : 'nutrition';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="DietStack" component={DietStack} options={{ headerShown: false }} />
            <Tab.Screen name="SupplementsStack" component={SuplementsStack} options={{ headerShown: false }} />
        </Tab.Navigator>
        : <LoginStack/>
    )
}