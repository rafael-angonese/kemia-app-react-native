import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Keyboard,
    Picker,
} from 'react-native';
import { TextInput, Snackbar, Button, HelperText, Checkbox } from 'react-native-paper';
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

    const [data, setData] = useState(Date.now());
    const [atividade, setAtividade] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    const [atividades, setAtividades] = useState([
        {
            id: 'CONTROLE-COLETA',
            nome: 'Controle de Coleta',
        },
        {
            id: 'CONTROLE-OD',
            nome: 'Controle de OD',
        },
        {
            id: 'CONTROLE-SS',
            nome: 'Controle de SS',
        },
        {
            id: 'CONTROLE-PH',
            nome: 'Controle de pH',
        },
        {
            id: 'CONTROLE-VAZAO',
            nome: 'Controle de Vazão',
        },
        {
            id: 'CONTROLE-TANQUE',
            nome: 'Controle de Tanque',
        },
        {
            id: 'CONTROLE-BOMBA',
            nome: 'Controle de Rotação da Bomba',
        },
        {
            id: 'CONTROLE-CONCENTRACAO-CLORO',
            nome: 'Controle de Concentração de Cloro',
        },
        {
            id: 'CONTROLE-PASTILHA-CLORO',
            nome: 'Controle de Pastilha de Cloro',
        },
        {
            id: 'POLIMENTO-ETA',
            nome: 'Polimento com ETA',
        },
        {
            id: 'TRATAMENTO-EFLUENTE-LAGOA',
            nome: 'Tratamento de Efluente com Lagoa',
        },
    ]);

    const [intervalos, setIntervalos] = useState([
        {
            id: '1',
            nome: 'Todos os dias',
        },
        {
            id: '2',
            nome: 'Uma vez por semana',
        },
        {
            id: '3',
            nome: 'Uma vez por mês',
        },
    ]);

    const [intervalo, setIntervalo] = useState('1');
    const [replicar, setReplicar] = useState(false);
    const [ate, setAte] = useState(Date.now());
    const [show_ate, setShow_ate] = useState(false);

    const [show_data, setShow_data] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [error, setError] = useState({});

    async function salvar() {
        const schema = Yup.object().shape({
            data: Yup.string().min(1).required('Bruto é obrigatório'),
            user: Yup.string().min(1).required('Operador é obrigatório'),
            atividade: Yup.string().min(1).required('Atividade é obrigatório'),
        });

        const validation = await yupValidator(schema, {
            data,
            user,
            atividade,
        });

        setError(validation);

        if (Object.keys(validation).length !== 0) return;

        setLoading(true);
        try {
            const response = await api.post('/tarefas', {
                data: formatDate(data, 'yyyy-MM-dd'),
                atividade: atividade.id,
                replicar: replicar,
                intervalo: intervalo,
                ate: formatDate(ate, 'yyyy-MM-dd'),
                user_id: user.id,
                empresa_id: empresa.id,
                local_id: local.id,
            });
            setLoading(false);
            // const { data } = response;

            setData(Date.now());
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
            const response = await api.get(
                `operadores_by_local?empresaId=${empresa.id}&localId=${local.id}`
            );
            const { data } = response;
            setUsers(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setUsers([]);
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
                </View>

                <View>
                    <Text>Operador:</Text>
                    <CustomPicker
                        options={users}
                        value={user}
                        placeholder="Selecione um operador"
                        getLabel={(item) => item.nome}
                        onValueChange={(value) => {
                            setUser(value);
                        }}
                    />
                </View>
                <HelperText type="error" visible={true}>
                    {error?.user}
                </HelperText>

                <View>
                    <Text>Atividade:</Text>
                    <CustomPicker
                        options={atividades}
                        value={atividade}
                        placeholder="Selecione uma atividade"
                        getLabel={(item) => item.nome}
                        onValueChange={(value) => {
                            setAtividade(value);
                        }}
                    />
                </View>
                <HelperText type="error" visible={true}>
                    {error?.atividade}
                </HelperText>

                <TextInput label="Local:" disabled value={local.nome} />

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text>Replicar? </Text>
                    <Checkbox
                        status={replicar ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setReplicar(!replicar);
                        }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ marginLeft: 5, marginTop: 20 }}>
                        Intervalo:
                    </Text>
                    <Picker
                        selectedValue={intervalo}
                        enabled={replicar}
                        style={{
                            height: 70,
                            width: '70%',
                            alignItems: 'center',
                        }}
                        onValueChange={async (item) => {
                            setIntervalo(item);
                        }}
                    >
                        {intervalos.map((item, index) => (
                            <Picker.Item
                                key={item.id}
                                label={item.nome}
                                value={item.id}
                            />
                        ))}
                    </Picker>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ marginLeft: 5, marginTop: 20 }}>
                        Até o dia:
                    </Text>
                    <Button
                        disabled={!replicar}
                        icon="calendar"
                        onPress={() => setShow_ate(true)}
                    >
                        {formatDate(ate)}
                    </Button>
                </View>

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

                {show_ate && (
                    <DateTimePicker
                        value={ate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            setShow_ate(false);
                            if (typeof date !== 'undefined') {
                                setAte(date);
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
