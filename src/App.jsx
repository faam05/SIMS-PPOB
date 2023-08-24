import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes/routes';
import PrivateRoute from './routes/PrivateRoutes';
import PublicRoute from './routes/PublicRoutes';

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Navigate to={'/login'} />} />
            <Route element={<PublicRoute />}>
                {PublicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Route>
            <Route element={<PrivateRoute />}>
                {PrivateRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
    );
}

export default App;
