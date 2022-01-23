import React,{useEffect, useState} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Title, Paragraph, Card, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

//actions
import { startFetchCovidGraphData, startFetchCaloriesBurntGraphData, startFetchCaloriesIntakeGraphData, startFetchSleepGraphData } from '../../redux/actions/graphs'
import { fetchProfile } from '../../redux/actions/account'


import {
    LineChart
} from 'react-native-chart-kit'
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryLegend,
    VictoryPolarAxis,
    Area } from "victory-native";
import { colorCodes } from './assets'

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
    const [covidGraphOne, setCovidGraphOne] = useState({})
    const [covidGraphTwo, setCovidGraphTwo] = useState({})
    const [tab, setTab] = useState("Covid")

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
            const labels = Object.keys(caloriesBurntGraph)?.slice(0, 7)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            const values = Object.keys(caloriesBurntGraph)?.slice(0, 7)?.map((key) => caloriesBurntGraph[key]?.calories_burnt ? caloriesBurntGraph[key]?.calories_burnt : caloriesBurntGraph[key]?.calories_burnt)
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
            const labels = Object.keys(caloriesIntakeGraph)?.slice(0, 7)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            const values = Object.keys(caloriesIntakeGraph)?.slice(0, 7)?.map((key) => caloriesIntakeGraph[key]?.calories_intake ? caloriesIntakeGraph[key]?.calories_intake : 0)
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
            const labels = Object.keys(sleepGraph)?.slice(0, 7)?.map((key) => moment(key,"YYYY/MM/DD").format("D/MM"))
            const values = Object.keys(sleepGraph)?.slice(0, 7)?.map((key) => sleepGraph[key]?.sleep_in_min ? sleepGraph[key]?.sleep_in_min : 0)
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
            let graphOne = {}
            let graphTwo = {}
            Object.keys(covidGraph?.["Post-covid"])?.forEach((key, index)=>{
                graphOne = Object.assign({}, graphOne,{
                    [key + "-Post-covid"]:{
                        type:"post",
                        color: colorCodes[index%7],
                        communication:covidGraph?.["Post-covid"]?.[key]?.communication,
                        social_role:covidGraph?.["Post-covid"]?.[key]?.social_role,
                        mobility:covidGraph?.["Post-covid"]?.[key]?.mobility,
                        personal_care:covidGraph?.["Post-covid"]?.[key]?.personal_care,
                        other_activities_of_daily_living:covidGraph?.["Post-covid"]?.[key]?.other_activities_of_daily_living
                    }
                })
                graphTwo = Object.assign({}, graphTwo,{
                    [key + "-Post-covid"]:{
                        type: "post",
                        color: colorCodes[index % 7],
                        cough_throat_sensitivity_voice_change:covidGraph?.["Post-covid"]?.[key]?.cough_throat_sensitivity_voice_change,
                        breathlessness:covidGraph?.["Post-covid"]?.[key]?.breathlessness,
                        fatigue:covidGraph?.["Post-covid"]?.[key]?.fatigue,
                        pain_discomfort:covidGraph?.["Post-covid"]?.[key]?.pain_discomfort,
                        cognition:covidGraph?.["Post-covid"]?.[key]?.cognition,
                        anxiety:covidGraph?.["Post-covid"]?.[key]?.anxiety,
                        depression:covidGraph?.["Post-covid"]?.[key]?.depression,
                        ptsd_screen:covidGraph?.["Post-covid"]?.[key]?.ptsd_screen,
                        palpitation:covidGraph?.["Post-covid"]?.[key]?.palpitation,
                        dizziness:covidGraph?.["Post-covid"]?.[key]?.dizziness
                    }
                })
            })
            Object.keys(covidGraph?.["Pre-covid"])?.forEach((key, index)=>{
                graphOne = Object.assign({}, graphOne,{
                    [key + "-Pre-covid"]:{
                        color: colorCodes[(index+1)%7],
                        communication:covidGraph?.["Pre-covid"]?.[key]?.communication,
                        social_role:covidGraph?.["Pre-covid"]?.[key]?.social_role,
                        mobility:covidGraph?.["Pre-covid"]?.[key]?.mobility,
                        personal_care:covidGraph?.["Pre-covid"]?.[key]?.personal_care,
                        other_activities_of_daily_living:covidGraph?.["Pre-covid"]?.[key]?.other_activities_of_daily_living
                    }
                })
                graphTwo = Object.assign({}, graphTwo,{
                    [key + "-Pre-covid"]:{
                        type: "pre",
                        color: colorCodes[(index + 1) % 7],
                        cough_throat_sensitivity_voice_change:covidGraph?.["Pre-covid"]?.[key]?.cough_throat_sensitivity_voice_change,
                        breathlessness:covidGraph?.["Pre-covid"]?.[key]?.breathlessness,
                        fatigue:covidGraph?.["Pre-covid"]?.[key]?.fatigue,
                        pain_discomfort:covidGraph?.["Pre-covid"]?.[key]?.pain_discomfort,
                        cognition:covidGraph?.["Pre-covid"]?.[key]?.cognition,
                        anxiety:covidGraph?.["Pre-covid"]?.[key]?.anxiety,
                        depression:covidGraph?.["Pre-covid"]?.[key]?.depression,
                        ptsd_screen:covidGraph?.["Pre-covid"]?.[key]?.ptsd_screen,
                        palpitation:covidGraph?.["Pre-covid"]?.[key]?.palpitation,
                        dizziness:covidGraph?.["Pre-covid"]?.[key]?.dizziness
                    }
                })
            })
            setCovidGraphOne(graphOne)
            setCovidGraphTwo(graphTwo)
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
    const sleepChartConfig = {
        backgroundColor: '#27820C',
        backgroundGradientFrom: '#17BC00',
        backgroundGradientTo: '#459D01',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }
    const inflamationChartConfig = {
        backgroundColor: '#27820C',
        backgroundGradientFrom: '#FF5100',
        backgroundGradientTo: '#FA7334',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }

    return (
        <View> 
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <ScrollView horizontal contentContainerStyle={{ height:50, marginLeft:20, paddingRight:40 }} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={tab === "Covid" ? styles.filterButtonSelected : styles.filterButton} onPress={() => setTab("Covid")}>
                    <Text style={{ fontWeight: "400", color: tab === "Covid" ? "#fff" : "#79829e", marginHorizontal: 16, marginVertical: 6 }} >
                        Covid
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tab === "Calories" ? [styles.filterButtonSelected, { marginLeft: 10 }] : [styles.filterButton, { marginLeft: 10 }]} onPress={() => setTab("Calories")}>
                    <Text style={{ fontWeight: "400", color: tab === "Calories" ? "#fff" : "#79829e", marginHorizontal: 16, marginVertical: 6 }} >
                        Calories
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tab === "Sleep" ? [styles.filterButtonSelected, { marginLeft: 10 }] : [styles.filterButton, { marginLeft: 10 }]} onPress={() => setTab("Sleep")}>
                    <Text style={{ fontWeight: "400", color: tab === "Sleep" ? "#fff" : "#79829e", marginHorizontal: 16, marginVertical: 6 }} >
                        Sleep
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tab === "Inflamation" ? [styles.filterButtonSelected, { marginLeft: 10 }] : [styles.filterButton, { marginLeft: 10 }]} onPress={() => setTab("Inflamation")}>
                    <Text style={{ fontWeight: "400", color: tab === "Inflamation" ? "#fff" : "#79829e", marginHorizontal: 16, marginVertical: 6 }} >
                        Inflamation
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <ScrollView contentContainerStyle={{marginTop: 10, marginHorizontal: 20, paddingBottom:300 }}>
                {tab === "Covid" ? isCovidGraphLoading ? <ActivityIndicator/> : <View>
                    <Title style={{marginBottom:10, marginTop:10}}>Functional Disability Score:</Title>
                    <LinearGradient colors={['#D6D4D4', '#E4E2E2']} style={{ backgroundColor: "#fb8c00", borderRadius: 16}}>
                        <VictoryChart polar
                            theme={VictoryTheme.material}
                            height={400}
                            style={{
                                parent: {
                                    border: "1px solid #ccc",
                                    marginLeft:-25,
                                    color:"#fff",
                                },
                            }}
                            
                        >
                            <VictoryPolarAxis
                                width={400}
                                height={400}
                                standalone={false}
                                labelPlacement="perpendicular"
                                style={{
                                    grid: { stroke: "black" },
                                    tickLabels: { fontSize: 15, padding: 15 }
                                }}
                            />
                            <VictoryPolarAxis dependentAxis
                                width={400}
                                height={400}
                                domain={[0, 10]}
                                standalone={false}
                                axisAngle={180}
                            />
                            {Object.keys(covidGraphOne)?.map((key,index)=>{
                                return(
                                    <VictoryArea
                                        key={index}
                                        style={{
                                            data: {
                                                fill: covidGraphOne[key]?.color, fillOpacity: 0.5, stroke: "#626262", strokeWidth: 0.8
                                            },
                                            labels: {
                                                fontSize: 2,
                                                color: "#000"
                                            },
                                            parent: { border: "1px solid #000" },
                                        }}
                                        categories={{ x: ["communication", "mobility", "other activities", "personal care","social role"] }}
                                        data={[
                                            { x: 1, y: covidGraphOne[key]?.communication, y0: 10 },
                                            { x: 2, y: covidGraphOne[key]?.mobility, y0: 0 },
                                            { x: 3, y: covidGraphOne[key]?.other_activities_of_daily_living, y0: 0 },
                                            { x: 4, y: covidGraphOne[key]?.personal_care, y0: 0 },
                                            { x: 5, y: covidGraphOne[key]?.social_role, y0: 0 }
                                        ]} />
                                )
                            })}
                            <VictoryLegend x={30} y={370}
                                title=""
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                style={{ title: { fontSize: 20 } }}
                                data={Object.keys(covidGraphOne)?.map((key) => {
                                    return {
                                        name: [key], symbol: { fill: covidGraphOne[key]?.color }
                                    }
                                })}
                            />
                        </VictoryChart>
                    </LinearGradient>
                    <Title style={{marginBottom:10, marginTop:30}}>Symptoms Severity Score:</Title>
                    <LinearGradient colors={['#D6D4D4', '#E4E2E2']} style={{ backgroundColor: "#fb8c00", borderRadius: 16 }}>
                        <VictoryChart polar
                            theme={VictoryTheme.material}
                            height={400}
                            style={{
                                parent: {
                                    border: "1px solid #ccc",
                                    marginLeft:-20,
                                    color:"#fff"
                                }
                            }}
                        >
                            <VictoryPolarAxis
                                width={400}
                                height={400}
                                standalone={false}
                                labelPlacement="perpendicular"
                                style={{
                                    grid: { stroke: "black" },
                                    tickLabels: { fontSize: 15, padding: 15 }
                                }}
                            />
                            <VictoryPolarAxis dependentAxis
                                width={400}
                                height={400}
                                domain={[0, 10]}
                                axisAngle={180}
                                standalone={false}
                            />
                            {Object.keys(covidGraphTwo)?.map((key,index)=>{
                                return(
                                    <VictoryArea
                                        key={index}
                                        style={{
                                            data: {
                                                fill: covidGraphTwo[key]?.color, fillOpacity: 0.5, stroke: "#626262", strokeWidth: 0.8
                                            },
                                            labels: {
                                                fontSize: 2,
                                                color: "#000"
                                            },
                                            parent: { border: "1px solid #000" },
                                        }}
                                        categories={{ x: ["anxiety", "breathlessness", "cognition", "cough", "depression", "dizziness", "fatigue", "pain", "palpitation","ptsd"] }}
                                        data={[
                                            { x: 1, y: covidGraphTwo[key]?.anxiety, y0: 10 },
                                            { x: 2, y: covidGraphTwo[key]?.breathlessness, y0: 0 },
                                            { x: 3, y: covidGraphTwo[key]?.cognition, y0: 0 },
                                            { x: 4, y: covidGraphTwo[key]?.cough_throat_sensitivity_voice_change, y0: 0 },
                                            { x: 5, y: covidGraphTwo[key]?.depression, y0: 0 },
                                            { x: 6, y: covidGraphTwo[key]?.dizziness, y0: 0 },
                                            { x: 7, y: covidGraphTwo[key]?.fatigue, y0: 0 },
                                            { x: 8, y: covidGraphTwo[key]?.pain_discomfort, y0: 0 },
                                            { x: 9, y: covidGraphTwo[key]?.palpitation, y0: 0 },
                                            { x: 10, y: covidGraphTwo[key]?.ptsd_screen, y0: 0 }
                                        ]} />
                                )
                            })}
                            <VictoryLegend x={30} y={370}
                                title=""
                                centerTitle
                                orientation="horizontal"
                                gutter={20}
                                style={{ title: { fontSize: 20 } }}
                                data={Object.keys(covidGraphTwo)?.map((key) => {
                                    return {
                                        name: [key], symbol: { fill: covidGraphTwo[key]?.color }
                                    }
                                })}
                            />
                        </VictoryChart>
                    </LinearGradient>
                </View> : null }
                {tab === "Calories" ? <View>
                    <Title style={{marginTop:10}}>Calorie In-Take(kcal)</Title>
                    <Paragraph style={{marginTop:10}}>x-axis:kcal | y-axis:Date(DD/MM)</Paragraph>
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
                    <Paragraph style={{ marginTop: 10 }}>x-axis:kcal | y-axis:Date(DD/MM)</Paragraph>
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
                </View> : null }
                {tab === "Sleep" ? <View>
                    <Title style={{ marginBottom: 10}}>Sleep in mins:</Title>
                    <Paragraph style={{ marginTop: 10 }}>x-axis:mins | y-axis:Date(DD/MM)</Paragraph>
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
                </View> : null }
                {tab === "Inflamation" ? <View>
                    <Title style={{ marginBottom: 10}}>Inflamation Score:</Title>
                    <Paragraph style={{ marginTop: 10 }}>x-axis:inflamation score | y-axis:Date(DD/MM)</Paragraph>
                    {isLoadingSleepGraph ? <ActivityIndicator /> : <LineChart
                        data={{
                            labels: ["01/12", "16/12", "22/12", "04/01", "13/01", "22/01"],
                            datasets: [
                                {
                                    data: [
                                        ((Math.random() * 100)%28).toFixed(0),
                                        ((Math.random() * 100)%28).toFixed(0),
                                        ((Math.random() * 100)%28).toFixed(0),
                                        ((Math.random() * 100)%28).toFixed(0),
                                        ((Math.random() * 100)%28).toFixed(0),
                                        ((Math.random() * 100)%28).toFixed(0),
                                        
                                    ]
                                }
                            ]
                        }}
                        width={screenWidth} // from react-native
                        height={220}
                        chartConfig={inflamationChartConfig}
                        bezier
                        style={{
                            marginVertical: 10,
                            borderRadius: 16
                        }}
                    />}
                </View> : null }
            </ScrollView>
        </View>
    );
}

const styles = {
    filterButton: {
        borderRadius: 18,
        backgroundColor: "#ecf6ff",
        borderWidth: 1,
        borderColor: "#79829e",
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterButtonSelected: {
        borderRadius: 18,
        backgroundColor: "#3254be",
        borderWidth: 1,
        borderColor: "#79829e",
        shadowColor: "rgba(49, 136, 255, 0.5)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    }
}