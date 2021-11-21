import React,{useState, useEffect} from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Button, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";

//data
import { dietItems } from '../../data'

//actions
import { addDietItem } from '../../redux/actions/ui'

//reducer
import { getAddedDiet } from '../../redux/reducers/ui'
import { getisDietLoading, geDiet } from '../../redux/reducers/diet'

export default DietSearchScreen = (props) => {
    const dispatch = useDispatch();
    
    const addedDiet = useSelector(getAddedDiet);
    const diet = useSelector(geDiet);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(diet);

    const { mealType } = props?.route?.params;
    
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(()=>{
        if (searchQuery && searchQuery.length){
            setFilteredItems(diet.filter(item => item.name.includes(searchQuery)))
        }
        else{
            setFilteredItems(diet)
        }
    }, [searchQuery])

    const onAddItem = (item) => {
        dispatch(addDietItem([...addedDiet,Object.assign({},{
            mealType
        }, item)]))
        props.navigation.goBack()
    }

    return (
        <View>
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
                                <View>
                                    <Title>{item.name}</Title>
                                    <Paragraph>{item.calories} kcal</Paragraph>
                                </View>
                                <Button mode="outlined" onPress={() => onAddItem(item)} style={{width:'40%'}}>
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