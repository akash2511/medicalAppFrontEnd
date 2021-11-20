//react
import * as React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


//libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//components
import DoctorDashboard from '../../../components/doctor'

//config
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default PatientRoute = () => {
    return (
        <Drawer.Navigator
            hideStatusBar={Platform.OS === "ios" ? true : false}
            drawerStyle={{ width: "85%" }}
        >
            <Drawer.Screen
                name="Home"
                titl
                component={PatientDashboardStack}
                options={{
                    unmountOnBlur: true,
                }}
            />
        </Drawer.Navigator>
    );
};

PatientDashboardStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            screenOptions={() => {
                return {
                    headerShown: false
                }
            }}
            initialRouteName="PatientDashBoardScreen"
        >
            <Stack.Screen
                name="PatientDashBoardScreen"
                component={DoctorDashboard}
            />
        </Stack.Navigator>
    );
};
