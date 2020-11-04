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
    Button,
    HelperText,
    RadioButton,
} from 'react-native-paper';
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
    const { empresa, local, user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [lagoas, setLagoas] = useState([]);

    const [data, setData] = useState(Date.now());
    const [lagoa, setLagoa] = useState(null);
    const [ph, setPh] = useState('');
    const [od, setOd] = useState('');
    const [ss, setSs] = useState('');
    const [aeracao, setAeracao] = useState('');
    const [observacao, setObservacao] = useState('');
    const [nivel_lagoa, setNivel_lagoa] = useState('');
    const [
        bomba_recalque_funcionando,
        setBomba_recalque_funcionando,
    ] = useState('');
    const [observacao_geral, setObservacao_geral] = useState('');

    const [show_data, setShow_data] = useState(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            lagoa: Yup.string().min(1).required('lagoa é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            lagoa,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.post('/tratamento-efluente-lagoas', {
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
            });
            setLoading(false);
            // const { data } = response;

            setData(Date.now());
            setPh('');
            setOd('');
            setSs('');
            setAeracao('');
            setObservacao('');
            setNivel_lagoa('');
            setBomba_recalque_funcionando('');
            setObservacao_geral('');
            setLagoa(null);

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

                <TextInput
                    label="pH:"
                    value={ph}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPh(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.ph}
                </HelperText>

                <TextInput
                    label="OD:"
                    value={od}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setOd(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.od}
                </HelperText>

                <TextInput
                    label="SS:"
                    value={ss}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setSs(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.ss}
                </HelperText>

                <TextInput
                    label="Aeração:"
                    value={aeracao}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setAeracao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.aeracao}
                </HelperText>

                <TextInput
                    label="Observações:"
                    value={observacao}
                    onChangeText={(text) => setObservacao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao}
                </HelperText>

                <Text style={{ marginTop: 30 }}>Nível da Lagoa:</Text>
                <View style={styles.container_row}>
                    <Text>Baixo</Text>
                    <RadioButton
                        value="1"
                        status={nivel_lagoa === 1 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNivel_lagoa(1);
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>Médio</Text>
                    <RadioButton
                        value="2"
                        status={nivel_lagoa === 2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNivel_lagoa(2);
                        }}
                    />

                    <Text style={{ marginLeft: 30 }}>Alto</Text>
                    <RadioButton
                        value="3"
                        status={nivel_lagoa === 3 ? 'checked' : 'unchecked'}
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
                            bomba_recalque_funcionando === 1
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
                            bomba_recalque_funcionando === 2
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
                            bomba_recalque_funcionando === 3
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
