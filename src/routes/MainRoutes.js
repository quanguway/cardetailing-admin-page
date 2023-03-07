import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// page routing
const AddressPage = Loadable(lazy(() => import('views/admin/address')));
const ProductCategoryPage = Loadable(lazy(() => import('views/admin/productCategory')));
const StaffPage = Loadable(lazy(() => import('views/admin/staff')));
const StaffForm = Loadable(lazy(() => import('views/admin/staff/form')));

const ProductPage = Loadable(lazy(() => import('views/admin/product')));
const ProductCreate = Loadable(lazy(() => import('views/admin/product/create')));
const ProductUpdate = Loadable(lazy(() => import('views/admin/product/update')));

const PromotionPage = Loadable(lazy(() => import('views/admin/promotion')));
const PromotionCreate = Loadable(lazy(() => import('views/admin/promotion/create')));
const PromotionUpdate = Loadable(lazy(() => import('views/admin/promotion/update')));

const UnitPage = Loadable(lazy(() => import('views/admin/unit')));
const UnitCreate = Loadable(lazy(() => import('views/admin/unit/create')));
const UnitUpdate = Loadable(lazy(() => import('views/admin/unit/update')));

const PriceCreate = Loadable(lazy(() => import('views/admin/price/create')));
const PriceUpdate = Loadable(lazy(() => import('views/admin/price/update')));
const PricePage = Loadable(lazy(() => import('views/admin/price')));

const BookingForm = Loadable(lazy(() => import('views/admin/booking/form')));
const BookingPage = Loadable(lazy(() => import('views/admin/booking')));

const OrderCreate = Loadable(lazy(() => import('views/admin/order/create')));
const OrderPage = Loadable(lazy(() => import('views/admin/order')));


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
            path: '/product/create',   
            element: <ProductCreate />
        },
        {
            path: '/product/update',   
            element: <ProductUpdate />
        },
        // ------------ unit --------------
        {
            path: 'unit',   
            element: <UnitPage />
        },
        {
            path: '/unit/create',   
            element: <UnitCreate />
        },
        {
            path: '/unit/update',   
            element: <UnitUpdate />
        },
        
        // ---------- price -------------

        {
            path: '/price/create',   
            element: <PriceCreate />
        },
        {
            path: '/price/update',   
            element: <PriceUpdate />
        },
        {
            path: '/price',   
            element: <PricePage />
        },

        // ------------ order ----------------

        {
            path: '/order/create',   
            element: <OrderCreate />
        },
        {
            path: '/order',   
            element: <OrderPage />
        },


        {
            path: '/promotion/create',   
            element: <PromotionCreate />
        },
        {
            path: '/promotion/update',   
            element: <PromotionUpdate />
        },
        {
            path: '/promotion',   
            element: <PromotionPage />
        },

        // {
        //     path: '/booking/create',   
        //     element: <BookingCreate />
        // },
        // {
        //     path: '/booking/update',   
        //     element: <BookingUpdate />
        // },
        {
            path: '/booking',   
            element: <BookingPage />
        },
    ]
};

export default MainRoutes;
