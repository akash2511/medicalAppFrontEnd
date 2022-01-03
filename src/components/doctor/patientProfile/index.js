import React,{useEffect} from 'react';
import { ScrollView, View, Image, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Button, Title, Paragraph,Colors } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

//actions
import { startFetchEmr } from '../../../redux/actions/emr'
import { startFetchProfile } from '../../../redux/actions/profile'
import { startPatchPatientMedication } from '../../../redux/actions/patient'

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
import {
    getIsLoadingPatientMedication
} from '../../../redux/reducers/patient'

//helpers
import { usePrevious } from '../../../helpers/utils'


export default MyPatientDetails = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { patientId } = props?.route?.params;

    const jwt = useSelector(getJwt);
    const isEmrLoading = useSelector(getIsEmrLoading);
    const emrData = useSelector(getAllEmrs);
    const isProfileLoading = useSelector(getIsProfileLoading);
    const profileDetails = useSelector(getProfileDetails);
    const isLoadingPatientMedication = useSelector(getIsLoadingPatientMedication);
    const isLoadingPatientMedicationPrev = usePrevious(isLoadingPatientMedication);

    useEffect(() => {
        if (isFocused){
            props?.navigation?.setOptions({ title: "Prescription" })
            dispatch(startFetchEmr({ jwt, patientId }))
            dispatch(startFetchProfile({ jwt, profileId: patientId }))
        }
    }, [isFocused])

    useEffect(() => {
        if (!isLoadingPatientMedication && isLoadingPatientMedication !== isLoadingPatientMedicationPrev && isLoadingPatientMedicationPrev !== undefined){
            dispatch(startFetchEmr({ jwt, patientId }))
        }
    }, [isLoadingPatientMedication, isLoadingPatientMedicationPrev])

    const { diets, emr, exercises, medication, supplements } = emrData
    const profileData = profileDetails?.[0]


    const onAddItem = (mealType) => {
        props?.navigation.navigate("DoctorDietSearch", { mealType, edit: medication })
    }

    const onAddExercise = () => {
        props?.navigation.navigate("DoctorExerciseSearch", { edit: medication })
    }

    const onAddSupplements = () => {
        props?.navigation.navigate("DoctorSupplementsSearch", { edit: medication })
    }

    const onDelete = (wholeArray, item, type) => {
        if (type === "supplement_ids") {
            const filteredArray = wholeArray?.filter((id) => id !== item)
            let data = {
                [type]: filteredArray,
            }
            dispatch(startPatchPatientMedication({ jwt, data, id: medication?._id }))
        }
        else if (type === "exercise_ids") {
            const filteredArray = wholeArray?.filter((id) => id !== item)
            let data = {
                [type]: filteredArray
            }
            dispatch(startPatchPatientMedication({ jwt, data, id: medication?._id }))
        }
        else {
            const filteredArray = wholeArray?.filter((meal) => meal?.diet_id !== item?.diet_id)
            let data = {
                [type]: filteredArray,
            }

            dispatch(startPatchPatientMedication({ jwt, data, id: medication?._id }))
        }
    }

    return (
        isEmrLoading || isProfileLoading || isLoadingPatientMedication ? <ActivityIndicator/> : <View>
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
                    <Paragraph>Current Diagnosis : {emr?.current_diagnosis_or_disease}</Paragraph>
                    <Paragraph>Blood Pressure : {emr?.health_vitals?.bp}</Paragraph>
                    <Paragraph>Heart Rate : {emr?.health_vitals?.heart_rate}</Paragraph>
                    <Paragraph>Hemoglobin : {emr?.health_vitals?.hemoglobin}</Paragraph>
                    <Paragraph>Platelet Count : {emr?.health_vitals?.platelet_count}</Paragraph>
                    <Paragraph>Pulse Rate : {emr?.health_vitals?.pulse_rate}</Paragraph>
                    <Paragraph>Spo2 : {emr?.health_vitals?.spo2}</Paragraph>
                </View>
                <Button mode="outlined" style={{ margin: 10 }} onPress={() => props?.navigation.navigate('DoctorPatientGraphs', { patientId: patientId })}>
                   View Graphs
                </Button>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>Medication : {medication?.generic_name}</Title>
                    <Paragraph>Drug Class : {medication?.drug_class}</Paragraph>
                    <Paragraph>Medication For : {medication?.medication_for}</Paragraph>
                    <Paragraph>Type : {medication?.type}</Paragraph>
                    <Paragraph>Description : {medication?.description}</Paragraph>
                    <Button mode="outlined" style={{margin:10}} onPress={() => props?.navigation.navigate('DoctorMedicationSearch', { emrId: emr?._id})}>
                        Change
                    </Button>
                </View>
                <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical: 20 }}>
                    <View style={{ borderBottomColor: '#C3C3C2', borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Breakfast:</Text>
                            <Button mode="outlined" onPress={() => onAddItem("breakfast")}>
                                ADD +
                            </Button>
                        </View>
                        {medication?.['breakfast'] ? medication['breakfast']?.map((item, index) => {
                            const filteredDiet = diets?.filter((diet) => diet?._id === item?.diet_id)
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{filteredDiet?.[0]?.name} - {filteredDiet?.[0]?.calories?.measurement}({filteredDiet?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(medication['breakfast'], item, "breakfast")}>
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
                        {medication?.['lunch'] ? medication['lunch']?.map((item, index) => {
                            const filteredDiet = diets?.filter((diet) => diet?._id === item?.diet_id)
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{filteredDiet?.[0]?.name} - {filteredDiet?.[0]?.calories?.measurement}({filteredDiet?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(medication['lunch'], item, "lunch")}>
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
                        {medication?.['snack'] ? medication['snack']?.map((item, index) => {
                            const filteredDiet = diets?.filter((diet) => diet?._id === item?.diet_id)
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{filteredDiet?.[0]?.name} - {filteredDiet?.[0]?.calories?.measurement}({filteredDiet?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(medication['snack'], item, "snack")}>
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
                        {medication?.['dinner'] ? medication['dinner']?.map((item, index) => {
                            const filteredDiet = diets?.filter((diet) => diet?._id === item?.diet_id)
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{filteredDiet?.[0]?.name} - {filteredDiet?.[0]?.calories?.measurement}({filteredDiet?.[0]?.calories?.unit_of_measurement})</Text>
                                    <TouchableOpacity onPress={() => onDelete(medication['dinner'], item, "dinner")}>
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
                        {medication?.supplement_ids && medication?.supplement_ids?.map((item, index) => {
                            const filteredSupplements = supplements?.filter((sup) => {
                                return sup?._id === item
                            })?.[0]
                            return <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, width: '70%' }}>{filteredSupplements?.name}</Text>
                                <TouchableOpacity onPress={() => onDelete(medication?.supplement_ids, item, "supplement_ids")}>
                                    <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                </TouchableOpacity>
                            </View>
                        })}
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginVertical: 20 }}>
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Exercises:</Text>
                            <Button mode="outlined" onPress={() => onAddExercise()}>
                                ADD +
                            </Button>
                        </View>
                        {medication?.exercise_ids ? medication?.exercise_ids?.map((item, index) => {
                            const filteredExercise = exercises?.filter((ex) => {
                                return ex?._id === item
                            })?.[0]
                            return (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{filteredExercise?.name} - {item?.duration_in_min}min</Text>
                                    <TouchableOpacity onPress={() => onDelete(filteredExercise, item, "exercise_ids")}>
                                        <Text style={{ fontSize: 16, color: Colors.red500 }}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}
                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25, marginTop: 20 }}>
                    <Title>{"Sleep :"}</Title>
                    <Paragraph>Duration : {medication?.sleep_in_min}mins</Paragraph>
                </View>
            </ScrollView>
        </View>
    );
}