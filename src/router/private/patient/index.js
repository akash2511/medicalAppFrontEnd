//react
import * as React from "react";
import { Platform } from "react-native";
import { IconButton } from 'react-native-paper';


//libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//components
import PatientDashboard from '../../../components/patient'
import PatientMyProfile from '../../../components/patient/myProfile'
import DietSearchScreen from '../../../components/search/diet'
import ExerciseSearchScreen from '../../../components/search/exercise'

//config
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default PatientRoute = () => {
    return (
        <Drawer.Navigator
            hideStatusBar={Platform.OS === "ios" ? true : false}
            drawerStyle={{ width: "85%" }}
            screenOptions={() => {
                return {
                    headerShown: false
                }
            }}
        >
            <Drawer.Screen
                name="Home"
                titl
                component={PatientDashboardStack}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <Drawer.Screen
                name="My Profile"
                component={PatientProfileStack}
                options={{
                    unmountOnBlur: true,
                }}
            />
        </Drawer.Navigator>
    );
};

PatientDashboardStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="PatientDashBoardScreen"
            screenOptions={({ navigation }) => {
                return {
                    headerLeft: () => {
                        return (
                            <IconButton
                                icon="menu"
                                size={20}
                                onPress={() => navigation.toggleDrawer()}
                                style={{ marginLeft: -10 }}
                            />
                        )
                    }
                }
            }}
        >
            <Stack.Screen
                name="PatientDashBoardScreen"
                component={PatientDashboard}
            />
            <Stack.Screen name="PatientDietSearch" component={DietSearchScreen} />
            <Stack.Screen name="PatientExerciseSearch" component={ExerciseSearchScreen} />
        </Stack.Navigator>
    );
};

PatientProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="PatientMyProfile"
            screenOptions={({ navigation }) => {
                return {
                    headerLeft: () => {
                        return (
                            <IconButton
                                icon="menu"
                                size={20}
                                onPress={() => navigation.toggleDrawer()}
                                style={{marginLeft:-10}}
                            />
                        )
                    }
                }
            }}
        >
            <Stack.Screen
                name="PatientMyProfile"
                component={PatientMyProfile}
            />
        </Stack.Navigator>
    );
};
