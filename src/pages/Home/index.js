import React, { useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import Admin from './Admin';
import Operator from './Operator';

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
                <View style={styles.container}>
                    <Text>Nome: {user?.nome}</Text>
                    <Text>Empresa: {empresa?.nome}</Text>
                    <Text>Local: {local?.nome}</Text>
                    <Button
                        title="Alterar"
                        onPress={() => {
                            if (user?.tipo === 'master') {
                                navigation.navigate('SelectEmpresa');
                            } else {
                                navigation.navigate('SelectLocal');
                            }
                        }}
                    />
                </View>
                {(user?.tipo === 'master' || user?.tipo === 'admin') && (
                    <Admin />
                )}
                {user?.tipo === 'operator' && <Operator />}
            </ScrollView>
        </View>
    );
};

export default Home;
