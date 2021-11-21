import * as React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { useDispatch, useSelector} from "react-redux";

//actions
import { appLogout } from '../../redux/actions/ui'

//reducers
import { getUsername } from '../../redux/reducers/ui'

export default DoctorDashboard = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUsername)

    return (
        <View>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop: 20, marginHorizontal:20 }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "#000", marginBottom: 20, fontSize: 30 }}>Welcome {username}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25}}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRightColor:'#C3C3C2', borderRightWidth:1, width:'48%'}}>
                        <Text style={{fontSize:15, marginBottom:10}}>No. of Patients</Text>
                        <Text style={{ fontSize: 20, fontWeight:'700' }}>2</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '48%'}}>
                        <Text style={{fontSize:15, marginBottom:10}}>No. of Appointments</Text>
                        <Text style={{ fontSize: 20, fontWeight:'700' }}>0</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 30, fontSize: 20 }}>My Patients</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <View style={{width:'60%'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }} source={require('../../../assets/images/sampleProfile.png')} />
                            <Title>Harry</Title>
                        </View>
                        <Paragraph>Treatment Start Date :</Paragraph>
                        <Paragraph>1st Nov 2021</Paragraph>
                    </View>
                    <Button mode="outlined" onPress={() => { props?.navigation?.navigate("PatientDetailsScreen", { name: "Harry" })}} style={{ width: '40%' }}>
                        View
                    </Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 3, borderColor:"#DBDBDB", borderWidth:0.25 }}>
                    <View style={{width:'60%'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }} source={require('../../../assets/images/sampleProfile.png')} />
                            <Title>Edward</Title>
                        </View>
                        <Paragraph>Treatment Start Date :</Paragraph>
                        <Paragraph>12th Nov 2021</Paragraph>
                    </View>
                    <Button mode="outlined" onPress={() => { props?.navigation?.navigate("PatientDetailsScreen", { name:"Edward"})}} style={{ width: '40%' }}>
                        View
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}