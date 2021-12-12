import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Title } from 'react-native-paper';
import { RadioButton, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

//reducers
import { getUserName, getJwt, getIsLoadingGetProfile, getProfileDetails } from '../../../redux/reducers/account'
import { getisLoadingPostSurveySubmissions,getisLoadingPutSurveySubmissions,getisLoadingFetchAllSurveyQuestions,getallSurveyQuestions,getisLoadingFetchAllSurveySubmissions,getallSurveySubmissions,getisError } from '../../../redux/reducers/surveys'

//actions
import { startFetchAllSurveyQuestions, startFetchAllSurveySubmissions, startPostSurveySubmissions, startPutSurveySubmissions } from '../../../redux/actions/survey'
import { fetchProfile } from '../../../redux/actions/account'

//assets
import { usePrevious } from '../../../helpers/utils';

export default PatientQuestionaire = (props) => {
    const dispatch = useDispatch();

    const { survey } = props?.route?.params;

    const jwt = useSelector(getJwt)
    const isLoadingPostSurveySubmissions = useSelector(getisLoadingPostSurveySubmissions)
    const isLoadingPostSurveySubmissionsPrev = usePrevious(isLoadingPostSurveySubmissions)
    const isLoadingPutSurveySubmissions = useSelector(getisLoadingPutSurveySubmissions)
    const isLoadingPutSurveySubmissionsPrev = usePrevious(isLoadingPutSurveySubmissions)
    const isLoadingFetchAllSurveyQuestions = useSelector(getisLoadingFetchAllSurveyQuestions)
    const allSurveyQuestions = useSelector(getallSurveyQuestions)
    const isLoadingFetchAllSurveySubmissions = useSelector(getisLoadingFetchAllSurveySubmissions)
    const allSurveySubmissions = useSelector(getallSurveySubmissions)
    const isLoadingGetProfile = useSelector(getIsLoadingGetProfile)
    const isLoadingGetProfilePrev = usePrevious(isLoadingGetProfile)
    const profileDetails = useSelector(getProfileDetails)

    const onChangeValue = (questionId, answerId, type) => {
        const questionSubmission = allSurveySubmissions?.filter((item) => item?.question_id == questionId)
        if (type === "SINGLE_CHOICE") {
            if (questionSubmission?.[0]?.answers?.[0]){
                const data = {
                    "answers": [answerId]
                }
                dispatch(startPutSurveySubmissions({ jwt, data, submissionId: questionSubmission?.[0]?._id }))
            }
            else{
                const data = {
                    "question_id": questionId,
                    "answers": [answerId]
                }
                dispatch(startPostSurveySubmissions({ jwt, data }))
            }
        }
        else if (type === "MULTIPLE_CHOICE") {
            if (questionSubmission?.[0]?.answers?.[0]){
                const data = {
                    "answers": [answerId]
                }
                dispatch(startPutSurveySubmissions({ jwt, data, submissionId: questionSubmission?.[0]?._id }))
            }
            else{
                const data = {
                    "question_id": questionId,
                    "answers": [answerId]
                }
                dispatch(startPostSurveySubmissions({ jwt, data }))
            }
        }
        else if (type === "SCALE") {
            if (questionSubmission?.[0]?.answers?.[0]){
                const data = {
                    "answers": [answerId]
                }
                dispatch(startPutSurveySubmissions({ jwt, data, submissionId: questionSubmission?.[0]?._id }))
            }
            else{
                const data = {
                    "question_id": questionId,
                    "answers": [answerId]
                }
                dispatch(startPostSurveySubmissions({ jwt, data }))
            }
        }
    }

    useEffect(() => {
        props?.navigation?.setOptions({ title: survey?.name })
        dispatch(fetchProfile({ jwt }))
    }, [])

    useEffect(() => {
        if (!isLoadingGetProfile && isLoadingGetProfilePrev !== isLoadingGetProfile && isLoadingGetProfilePrev !== undefined){
            dispatch(startFetchAllSurveyQuestions({ jwt, surveyId: survey?._id }))
            dispatch(startFetchAllSurveySubmissions({ jwt, profileId: profileDetails?._id, surveyId: survey?._id }))
        }
    }, [isLoadingGetProfile, isLoadingGetProfilePrev])

    useEffect(() => {
        if (!isLoadingPostSurveySubmissions && isLoadingPostSurveySubmissionsPrev !== isLoadingPostSurveySubmissions && isLoadingPostSurveySubmissionsPrev !== undefined){
            dispatch(startFetchAllSurveySubmissions({ jwt, profileId: profileDetails?._id, surveyId: survey?._id }))
        }
    }, [isLoadingPostSurveySubmissions, isLoadingPostSurveySubmissionsPrev])

    useEffect(() => {
        if (!isLoadingPutSurveySubmissions && isLoadingPutSurveySubmissionsPrev !== isLoadingPutSurveySubmissions && isLoadingPutSurveySubmissionsPrev !== undefined){
            dispatch(startFetchAllSurveySubmissions({ jwt, profileId: profileDetails?._id, surveyId: survey?._id }))
        }
    }, [isLoadingPutSurveySubmissions, isLoadingPutSurveySubmissionsPrev])

    const renderAnswers = () => {
        return allSurveyQuestions?.map((question, index) => {
            if (question?.type === "SINGLE_CHOICE"){
                const questionSubmission = allSurveySubmissions?.filter((item) => item?.question_id == question?._id)
                return (
                    <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                        <Title>{question?.title}</Title>
                        <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionSubmission?.[0]?.answers?.[0]}>
                            {question?.answers.map((answer, index) => {
                                return (
                                    <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}>
                                        <RadioButton.Android value={answer?._id} />
                                        <Text>
                                            {answer?.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </RadioButton.Group>
                    </View>
                )
            }
            else if (question?.type === "TEXT") {
                const questionSubmission = allSurveySubmissions?.filter((item) => item?.question_id == question?._id)
                return (
                    <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                        <Title>{question?.title}</Title>
                        <TextInput
                            label={""}
                            value={questionSubmission?.[0]?.answers?.[0]}
                            onChangeText={text => onChangeValue(question?._id, text, question?.type)}
                        />
                    </View>
                )
            }
            else if (question?.type === "MULTIPLE_CHOICE") {
                const questionSubmission = allSurveySubmissions?.filter((item) => item?.question_id == question?._id)
                return (
                    <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                        <Title>{question?.title}</Title>
                        <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionSubmission?.[0]?.answers?.[0]}>
                            {question?.answers.map((answer, index) => {
                                return (
                                    <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}>
                                        <RadioButton.Android value={answer?._id} />
                                        <Text>
                                            {answer?.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </RadioButton.Group>
                    </View>
                )
            }
            else if (question?.type === "SCALE") {
                const questionSubmission = allSurveySubmissions?.filter((item) => item?.question_id == question?._id)
                return (
                    <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                        <Title>{question?.title}</Title>
                        <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionSubmission?.[0]?.answers?.[0]}>
                            {question?.answers.map((answer, index) => {
                                return (
                                    <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}>
                                        <RadioButton.Android value={answer?._id} />
                                        <Text>
                                            {answer?.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </RadioButton.Group>
                    </View>
                )
            }
        })
    }

    return (
        isLoadingGetProfile || isLoadingFetchAllSurveyQuestions || isLoadingFetchAllSurveySubmissions || isLoadingPostSurveySubmissions || isLoadingPutSurveySubmissions ? <ActivityIndicator/> : <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width: '30%', marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            <ScrollView contentContainerStyle={{ marginTop: 20, marginHorizontal: 20, paddingBottom: 200 }}>
                <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 10, fontSize: 20 }}>Please answer these question.</Text>
                {renderAnswers()}
            </ScrollView>
        </View>
    );
}