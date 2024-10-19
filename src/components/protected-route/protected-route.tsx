import React from 'react';
//import {useSelector} from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
//import {RootState} from '../../store';

export const ProtectedRoute = ({ accessRoles }: any) => <Outlet />;
//const { user, isInit, isLoading } = useSelector((store: RootState) => store.user);

// if (!isInit || isLoading) {
//     return <div>Загрузка...</div>
// }

// if (!user || !accessRoles.includes(user.role)) {
//     return <Navigate to="/sign-in" />;
// }
