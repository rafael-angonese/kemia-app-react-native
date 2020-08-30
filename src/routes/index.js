import React from 'react';
import { useSelector } from 'react-redux';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
    const { signed } = useSelector((state) => state.auth);
    // const { signed, loading } = useSelector((state) => state.auth);
    // const signed = false
    // const loading = false

    // if(loading) {
    //     return (
    //         <View style={styles.container}>
    //             <ActivityIndicator size="large" color="#666" />
    //         </View>
    //     )
    // }

    return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
