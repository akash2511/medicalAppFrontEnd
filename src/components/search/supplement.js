import React,{useState, useEffect} from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//data
import { supplementItems } from '../../data'

//actions
import { addSupplementItem } from '../../redux/actions/ui'

//reducer
import { getAddedSupplement } from '../../redux/reducers/ui'

export default DietSearchScreen = (props) => {
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(supplementItems);

    const addedSupplement = useSelector(getAddedSupplement);

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        if (searchQuery && searchQuery.length) {
            setFilteredItems(supplementItems.filter(item => item.name.includes(searchQuery)))
        }
        else {
            setFilteredItems(supplementItems)
        }
    }, [searchQuery])

    const onAddItem = (item) => {
        dispatch(addSupplementItem([...addedSupplement, item]))
        props.navigation.goBack()
    }

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ margin: 20 }}
            />
            {searchQuery.length === 0 ? <Text style={{ fontSize: 16, fontWeight: '300', marginLeft:20 }}>Recomended</Text> : null}
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                {filteredItems.map((item, index) => {
                    return (
                        <View style={{ marginHorizontal: 20, marginTop: 20, backgroundColor: "#fff", padding: 10, borderRadius: 5 }} key={index}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <Title>{item.name}</Title>
                                    <Paragraph>{item.calories} kcal</Paragraph>
                                </View>
                                <Button mode="outlined" onPress={() => onAddItem(item)} style={{ width: '40%' }}>
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