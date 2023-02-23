import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utils/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utils/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utils/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utils/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utils/TablerIcons')));

// page routing
const AddressPage = Loadable(lazy(() => import('views/admin/address')));
const StaffPage = Loadable(lazy(() => import('views/admin/staff')));
const StaffForm = Loadable(lazy(() => import('views/admin/staff/form')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'address',   
            element: <AddressPage />
        },
        {
            path: 'staff',
            element: <StaffPage />,
        },
        {
            path: '/staff/form',   
            element: <StaffForm />
        },
     
        
    ]
};

export default MainRoutes;
