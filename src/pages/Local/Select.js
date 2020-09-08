import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { CustomPicker } from 'react-native-custom-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { dataInRequest, setLocal } from '../../store/modules/local/actions';

import styles from '../Styles/styles';

const SelectLocal = () => {
    const { loading, locais } = useSelector((state) => state.local);
    const { empresa } = useSelector((state) => state.empresa);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [myLocal, setMyLocal] = useState(null);
    const [erro, setErro] = useState('');

    async function entrar() {
        setErro('');
        if (!myLocal) {
            setErro('Por favor selecione um local');
            return;
        }

        try {
            dispatch(setLocal(myLocal));
            navigation.navigate('Home');
        } catch (errors) {
            setErro('Por favor selecione um local');
        }
    }

    async function myAsyncEffect() {
        dispatch(dataInRequest({ empresaId: empresa.id }));
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
                        setMyLocal(value);
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
                label="Locais"
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.navigate('locais_list', {
                        refresh: myAsyncEffect.bind(this),
                    })
                }
            />
        </View>
    );
};

export default SelectLocal;
