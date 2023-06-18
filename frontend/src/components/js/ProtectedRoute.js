import React, { useContext, useState } from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);
    const [isUser, setIsUser] = useState(user)

    return (
        isUser ? <Outlet /> : <Navigate to='/' />
    );
};

export default ProtectedRoutes;