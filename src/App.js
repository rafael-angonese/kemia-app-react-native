import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Routes from './routes';
import { store, persistor } from './store';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationContainer>
                    <PaperProvider>
                        <Routes />
                    </PaperProvider>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};

export default App;
