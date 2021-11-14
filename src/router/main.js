//react
import React from 'react';

//libs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//components
import Diet from '../components/diet'
import Supplements from '../components/supplements'

//reducers

//config
const Tab = createBottomTabNavigator();

export default RouterMain = () => {
    return (
    <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Diet') {
                        iconName = focused
                            ? 'food-apple'
                            : 'food-apple-outline';
                    } else if (route.name === 'Supplements') {
                        iconName = focused ? 'nutrition' : 'nutrition';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={24} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
    >
        <Tab.Screen name="Diet" component={Diet} />
        <Tab.Screen name="Supplements" component={Supplements} />
    </Tab.Navigator>
    )
}