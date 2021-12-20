//react
import * as React from "react";
import { Platform } from "react-native";
import { IconButton } from 'react-native-paper';

//libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//components
import DoctorDashboard from '../../../components/doctor'
import DoctorMyProfile from '../../../components/doctor/myProflie'
import MyPatientDetails from '../../../components/doctor/patientProfile/index'
import MedicationSearchScreen from '../../../components/search/medication'
import DoctorPatientGraphs from '../../../components/graphs/patientProfile'

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
        component={DoctorProfileStack}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Patient Graphs"
        component={DoctorPatientGraphStack}
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
                style={{ marginLeft: -10 }}
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

DoctorProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorMyProfile"
      screenOptions={({navigation}) => {
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
        name="DoctorMyProfile"
        component={DoctorMyProfile}
      />
    </Stack.Navigator>
  );
};

DoctorPatientGraphStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorPatientGraphs"
      screenOptions={({navigation}) => {
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
        name="DoctorPatientGraphs"
        component={DoctorPatientGraphs}
      />
    </Stack.Navigator>
  );
};
