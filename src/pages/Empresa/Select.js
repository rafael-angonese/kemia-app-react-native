import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { CustomPicker } from 'react-native-custom-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { dataInRequest, setEmpresa } from '../../store/modules/empresa/actions';

import styles from '../Styles/styles';

const SelectEmpresa = () => {
    const { loading, empresas } = useSelector((state) => state.empresa);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [myEmpresa, setMyEmpresa] = useState(null);
    const [erro, setErro] = useState('');

    async function entrar() {
        setErro('');
        if (!myEmpresa) {
            setErro('Por favor selecione uma empresa');
            return;
        }

        try {
            dispatch(setEmpresa(myEmpresa));
            navigation.navigate('Home');
        } catch (errors) {
            setErro('Por favor selecione uma empresa');
        }
    }

    async function myAsyncEffect() {
        dispatch(dataInRequest());
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
                        setMyEmpresa(value);
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
            {erro.length !== 0 && <Text style={styles.error}>{erro}</Text>}
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
                    navigation.navigate('empresa_list', {
                        refresh: myAsyncEffect.bind(this),
                    })
                }
            />
        </View>
    );
};

export default SelectEmpresa;
