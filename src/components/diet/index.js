import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mealType } from '../../data'
import { useDispatch, useSelector } from "react-redux";

//actions
import { addDietItem } from '../../redux/actions/ui'

//reducer
import { getAddedDiet } from '../../redux/reducers/ui'

export default DietScreen = (props) => {

    const dispatch = useDispatch();
    const addedDiet = useSelector(getAddedDiet);

    const onDelete = (dietItem) =>{
        const temp = addedDiet.filter((item, i) => dietItem.name !== item.name || dietItem.mealType !== item.mealType)
        dispatch(addDietItem(temp))
    }
    
    return (
        <ScrollView contentContainerStyle={{ height: '100%' }}>
            {mealType.map((item,index)=>{
                const filteredDiet = addedDiet.filter((diet) => diet?.mealType === item)
                return(
                    <View key={index} style={{ padding: 20, backgroundColor: '#fff', marginHorizontal: 20, marginTop: 20 }}>
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item}</Text>
                            <TouchableOpacity onPress={() => { props?.navigation?.navigate('Diet Search', { mealType: item}) }}>
                                <Ionicons name="add-circle" size={24} color="green" />
                            </TouchableOpacity>
                        </View>
                        {filteredDiet?.map((dietItem, index)=>{
                            return(
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10}}>
                                    <Text style={{ fontSize: 16, fontWeight: '300' }}>{dietItem?.name} - {dietItem?.calories} Kcal</Text>
                                    <TouchableOpacity onPress={() => onDelete(dietItem)}>
                                        <Ionicons name="ios-remove-circle" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                )
            })}
        </ScrollView>
    );
}