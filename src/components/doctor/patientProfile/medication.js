import React,{useState, useEffect} from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from "react-redux";

//actions
import { startFetchMedications } from '../../../redux/actions/medication'
import { addSelectedMedicine } from '../../../redux/actions/ui'

//reducers
import {
    getIsMedicationsLoading, geMedications} from '../../../redux/reducers/medication'
import { getSelectedMedicine } from '../../../redux/reducers/ui'

//helpers
import { usePrevious } from '../../../helpers/utils'

export default DoctorMyPatientMedication = (props) => {
    const dispatch = useDispatch();
    const isMedicationsLoading = useSelector(getIsMedicationsLoading);
    const selectedMedicine = useSelector(getSelectedMedicine);
    const isMedicationsLoadingPrev = usePrevious(isMedicationsLoading);
    const medications = useSelector(geMedications);

    useEffect(()=>{
        dispatch(startFetchMedications())
    },[])

    useEffect(()=>{
        if (isMedicationsLoading && isMedicationsLoading !== isMedicationsLoadingPrev && isMedicationsLoadingPrev !== undefined){
            if (!selectedMedicine?._id){
                dispatch(addSelectedMedicine(medications[0]))
            }
            else{
                dispatch(selectedMedicine)
            }
        }
    }, [isMedicationsLoading])

    return (
        <View style={{marginTop:-40}}>
            <Picker
                selectedValue={selectedMedicine?._id}
                onValueChange={(itemValue, itemIndex) =>
                    dispatch(addSelectedMedicine(medications?.filter(item => item?._id === itemValue)[0]))
                }>
                {medications?.map((item,index)=>{
                    return(
                        <Picker.Item key={index} label={item?.drug_class} value={item?._id} />
                    )
                })}
            </Picker>
        </View>
    );
}