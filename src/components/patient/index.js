import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Button, IconButton, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import _ from 'underscore'
import NumericInput from 'react-native-numeric-input'

//reducers
import { getUserName, getJwt, getIsLoadingGetProfile, getProfileDetails } from '../../redux/reducers/account'
import { getIsLoadingPatientMeal , getIsLoadingPatientSelfManagement , getPatientMeal , getPatientSelfManagement } from '../../redux/reducers/patient'
import { getisDietLoading, geDiet } from '../../redux/reducers/diet'
import { getisExerciseLoading, getExercise } from '../../redux/reducers/exercise'
import { getisSupplementsLoading, getSupplements } from '../../redux/reducers/supplements'



//actions
import { fetchProfile } from '../../redux/actions/account'
import { startFetchPatientMeal, startFetchPatientSelfManagement, startPostPatientMeal, startEditPatientMeal, startPostPatientSelfManagement, startEditPatientSelfManagement } from '../../redux/actions/patient'
import { startFetchDiet } from '../../redux/actions/diet'
import { startFetchSupplements } from '../../redux/actions/supplements'
import { startFetchExercise } from '../../redux/actions/exercise'

//components
import PatientQuestionaire from './questionaire'
import { usePrevious } from '../../helpers/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default PatientDashboard = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const ScrollViewRef = useRef();

    const username = useSelector(getUserName)
    const jwt = useSelector(getJwt)
    const isLoadingGetProfile = useSelector(getIsLoadingGetProfile)
    const isLoadingGetProfilePrev = usePrevious(isLoadingGetProfile)
    const profileDetails = useSelector(getProfileDetails)
    const isLoadingPatientMeal = useSelector(getIsLoadingPatientMeal)
    const isLoadingPatientMealPrev = usePrevious(isLoadingPatientMeal)
    const isLoadingPatientSelfManagement = useSelector(getIsLoadingPatientSelfManagement)
    const isLoadingPatientSelfManagementPrev = usePrevious(isLoadingPatientSelfManagement)
    const patientMeal = useSelector(getPatientMeal)
    const patientSelfManagement = useSelector(getPatientSelfManagement)
    const diet = useSelector(geDiet)
    const isDietLoading = useSelector(getisDietLoading)
    const exercise = useSelector(getExercise)
    const isSupplementsLoading = useSelector(getisSupplementsLoading)
    const supplements = useSelector(getSupplements)
    const isExerciseLoading = useSelector(getisExerciseLoading)

    const [showQuestionaire, setShowQuestionaire ] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    const dietById = _.groupBy(diet,(x)=>x?._id)
    const exerciseById = _.groupBy(exercise,(x)=>x?._id)

    useEffect(() => {
        props?.navigation?.setOptions({ title: username?.toUpperCase() })
        dispatch(fetchProfile({ jwt }))
        dispatch(startFetchDiet({ jwt }))
        dispatch(startFetchExercise({ jwt }))
        dispatch(startFetchSupplements({ jwt }))
    }, [])

    useEffect(() => {
        if (isFocused){
            dispatch(startFetchPatientMeal({ jwt, date:moment().format("YYYY-MM-DD") }))
            dispatch(startFetchPatientSelfManagement({ jwt, date: moment().format("YYYY-MM-DD") }))
        }
    }, [isFocused])

    useEffect(() => {
        if (!isLoadingGetProfile && isLoadingGetProfile !== isLoadingGetProfilePrev && isLoadingGetProfilePrev !== undefined){
            setShowQuestionaire(!profileDetails?.questionaire_shown)
        }
    }, [isLoadingGetProfile, isLoadingGetProfilePrev])

    useEffect(() => {
        if (!isLoadingPatientMeal && isLoadingPatientMeal !== isLoadingPatientMealPrev && isLoadingPatientMealPrev !== undefined){
            ScrollViewRef?.current?.scrollTo({
                y: scrollY,
                x: 0,
                animated: false,
            });
        }
    }, [isLoadingPatientMeal, isLoadingPatientMealPrev])

    useEffect(() => {
        if (!isLoadingPatientSelfManagement && isLoadingPatientSelfManagement !== isLoadingPatientSelfManagementPrev && isLoadingPatientSelfManagementPrev !== undefined){
            ScrollViewRef?.current?.scrollTo({
                y: scrollY,
                x: 0,
                animated: false,
            });
        }
    }, [isLoadingPatientSelfManagement, isLoadingPatientSelfManagementPrev])

    const getCaloriesIntake = () => {
        let totalCalories = 0
        if (patientMeal){
            const { breakfast, dinner, lunch, snack } = patientMeal
            breakfast?.forEach((item) => totalCalories = totalCalories + dietById[item?.id]?.[0]?.calories?.measurement)
            dinner?.forEach((item) => totalCalories = totalCalories + dietById[item?.id]?.[0]?.calories?.measurement)
            lunch?.forEach((item) => totalCalories = totalCalories + dietById[item?.id]?.[0]?.calories?.measurement)
            snack?.forEach((item) => totalCalories = totalCalories + dietById[item?.id]?.[0]?.calories?.measurement)
        }
        return totalCalories
    }

    const getCaloriesBurnt = () => {
        let totalCalories = 0
        if (patientSelfManagement){
            const { exercise } = patientSelfManagement
            exercise?.forEach((item) => {
                totalCalories = totalCalories + ((item?.duration_in_min / exerciseById[item?.id]?.[0]?.calories_burnt?.duration_in_min) * exerciseById[item?.id]?.[0]?.calories_burnt?.value)
            })
        }
        return totalCalories
    }

    const onAddItem = (mealType) => {
        props?.navigation.navigate("PatientDietSearch", { mealType, edit: patientMeal })
    }

    const onAddExercise = () => {
        props?.navigation.navigate("PatientExerciseSearch", { edit: patientSelfManagement})
    }

    const onAddSupplements = () => {
        props?.navigation.navigate("PatientSupplementsSearch", { edit: patientMeal})
    }

    const onChangeHidration = (value) => {
        if (patientMeal) {
            dispatch(startEditPatientMeal({ jwt, data: { hydartion_in_litres: value }, id: patientMeal?._id }))
        }
        else {
            dispatch(startPostPatientMeal({ jwt, data: { hydartion_in_litres: value, date: moment().format("YYYY-MM-DD") } }))
        }
    }

    const onChangeSleep = (value) => {
        if (patientSelfManagement) {
            const data = { 
                sleep_in_min: value * 60 
            }
            dispatch(startEditPatientSelfManagement({ jwt, data, id: patientSelfManagement?._id }))
        }
        else {
            const data = {
                sleep_in_min: value * 60,
                date: moment().format("YYYY-MM-DD")
            }
            dispatch(startPostPatientSelfManagement({ jwt, data }))
        }
    }

    const onDelete = (wholeArray, item, type) => {      
        if (type === "supplements"){
            const filteredArray = wholeArray?.filter((id) => id !== item)
            let data = {
                [type]: filteredArray,
            }
            dispatch(startEditPatientMeal({ jwt, data, id: patientMeal?._id }))
        }
        else if (type === "exercise"){
            const filteredArray = wholeArray?.filter((id) => id?.id !== item?.id)
            let data = {
                "exercise": filteredArray
            }
            dispatch(startEditPatientSelfManagement({ jwt, data, id: patientSelfManagement?._id }))
        }
        else{
            const filteredArray = wholeArray?.filter((meal) => meal?.id !== item?.id)
            let data = {
                [type]: filteredArray,
            }
            dispatch(startEditPatientMeal({ jwt, data, id: patientMeal?._id }))
        }
    }

    return (
        isLoadingGetProfile || isLoadingPatientMeal || isLoadingPatientSelfManagement || isDietLoading || isExerciseLoading || isSupplementsLoading ? <ActivityIndicator /> : showQuestionaire ? <PatientQuestionaire profileDetails={profileDetails}/> : <View>
            <ScrollView 
                ref={ScrollViewRef}

                // We don't need `onContentSizeChanged`
                // this onScroll fetches data  when scroll reaches top
                // then it scrolls to last position as you asked

                onScroll={({ nativeEvent }) => {
                    setScrollY(nativeEvent?.contentOffset?.y)
                }}
                scrollEventThrottle={400}
                contentContainerStyle={{marginTop: 20, marginHorizontal: 20, paddingBottom:200 }}>
                <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 10, fontSize: 20 }}>{moment().format("Do MMM YYYY")}</Text>
                <Text style={{ fontWeight: "700", color: "#000", marginVertical: 10, fontSize: 18 }}>Diet</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRightColor: '#C3C3C2', borderRightWidth: 1, width: '48%' }}>
                        <Text style={{ fontSize: 15, marginBottom: 10, marginTop:5 }}>Calories Intake</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginTop:8 }}>{getCaloriesIntake()} kcal</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '48%' }}>
                        <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 5 }}>Hydration</Text>
                        <NumericInput
                            onChange={value => onChangeHidration(value)}
                            minValue={0}
                            rounded
                            value={patientMeal?.hydartion_in_litres}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical:20 }}>
                    <View style={{ borderBottomColor: '#C3C3C2', borderBottomWidth: 1, marginBottom:20, paddingBottom:10}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'baseline'}}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Breakfast:</Text>
                            <Button mode="outlined" onPress={() => onAddItem("breakfast")}>
                                ADD +
                            </Button>
                        </View>
                        {patientMeal?.['breakfast'] ? patientMeal['breakfast']?.map((item, index) => {
                            return (
                                <View key={index} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline', marginVertical:10}}>
                                    <Text style={{ fontSize: 16 }}>{dietById[item?.id]?.[0]?.name} - {dietById[item?.id]?.[0]?.calories?.measurement}({dietById[item?.id]?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(patientMeal['breakfast'], item,"breakfast")}>
                                        <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}
                    </View>
                    <View style={{ borderBottomColor: '#C3C3C2', borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Lunch:</Text>
                            <Button mode="outlined" onPress={() => onAddItem("lunch")}>
                                ADD +
                            </Button>
                        </View>
                        {patientMeal?.['lunch'] ? patientMeal['lunch']?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{dietById[item?.id]?.[0]?.name} - {dietById[item?.id]?.[0]?.calories?.measurement}({dietById[item?.id]?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(patientMeal['lunch'], item, "lunch")}>
                                        <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}
                    </View>
                    <View style={{ borderBottomColor: '#C3C3C2', borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Snack:</Text>
                            <Button mode="outlined" onPress={() => onAddItem("snack")}>
                                ADD +
                            </Button>
                        </View>
                        {patientMeal?.['snack'] ? patientMeal['snack']?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{dietById[item?.id]?.[0]?.name} - {dietById[item?.id]?.[0]?.calories?.measurement}({dietById[item?.id]?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(patientMeal['snack'], item, "snack")}>
                                        <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Dinner:</Text>
                            <Button mode="outlined" onPress={() => onAddItem("dinner")}>
                                ADD +
                            </Button>
                        </View>
                        {patientMeal?.['dinner'] ? patientMeal['dinner']?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{dietById[item?.id]?.[0]?.name} - {dietById[item?.id]?.[0]?.calories?.measurement}({dietById[item?.id]?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(patientMeal['dinner'], item, "dinner")}>
                                        <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical: 20 }}>
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Supplements:</Text>
                            <Button mode="outlined" onPress={() => onAddSupplements()}>
                                ADD +
                            </Button>
                        </View>
                        {patientMeal?.supplements && patientMeal?.supplements?.map((item, index)=>{
                            const filteredSupplements = supplements?.filter((sup) => {
                                return sup?._id === item
                            })?.[0]
                            return <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, width:'70%' }}>{filteredSupplements?.name}</Text>
                                <TouchableOpacity onPress={() => onDelete(patientMeal?.supplements, item, "supplements")}>
                                    <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                </TouchableOpacity>
                            </View>
                        })}
                    </View>
                </View>
                <Text style={{ fontWeight: "700", color: "#000", marginVertical: 10, fontSize: 18 }}>Self Management</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRightColor: '#C3C3C2', borderRightWidth: 1, width: '48%' }}>
                        <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 5 }}>Calories Burnt</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>{getCaloriesBurnt()} kcal</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '48%' }}>
                        <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 5 }}>Sleep (hrs)</Text>
                        <NumericInput
                            onChange={value => onChangeSleep(value)}
                            minValue={0}
                            rounded
                            step={1}
                            value={patientSelfManagement?.sleep_in_min ? patientSelfManagement?.sleep_in_min/60 : 0}
                        />
                    </View>
                </View>
                 <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical:20 }}>
                    <View >
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Exercises:</Text>
                            <Button mode="outlined" onPress={() => onAddExercise()}>
                                ADD +
                            </Button>
                        </View>
                        {patientSelfManagement?.exercise ? patientSelfManagement?.exercise?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                <Text style={{ fontSize: 16 }}>{exerciseById[item?.id]?.[0]?.name} - {item?.duration_in_min}min</Text>
                                    <TouchableOpacity onPress={() => onDelete(patientSelfManagement?.exercise, item, "exercise")}>
                                    <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                </TouchableOpacity>
                            </View>
                            )
                        }) : null}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}