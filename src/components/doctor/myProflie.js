import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//actions
import { emitLogoutaction } from '../../redux/actions/account'

//reducers
import { getUserName } from '../../redux/reducers/account'

export default DoctorMyProfile = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUserName)

    return (
        <View>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop: 20, marginHorizontal: 20 }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "#000", marginBottom: 20, fontSize: 30 }}>Name: {username}</Text>
                </View>
                <Button mode="contained" onPress={() => dispatch(emitLogoutaction())} style={{ marginVertical: 20 }} labelStyle={{ color: "#fff" }}>
                    {"LOGOUT"}
                </Button>
            </ScrollView>
        </View>
    );
}