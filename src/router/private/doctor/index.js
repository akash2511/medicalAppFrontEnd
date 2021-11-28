//react
import * as React from "react";
import { Platform, Text } from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import { useDrawerStatus } from '@react-navigation/drawer';

//libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//components
import DoctorDashboard from '../../../components/doctor'
import DoctorMyProfile from '../../../components/doctor/myProflie'
import MyPatientDetails from '../../../components/doctor/patientProfile/index'
import MedicationSearchScreen from '../../../components/search/medication'

//config
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default DoctorRoute = () => {
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
        component={DoctorDashboardStack}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={DoctorMyProfile}
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
      initialRouteName="DoctorDashBoardScreen"
      screenOptions={({navigation}) => {
        return {
          headerLeft: () => {
            return (
              <IconButton
                icon="menu"
                size={20}
                onPress={() => navigation.toggleDrawer()}
              />
              )
          }
        }
      }}
    >
      <Stack.Screen
        name="DoctorDashBoardScreen"
        component={DoctorDashboard}
      />
      <Stack.Screen
        name="DoctorPatientDetails"
        component={MyPatientDetails}
      />
      <Stack.Screen name="DoctorMedicationSearch" component={MedicationSearchScreen} />
    </Stack.Navigator>
  );
};
