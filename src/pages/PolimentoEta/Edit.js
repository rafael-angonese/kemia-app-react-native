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
    const [etas, setEtas] = useState([]);

    const [data, setData] = useState(new Date(item.data));
    const [eta, setEta] = useState(item.eta);
    const [vazao, setVazao] = useState(item.vazao);
    const [ph, setPh] = useState(item.ph);
    const [pac, setPac] = useState(item.pac);
    const [polimero, setPolimero] = useState(item.polimero);
    const [hipoclorito, setHipoclorito] = useState(item.hipoclorito);
    const [observacao, setObservacao] = useState(item.observacao);

    const [ph_caixa_saida_eta, setPh_caixa_saida_eta] = useState(item.ph_caixa_saida_eta);
    const [ss_caixa_saida_eta, setSs_caixa_saida_eta] = useState(item.ss_caixa_saida_eta);
    const [observacao_caixa_saida_eta, setObservacao_caixa_saida_eta] = useState(item.observacao_caixa_saida_eta);
    const [ph_caixa_saida_final, setPh_caixa_saida_final] = useState(item.ph_caixa_saida_final);
    const [ss_caixa_saida_final, setSs_caixa_saida_final] = useState(item.ss_caixa_saida_final);
    const [observacao_caixa_saida_final, setObservacao_caixa_saida_final] = useState(item.observacao_caixa_saida_final);

    const [show_data, setShow_data] = useState(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            eta: Yup.string().min(1).required('Eta é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            eta,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);

        try {
            const response = await api.put(`/polimento-etas/${item.id}`, {
                data: formatDate(data, 'yyyy-MM-dd'),
                vazao,
                ph,
                pac,
                polimero,
                hipoclorito,
                observacao,
                ph_caixa_saida_eta,
                ss_caixa_saida_eta,
                observacao_caixa_saida_eta,
                ph_caixa_saida_final,
                ss_caixa_saida_final,
                observacao_caixa_saida_final,
                eta_id: eta.id,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            // const { data } = response;

            setSnackbar(true);
            refresh();
            navigation.navigate('PolimentoEtaList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }

    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            const response = await api.get(`etas?localId=${local.id}`);
            const { data } = response;
            setEtas(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setEtas([]);
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
                    <Text>Eta:</Text>
                    <CustomPicker
                        options={etas}
                        value={eta}
                        placeholder="Selecione uma ETA"
                        getLabel={(item) => item.nome}
                        onValueChange={(value) => {
                            setEta(value);
                        }}
                    />
                </View>
                <HelperText type="error" visible={true}>
                    {error?.eta}
                </HelperText>

                <TextInput
                    label="Vazão:"
                    value={vazao}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setVazao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.vazao}
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
                    label="PAC:"
                    value={pac}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPac(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.pac}
                </HelperText>

                <TextInput
                    label="% Polímero:"
                    value={polimero}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPolimero(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.polimero}
                </HelperText>

                <TextInput
                    label="% Hipoclorito:"
                    value={hipoclorito}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setHipoclorito(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.hipoclorito}
                </HelperText>

                <TextInput
                    label="Observações:"
                    value={observacao}
                    onChangeText={(text) => setObservacao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao}
                </HelperText>

                <Text>Caixa de saída ETA</Text>

                <TextInput
                    label="pH:"
                    value={ph_caixa_saida_eta}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPh_caixa_saida_eta(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.ph_caixa_saida_eta}
                </HelperText>

                <TextInput
                    label="SS:"
                    value={ss_caixa_saida_eta}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setSs_caixa_saida_eta(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.ss_caixa_saida_eta}
                </HelperText>

                <TextInput
                    label="Observações:"
                    value={observacao_caixa_saida_eta}
                    onChangeText={(text) => setObservacao_caixa_saida_eta(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao_caixa_saida_eta}
                </HelperText>

                <Text>Caixa de saída Final</Text>

                <TextInput
                    label="pH:"
                    value={ph_caixa_saida_final}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPh_caixa_saida_final(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.ph_caixa_saida_final}
                </HelperText>

                <TextInput
                    label="SS:"
                    value={ss_caixa_saida_final}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setSs_caixa_saida_final(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.ss_caixa_saida_final}
                </HelperText>

                <TextInput
                    label="Observações:"
                    value={observacao_caixa_saida_final}
                    onChangeText={(text) =>
                        setObservacao_caixa_saida_final(text)
                    }
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao_caixa_saida_final}
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
