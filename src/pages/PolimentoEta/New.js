import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
    Image,
} from 'react-native';
import { TextInput, Snackbar, Button, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomPicker } from 'react-native-custom-picker';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';

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
    const [etas, setEtas] = useState([]);

    const [data, setData] = useState(Date.now());
    const [eta, setEta] = useState(null);
    const [vazao, setVazao] = useState('');
    const [ph, setPh] = useState('');
    const [pac, setPac] = useState('');
    const [polimero, setPolimero] = useState('');
    const [hipoclorito, setHipoclorito] = useState('');
    const [observacao, setObservacao] = useState('');

    const [ph_caixa_saida_eta, setPh_caixa_saida_eta] = useState('');
    const [ss_caixa_saida_eta, setSs_caixa_saida_eta] = useState('');
    const [
        observacao_caixa_saida_eta,
        setObservacao_caixa_saida_eta,
    ] = useState('');
    const [ph_caixa_saida_final, setPh_caixa_saida_final] = useState('');
    const [ss_caixa_saida_final, setSs_caixa_saida_final] = useState('');
    const [
        observacao_caixa_saida_final,
        setObservacao_caixa_saida_final,
    ] = useState('');

    const [images, setImages] = useState([]);

    const [show_data, setShow_data] = useState(false);

    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            eta: Yup.string().min(1).required('Eta ?? obrigat??rio'),
        });

        const validation = await yupValidator(schema, {
            eta,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const body = {
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
            };
            let dados = new FormData();

            images.forEach((image, index) => {
                dados.append(`image[${index}]`, {
                    uri: image.path,
                    type: 'image/jpeg',
                    name: 'image' + index + '.jpg',
                });
            });

            Object.keys(body).forEach((key) => {
                dados.append(key, body[key]);
            });

            const response = await api.post('/polimento-etas', dados);

            setLoading(false);
            // const { data } = response;

            setData(Date.now());
            setVazao('');
            setPh('');
            setPac('');
            setPolimero('');
            setHipoclorito('');
            setObservacao('');
            setPh_caixa_saida_eta('');
            setSs_caixa_saida_eta('');
            setObservacao_caixa_saida_eta('');
            setPh_caixa_saida_final('');
            setSs_caixa_saida_final('');
            setObservacao_caixa_saida_final('');
            setImages([]);
            setEta(null);

            setSnackbar(true);
            refresh();
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    async function selectImage() {
        ImagePicker.openPicker({
            multiple: true,
            cropping: true,
        }).then((images) => {
            setImages(images);
        });
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

                {eta?.is_vazao && (
                    <TextInput
                        label="Vaz??o:"
                        value={vazao}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setVazao(text)}
                    />
                )}
                {eta?.is_vazao && (
                    <HelperText type="error" visible={true}>
                        {error?.vazao}
                    </HelperText>
                )}

                {eta?.is_ph && (
                    <TextInput
                        label="pH:"
                        value={ph}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setPh(text)}
                    />
                )}
                {eta?.is_ph && (
                    <HelperText type="error" visible={true}>
                        {error?.ph}
                    </HelperText>
                )}

                {eta?.is_pac && (
                    <TextInput
                        label="PAC:"
                        value={pac}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setPac(text)}
                    />
                )}
                {eta?.is_pac && (
                    <HelperText type="error" visible={true}>
                        {error?.pac}
                    </HelperText>
                )}

                {eta?.is_polimero && (
                    <TextInput
                        label="% Pol??mero:"
                        value={polimero}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setPolimero(text)}
                    />
                )}
                {eta?.is_polimero && (
                    <HelperText type="error" visible={true}>
                        {error?.polimero}
                    </HelperText>
                )}

                {eta?.is_hipoclorito && (
                    <TextInput
                        label="% Hipoclorito:"
                        value={hipoclorito}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setHipoclorito(text)}
                    />
                )}
                {eta?.is_hipoclorito && (
                    <HelperText type="error" visible={true}>
                        {error?.hipoclorito}
                    </HelperText>
                )}
                {eta?.is_obervacao && (
                    <TextInput
                        label="Observa????es:"
                        value={observacao}
                        onChangeText={(text) => setObservacao(text)}
                    />
                )}
                {eta?.is_observacao && (
                    <HelperText type="error" visible={true}>
                        {error?.observacao}
                    </HelperText>
                )}

                <Text>Caixa de sa??da ETA</Text>

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
                    label="Observa????es:"
                    value={observacao_caixa_saida_eta}
                    onChangeText={(text) => setObservacao_caixa_saida_eta(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao_caixa_saida_eta}
                </HelperText>

                <Text>Caixa de sa??da Final</Text>

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
                    label="Observa????es:"
                    value={observacao_caixa_saida_final}
                    onChangeText={(text) =>
                        setObservacao_caixa_saida_final(text)
                    }
                />
                <HelperText type="error" visible={true}>
                    {error?.observacao_caixa_saida_final}
                </HelperText>

                <Button
                    icon="image"
                    style={{ marginTop: 5, marginBottom: 20 }}
                    onPress={() => {
                        selectImage();
                    }}
                >
                    Efluentes
                </Button>

                {images.length > 0 &&
                    images.map((image) => {
                        return (
                            <Image
                                key={image.path}
                                source={{ uri: image.path }}
                                style={{
                                    width: '100%',
                                    height: 200,
                                    marginTop: 20,
                                    resizeMode: 'contain',
                                }}
                            ></Image>
                        );
                    })}

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
