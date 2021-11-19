//react
import * as React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


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
        component={DashboardStack}
        options={{
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};

DashboardStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false
        }
      }}
      initialRouteName="DashBoardScreen"
    >
      <Stack.Screen
        name="DashBoardScreen"
        component={DoctorDashboard}
      />
      <Stack.Screen
        name="PatientDetails"
        component={MyPatientDetails}
      />
    </Stack.Navigator>
  );
};
