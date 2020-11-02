import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import { TextInput, Snackbar, Button, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomPicker } from 'react-native-custom-picker';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import formatDate from '../../utils/formatDate';
import api from '../../services/api';

import styles from '../Styles/styles';

const New = ({ route }) => {
    const { refresh } = route.params;
    const { empresa, local } = useAuth();

    const [loading, setLoading] = useState(false);
    const [tanques, setTanques] = useState([]);

    const [data, setData] = useState(Date.now());
    const [hora, setHora] = useState(Date.now());
    const [tanque, setTanque] = useState(null);
    const [tempo_ligado_2cv, setTempo_ligado_2cv] = useState('');
    const [tempo_desligado_2cv, setTempo_desligado_2cv] = useState('');
    const [tempo_ligado_5cv, setTempo_ligado_5cv] = useState('');
    const [tempo_desligado_5cv, setTempo_desligado_5cv] = useState('');
    const [acaoCorretiva, setAcaoCorretiva] = useState('');

    const [show_data, setShow_data] = useState(false);
    const [show_hora, setShow_hora] = useState(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            tanque: Yup.string().min(1).required('Bruto é obrigatório'),
            tempo_ligado_2cv: Yup.string().min(1).required('Tempo ligado 2cv é obrigatório'),
            tempo_desligado_2cv: Yup.string().min(1).required('Tempo desligado 2cv é obrigatório'),
            tempo_ligado_5cv: Yup.string().min(1).required('Tempo ligado 5cv é obrigatório'),
            tempo_desligado_5cv: Yup.string().min(1).required('Tempo desligado 5cv é obrigatório'),
            acaoCorretiva: Yup.string().min(1).required('Ação corretiva é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            tanque,
            tempo_ligado_2cv,
            tempo_desligado_2cv,
            tempo_ligado_5cv,
            tempo_desligado_5cv,
            acaoCorretiva,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.post('/controle-tanques', {
                data: formatDate(data, 'yyyy-MM-dd'),
                hora: formatDate(hora, 'yyyy-MM-dd HH:mm:ss'),
                tempo_ligado_2cv,
                tempo_desligado_2cv,
                tempo_ligado_5cv,
                tempo_desligado_5cv,
                acao_corretiva: acaoCorretiva,
                tanque_id: tanque.id,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            // const { data } = response;

            setData(Date.now());
            setHora(Date.now());
            setTempo_ligado_2cv('');
            setTempo_desligado_2cv('');
            setTempo_ligado_5cv('');
            setTempo_desligado_5cv('');
            setTanque(null);
            setAcaoCorretiva('');
            setSnackbar(true);
            refresh();
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`tanques?localId=${local.id}`);
            const { data } = response;
            setTanques(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setTanques([]);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        myAsyncEffect();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container_data}>
                    <Text style={{ marginLeft: 5, marginTop: 40 }}>Data:</Text>
                    <Button icon="calendar" onPress={() => setShow_data(true)}>
                        {formatDate(data)}
                    </Button>
                    <Button icon="calendar" onPress={() => setShow_hora(true)}>
                        {formatDate(hora, 'HH:mm:ss')}
                    </Button>
                </View>

                <View>
                    <Text>Tanque:</Text>
                    <CustomPicker
                        options={tanques}
                        value={tanque}
                        placeholder="Selecione um tanque"
                        getLabel={(item) => item.nome}
                        onValueChange={(value) => {
                            setTanque(value);
                        }}
                    />
                </View>
                <HelperText type="error" visible={true}>
                    {error?.tanque}
                </HelperText>

                <TextInput
                    label="Tempo ligado 2cv:"
                    value={tempo_ligado_2cv}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setTempo_ligado_2cv(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.tempo_ligado_2cv}
                </HelperText>

                <TextInput
                    label="Tempo desligado 2cv:"
                    value={tempo_desligado_2cv}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setTempo_desligado_2cv(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.setTempo_desligado_2cv}
                </HelperText>

                <TextInput
                    label="Tempo ligado 5cv:"
                    value={tempo_ligado_5cv}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setTempo_ligado_5cv(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.tempo_ligado_5cv}
                </HelperText>

                <TextInput
                    label="Tempo desligado 5cv:"
                    value={tempo_desligado_5cv}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setTempo_desligado_5cv(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.tempo_desligado_5cv}
                </HelperText>

                <TextInput
                    label="Ação Corretiva:"
                    value={acaoCorretiva}
                    onChangeText={(text) => setAcaoCorretiva(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.acaoCorretiva}
                </HelperText>

                {show_data && (
                    <DateTimePicker
                        value={data}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            setShow_data(false);
                            if (typeof date !== 'undefined') {
                                setData(date);
                            }
                        }}
                    />
                )}

                {show_hora && (
                    <DateTimePicker
                        mode="time"
                        value={hora}
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            setShow_hora(false);
                            if (typeof date !== 'undefined') {
                                setHora(date);
                            }
                        }}
                    />
                )}

                <ActivityIndicator
                    style={
                        loading === true
                            ? { display: 'flex' }
                            : { display: 'none' }
                    }
                    size="large"
                    color="#0000ff"
                />
                {error.length !== 0 && (
                    <Text style={styles.error}>{error?.error}</Text>
                )}

                <Button
                    icon="content-save"
                    style={{ marginTop: 20 }}
                    mode="contained"
                    disabled={loading}
                    onPress={() => {
                        Keyboard.dismiss();
                        salvar();
                    }}
                >
                    Salvar
                </Button>
            </ScrollView>
            <Snackbar
                visible={snackbar}
                onDismiss={() => setSnackbar(false)}
                action={{
                    label: 'OK',
                    onPress: () => {},
                }}
            >
                Adicionado com sucesso!!!
            </Snackbar>
        </View>
    );
};

export default New;
