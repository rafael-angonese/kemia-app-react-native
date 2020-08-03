import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes'
import { AuthProvider } from './contexts/auth';
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Provider store={store}>
                    <Routes />
                </Provider>
            </AuthProvider>
        </NavigationContainer>
    );
}

export default App;