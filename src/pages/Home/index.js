import React from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import Admin from './Admin'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Home = () => {
    const navigation = useNavigation();
    const { user, empresa, local } = useAuth();

    return (
        <View>
            <ScrollView>
                <Text>Nome: {user?.nome}</Text>
                <Text>Tipo: {user?.tipo}</Text>
                {/* <Text>Empresa: {user.empresa_id}</Text> */}
                <Text>Empresa: {empresa?.nome}</Text>
                <Text>Local: {local?.nome}</Text>
                <Button
                    title="Entrar"
                    onPress={() => navigation.navigate('SelectEmpresa')}
                />
                {(user?.tipo === 'master' || user?.tipo === 'admin') && <Admin />}


            </ScrollView>
        </View>
    );
};

export default Home;
