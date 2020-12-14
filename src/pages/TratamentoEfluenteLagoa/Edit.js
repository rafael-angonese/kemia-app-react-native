import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import {
    TextInput,
    Snackbar,
    Checkbox,
    Button,
    HelperText,
    RadioButton,
} from 'react-native-paper';
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
    const { empresa, local, user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [lagoas, setLagoas] = useState([]);

    const [data, setData] = useState(new Date(item.data));
    const [lagoa, setLagoa] = useState(item.lagoa);
    const [ph, setPh] = useState(item.ph);
    const [od, setOd] = useState(item.od);
    const [ss, setSs] = useState(item.ss);
    const [aeracao, setAeracao] = useState(item.aeracao);
    const [observacao, setObservacao] = useState(item.observacao);
    const [nivel_lagoa, setNivel_lagoa] = useState(item.nivel_lagoa);
    const [
        bomba_recalque_funcionando,
        setBomba_recalque_funcionando,
    ] = useState(item.bomba_recalque_funcionando);
    const [observacao_geral, setObservacao_geral] = useState(
        item.observacao_geral
    );

    const [show_data, setShow_data] = useState(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            lagoa: Yup.string().min(1).required('Eta é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            lagoa,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);

        try {
            const response = await api.put(
                `/tratamento-efluente-lagoas/${item.id}`,
                {
                    data: formatDate(data, 'yyyy-MM-dd'),
                    ph,
                    od,
                    ss,
                    aeracao,
                    observacao,
                    nivel_lagoa,
                    bomba_recalque_funcionando,
                    observacao_geral,
                    lagoa_id: lagoa.id,
                    empresa_id: empresa.id,
                    local_id: local.id,
                }
            );
            setLoading(false);
            // const { data } = response;

            setSnackbar(true);
            refresh();
            navigation.navigate('TratamentoEfluenteLagoaList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`lagoas?localId=${local.id}`);
            const { data } = response;
            setLagoas(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setLagoas([]);
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
                    <Text>Operador: {user.nome}</Text>
                </View>

                <View>
                    <Text>Lagoa:</Text>
                    <CustomPicker
                        options={lagoas}
                        value={lagoa}
                        placeholder="Selecione uma Lagoa"
                        getLabel={(item) => item.nome}
                        onValueChange={(value) => {
                            setLagoa(value);
                        }}
                    />
                </View>
                <HelperText type="error" visible={true}>
                    {error?.lagoa}
                </HelperText>

                {lagoa?.is_ph && (
                    <TextInput
                        label="pH:"
                        value={ph}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setPh(text)}
                    />
                )}
                {lagoa?.is_ph && (
                    <HelperText type="error" visible={true}>
                        {error?.ph}
                    </HelperText>
                )}

                {lagoa?.is_od && (
                    <TextInput
                        label="OD:"
                        value={od}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setOd(text)}
                    />
                )}
                {lagoa?.is_od && (
                    <HelperText type="error" visible={true}>
                        {error?.od}
                    </HelperText>
                )}

                {lagoa?.is_ss && (
                    <TextInput
                        label="SS:"
                        value={ss}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setSs(text)}
                    />
                )}
                {lagoa?.is_ss && (
                    <HelperText type="error" visible={true}>
                        {error?.ss}
                    </HelperText>
                )}

                {lagoa?.is_aeracao && (
                    <TextInput
                        label="Aeração:"
                        value={aeracao}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setAeracao(text)}
                    />
                )}
                {lagoa?.is_aeracao && (
                    <HelperText type="error" visible={true}>
                        {error?.aeracao}
                    </HelperText>
                )}

                {lagoa?.is_observacao && (
                    <TextInput
                        label="Observações:"
                        value={observacao}
                        onChangeText={(text) => setObservacao(text)}
                    />
                )}
                {lagoa?.is_observacao && (
                    <HelperText type="error" visible={true}>
                        {error?.observacao}
                    </HelperText>
                )}

                <Text style={{ marginTop: 30 }}>Nível da Lagoa:</Text>
                <View style={styles.container_row}>
                    <Text>Baixo</Text>
                    <RadioButton
                        value="1"
                        status={nivel_lagoa == 1 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNivel_lagoa(1);
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>Médio</Text>
                    <RadioButton
                        value="2"
                        status={nivel_lagoa == 2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNivel_lagoa(2);
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>Alto</Text>
                    <RadioButton
                        value="3"
                        status={nivel_lagoa == 3 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNivel_lagoa(3);
                        }}
                    />
                </View>

                <HelperText type="error" visible={true}>
                    {error?.nivel_lagoa}
                </HelperText>

                <Text style={{ marginTop: 30 }}>
                    Bombas de recalque funcionando:
                </Text>
                <View style={styles.container_row}>
                    <Text>1</Text>
                    <RadioButton
                        value="1"
                        status={
                            bomba_recalque_funcionando == 1
                                ? 'checked'
                                : 'unchecked'
                        }
                        onPress={() => {
                            setBomba_recalque_funcionando(1);
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>2</Text>
                    <RadioButton
                        value="2"
                        status={
                            bomba_recalque_funcionando == 2
                                ? 'checked'
                                : 'unchecked'
                        }
                        onPress={() => {
                            setBomba_recalque_funcionando(2);
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>Ambos</Text>
                    <RadioButton
                        value="3"
                        status={
                            bomba_recalque_funcionando == 3
                                ? 'checked'
                                : 'unchecked'
                        }
                        onPress={() => {
                            setBomba_recalque_funcionando(3);
                        }}
                    />
                </View>

                <HelperText type="error" visible={true}>
                    {error?.bomba_recalque_funcionando}
                </HelperText>

                <TextInput
                    label="Observações:"
                    value={observacao_geral}
                    onChangeText={(text) => setObservacao_geral(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao_geral}
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
