import React,{useEffect} from 'react';
import { ScrollView, View, Image, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

//actions
import { startFetchEmr } from '../../../redux/actions/emr'
import { startFetchProfile } from '../../../redux/actions/profile'

//reducers
import {
    getIsEmrLoading,
    getAllEmrs
} from '../../../redux/reducers/emr'
import {
    getJwt
} from '../../../redux/reducers/account'
import {
    getIsProfileLoading, 
    getProfileDetails
} from '../../../redux/reducers/profile'

//helpers
import { usePrevious } from '../../../helpers/utils'


export default MyPatientDetails = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { patientId } = props?.route?.params;

    const jwt = useSelector(getJwt);
    const isEmrLoading = useSelector(getIsEmrLoading);
    const isEmrLoadingPrev = usePrevious(isEmrLoading);
    const emrData = useSelector(getAllEmrs);
    const isProfileLoading = useSelector(getIsProfileLoading);
    const profileDetails = useSelector(getProfileDetails);

    useEffect(() => {
        if (isFocused){
            props?.navigation?.setOptions({ title: "Prescription" })
            dispatch(startFetchEmr({ jwt, patientId }))
            dispatch(startFetchProfile({ jwt, profileId: patientId }))
        }
    }, [isFocused])

    const { diets, emr, exercises, medication, self_management, supplements } = emrData
    const profileData = profileDetails?.[0]

    return (
        isEmrLoading || isProfileLoading ? <ActivityIndicator/> : <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width: '30%', marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <ScrollView contentContainerStyle={{marginTop: 10, marginHorizontal: 20, paddingBottom:300 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }} source={{ uri: profileData?.profile_pic }} />
                        <Title>{profileData?.first_name + " " + profileData?.last_name}</Title>
                    </View>
                    <Paragraph>Treatment Start Date : {moment(profileData?.created_at).format("Do MMM YYYY")}</Paragraph>
                    <Paragraph>Last Visit Date : {moment(profileData?.updated_at).format("Do MMM YYYY")}</Paragraph>
                    <Paragraph>Age : {moment().diff(moment(profileData?.dob, "DD-MM-YYYY"), 'years')} years</Paragraph>
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>{"Medication : " + medication?.generic_name}</Title>
                    <Paragraph>Drug Class : {medication?.drug_class}</Paragraph>
                    <Paragraph>Medication For : {medication?.medication_for}</Paragraph>
                    <Paragraph>Type : {medication?.type}</Paragraph>
                    <Paragraph>Description : {medication?.description}</Paragraph>
                    <Button mode="outlined" style={{margin:10}} onPress={() => props?.navigation.navigate('DoctorMedicationSearch', { emrId: emr?._id})}>
                        Change
                    </Button>
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>{"Diet Plan:"}</Title>
                    {diets?.map((diet,index)=>{
                        return(
                            <Paragraph key={index}>{diet?.name} - {diet?.type?.join(", ")}</Paragraph>
                        )
                    })}
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>{"Supplements:"}</Title>
                    {supplements?.map((supp,index)=>{
                        return(
                            <View key={index}>
                                <Paragraph>{supp?.category}:</Paragraph>
                                <Paragraph>{supp?.name} - {supp?.serving?.measurement}({supp?.serving?.unit_of_measurement})</Paragraph>
                            </View>
                        )
                    })}
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>{"Excercise :"}</Title>
                    {exercises?.map((excercise, index) => {
                        return (
                            <Paragraph key={index}>{excercise?.name} : {excercise?.calories_burnt?.value + "kcal"} - {excercise?.calories_burnt?.duration_in_min + "mins"}</Paragraph>
                        )
                    })}
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>{"Sleep :"}</Title>
                    <Paragraph>Duration : {self_management?.sleep_in_min}mins</Paragraph>
                </View>
            </ScrollView>
        </View>
    );
}