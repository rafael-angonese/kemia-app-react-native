import React from 'react';

import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
    const { user } = useAuth();

    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
