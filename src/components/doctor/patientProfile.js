import * as React from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'

//actions
import { appLogout } from '../../redux/actions/ui'

//reducers
import { getUsername } from '../../redux/reducers/ui'

export default MyPatientDetails = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUsername)

    const screenWidth = Dimensions.get('window').width - 40

    const chartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }]
    }

    return (
        <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width:'30%', marginHorizontal:20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <ScrollView contentContainerStyle={{marginTop: 10, marginHorizontal: 20 }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical:10}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginBottom:10}}>
                        <Image style={{width:40, height:40, borderRadius:20, marginRight:15}} source={require('../../../assets/images/sampleProfile.png')} />
                        <Title>Harry</Title>
                    </View>
                    <Paragraph>Treatment Start Date : 12th Nov 2021</Paragraph>
                    <Paragraph>Last Visit Date : 12th Nov 2021</Paragraph>
                    <Paragraph>Age : 42</Paragraph>
                    <Paragraph>Diabetic : YES</Paragraph>
                </View>
                <LineChart
                    data={chartData}
                    width={screenWidth} // from react-native
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical:10,
                        borderRadius: 16
                    }}
                />
                <ProgressChart
                    data={[0.4, 0.6, 0.8]}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    style={{
                        marginVertical:10,
                        borderRadius: 16
                    }}
                />
                <BarChart
                    data={chartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    style={{
                        marginVertical:10,
                        borderRadius: 16,
                        marginBottom:200
                    }}
                />
            </ScrollView>
        </View>
    );
}