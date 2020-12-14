import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { CustomPicker } from 'react-native-custom-picker';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';
import styles from '../Styles/styles';

const SelectLocal = () => {
    const { empresa, setAuthLocal, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [locais, setLocais] = useState([]);

    const navigation = useNavigation();
    const [local, setLocal] = useState(null);
    const [error, setError] = useState('');

    async function entrar() {
        setError('');
        if (!local) {
            setError('Por favor selecione um local');
            return;
        }

        await setAuthLocal(local);

        navigation.navigate('Home');
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`/locais?empresaId=${empresa.id}`)
            const { data } = response;
            setLocais(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setLocais([]);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        myAsyncEffect();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container_data}>
                <Text>Local:</Text>
            </View>

            <View style={styles.container_data}>
                <CustomPicker
                    options={locais}
                    placeholder="Selecione um local"
                    getLabel={(item) => item.nome}
                    onValueChange={(value) => {
                        setLocal(value);
                    }}
                />
            </View>

            <ActivityIndicator
                style={
                    loading === true ? { display: 'flex' } : { display: 'none' }
                }
                size="large"
                color="#0000ff"
            />
            {error.length !== 0 && <Text style={styles.error}>{error}</Text>}
            <View style={styles.container_data}>
                <Button mode="contained" onPress={entrar} disabled={loading}>
                    Entrar
                </Button>
            </View>

            {(user?.tipo === 'master' || user?.tipo === ' admin') && (
                <FAB
                    label="Locais"
                    style={styles.fab}
                    icon="plus"
                    onPress={() =>
                        navigation.navigate('LocalNew', {
                            refresh: myAsyncEffect.bind(this),
                        })
                    }
                />
            )}
        </View>
    );
};

export default SelectLocal;
