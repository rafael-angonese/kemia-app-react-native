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

import { useAuth } from '../../contexts/auth';
import yupValidator from '../../utils/yupValidator';
import handlingErros from '../../utils/handlingErros';
import api from '../../services/api';

import styles from '../Styles/styles';

const Edit = ({ route }) => {
    const { item } = route.params;
    const { refresh } = route.params;
    const navigation = useNavigation();
    const { empresa, local } = useAuth();

    const [loading, setLoading] = useState(false);

    const nomeRef = useRef();
    const descricaoRef = useRef();

    const [nome, setNome] = useState(item.nome);
    const [descricao, setDescricao] = useState(item.descricao);
    const [is_vazao, setIs_vazao] = useState(item.is_vazao);
    const [is_ph, setIs_ph] = useState(item.is_ph);
    const [is_pac, setIs_pac] = useState(item.is_pac);
    const [is_polimero, setIs_polimero] = useState(item.is_polimero);
    const [is_hipoclorito, setIs_hipoclorito] = useState(item.is_hipoclorito);
    const [is_observacao, setIs_observacao] = useState(item.is_observacao);

    const [error, setError] = useState({});
    const [snackbar, setSnackbar] = useState(false);

    async function salvar() {
        const schema = Yup.object().shape({
            nome: Yup.string().required('Nome é obrigatório'),
            descricao: Yup.string().required('Descrição é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            nome,
            descricao,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.put(`/etas/${item.id}`, {
                nome,
                descricao,
                is_vazao,
                is_ph,
                is_pac,
                is_polimero,
                is_hipoclorito,
                is_observacao,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            const { data } = response;

            setSnackbar(true);
            refresh();
            navigation.navigate('EtaList');
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <TextInput
                    label="Nome:"
                    value={nome}
                    ref={nomeRef}
                    onChangeText={(text) => setNome(text)}
                    onSubmitEditing={() => descricaoRef.current.focus()}
                />
                <HelperText type="error" visible={true}>
                    {error?.nome}
                </HelperText>

                <TextInput
                    label="Descrição:"
                    value={descricao}
                    ref={descricaoRef}
                    onSubmitEditing={() => enderecoRef.current.focus()}
                    onChangeText={(text) => setDescricao(text)}
                />
                <HelperText type="error" visible={true}>
                    {error?.descricao}
                </HelperText>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Checkbox
                        status={is_vazao ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIs_vazao(!is_vazao);
                        }}
                    />
                    <Text style={{ marginRight: 20 }}>Vazão</Text>

                    <Checkbox
                        status={is_ph ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIs_ph(!is_ph);
                        }}
                    />
                    <Text style={{ marginRight: 20 }}>pH</Text>

                    <Checkbox
                        status={is_pac ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIs_pac(!is_pac);
                        }}
                    />
                    <Text>% PAC</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Checkbox
                        status={is_polimero ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIs_polimero(!is_polimero);
                        }}
                    />
                    <Text style={{ marginRight: 20 }}>% Polímero</Text>

                    <Checkbox
                        status={is_hipoclorito ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIs_hipoclorito(!is_hipoclorito);
                        }}
                    />
                    <Text style={{ marginRight: 20 }}>% Hipoclorito</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Checkbox
                        status={is_observacao ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIs_observacao(!is_observacao);
                        }}
                    />
                    <Text>Observações</Text>
                </View>

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
