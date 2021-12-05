import React,{useState, useEffect} from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

//actions
import { startFetchDiet } from '../../redux/actions/diet'
import { startPostPatientMeal, startEditPatientMeal } from '../../redux/actions/patient'

//reducer
import { getisDietLoading, geDiet } from '../../redux/reducers/diet'
import { getJwt } from '../../redux/reducers/account'
import { getIsLoadingPatientMeal } from '../../redux/reducers/patient'

//helpers
import { usePrevious } from '../../helpers/utils'

export default DietSearchScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    
    const { mealType, edit } = props?.route?.params;

    const isDietLoading = useSelector(getisDietLoading);
    const diet = useSelector(geDiet);
    const jwt = useSelector(getJwt);
    const isLoadingPatientMeal = useSelector(getIsLoadingPatientMeal);
    const isLoadingPatientMealPrev = usePrevious(isLoadingPatientMeal);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(diet.filter(item => item?.type?.includes(mealType)));

    
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
        if (searchQuery && searchQuery.length){
            setFilteredItems(diet.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item?.type?.includes(mealType)))
        }
        else{
            setFilteredItems(diet.filter(item => item?.type?.includes(mealType)))
        }
    }, [searchQuery, diet])

    const onAddItem = (item) => {
        let data = {
            [mealType]: [{
                "id": item?._id,
                "quantity": 1
            }],
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