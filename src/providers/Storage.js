import AsyncStorage from '@react-native-community/async-storage'

export default class Storage {
    static tokenKey = '@kemia/token';

    static refreshTokenKey = '@kemia/refreshToken';

    static userKey = '@kemia/user';

    static empresaKey = '@kemia/empresa';

    static localKey = '@kemia/local';

    static async getItem(key) {
        const item = await AsyncStorage.getItem(key);
        return JSON.parse(item)
    }

    static async removeItem(key) {
        await AsyncStorage.removeItem(key);
    }

    static async setItem(key, value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
}
