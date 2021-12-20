import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Title } from 'react-native-paper';
import { RadioButton, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import _ from "underscore"

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

    const [presentQuestionNo,setPresentQuestionNo] = useState("")
    const [questionAnswers,setQuestionAnswers] = useState({})
    const [showQuestions,setShowQuestions] = useState(true)
    const [nextAvailableDate, setNextAvailableDate] = useState("")

    const { survey } = props?.route?.params;

    const jwt = useSelector(getJwt)
    const isLoadingPostSurveySubmissions = useSelector(getisLoadingPostSurveySubmissions)
    const isLoadingPostSurveySubmissionsPrev = usePrevious(isLoadingPostSurveySubmissions)
    const isLoadingPutSurveySubmissions = useSelector(getisLoadingPutSurveySubmissions)
    const isLoadingPutSurveySubmissionsPrev = usePrevious(isLoadingPutSurveySubmissions)
    const isLoadingFetchAllSurveyQuestions = useSelector(getisLoadingFetchAllSurveyQuestions)
    const isLoadingFetchAllSurveyQuestionsPrev = usePrevious(isLoadingFetchAllSurveyQuestions)
    const allSurveyQuestions = useSelector(getallSurveyQuestions)
    const isLoadingFetchAllSurveySubmissions = useSelector(getisLoadingFetchAllSurveySubmissions)
    const isLoadingFetchAllSurveySubmissionsPrev = usePrevious(isLoadingFetchAllSurveySubmissions)
    const allSurveySubmissions = useSelector(getallSurveySubmissions)
    const isLoadingGetProfile = useSelector(getIsLoadingGetProfile)
    const isLoadingGetProfilePrev = usePrevious(isLoadingGetProfile)
    const profileDetails = useSelector(getProfileDetails)

    // console.log(survey, "survey");
    // console.log(allSurveySubmissions, "allSurveySubmissions");

    const onChangeValue = (questionId, answerId, type) => {
        if (type == "SINGLE_CHOICE") {
            const obj = Object.assign({}, questionAnswers, {
                [questionId]: [answerId]
            })
            setQuestionAnswers(obj)
        }
        else if (type == "BOOLEAN") {
            setQuestionAnswers(Object.assign({}, questionAnswers, {
                [questionId]: [answerId]
            }))
        }
        else if (type === "MULTIPLE_CHOICE") {
            if (questionAnswers?.[questionId] && questionAnswers?.[questionId]?.includes(answerId)){
                setQuestionAnswers(Object.assign({}, questionAnswers, {
                    [questionId]: questionAnswers?.[questionId]?.filter((item) => item !== answerId)
                }))
            }
            else{
                setQuestionAnswers(Object.assign({}, questionAnswers, {
                    [questionId]: questionAnswers?.[questionId]?.concat([answerId])
                }))
            }
        }
        else if (type == "SCALE") {
            setQuestionAnswers(Object.assign({}, questionAnswers, {
                [questionId]: [answerId]
            }))
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
        if (!isLoadingFetchAllSurveyQuestions && isLoadingFetchAllSurveyQuestionsPrev !== isLoadingFetchAllSurveyQuestions && isLoadingFetchAllSurveyQuestionsPrev !== undefined && allSurveyQuestions){
            setPresentQuestionNo(0)
        }
    }, [isLoadingFetchAllSurveyQuestions, isLoadingFetchAllSurveyQuestionsPrev])

    useEffect(() => {
        if (!isLoadingFetchAllSurveySubmissions && isLoadingFetchAllSurveySubmissionsPrev !== isLoadingFetchAllSurveySubmissions && isLoadingFetchAllSurveySubmissionsPrev !== undefined && allSurveySubmissions){
            let obj = {}
            allSurveySubmissions.forEach((sub)=>{
                const qType = allSurveyQuestions?.filter(q => q?._id == sub?.question_id)?.[0]?.type
                sub?.answers?.forEach((ans)=>{
                    if (qType == "SINGLE_CHOICE") {
                        obj = Object.assign({}, obj, {
                            [sub?.question_id]: [ans]
                        })
                    }
                    else if (qType == "BOOLEAN") {
                        obj = Object.assign({}, obj, {
                            [sub?.question_id]: [ans]
                        })
                    }
                    else if (qType === "MULTIPLE_CHOICE") {
                        if (obj?.[sub?.question_id] && obj?.[sub?.question_id]?.includes(ans)) {
                            obj = Object.assign({}, obj, {
                                [sub?.question_id]: obj?.[sub?.question_id]?.filter((item) => item !== ans)
                            })
                        }
                        else {
                            obj = Object.assign({}, obj, {
                                [sub?.question_id]: obj?.[sub?.question_id]?.concat([ans])
                            })
                        }
                    }
                    else if (qType == "SCALE") {
                        obj = Object.assign({}, obj, {
                            [sub?.question_id]: [ans]
                        })
                    }
                })
            })
            setQuestionAnswers(obj)
            const submissionByDate = _.groupBy(allSurveySubmissions?.map(item=>{
                return Object.assign({},item,{
                    submittedDate: moment(item?.created_at).format("YYYY-MM-DD")
                })
            }), (x) => x?.submittedDate)
            const latestSubmissionDate = Object.keys(submissionByDate)?.sort((a,b)=> new Date(b) - new Date(a))?.[0]
            const diff = moment().diff(moment(latestSubmissionDate,"YYYY-MM-DD"),"days")
            if (diff < survey?.frequency_in_days){
                setShowQuestions(false)
                setNextAvailableDate(moment(latestSubmissionDate, "YYYY-MM-DD").add(survey?.frequency_in_days,"days"))
            }
        }
    }, [isLoadingFetchAllSurveySubmissions, isLoadingFetchAllSurveySubmissionsPrev])

    useEffect(() => {
        if (!isLoadingPostSurveySubmissions && isLoadingPostSurveySubmissionsPrev !== isLoadingPostSurveySubmissions && isLoadingPostSurveySubmissionsPrev !== undefined){
            props?.navigation?.goBack()
        }
    }, [isLoadingPostSurveySubmissions, isLoadingPostSurveySubmissionsPrev])

    useEffect(() => {
        if (!isLoadingPutSurveySubmissions && isLoadingPutSurveySubmissionsPrev !== isLoadingPutSurveySubmissions && isLoadingPutSurveySubmissionsPrev !== undefined){
            props?.navigation?.goBack()
        }
    }, [isLoadingPutSurveySubmissions, isLoadingPutSurveySubmissionsPrev])

    const renderAnswers = () => {
        let question = allSurveyQuestions[presentQuestionNo]
        if (question?.type === "SINGLE_CHOICE"){
            let subQuestion = question?.answers?.filter(item => item?._id == questionAnswers[question?._id]?.[0])?.[0]?.sub_question
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionAnswers[question?._id]?.[0]}>
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
                        {subQuestion && subQuestion?.length ? renderSubAnswers(subQuestion) : null}
                    </RadioButton.Group>
                </View>
            )
        }
        if (question?.type === "BOOLEAN"){
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionAnswers[question?._id]?.[0]}>
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
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <TextInput
                        label={""}
                        value={questionAnswers[question?._id]?.[0]}
                        onChangeText={text => onChangeValue(question?._id, text, question?.type)}
                    />
                </View>
            )
        }
        else if (question?.type === "MULTIPLE_CHOICE") {
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionAnswers[question?._id]?.[0]}>
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
            let subQuestion = question?.answers?.filter(item => item?._id == questionAnswers[question?._id]?.[0])?.[0]?.sub_question
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <View style={{flexDirection:'row',justifyContent:'flex-start', flexWrap:'wrap'}}>
                        {question?.answers.map((answer, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}>
                                    <Text>
                                        {answer?.title}
                                    </Text>
                                    <RadioButton.Android
                                        value="first"
                                        status={questionAnswers[question?._id]?.[0] === answer?._id ? 'checked' : 'unchecked'}
                                        onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}
                                        style={{height:10, width:10}}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    {subQuestion && subQuestion?.length ? renderSubAnswers(subQuestion) : null}
                </View>
            )
        }
    }

    const renderSubAnswers = (questionId) => {
        let question = allSurveyQuestions?.filter(item => item?._id === questionId)?.[0]
        if (question?.type === "SINGLE_CHOICE"){
            let subQuestion = question?.answers?.filter(item => item?._id == questionAnswers[question?._id]?.[0])?.[0]?.sub_question
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionAnswers[question?._id]?.[0]}>
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
                        {subQuestion && subQuestion?.length ? renderSubAnswers(subQuestion) : null}
                    </RadioButton.Group>
                </View>
            )
        }
        if (question?.type === "BOOLEAN"){
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionAnswers[question?._id]?.[0]}>
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
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <TextInput
                        label={""}
                        value={questionAnswers[question?._id]?.[0]}
                        onChangeText={text => onChangeValue(question?._id, text, question?.type)}
                    />
                </View>
            )
        }
        else if (question?.type === "MULTIPLE_CHOICE") {
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <RadioButton.Group onValueChange={newValue => onChangeValue(question?._id, newValue, question?.type)} value={questionAnswers[question?._id]?.[0]}>
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
            let subQuestion = question?.answers?.filter(item => item?._id == questionAnswers[question?._id]?.[0])?.[0]?.sub_question
            return (
                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10, elevation: 3, borderColor: "#DBDBDB", borderWidth: 0.25 }}>
                    <Title>{question?.title}</Title>
                    <View style={{flexDirection:'row',justifyContent:'flex-start', flexWrap:'wrap'}}>
                        {question?.answers.map((answer, index) => {
                            return (
                                <TouchableOpacity key={index} style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}>
                                    <Text>
                                        {answer?.title}
                                    </Text>
                                    <RadioButton.Android
                                        value="first"
                                        status={questionAnswers[question?._id]?.[0] === answer?._id ? 'checked' : 'unchecked'}
                                        onPress={() => onChangeValue(question?._id, answer?._id, question?.type)}
                                        style={{height:10, width:10}}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    {subQuestion && subQuestion?.length ? renderSubAnswers(subQuestion) : null}
                </View>
            )
        }
    }

    const onNextQuestion = () => {
        if (presentQuestionNo != (allSurveyQuestions?.length - 1)){
            setPresentQuestionNo(presentQuestionNo + 1)
        }
    }

    const onPreviousQuestion = () => {
        if (presentQuestionNo != 0) {
            setPresentQuestionNo(presentQuestionNo - 1)
        }
    }

    const onSubmit = () => {
        if (allSurveySubmissions && allSurveySubmissions?.length){
            const payload = Object.keys(questionAnswers)?.map((key) => {
                const surveySub = allSurveySubmissions?.filter((item) => item?.question_id === key)?.[0]
                return {
                    "id": surveySub?._id,
                    "answers": questionAnswers[key]
                }
            })
            dispatch(startPutSurveySubmissions({ jwt, data: payload }))
        }
        else{
            const payload = Object.keys(questionAnswers)?.map((key) => {
                return {
                    "question_id": key,
                    "answers": questionAnswers[key]
                }
            })
            dispatch(startPostSurveySubmissions({ jwt, data: payload}))
        }
    }

    return (
        isLoadingGetProfile || isLoadingFetchAllSurveyQuestions || isLoadingFetchAllSurveySubmissions || isLoadingPostSurveySubmissions || isLoadingPutSurveySubmissions ? <ActivityIndicator/> : <View>
            <Button mode="text" icon="chevron-left" onPress={() => props?.navigation?.goBack()} style={{ marginTop: 10, width: '30%', marginHorizontal: 20 }} labelStyle={{ color: "#000" }}>
                {"GO BACK"}
            </Button>
            {showQuestions ? <ScrollView contentContainerStyle={{ marginTop: 20, marginHorizontal: 20, paddingBottom: 200 }}>
                <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 10, fontSize: 20 }}>Question - {presentQuestionNo + 1}/{allSurveyQuestions?.length}</Text>
                {allSurveyQuestions && allSurveyQuestions?.length ? renderAnswers() : null}
                {allSurveyQuestions && allSurveyQuestions?.length ? <View style={{flexDirection:'row', justifyContent:"space-around"}}>
                    {presentQuestionNo != 0 ? <Button mode="outlined" onPress={() => onPreviousQuestion()}>
                        BACK
                    </Button> : null}
                    {presentQuestionNo == (allSurveyQuestions?.length - 1) ? 
                    <Button mode="outlined" onPress={() => onSubmit()}>
                        SUBMIT
                    </Button>:<Button mode="outlined" onPress={() => onNextQuestion()}>
                        NEXT
                    </Button>}
                    </View>:null}
            </ScrollView> : <Text style={{ fontWeight: "bold", color: "#000", marginVertical: 10, fontSize: 20, marginHorizontal: 20 }}>Survey already taken - next available on {moment(nextAvailableDate)?.format("MM-DD-YYYY")}</Text>}
        </View>
    );
}