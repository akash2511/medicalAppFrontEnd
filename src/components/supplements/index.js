import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//actions
import { addSupplementItem } from '../../redux/actions/ui'

//reducer
import { getAddedSupplement } from '../../redux/reducers/ui'

export default SupplementsScreen = (props) => {

    const dispatch = useDispatch();
    const addedSupplement = useSelector(getAddedSupplement);

    const onDelete = (index) => {
        const temp = addedSupplement.filter((item, i) => i !== index)
        dispatch(addSupplementItem(temp))
    }

    return (
        <View>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop:20 }}>
                {/* {addedSupplement ? addedSupplement?.map((dietItem, index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal:20 }}>
                            <Text style={{ fontSize: 16, fontWeight: '300' }}>{dietItem?.name}</Text>
                            <TouchableOpacity onPress={() => onDelete(index)}>
                                <Ionicons name="ios-remove-circle" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )
                }) : null} */}
                <Button mode="outlined" onPress={() => props?.navigation?.navigate('Supplements Search')} style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    {addedSupplement && addedSupplement?.length ? "ADD MORE SUPPLEMENTS" : "ADD SUPPLEMENTS"}
                </Button>
            </ScrollView>
        </View>
    );
}