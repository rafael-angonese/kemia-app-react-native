import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import formatDate from '../../utils/formatDate';
import styles from '../Styles/styles';

const Show = ({ route }) => {
    const { item } = route.params;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <ActivityIndicator
                style={
                    loading == true ? { display: 'flex' } : { display: 'none' }
                }
                size="large"
                color="#0000ff"
            />
            {error.length !== 0 && (
                <Text style={styles.error}>{error?.error}</Text>
            )}

            <Text style={styles.title_view}>Notificação</Text>
            <Text>Data: {formatDate(item.data)}</Text>
            <Text>Usuário: {item?.user?.nome}</Text>
            <Text>Mensagem: {item.mensagem}</Text>
        </View>
    );
};

export default Show;
