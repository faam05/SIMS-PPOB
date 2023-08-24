import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './routes/routes';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Navigate to={'/login'} />} />
            <Route
                path='/login'
                element={
                    <PublicRoutes>
                        <Login />
                    </PublicRoutes>
                }
            />
            <Route
                path='/registration'
                element={
                    <PublicRoutes>
                        <Register />
                    </PublicRoutes>
                }
            />
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
