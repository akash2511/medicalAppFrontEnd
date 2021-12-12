import React, { useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Image } from 'react-native';
import { Button } from 'react-native-paper';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";

//actions
import { emitLogoutaction, fetchProfile } from '../../../redux/actions/account'

//reducers
import { getUserName, getJwt, getIsLoadingGetProfile, getProfileDetails } from '../../../redux/reducers/account'

export default PatientSurveyQuestions = (props) => {
    const dispatch = useDispatch();

    const jwt = useSelector(getJwt)
    const isLoadingGetProfile = useSelector(getIsLoadingGetProfile)
    const profileDetails = useSelector(getProfileDetails)
    const username = useSelector(getUserName)

    useEffect(() => {
        props?.navigation?.setOptions({ title: username?.toUpperCase() })
        dispatch(fetchProfile({ jwt }))
    }, [])

    return (
        isLoadingGetProfile ? <ActivityIndicator /> : <View>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop: 20, marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image style={{ width: 60, height: 60, borderRadius: 40, marginRight: 15 }} source={{ uri: profileDetails?.profile_pic }} />
                    <Text style={{ fontWeight: "bold", color: "#000", fontSize: 30 }}>{profileDetails?.first_name} {profileDetails?.last_name}</Text>
                </View>
                <View style={{ backgroundColor: "#fff", paddingHorizontal: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 10 }}>Age: {moment().diff(moment(profileDetails?.dob, "DD-MM-YYYY"), 'years')}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 10 }}>Height:  {profileDetails?.height?.[0]?.measurement} ({profileDetails?.height?.[0]?.unit_of_measurement})</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 10 }}>Weight:  {profileDetails?.weight?.[0]?.measurement} ({profileDetails?.weight?.[0]?.unit_of_measurement})</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 10 }}>Do you Smoke:  {profileDetails?.do_you_smoke}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>Do you Drink:  {profileDetails?.do_you_drink}</Text>
                </View>
                <Button mode="contained" onPress={() => { }} style={{ marginTop: 20 }} labelStyle={{ color: "#fff" }}>
                    {"EDIT"}
                </Button>
                <Button mode="contained" onPress={() => dispatch(emitLogoutaction())} style={{ marginTop: 20 }} labelStyle={{ color: "#fff" }}>
                    {"LOGOUT"}
                </Button>
            </ScrollView>
        </View>
    );
}