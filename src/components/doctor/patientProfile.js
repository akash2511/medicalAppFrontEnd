import * as React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//actions
import { appLogout } from '../../redux/actions/ui'

//reducers
import { getUsername } from '../../redux/reducers/ui'

export default MyPatientDetails = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUsername)

    return (
        <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width:'30%', marginHorizontal:20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop: 10, marginHorizontal: 20 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginBottom:10}}>
                        <Image style={{width:40, height:40, borderRadius:20, marginRight:15}} source={require('../../../assets/images/sampleProfile.png')} />
                        <Title>Harry</Title>
                    </View>
                    <Paragraph>Treatment Start Date : 12th Nov 2021</Paragraph>
                    <Paragraph>Last Visit Date : 12th Nov 2021</Paragraph>
                    <Paragraph>Age : 42</Paragraph>
                    <Paragraph>Diabetic : YES</Paragraph>
                </View>
            </ScrollView>
        </View>
    );
}