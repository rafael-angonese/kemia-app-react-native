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

    const [saida, setSaida] = useState(item.saida);
    const [retorno, setRetorno] = useState(item.retorno);
    const [problema, setProblema] = useState(item.problema);
    const [equipamento, setEquipamento] = useState(item.equipamento);

    const [show_saida, setShow_saida] = useState(false);
    const [show_retorno, setShow_retorno] = useState(false);

    const [error, setError] = useState({});
    const [snackbar, setSnackbar] = useState(false);

    async function salvar() {
        const schema = Yup.object().shape({
            problema: Yup.string().min(2).required('Problema é obrigatório'),
            equipamento: Yup.string().required('Equipamento é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            problema,
            equipamento,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.put(
                `/equipamento-manutencaos/${item.id}`,
                {
                    saida: formatDate(saida, 'yyyy-MM-dd '),
                    retorno:
                        retorno === null
                            ? null
                            : formatDate(retorno, 'yyyy-MM-dd '),
                    problema,
                    equipamento_id: equipamento.id,
                    empresa_id: empresa.id,
                    local_id: local.id,
                }
            );
            setLoading(false);
            const { data } = response;

            setSaida(Date.now());
            setRetorno(null);
            setProblema('');
            setSnackbar(true);
            refresh();
            navigation.navigate('EquipamentoManutencaoList');
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
                    <Text>Saída:</Text>
                    <Button icon="calendar" onPress={() => setShow_saida(true)}>
                        {formatDate(saida)}
                    </Button>
                </View>
                <View style={styles.container_data}>
                    <Text>Retorno:</Text>
                    <Button
                        icon="calendar"
                        onPress={() => setShow_retorno(true)}
                    >
                        {retorno === null
                            ? 'Não retornado'
                            : formatDate(retorno)}
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
                    label="Problema:"
                    value={problema}
                    onChangeText={(text) => setProblema(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.problema}
                </HelperText>

                {show_saida && (
                    <DateTimePicker
                        value={saida}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            setShow_saida(false);
                            if (typeof date !== 'undefined') {
                                setSaida(date);
                            }
                        }}
                    />
                )}

                {show_retorno && (
                    <DateTimePicker
                        value={retorno == null ? Date.now() : retorno}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            setShow_retorno(false);
                            if (typeof date !== 'undefined') {
                                setRetorno(date);
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
