//react
import React from 'react';
import { View, Text } from 'react-native';

//libs
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'

//components
import DoctorRoute from './doctor'
import PatientRoute from './patient'

//actions
import { emitLogoutaction } from '../../redux/actions/account'

//reducers
import { getLevel } from '../../redux/reducers/account'


export default MainRoute = ({navigation}) => {
    const dispatch = useDispatch()
    const level = useSelector(getLevel)

    if (level === "doctor"){
        return <DoctorRoute />
    }
    else if (level === "patient"){
        return <PatientRoute/>
    }
    else{
        return <View>
            <Text>Login Is under construction</Text>
            <Button mode="contained" onPress={() => dispatch(emitLogoutaction())} style={{ marginHorizontal: 20, marginVertical: 20 }} labelStyle={{ color: "#fff" }}>
                {"LOGOUT"}
            </Button>
        </View>
    }
}