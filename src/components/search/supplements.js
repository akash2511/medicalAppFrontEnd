import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

//actions
import { startFetchSupplements } from '../../redux/actions/supplements'
import { startPostPatientMeal, startEditPatientMeal } from '../../redux/actions/patient'

//reducer
import { getisSupplementsLoading, getSupplements} from '../../redux/reducers/supplements'
import { getJwt } from '../../redux/reducers/account'
import { getIsLoadingPatientMeal } from '../../redux/reducers/patient'

//helpers
import { usePrevious } from '../../helpers/utils'

export default SupplementsSearchScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { edit } = props?.route?.params;

    const isSupplementsLoading = useSelector(getisSupplementsLoading);
    const supplements = useSelector(getSupplements);
    const jwt = useSelector(getJwt);
    const isLoadingPatientMeal = useSelector(getIsLoadingPatientMeal);
    const isLoadingPatientMealPrev = usePrevious(isLoadingPatientMeal);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(supplements);


    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        if (isFocused) {
            props?.navigation?.setOptions({ title: "Supplements" })
            dispatch(startFetchSupplements({ jwt }))
        }
    }, [isFocused])

    useEffect(() => {
        if (!isLoadingPatientMeal && isLoadingPatientMeal !== isLoadingPatientMealPrev && isLoadingPatientMealPrev !== undefined) {
            props?.navigation?.goBack()
        }
    }, [isLoadingPatientMeal, isLoadingPatientMealPrev])

    useEffect(() => {
        if (searchQuery && searchQuery.length) {
            setFilteredItems(supplements.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else {
            setFilteredItems(supplements)
        }
    }, [searchQuery, supplements])

    const onAddItem = (item) => {
        let data = {
            supplements: [item?._id],
            "date": moment().format("YYYY-MM-DD")
        }
        if (edit) {
            delete data.date;
            dispatch(startEditPatientMeal({ jwt, data, id: edit?._id }))
        }
        else {
            dispatch(startPostPatientMeal({ jwt, data }))
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
                style={{ margin: 20 }}
            />
            {searchQuery.length === 0 ? <Text style={{ fontSize: 16, fontWeight: '300', marginLeft: 20 }}>Recomended</Text> : null}
            {isSupplementsLoading || isLoadingPatientMeal ? <ActivityIndicator /> :
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                    {filteredItems.map((item, index) => {
                        return (
                            <View style={{ marginHorizontal: 20, marginTop: 20, backgroundColor: "#fff", padding: 10, borderRadius: 5 }} key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: "80%" }}>
                                        <Title>{item.name}</Title>
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