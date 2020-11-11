import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import Storage from '../providers/Storage';

const AuthConxtex = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [local, setLocal] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await Storage.getItem(Storage.userKey);
            const storagedToken = await Storage.getItem(Storage.tokenKey);
            const storagedEmpressa = await Storage.getItem(Storage.empresaKey);
            const storagedLocal = await Storage.getItem(Storage.localKey);

            if (storagedUser && storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
            }
            setUser(storagedUser);
            setEmpresa(storagedEmpressa);
            setLocal(storagedLocal);
        }

        loadStoragedData();
    }, []);

    async function setAuthToken(token, refreshToken) {
        await Storage.setItem(Storage.tokenKey, token);
        await Storage.setItem(Storage.refreshTokenKey, refreshToken);
        setToken(token)
    }

    async function setAuthUser(user) {
        await Storage.setItem(Storage.userKey, user);
        setUser(user);
    }

    async function setAuthEmpresa(empresa) {
        await Storage.setItem(Storage.empresaKey, empresa);
        setEmpresa(empresa);
    }

    async function setAuthLocal(local) {
        await Storage.setItem(Storage.localKey, local);
        setLocal(local);
    }

    async function logout() {
        await Storage.removeItem(Storage.userKey);
        await Storage.removeItem(Storage.empresaKey);
        await Storage.removeItem(Storage.localKey);
        await Storage.removeItem(Storage.tokenKey);

        setUser(null);
        setEmpresa(null);
        setLocal(null);
    }

    return (
        <AuthConxtex.Provider
            value={{
                user,
                setUser,
                setAuthUser,
                token,
                setAuthToken,
                empresa,
                setAuthEmpresa,
                local,
                setAuthLocal,
                logout,
            }}
        >
            {children}
        </AuthConxtex.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthConxtex);

    return context;
}
