//react
import * as React from "react";
import { Platform, Text } from "react-native";

//libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//components
import DoctorDashboard from '../../../components/doctor'
import MyPatientDetails from '../../../components/doctor/patientProfile'

//config
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default DoctorRoute = () => {
  return (
    <Drawer.Navigator
      hideStatusBar={Platform.OS === "ios" ? true : false}
      drawerStyle={{ width: "85%" }}
    >
      <Drawer.Screen
        name="Home"
        component={DoctorDashboardStack}
        options={{
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};

DoctorDashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false
        }
      }}
      initialRouteName="DoctorDashBoardScreen"
    >
      <Stack.Screen
        name="DoctorDashBoardScreen"
        component={DoctorDashboard}
      />
      <Stack.Screen
        name="PatientDetailsScreen"
        component={MyPatientDetails}
      />
    </Stack.Navigator>
  );
};
