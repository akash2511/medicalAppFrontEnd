import React,{useEffect, useState} from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mealType } from '../../../../data'
import { useDispatch, useSelector } from "react-redux";

//actions
import { addDietItem } from '../../../../redux/actions/ui'
import { startFetchDiet } from '../../../../redux/actions/diet'

//reducer
// import { getAddedDiet, getSelectedMedicine } from '../../../../redux/reducers/ui'
// import { getisDietLoading,geDiet } from '../../../../redux/reducers/diet'

//helpers
import { usePrevious } from '../../../../helpers/utils'

export default DietScreen = (props) => {
    const dispatch = useDispatch()
    
    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            {[].map((item,index)=>{
                const filteredDietByMealType = [].filter((diet) => diet?.type === item?.toLowerCase())
                return(
                    <View key={index} style={{ padding: 20, backgroundColor: '#fff', marginHorizontal: 20, marginTop: 20 }}>
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item}</Text>
                            {/* <TouchableOpacity onPress={() => { props?.navigation?.navigate('DietSearch', { mealType: item}) }}>
                                <Ionicons name="add-circle" size={24} color="green" />
                            </TouchableOpacity> */}
                        </View>
                        {filteredDietByMealType?.map((dietItem, index)=>{
                            return(
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10}}>
                                    <Text style={{ fontSize: 16, fontWeight: '300' }}>{dietItem?.name} - {dietItem?.calories} Kcal</Text>
                                    {/* <TouchableOpacity onPress={() => onDelete(dietItem)}>
                                        <Ionicons name="ios-remove-circle" size={24} color="red" />
                                    </TouchableOpacity> */}
                                </View>
                            )
                        })}
                    </View>
                )
            })}
        </ScrollView>
    );
}