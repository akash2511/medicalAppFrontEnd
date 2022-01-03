import React,{useState, useEffect} from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

//actions
import { startFetchDiet } from '../../redux/actions/diet'
import { startPostPatientMeal, startEditPatientMeal, startPatchPatientMedication } from '../../redux/actions/patient'

//reducer
import { getisDietLoading, geDiet } from '../../redux/reducers/diet'
import { getJwt, getLevel } from '../../redux/reducers/account'
import { getIsLoadingPatientMeal, getPatientMeal, getIsLoadingPatientMedication } from '../../redux/reducers/patient'

//helpers
import { usePrevious } from '../../helpers/utils'

export default DietSearchScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    
    const { mealType, edit } = props?.route?.params;

    const isDietLoading = useSelector(getisDietLoading);
    const diet = useSelector(geDiet);
    const jwt = useSelector(getJwt);
    const level = useSelector(getLevel);
    const patientMeal = useSelector(getPatientMeal);
    const isLoadingPatientMeal = useSelector(getIsLoadingPatientMeal);
    const isLoadingPatientMealPrev = usePrevious(isLoadingPatientMeal);
    const isLoadingPatientMedication = useSelector(getIsLoadingPatientMedication);
    const isLoadingPatientMedicationPrev = usePrevious(isLoadingPatientMedication);

    const patientMealIds = patientMeal?.[mealType] ? patientMeal?.[mealType]?.map((item) => item?.id) : edit?.[mealType]?.map((item) => item?.diet_id)
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(diet.filter(item => {
        return item?.type?.includes(mealType) && !(patientMealIds?.includes(item?._id))
    }
    ));
    
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(()=>{
        if (isFocused) {
            props?.navigation?.setOptions({ title: "Diet" })
            dispatch(startFetchDiet({jwt}))
        }
    }, [isFocused])

    useEffect(()=>{
        if (!isLoadingPatientMeal && isLoadingPatientMeal !== isLoadingPatientMealPrev && isLoadingPatientMealPrev !== undefined) {
            props?.navigation?.goBack()
        }
    }, [isLoadingPatientMeal, isLoadingPatientMealPrev])

    useEffect(()=>{
        if (!isLoadingPatientMedication && isLoadingPatientMedication !== isLoadingPatientMedicationPrev && isLoadingPatientMedicationPrev !== undefined) {
            props?.navigation?.goBack()
        }
    }, [isLoadingPatientMedication, isLoadingPatientMedicationPrev])

    useEffect(()=>{
        if (searchQuery && searchQuery.length){
            setFilteredItems(diet.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item?.type?.includes(mealType) && !(patientMealIds?.includes(item?._id)) ))
        }
        else{
            setFilteredItems(diet.filter(item => item?.type?.includes(mealType) && !(patientMealIds?.includes(item?._id))))
        }
    }, [searchQuery, diet])

    const onAddItem = (item) => {
        if (level === "doctor"){
            let data = {
                [mealType]: edit?.[mealType] ? edit?.[mealType]?.concat([
                    {
                        "diet_id": item?._id,
                        "servings": item?.serving
                    }
                ]) : 
                [
                    {
                        "diet_id": item?._id,
                        "servings": item?.serving
                    }
                ]
            }
            dispatch(startPatchPatientMedication({ jwt, data, id: edit?._id }))
        }
        else{
            let data = {
                [mealType]: patientMealIds?.map((item=>{
                    return {
                        id: item,
                        "quantity": 1
                    }
                })).concat([{
                    "id": item?._id,
                    "quantity": 1
                }]),
                "date": moment().format("YYYY-MM-DD")
            }
            if(edit){
                delete data.date;
                dispatch(startEditPatientMeal({jwt,data, id:edit?._id}))
            }
            else{
                dispatch(startPostPatientMeal({jwt,data}))
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
            {isDietLoading || isLoadingPatientMeal? <ActivityIndicator /> :
            <ScrollView contentContainerStyle={{paddingBottom:200}}>
                {filteredItems.map((item,index)=>{
                    return(
                        <View style={{marginHorizontal:20, marginTop:20, backgroundColor:"#fff", padding:10, borderRadius:5}} key={index}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:"80%"}}>
                                    <Title>{item.name}</Title>
                                    <Paragraph>Calories : {item?.calories?.measurement}kcal</Paragraph>
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