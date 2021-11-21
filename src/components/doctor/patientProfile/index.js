import React,{useState} from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

//assets
import { patientProfileTabs } from './assets'

//components
import MyPatientProfileDetails from './patientProfile'
import DietScreen from './diet/index'
import SupplementsScreen from './supplements/index'


export default MyPatientDetails = (props) => {
    const [selectedTab, setSlectedTab] = useState("Profile")

    const renderContent = () => {
        if (selectedTab === "Profile"){
            return <MyPatientProfileDetails/>
        }
        else if (selectedTab === "Diet"){
            return <DietScreen navigation={props?.navigation}/>
        }
        else if (selectedTab === "Supplements"){
            return <SupplementsScreen navigation={props?.navigation}/>
        }
    }
    return (
        <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width: '30%', marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <ScrollView  horizontal contentContainerStyle={{paddingLeft:20, marginVertical:20}} showsHorizontalScrollIndicator={false}>
                {patientProfileTabs.map((tab, index)=> {
                    return(
                        <TouchableOpacity key={index} style={{ borderWidth: 0.7, borderColor: selectedTab === tab ? "#010F71" : "#C1C1C1", borderRadius: 16, paddingHorizontal: 15, paddingVertical: 8, marginRight: 20, backgroundColor: selectedTab === tab ? "#2842FD" : "#DEDEDF", height:35}} onPress={()=>setSlectedTab(tab)}>
                            <Text style={{ color: selectedTab === tab ? "#fff" : "#232323"}}>{tab}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            {renderContent()}
        </View>
    );
}