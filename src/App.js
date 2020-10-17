import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

const App = () => {
    return (
        <NavigationContainer>
            <PaperProvider>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </PaperProvider>
        </NavigationContainer>
    );
};

export default App;
