import React, { useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Button, Paragraph, Title } from 'react-native-paper';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";

//actions
import { startFetchAllSurveys } from '../../../redux/actions/survey'

//reducers
import { getJwt } from '../../../redux/reducers/account'
import { getisLoadingFetchAllSurveys, getAllsurveys } from '../../../redux/reducers/surveys'

export default PatientMySurveys = (props) => {
    const dispatch = useDispatch();

    const jwt = useSelector(getJwt)
    const isLoadingFetchAllSurveys = useSelector(getisLoadingFetchAllSurveys)
    const allsurveys = useSelector(getAllsurveys)

    useEffect(() => {
        props?.navigation?.setOptions({ title: "Surveys" })
        dispatch(startFetchAllSurveys({ jwt }))
    }, [])

    return (
        isLoadingFetchAllSurveys ? <ActivityIndicator /> : <View>
            <ScrollView contentContainerStyle={{ height: '100%', marginTop: 20, marginHorizontal: 20 }}>
                {allsurveys && allsurveys?.map((survey,index)=>{
                    return (
                        <View key={index} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:"#fff", padding:10, borderRadius:10}}>
                            <View style={{width:"70%"}}>
                                <Title>{survey?.name}</Title>
                                <Paragraph>{survey?.description}</Paragraph>
                            </View>
                            <Button mode="outlined" onPress={() => props?.navigation?.navigate("PatientSurveyQuestions", { survey })}>
                                TAKE
                            </Button>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}