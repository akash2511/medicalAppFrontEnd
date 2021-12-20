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
import SupplementsSearchScreen from '../../../components/search/supplements'
import PatientMySurveys from '../../../components/patient/surveys'
import PatientSurveyQuestions from '../../../components/patient/surveys/questions'
import PatientGraphs from '../../../components/graphs/patientProfile'


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
            <Drawer.Screen
                name="Surveys"
                component={PatientSurveyStack}
                options={{
                    unmountOnBlur: true,
                }}
            />
            <Drawer.Screen
                name="Patient Graphs"
                component={PatientGraphStack}
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
            <Stack.Screen name="PatientSupplementsSearch" component={SupplementsSearchScreen} />
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

PatientSurveyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="PatientSurveys"
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
                name="PatientSurveys"
                component={PatientMySurveys}
            />
            <Stack.Screen
                name="PatientSurveyQuestions"
                component={PatientSurveyQuestions}
            />
        </Stack.Navigator>
    );
};

PatientGraphStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Graphs"
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
                name="Graphs"
                component={PatientGraphs}
            />
        </Stack.Navigator>
    );
};
