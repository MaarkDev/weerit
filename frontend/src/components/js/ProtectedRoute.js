import AuthContext from '../../context/AuthContext';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        user ? <Outlet /> : <Navigate to='/' />
    );
};

export default ProtectedRoutes;