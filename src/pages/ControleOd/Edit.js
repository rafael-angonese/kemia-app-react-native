import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import { TextInput, Snackbar, Button, HelperText } from 'react-native-paper';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomPicker } from 'react-native-custom-picker';

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import formatDate from '../../utils/formatDate';
import api from '../../services/api';

import styles from '../Styles/styles';

const Edit = ({ route }) => {
    const { item } = route.params;
    const { refresh } = route.params;
    const navigation = useNavigation();
    const { empresa, local } = useAuth();

    const [loading, setLoading] = useState(false);

    let d = new Date();
    let [hours, minutes, seconds] = item.hora.split(':');
    d.setHours(+hours);
    d.setMinutes(minutes);
    d.setSeconds(seconds);

    const [data, setData] = useState(new Date(item.data));
    const [hora, setHora] = useState(d);
    const [bruto, setBruto] = useState(String(item.bruto));
    const [reator_1, setReator_1] = useState(String(item.reator_1));
    const [reator_2, setReator_2] = useState(String(item.reator_2));
    const [reator_3, setReator_3] = useState(String(item.reator_3));
    const [tratado, setTratado] = useState(String(item.tratado));
    const [acaoCorretiva, setAcaoCorretiva] = useState(item.acao_corretiva);

    const [show_data, setShow_data] = useState(false);
    const [show_hora, setShow_hora] = useState(false);

    const [error, setError] = useState({});
    const [snackbar, setSnackbar] = useState(false);

    async function salvar() {
        const schema = Yup.object().shape({
            bruto: Yup.string().min(1).required('Bruto ?? obrigat??rio'),
            tratado: Yup.string().min(1).required('Tratado ?? obrigat??rio'),
        });

        const validation = await yupValidator(schema, {
            bruto,
            tratado,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.put('/controle-ods/' + item.id, {
                data: formatDate(data, 'yyyy-MM-dd'),
                hora: formatDate(hora, 'yyyy-MM-dd HH:mm:ss'),
                bruto,
                reator_1,
                reator_2,
                reator_3,
                tratado,
                acao_corretiva: acaoCorretiva,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            // const { data } = response;

            setSnackbar(true);
            refresh();
            navigation.navigate('ControleOdList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

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

                <TextInput
                    label="Bruto:"
                    value={bruto}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setBruto(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.bruto}
                </HelperText>

                <TextInput
                    label="Reator 1:"
                    value={reator_1}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator_1(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator_1}
                </HelperText>

                <TextInput
                    label="Reator 2:"
                    value={reator_2}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator_2(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator_2}
                </HelperText>

                <TextInput
                    label="Reator 3:"
                    value={reator_3}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setReator_3(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.reator_3}
                </HelperText>

                <TextInput
                    label="Tratado:"
                    value={tratado}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setTratado(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.tratado}
                </HelperText>

                <TextInput
                    label="A????o Corretiva:"
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
                        loading == true
                            ? { display: 'flex' }
                            : { display: 'none' }
                    }
                    size="large"
                    color="#0000ff"
                />
                {error.length !== 0 && (
                    <Text style={styles.error}>{error?.request}</Text>
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

export default Edit;
