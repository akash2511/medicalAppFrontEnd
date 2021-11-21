import * as React from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';

import {
    LineChart,
    BarChart,
    ProgressChart,
} from 'react-native-chart-kit'
import {
    VictoryChart,
VictoryTheme,
VictoryArea,
VictoryPolarAxis } from "victory-native";

//actions
import { appLogout } from '../../../redux/actions/ui'

//reducers
import { getUsername } from '../../../redux/reducers/ui'

export default MyPatientProfileDetails = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUsername)

    const screenWidth = Dimensions.get('window').width - 40

    const lineChartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#2C79FF',
        backgroundGradientTo: '#4B8DFF',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
    const barChartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#46006C',
        backgroundGradientTo: '#630198',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
    const progressChartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#44FE2A',
        backgroundGradientTo: '#459D01',
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
        <ScrollView contentContainerStyle={{marginTop: 10, marginHorizontal: 20, paddingBottom:300 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical:20}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginBottom:10}}>
                    <Image style={{width:40, height:40, borderRadius:20, marginRight:15}} source={require('../../../../assets/images/sampleProfile.png')} />
                    <Title>Harry</Title>
                </View>
                <Paragraph>Treatment Start Date : 12th Nov 2021</Paragraph>
                <Paragraph>Last Visit Date : 12th Nov 2021</Paragraph>
                <Paragraph>Age : 42</Paragraph>
            </View>
            <LinearGradient colors={['#fb8c00', '#ffa726']} style={{ backgroundColor: "#fb8c00", borderRadius: 16 }}>
                <VictoryChart polar
                    theme={VictoryTheme.material}
                    animate={{
                        duration: 600,
                        onLoad: { duration: 300 }
                    }}
                    style={{
                        parent: {
                            border: "1px solid #ccc",
                            marginLeft:-20
                        }
                    }}
                >
                    <VictoryArea
                        style={{
                            data: {
                                fill: "#c43a31", fillOpacity: 0.5, stroke: "#c43a31", strokeWidth: 1
                            },
                            labels: {
                                fontSize: 15
                            },
                            parent: { border: "1px solid #000" }
                        }}
                        data={[
                            { x: 1, y: 5, y0: 0 },
                            { x: 2, y: 3, y0: 0 },
                            { x: 3, y: 10, y0: 0 },
                            { x: 4, y: 4, y0: 0 },
                            { x: 5, y: 10, y0: 0 }
                        ]} />
                    <VictoryArea
                        style={{
                            data: {
                                fill: "#27F03F", fillOpacity: 0.5, stroke: "#c43a31", strokeWidth: 1
                            },
                            labels: {
                                fontSize: 15
                            },
                            parent: { border: "1px solid #000" }
                        }}
                        data={[
                            { x: 1, y: 1, y0: 0 },
                            { x: 2, y: 5, y0: 0 },
                            { x: 3, y: 3, y0: 0 },
                            { x: 4, y: 9, y0: 0 },
                            { x: 5, y: 10, y0: 0 }
                        ]} />
                    <VictoryArea
                        style={{
                            data: {
                                fill: "#3058EE", fillOpacity: 0.5, stroke: "#c43a31", strokeWidth: 1
                            },
                            labels: {
                                fontSize: 15
                            },
                            parent: { border: "1px solid #000" }
                        }}
                        data={[
                            { x: 1, y: 10, y0: 0 },
                            { x: 2, y: 8, y0: 0 },
                            { x: 3, y: 3, y0: 0 },
                            { x: 4, y: 2, y0: 0 },
                            { x: 5, y: 8, y0: 0 }
                        ]} />
                    <VictoryPolarAxis />
                </VictoryChart>
            </LinearGradient>
            <LineChart
                data={chartData}
                width={screenWidth} // from react-native
                height={220}
                chartConfig={lineChartConfig}
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
                chartConfig={progressChartConfig}
                style={{
                    marginVertical:10,
                    borderRadius: 16
                }}
            />
            <BarChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={barChartConfig}
                style={{
                    marginVertical:10,
                    borderRadius: 16,
                }}
            />
        </ScrollView>
    );
}