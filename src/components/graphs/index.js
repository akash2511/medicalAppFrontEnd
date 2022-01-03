import React,{useEffect, useState} from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native';
import { Button, Title, Paragraph, Card, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

//actions
import { startFetchCovidGraphData, startFetchCaloriesBurntGraphData, startFetchCaloriesIntakeGraphData, startFetchSleepGraphData } from '../../redux/actions/graphs'
import { fetchProfile } from '../../redux/actions/account'


import {
    LineChart,
    BarChart,
    ProgressChart,
} from 'react-native-chart-kit'
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryPolarAxis,
    VictoryLegend } from "victory-native";

//reducers
import { getJwt, getIsLoadingGetProfile, getProfileDetails } from '../../redux/reducers/account'
import { getIsLoadingCaloriesBurnt, getCaloriesBurntGraph, getIsLoadingCaloriesIntake, getCaloriesIntakeGraph, getIsLoadingSleepGraph, getSleepGraph, getIsCovidGraphLoading, getCovidGraph } from '../../redux/reducers/graph'
import { usePrevious } from '../../helpers/utils'

export default PatientGraphs = (props) => {
    const dispatch = useDispatch();

    const jwt = useSelector(getJwt)
    const caloriesBurntGraph = useSelector(getCaloriesBurntGraph)
    const isLoadingCaloriesBurnt = useSelector(getIsLoadingCaloriesBurnt)
    const isLoadingCaloriesBurntPrev = usePrevious(isLoadingCaloriesBurnt)
    const caloriesIntakeGraph = useSelector(getCaloriesIntakeGraph)
    const isLoadingCaloriesIntake = useSelector(getIsLoadingCaloriesIntake)
    const isLoadingCaloriesIntakePrev = usePrevious(isLoadingCaloriesIntake)
    const sleepGraph = useSelector(getSleepGraph)
    const isLoadingSleepGraph = useSelector(getIsLoadingSleepGraph)
    const isLoadingSleepGraphPrev = usePrevious(isLoadingSleepGraph)
    const covidGraph = useSelector(getCovidGraph)
    const isCovidGraphLoading = useSelector(getIsCovidGraphLoading)
    const isCovidGraphLoadingPrev = usePrevious(isCovidGraphLoading)
    const isLoadingGetProfile = useSelector(getIsLoadingGetProfile)
    const isLoadingGetProfilePrev = usePrevious(isLoadingGetProfile)
    const profileDetails = useSelector(getProfileDetails)

    const [caloriesBurntData, setCaloriesBurntData] = useState({
        labels: ["1/01"],
        datasets: [{
            data: [
                Math.random() * 100,
            ]
        }]
    })
    const [caloriesIntakeData, setCaloriesIntakeData] = useState({
        labels: ["1/01"],
        datasets: [{
            data: [
                Math.random() * 100,
            ]
        }]
    })
    const [sleepData, setSleepData] = useState({
        labels: ["1/01"],
        datasets: [{
            data: [
                Math.random() * 100,
            ]
        }]
    })

    const screenWidth = Dimensions.get('window').width - 40

    useEffect(() => {
        props?.navigation?.setOptions({ title: "Graphs" })
        if (props?.route?.params?.patientId){
            const { patientId } = props?.route?.params;
            dispatch(startFetchCovidGraphData({ jwt, patientId: patientId}))
            dispatch(startFetchCaloriesBurntGraphData({ jwt, patientId: patientId}))
            dispatch(startFetchCaloriesIntakeGraphData({ jwt, patientId: patientId}))
            dispatch(startFetchSleepGraphData({ jwt, patientId: patientId}))
        }
        else{
            dispatch(fetchProfile({ jwt }))
        }
    }, [])

    useEffect(() => {
        if (!isLoadingGetProfile && isLoadingGetProfilePrev !== isLoadingGetProfile && isLoadingGetProfilePrev !== undefined) {
            dispatch(startFetchCovidGraphData({ jwt, patientId: profileDetails?._id }))
            dispatch(startFetchCaloriesBurntGraphData({ jwt, patientId: profileDetails?._id }))
            dispatch(startFetchCaloriesIntakeGraphData({ jwt, patientId: profileDetails?._id }))
            dispatch(startFetchSleepGraphData({ jwt, patientId: profileDetails?._id }))
        }
    }, [isLoadingGetProfile, isLoadingGetProfilePrev])

    useEffect(() => {
        if (!isLoadingCaloriesBurnt && isLoadingCaloriesBurnt !== isLoadingCaloriesBurntPrev && isLoadingCaloriesBurntPrev !== undefined){
            const labels = Object.keys(caloriesBurntGraph)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            const values = Object.keys(caloriesBurntGraph)?.map((key) => caloriesBurntGraph[key]?.calories_burnt ? caloriesBurntGraph[key]?.calories_burnt : caloriesBurntGraph[key]?.calories_burnt)
            setCaloriesBurntData({
                labels: labels,
                datasets: [{
                    data: values
                }]
            })
        }
    }, [isLoadingCaloriesBurnt, isLoadingCaloriesBurntPrev])

    useEffect(() => {
        if (!isLoadingCaloriesIntake && isLoadingCaloriesIntake !== isLoadingCaloriesIntakePrev && isLoadingCaloriesIntakePrev !== undefined){
            const labels = Object.keys(caloriesIntakeGraph)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            const values = Object.keys(caloriesIntakeGraph)?.map((key) => caloriesIntakeGraph[key]?.calories_intake ? caloriesIntakeGraph[key]?.calories_intake : 0)
            setCaloriesIntakeData({
                labels: labels,
                datasets: [{
                    data: values
                }]
            })
        }
    }, [isLoadingCaloriesIntake, isLoadingCaloriesIntakePrev])

    useEffect(() => {
        if (!isLoadingSleepGraph && isLoadingSleepGraph !== isLoadingSleepGraphPrev && isLoadingSleepGraphPrev !== undefined){
            const labels = Object.keys(sleepGraph)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            const values = Object.keys(sleepGraph)?.map((key) => sleepGraph[key]?.sleep_in_min ? sleepGraph[key]?.sleep_in_min : 0)
            setSleepData({
                labels: labels,
                datasets: [{
                    data: values
                }]
            })
        }
    }, [isLoadingSleepGraph, isLoadingSleepGraphPrev])

    useEffect(() => {
        if (!isCovidGraphLoading && isCovidGraphLoading !== isCovidGraphLoadingPrev && isCovidGraphLoadingPrev !== undefined){
            console.log(covidGraph,"covidGraph");
            // const labels = Object.keys(sleepGraph)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            // const values = Object.keys(sleepGraph)?.map((key) => sleepGraph[key]?.sleep_in_min ? sleepGraph[key]?.sleep_in_min : 0)
            // setSleepData({
            //     labels: labels,
            //     datasets: [{
            //         data: values
            //     }]
            // })
        }
    }, [isCovidGraphLoading, isCovidGraphLoadingPrev])

    const CaloriesIntakeConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#2C79FF',
        backgroundGradientTo: '#4B8DFF',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
    const CaloriesBurntConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#46006C',
        backgroundGradientTo: '#630198',
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
    const sleepChartConfig = {
        backgroundColor: '#27820C',
        backgroundGradientFrom: '#17BC00',
        backgroundGradientTo: '#459D01',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }

    return (
        <ScrollView contentContainerStyle={{marginTop: 10, marginHorizontal: 20, paddingBottom:300 }}>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <Title style={{marginBottom:10}}>Covid Graph</Title>
            <LinearGradient colors={['#D6D4D4', '#E4E2E2']} style={{ backgroundColor: "#fb8c00", borderRadius: 16 }}>
                <VictoryChart polar
                    theme={VictoryTheme.material}
                    animate={{
                        duration: 600,
                        onLoad: { duration: 300 }
                    }}
                    style={{
                        parent: {
                            border: "1px solid #ccc",
                            marginLeft:-20,
                            color:"#fff"
                        }
                    }}
                >
                    <VictoryArea
                        style={{
                            data: {
                                fill: "#c43a31", fillOpacity: 0.7, stroke: "#c43a31", strokeWidth: 1
                            },
                            labels: {
                                fontSize: 15,
                                color:"#fff"
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
                                fill: "#27F03F", fillOpacity: 0.7, stroke: "#c43a31", strokeWidth: 1
                            },
                            labels: {
                                fontSize: 15,
                                color: "#fff"
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
                    <VictoryPolarAxis />
                    <VictoryLegend x={20} y={320}
                        title=""
                        centerTitle
                        orientation="horizontal"
                        gutter={20}
                        style={{ title: { fontSize: 20 } }}
                        data={[
                            { name: "Pre-Covid", symbol: { fill: "#c43a31" } },
                            { name: "Post-Covid", symbol: { fill: "#27F03F" } }
                        ]}
                    />
                </VictoryChart>
            </LinearGradient>
            <Title style={{marginTop:30}}>Calorie In-Take(kcal)</Title>
            {isLoadingCaloriesIntake ? <ActivityIndicator/> :<LineChart
                data={caloriesIntakeData}
                width={screenWidth} // from react-native
                height={220}
                chartConfig={CaloriesIntakeConfig}
                bezier
                style={{
                    marginVertical:10,
                    borderRadius: 16
                }}
            />}
            <Title style={{marginTop:30}}>Calories Burnt(kcal)</Title>
            {isLoadingCaloriesBurnt ? <ActivityIndicator/> : <LineChart
                data={caloriesBurntData}
                width={screenWidth} // from react-native
                height={220}
                chartConfig={CaloriesBurntConfig}
                bezier
                style={{
                    marginVertical:10,
                    borderRadius: 16
                }}
            />}
            <Title style={{ marginTop: 30 }}>Sleep(mins)</Title>
            {isLoadingSleepGraph ? <ActivityIndicator /> : <LineChart
                data={sleepData}
                width={screenWidth} // from react-native
                height={220}
                chartConfig={sleepChartConfig}
                bezier
                style={{
                    marginVertical: 10,
                    borderRadius: 16
                }}
            />}
        </ScrollView>
    );
}