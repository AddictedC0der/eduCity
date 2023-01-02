import * as React from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { PublicRoutes, PrivateRoutes, RoutesEnum } from '../router';
import { TaskConstructor } from './constructor_lib/TaskConstructor'
import { ErrorPage } from './pages/Error';
import { TaskView } from './pages/TaskView';


export function CoreRouter() {
    const { isAuth } = useTypedSelector(state => state.user);
    const navigate = useNavigate()

    React.useEffect(() => {
        navigate(isAuth ? RoutesEnum.HOME : RoutesEnum.REGISTER)
    }, [])

    return (
        <>
        <Routes>
            {!isAuth ?
                PublicRoutes.map(route => <Route path={route.path} element={<route.element />} key={route.path} />)
                : PrivateRoutes.map(route => <Route path={route.path} element={<route.element />} key={route.path} />)}
        </Routes>
        </>
    )
}