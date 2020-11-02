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
    const [equipamentos, setEquipamentos] = useState([]);


    let d = new Date();
    let [hours, minutes, seconds] = item.hora.split(':');
    d.setHours(+hours);
    d.setMinutes(minutes);
    d.setSeconds(seconds);

    const [data, setData] = useState(new Date(item.data));
    const [hora, setHora] = useState(d);
    const [equipamento, setEquipamento] = useState(item.equipamento);
    const [leitura, setLeitura] = useState(item.leitura);
    const [corrente, setCorrente] = useState(item.corrente);
    const [acaoCorretiva, setAcaoCorretiva] = useState(item.acao_corretiva);

    const [show_data, setShow_data] = useState(false);
    const [show_hora, setShow_hora] = useState(false);

    const [error, setError] = useState({});
    const [snackbar, setSnackbar] = useState(false);

    async function salvar() {
        const schema = Yup.object().shape({
            equipamento: Yup.string().min(1).required('Equipamento é obrigatório'),
            corrente: Yup.string().min(1).required('Corrente é obrigatório'),
            leitura: Yup.string().min(1).required('Leitura do motor é obrigatório'),
            acaoCorretiva: Yup.string().min(1).required('Ação corretiva é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            equipamento,
            corrente,
            leitura,
            acaoCorretiva,
        });

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.put('/controle-bombas/' + item.id, {
                data: formatDate(data, 'yyyy-MM-dd'),
                hora: formatDate(hora, 'yyyy-MM-dd HH:mm:ss'),
                corrente,
                leitura,
                acao_corretiva: acaoCorretiva,
                equipamento_id: equipamento.id,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            // const { data } = response;

            setSnackbar(true);
            refresh();
            navigation.navigate('ControleRotacaoBombaList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`equipamentos?localId=${local.id}`);
            const { data } = response;
            setEquipamentos(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setEquipamentos([]);
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
                    <Text>Equipamento:</Text>
                    <CustomPicker
                        options={equipamentos}
                        value={equipamento}
                        placeholder="Selecione um equipamento"
                        getLabel={(item) => item.nome}
                        onValueChange={(value) => {
                            setEquipamento(value);
                        }}
                    />
                </View>
                <HelperText type="error" visible={true}>
                    {error?.equipamento}
                </HelperText>

                <TextInput
                    label="Corrente (A):"
                    value={corrente}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setCorrente(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.corrente}
                </HelperText>

                <TextInput
                    label="Leitura do motor (RPM):"
                    value={leitura}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setLeitura(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.leitura}
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
