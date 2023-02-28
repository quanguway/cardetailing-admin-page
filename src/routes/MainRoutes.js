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
const ProductCategoryPage = Loadable(lazy(() => import('views/admin/productCategory')));
const StaffPage = Loadable(lazy(() => import('views/admin/staff')));
const StaffForm = Loadable(lazy(() => import('views/admin/staff/form')));

const ProductPage = Loadable(lazy(() => import('views/admin/product')));
const ProductForm = Loadable(lazy(() => import('views/admin/product/form')));

const UnitPage = Loadable(lazy(() => import('views/admin/unit')));
const UnitForm = Loadable(lazy(() => import('views/admin/unit/form')));

const PromotionPage = Loadable(lazy(() => import('views/admin/promotion')));


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
        {
            path: 'product-category',   
            element: <ProductCategoryPage />
        },
        {
            path: 'product',   
            element: <ProductPage />
        },
        {
            path: '/product/form',   
            element: <ProductForm />
        },
        {
            path: 'unit',   
            element: <UnitPage />
        },
        {
            path: '/unit/form',   
            element: <UnitForm />
        },
        {
            path: '/promotion',   
            element: <PromotionPage />
        },
        
    ]
};

export default MainRoutes;
