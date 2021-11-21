import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//actions
import { addSupplementItem } from '../../../../redux/actions/ui'
import { startFetchSupplements } from '../../../../redux/actions/supplements'

//reducer
import { getAddedSupplement, getSelectedMedicine } from '../../../../redux/reducers/ui'
import { getisSupplementsLoading, getSupplements } from '../../../../redux/reducers/supplements'

//helpers
import { usePrevious } from '../../../../helpers/utils'

export default SupplementsScreen = (props) => {

    const dispatch = useDispatch();

    const addedSupplement = useSelector(getAddedSupplement);
    const selectedMedicine = useSelector(getSelectedMedicine);
    const isSupplementsLoading = useSelector(getisSupplementsLoading);
    const isSupplementsLoadingPrev = usePrevious(isSupplementsLoading);
    const supplements = useSelector(getSupplements);

    const onDelete = (index) => {
        const temp = addedSupplement.filter((item, i) => i !== index)
        dispatch(addSupplementItem(temp))
    }

    useEffect(() => {
        dispatch(startFetchSupplements())
    }, [])

    useEffect(() => {
        if (isSupplementsLoading && isSupplementsLoading !== isSupplementsLoadingPrev && isSupplementsLoadingPrev !== undefined) {
            const selectedMedicineSupplments = selectedMedicine?.vitamins
            const filteredSuplements = supplements.filter((item) => selectedMedicineSupplments?.includes(item?._id))
            dispatch(addDietItem(filteredSuplements))
        }
    }, [isSupplementsLoading])

    return (
        <View>
            <ScrollView contentContainerStyle={{marginTop:20 }}>
                {addedSupplement ? addedSupplement?.map((supplementItem, index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal:20 }}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>{supplementItem?.name}</Text>
                            {/* <TouchableOpacity onPress={() => onDelete(index)}>
                                <Ionicons name="ios-remove-circle" size={24} color="red" />
                            </TouchableOpacity> */}
                        </View>
                    )
                }) : null}
                {/* <Button mode="outlined" onPress={() => props?.navigation?.navigate('SupplementsSearch')} style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    {addedSupplement && addedSupplement?.length ? "ADD MORE SUPPLEMENTS" : "ADD SUPPLEMENTS"}
                </Button> */}
            </ScrollView>
        </View>
    );
}