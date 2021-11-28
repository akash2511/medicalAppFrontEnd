import React,{useState, useEffect} from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//actions
import { startFetchMedications } from '../../redux/actions/medication'
import { startPostPrescription } from '../../redux/actions/prescription'

//reducer
import { getIsMedicationsLoading, geMedications } from '../../redux/reducers/medication'
import { getJwt } from '../../redux/reducers/account'
import { getIsPrescriptionLoading } from '../../redux/reducers/prescription'

//helpers
import { usePrevious } from '../../helpers/utils'

export default MedicationSearchScreen = (props) => {
    const dispatch = useDispatch();
    
    const isMedicationsLoading = useSelector(getIsMedicationsLoading);
    const medications = useSelector(geMedications);
    const jwt = useSelector(getJwt);
    const isPrescriptionLoading = useSelector(getIsPrescriptionLoading);
    const isPrescriptionLoadingPrev = usePrevious(isPrescriptionLoading);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(medications);

    const { emrId } = props?.route?.params;
    
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(()=>{
        props?.navigation?.setOptions({ title: "Medication" })
        dispatch(startFetchMedications({jwt}))
    }, [])

    useEffect(()=>{
        if (!isPrescriptionLoading && isPrescriptionLoading !== isPrescriptionLoadingPrev && isPrescriptionLoadingPrev !== undefined) {
            props?.navigation?.goBack()
        }
    }, [isPrescriptionLoading, isPrescriptionLoadingPrev])

    useEffect(()=>{
        if (searchQuery && searchQuery.length){
            setFilteredItems(medications.filter(item => item.generic_name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else{
            setFilteredItems(medications)
        }
    }, [searchQuery])

    const onAddItem = (item) => {
        const data = {
            "medication_id": item?._id,
            "emr_id": emrId,
            "notes": "text"
        }
        dispatch(startPostPrescription({jwt,data}))
    }

    return (
        isMedicationsLoading || isPrescriptionLoading? <ActivityIndicator/> : <View>
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
            <ScrollView contentContainerStyle={{height:'100%'}}>
                {filteredItems.map((item,index)=>{
                    return(
                        <View style={{marginHorizontal:20, marginTop:20, backgroundColor:"#fff", padding:10, borderRadius:5}} key={index}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:"80%"}}>
                                    <Title>{item.generic_name}</Title>
                                    <Paragraph>Drug Class : {item.drug_class}</Paragraph>
                                    <Paragraph>For : {item.medication_for}</Paragraph>
                                    <Paragraph>Type : {item.type}</Paragraph>
                                </View>
                                <Button mode="outlined" onPress={() => onAddItem(item)}>
                                    ADD
                                </Button>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};