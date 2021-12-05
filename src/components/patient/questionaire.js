import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity,} from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import { RadioButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

//reducers
import { getUserName, getJwt } from '../../redux/reducers/account'

//actions
import { startEditProfile } from '../../redux/actions/account'

//assets
import { questionaire } from './assets'

export default PatientQuestionaire = (props) => {
    const dispatch = useDispatch();

    const username = useSelector(getUserName)
    const jwt = useSelector(getJwt)

    const [localAnswers, setLocalAnswers] = useState({});

    const onChangeValue = (key, value) => {
        setLocalAnswers(Object.assign({}, localAnswers, {
            [key]:value
        }))
    }

    useEffect(() => {
        props?.navigation?.setOptions({ title: username?.toUpperCase() })
    }, [])

    const onSubmit = () =>{
        const data = {
            "do_you_smoke": localAnswers?.do_you_smoke,
            "do_you_drink": localAnswers?.do_you_drink,
            "height": {
                "measurement": localAnswers?.height,
                "unit_of_measurement": "cms",
                "date": moment().format("YYYY-MM-DD")
            },
            "weight": {
                "measurement": localAnswers?.weight,
                "unit_of_measurement": "kg",
                "date": moment().format("YYYY-MM-DD")
            },
            "questionaire_shown": true,
        }
        dispatch(startEditProfile({ jwt, data, id: props?.profileDetails?._id}))
    }

    return (
        <View>
            <ScrollView contentContainerStyle={{ marginTop: 20, marginHorizontal: 20, paddingBottom:200 }}>
                <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 10, fontSize: 20 }}>Please answer these question.</Text>
                {Object.keys(questionaire)?.map((key, index) => {
                    return (
                        <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                            <Title>{questionaire[key]?.question}</Title>
                            {questionaire[key]?.answers ? <RadioButton.Group onValueChange={newValue => onChangeValue(key, newValue)} value={localAnswers[key]}>
                                {Object.keys(questionaire[key]?.answers).map((answer,index)=>{
                                    return(
                                        <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => onChangeValue(key, answer)}>
                                            <RadioButton.Android value={answer} />
                                            <Text>
                                                {questionaire[key]?.answers[answer]}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </RadioButton.Group> : <TextInput
                                label={key}
                                value={localAnswers[key]}
                                onChangeText={text => onChangeValue(key, text)}
                            />}
                        </View>
                    )
                })}
                <Button mode="contained" onPress={() => onSubmit()} style={{ marginTop: 20 }} labelStyle={{ color: "#fff" }} >
                    Submit
                </Button>
            </ScrollView>
        </View>
    );
}