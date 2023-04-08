import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const HomePage = Loadable(lazy(() => import('views/home')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const HomeRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'home',
            element: <HomePage />
        }
    ]
};

export default HomeRoutes;
