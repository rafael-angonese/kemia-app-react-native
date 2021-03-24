import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { FAB, DataTable, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../contexts/auth';
import handlingErros from '../../utils/handlingErros';
import formatDate from '../../utils/formatDate';
import toQueryString from '../../utils/toQueryString';
import api from '../../services/api';
import styles from '../Styles/styles';

const List = () => {
    const { empresa, local, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [concentracaoCloro, setConcentracaoCloro] = useState([]);
    const [error, setError] = useState('');

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const navigation = useNavigation();

    const [tipo, setTipo] = useState(null);
    const [email, setEmail] = useState('');
    const [emailErro, setEmailErro] = useState('');
    const [visible, setVisible] = useState(false);
    const showModal = (tipo) => {
        setTipo(tipo);
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    function validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let resultado = re.test(email);

        if (resultado === false) {
            setEmailErro('Digite um e-mail válido');
        }
        if (resultado === true) {
            setEmailErro('');
            hideModal();
            sendEmail();
        }
    }

    async function sendEmail() {
        try {
            setLoading(true);
            let query = {
                localId: local.id,
                startDate: formatDate(startDate, 'yyyy-MM-dd'),
                endDate: formatDate(endDate, 'yyyy-MM-dd'),
                email: email,
                tipo: tipo,
            };
            const params = toQueryString(query);
            const response = await api.get(
                `/controle-concentracao-cloros/sendEmail${params}`
            );
            setError({});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    async function myAsyncEffect() {
        setLoading(true);
        try {
            let query = {
                localId: local.id,
                startDate: formatDate(startDate, 'yyyy-MM-dd'),
                endDate: formatDate(endDate, 'yyyy-MM-dd'),
            };
            const params = toQueryString(query);
            const response = await api.get(
                `/controle-concentracao-cloros${params}`
            );
            const { data } = response;
            setConcentracaoCloro(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setConcentracaoCloro([]);
            const validation = handlingErros(error);
            setError(validation);
        }
    }

    useEffect(() => {
        myAsyncEffect();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator
                style={
                    loading === true ? { display: 'flex' } : { display: 'none' }
                }
                size="large"
                color="#0000ff"
            />
            {error.length !== 0 && (
                <Text style={styles.error}>{error?.error}</Text>
            )}

            <View style={styles.container_data}>
                <Button icon="calendar" onPress={() => setShowStartDate(true)}>
                    {formatDate(startDate)}
                </Button>
                <Text>Até</Text>
                <Button icon="calendar" onPress={() => setShowEndDate(true)}>
                    {formatDate(endDate)}
                </Button>

                <Button
                    icon="filter"
                    mode="contained"
                    onPress={() => myAsyncEffect()}
                >
                    Filtrar
                </Button>
            </View>

            <ScrollView>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ width: 500, height: '100%' }}
                >
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Data</DataTable.Title>
                            <DataTable.Title>Hora</DataTable.Title>
                            <DataTable.Title>Tratado</DataTable.Title>
                            <DataTable.Title>Ação Corretiva</DataTable.Title>
                        </DataTable.Header>
                        {concentracaoCloro.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    navigation.navigate(
                                        'ConcentracaoCloroShow',
                                        {
                                            item: item,
                                            refresh: myAsyncEffect.bind(this),
                                        }
                                    );
                                }}
                            >
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        {formatDate(item.data)}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {item.hora.slice(0, -3)}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {item.tratado}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {item.acao_corretiva}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        ))}
                    </DataTable>
                </ScrollView>
                {concentracaoCloro.length == 0 && (
                    <Text style={styles.empty}>Desculpa, não há dados!</Text>
                )}

                {(user?.tipo === 'master' || user?.tipo === 'admin') &&
                    concentracaoCloro.length > 0 && (
                        <View style={styles.container_button}>
                            <Button
                                style={{ borderRadius: 50, marginTop: 10 }}
                                icon="email"
                                mode="contained"
                                onPress={() => showModal('xlsx')}
                            >
                                XLSX
                            </Button>
                            <Button
                                style={{ borderRadius: 50, marginTop: 10 }}
                                icon="email"
                                mode="contained"
                                onPress={() => showModal('pdf')}
                            >
                                PDF
                            </Button>
                        </View>
                    )}
            </ScrollView>

            <Modal
                visible={visible}
                animationType={'slide'}
                transparent={false}
                onRequestClose={() => hideModal()}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <Text>Enviar E-mail para</Text>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder="E-mail"
                            value={email}
                            autoCorrect={false}
                            placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                        />
                        {emailErro.length !== 0 && (
                            <Text style={styles.error}>{emailErro}</Text>
                        )}
                        <View style={styles.container_row}>
                            <Button
                                style={styles.button_radius}
                                icon="cancel"
                                mode="contained"
                                onPress={() => hideModal()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                style={styles.button_radius}
                                color="green"
                                icon="email"
                                mode="contained"
                                onPress={() => validateEmail()}
                            >
                                Enviar
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <FAB
                label="novo"
                style={styles.fab}
                icon="plus"
                onPress={() =>
                    navigation.navigate('ConcentracaoCloroNew', {
                        refresh: myAsyncEffect.bind(this),
                    })
                }
            />

            {showStartDate && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        setShowStartDate(false);
                        if (typeof date !== 'undefined') {
                            setStartDate(date);
                        }
                    }}
                />
            )}

            {showEndDate && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        setShowEndDate(false);
                        if (typeof date !== 'undefined') {
                            setEndDate(date);
                        }
                    }}
                />
            )}
        </View>
    );
};

export default List;
