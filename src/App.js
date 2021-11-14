//react
import React from 'react';

//libs
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font'
import { NavigationContainer, DefaultTheme as NavDefaultTheme} from '@react-navigation/native';

//assets and helpers
import configureStore from './helpers/configureStore'
import ErrorBoundary from './errorBoundary'

//componenets
import Router from './router/main'


//redux
let { store, persistor } = configureStore()

//themes
const DefaultTheme = {
    ...PaperDefaultTheme,
    ...NavDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavDefaultTheme.colors,
        primary: '#4789f9',
        text: "#000"
    }
};

export default App = (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider theme={DefaultTheme}>
                    <ErrorBoundary>
                        <NavigationContainer theme={DefaultTheme}>
                            <Router />
                        </NavigationContainer>
                    </ErrorBoundary>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
}
