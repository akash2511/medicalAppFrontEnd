import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { version } from '../../../package.json'

//libs
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, Button } from 'react-native-paper';

//actions
import { emitLogin } from '../../redux/actions/account'

//reducers
import {getError,getMsg,getLoggedIn,getisLoading } from '../../redux/reducers/account'

//helpers
import { usePrevious } from '../../helpers/utils'


Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorText, setUsernameErrorText] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")

    //redux
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getLoggedIn)
    const isLoadingLogin = useSelector(getisLoading)
    const isLoadingLoginPrev = usePrevious(isLoadingLogin)
    const msg = useSelector(getMsg)
    const loginError = useSelector(getError)

    //effects

    createlogin = () => {
        if (username && password) {
            dispatch(emitLogin(username, password))
        }
        else {
            if (!username) {
                setUsernameError(true)
                setUsernameErrorText("Enter username")
            }
            if (!password) {
                setPasswordError(true)
                setPasswordErrorText("Enter password")
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#0064f4", paddingHorizontal: 20 }}>
            <View style={{ marginTop: '10%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 30 }}>
                    <Text style={{ fontWeight: "bold", color: "#fff", marginBottom: 20, fontSize:30 }}>Welcome</Text>
                </View>
                <View style={{ padding: 20, backgroundColor:"#fff", borderRadius:10  }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignContent: 'baseline',
                            marginBottom: 5
                        }}>
                            <TextInput
                                label={"Username"}
                                error={usernameError}
                                selectionColor={usernameError ? '#ff2459' : '#000'}
                                underlineColor={usernameError ? '#ff2459' : '#79829e'}
                                underlineColorAndroid={'#79829e'}
                                value={username}
                                onChangeText={text => { setUsername(text); setUsernameError(false) }}
                                keyboardType={"default"}
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    fontFamily: "Nunito-SemiBold",
                                    color: '#615c65',
                                    zIndex: 10,
                                    backgroundColor: "transparent"
                                }}
                                editable={true}
                                secureTextEntry={false}
                                autoFocus={false}
                                multiline={false}
                            />
                        </View>
                        <Text extraStyle={{ fontWeight: 'regular', color: '#ff2459', marginLeft: 30 }}>{usernameError && usernameErrorText ? usernameErrorText : " "}</Text>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignContent: 'baseline',
                            marginBottom: 5
                        }}>
                            <TextInput
                                label={"Enter Password"}
                                error={passwordError}
                                selectionColor={passwordError ? '#ff2459' : '#000'}
                                underlineColor={passwordError ? '#ff2459' : '#79829e'}
                                underlineColorAndroid={'#79829e'}
                                value={password}
                                onChangeText={text => { setPassword(text); setPasswordError(false) }}
                                keyboardType={"default"}
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    fontFamily: "Nunito-SemiBold",
                                    color: '#615c65',
                                    zIndex: 10,
                                    backgroundColor: "transparent"
                                }}
                                editable={true}
                                secureTextEntry={true}
                                autoFocus={false}
                                multiline={false}
                            />
                        </View>
                        <Text extraStyle={{ fontWeight: 'regular', color: '#ff2459', marginLeft: 30 }}>{passwordError && passwordErrorText ? passwordErrorText : " "}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        {isLoadingLogin ? <ActivityIndicator/> : <Button mode="contained" onPress={() => createlogin()} style={{ marginHorizontal: 20, marginVertical: 20 }} labelStyle={{color:"#fff"}}>
                            {"LOGIN"}
                        </Button>}
                        {msg && msg?.length ? <Text extraStyle={{ fontWeight: 'regular', color: '#ff2459' }}>{msg}</Text> : null}
                        <Text extraStyle={{ fontWeight: 'regular', color: '#fff' }}>v {version}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Login
