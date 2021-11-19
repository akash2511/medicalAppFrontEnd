//react
import React from 'react';
import { View } from 'react-native';

//libs
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'

//components
import DoctorRoute from './doctor'
import PatientRoute from './patient'

//actions
import { appLogout } from '../../redux/actions/ui'

//reducers
import { getUsername } from '../../redux/reducers/ui'


export default MainRoute = ({navigation}) => {
    const dispatch = useDispatch()
    const username = useSelector(getUsername)

    if (username === "doctor"){
        return <DoctorRoute />
    }
    else if (username === "patient"){
        return <PatientRoute/>
    }
    else{
        return <View>
            <Text>Login Is under construction</Text>
            <Button mode="contained" onPress={() => dispatch(appLogout())} style={{ marginHorizontal: 20, marginVertical: 20 }} labelStyle={{ color: "#fff" }}>
                {"LOGOUT"}
            </Button>
        </View>
    }
}