import React,{useState, useEffect} from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

//actions
import { startFetchExercise } from '../../redux/actions/exercise'
import { startPostPatientSelfManagement, startEditPatientSelfManagement, startPatchPatientMedication } from '../../redux/actions/patient'

//reducer
import { getisExerciseLoading, getExercise } from '../../redux/reducers/exercise'
import { getJwt, getLevel } from '../../redux/reducers/account'
import { getIsLoadingPatientSelfManagement, getPatientSelfManagement, getIsLoadingPatientMedication } from '../../redux/reducers/patient'

//helpers
import { usePrevious } from '../../helpers/utils'

export default ExerciseSearchScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { edit } = props?.route?.params;
    
    const isExerciseLoading = useSelector(getisExerciseLoading);
    const exercises = useSelector(getExercise);
    const jwt = useSelector(getJwt);
    const level = useSelector(getLevel);
    const patientSelfManagement = useSelector(getPatientSelfManagement);
    const isLoadingPatientSelfManagement = useSelector(getIsLoadingPatientSelfManagement);
    const isLoadingPatientSelfManagementPrev = usePrevious(isLoadingPatientSelfManagement);
    const isLoadingPatientMedication = useSelector(getIsLoadingPatientMedication);
    const isLoadingPatientMedicationPrev = usePrevious(isLoadingPatientMedication);

    const selfExercise = patientSelfManagement?.exercise ? patientSelfManagement?.exercise?.map((item) => item?.id) : edit?.exercise_ids?.map((item) => item)
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(exercises.filter(item => {
        return !(selfExercise?.includes(item?._id))
    }
    ));
    
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(()=>{
        if (isFocused) {
            props?.navigation?.setOptions({ title: "Exercises" })
            dispatch(startFetchExercise({jwt}))
        }
    }, [isFocused])

    useEffect(()=>{
        if (!isLoadingPatientSelfManagement && isLoadingPatientSelfManagement !== isLoadingPatientSelfManagementPrev && isLoadingPatientSelfManagementPrev !== undefined) {
            props?.navigation?.goBack()
        }
    }, [isLoadingPatientSelfManagement, isLoadingPatientSelfManagementPrev])

    useEffect(() => {
        if (!isLoadingPatientMedication && isLoadingPatientMedication !== isLoadingPatientMedicationPrev && isLoadingPatientMedicationPrev !== undefined) {
            props?.navigation?.goBack()
        }
    }, [isLoadingPatientMedication, isLoadingPatientMedicationPrev])

    useEffect(()=>{
        if (searchQuery && searchQuery.length){
            setFilteredItems(exercises.filter(item => !(selfExercise?.includes(item?._id)) && item.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else{
            setFilteredItems(exercises.filter(item => {
                return !(selfExercise?.includes(item?._id))
            }
            ))
        }
    }, [searchQuery, exercises])

    const onAddItem = (item) => {
        if (level === "doctor") {
            let data = {
                "exercise_ids": edit?.exercise_ids ? edit?.exercise_ids?.concat([item?._id]) : [item?._id]
            }
            dispatch(startPatchPatientMedication({ jwt, data, id: edit?._id }))
        }
        else {
            let data = {
                "exercise": selfExercise?.map((item => {
                    return {
                        id: item,
                        "duration_in_min": 60
                    }
                })).concat([
                    {
                        "id": item?._id,
                        "duration_in_min": 60
                    }
                ]),
                "date": moment().format("YYYY-MM-DD")
            }
            if (edit) {
                delete data.date
                dispatch(startEditPatientSelfManagement({ jwt, data, id: edit?._id }))
            }
            else {
                dispatch(startPostPatientSelfManagement({ jwt, data }))
            }
        }
    }

    return (
        <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width: '30%', marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{margin:20}}
            />
            {searchQuery.length === 0 ? <Text style={{ fontSize: 16, fontWeight: '300', marginLeft: 20 }}>Recomended</Text> : null}
            {isExerciseLoading || isLoadingPatientSelfManagement? <ActivityIndicator /> :
            <ScrollView contentContainerStyle={{paddingBottom:200}}>
                {filteredItems.map((item,index)=>{
                    return(
                        <View style={{marginHorizontal:20, marginTop:20, backgroundColor:"#fff", padding:10, borderRadius:5}} key={index}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:"80%"}}>
                                    <Title>{item.name}</Title>
                                    <Paragraph>Duration in mins : {item?.calories_burnt?.duration_in_min}</Paragraph>
                                    <Paragraph>Calories Burnt : {item?.calories_burnt?.value}</Paragraph>
                                </View>
                                <Button mode="outlined" onPress={() => onAddItem(item)}>
                                    ADD
                                </Button>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>}
        </View>
    );
};