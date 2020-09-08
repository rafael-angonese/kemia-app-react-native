import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
    const persistedReducer = persistReducer(
        {
            key: '@kemia',
            storage: AsyncStorage,
            whitelist: ['auth', 'empresa', 'local', 'usuario'],
            // blacklist: ['auth', 'empresa', 'local'],
        },
        reducers
    );

    return persistedReducer;
};
