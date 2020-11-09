import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { CustomPicker } from 'react-native-custom-picker';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';
import styles from '../Styles/styles';

const SelectEmpresa = () => {
    const { setAuthEmpresa } = useAuth();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState(null);
    const [error, setError] = useState('');

    async function entrar() {
        setError('');
        if (!empresa) {
            setError('Por favor selecione uma empresa');
            return;
        }

        await setAuthEmpresa(empresa)

        navigation.navigate('SelectLocal');
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get('/empresas')
            const { data } = response;
            setEmpresas(data)
            setLoading(false);

        } catch (error) {
            setLoading(false);
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
                <Text>Empresa:</Text>
            </View>

            <View style={styles.container_data}>
                <CustomPicker
                    options={empresas}
                    placeholder="Selecione uma empresa"
                    getLabel={(item) => item.nome}
                    onValueChange={(value) => {
                        setEmpresa(value);
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

            <FAB
                label="Empresas"
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.navigate('EmpresaNew', {
                        refresh: myAsyncEffect.bind(this),
                    })
                }
            />
        </View>
    );
};

export default SelectEmpresa;
