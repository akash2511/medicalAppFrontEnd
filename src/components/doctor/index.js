import React,{useEffect} from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { useDispatch, useSelector} from "react-redux";
import moment from 'moment';

//reducers
import { getUserName, getJwt } from '../../redux/reducers/account'
import { getIsPatientsLoading, getAllDoctorPatients } from '../../redux/reducers/doctor'

//actions
import { startFetchPatientList } from '../../redux/actions/doctor'

export default DoctorDashboard = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUserName)
    const jwt = useSelector(getJwt)
    const isPatientsLoading = useSelector(getIsPatientsLoading)
    const allDoctorPatients = useSelector(getAllDoctorPatients)

    useEffect(()=>{
        props?.navigation?.setOptions({ title: username?.toUpperCase() })
        dispatch(startFetchPatientList({jwt}))
    },[])

    return (
        <View>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop: 20, marginHorizontal:20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25}}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRightColor:'#C3C3C2', borderRightWidth:1, width:'48%'}}>
                        <Text style={{fontSize:15, marginBottom:10}}>No. of Patients</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>{allDoctorPatients?.length}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '48%'}}>
                        <Text style={{fontSize:15, marginBottom:10}}>No. of Appointments</Text>
                        <Text style={{ fontSize: 20, fontWeight:'700' }}>0</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 30, fontSize: 20 }}>My Patients</Text>
                {isPatientsLoading ? <ActivityIndicator /> : allDoctorPatients && allDoctorPatients?.map((patient,index)=>{
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                            <View style={{ width: '60%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                                    <Image style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }} source={{ uri: patient?.profile_pic}} />
                                    <Title>{patient?.first_name + " " + patient?.last_name}</Title>
                                </View>
                                <Paragraph>Treatment Start Date :</Paragraph>
                                <Paragraph>{moment(patient?.created_at).format("Do MMM YYYY")}</Paragraph>
                            </View>
                            <Button mode="outlined" onPress={() => { props?.navigation?.navigate("DoctorPatientDetails", { patientId: patient?._id }) }} style={{ width: '40%' }}>
                                View
                            </Button>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}