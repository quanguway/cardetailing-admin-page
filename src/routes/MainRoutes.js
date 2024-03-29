import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';
// import CustomerPage from 'views/admin/customer';
import CustomerUpdate from 'views/admin/customer/update';

// dashboard routing
const DashboardDefault = Loadable(
    lazy(() => import('views/dashboard/Default'))
);

// page routing
const AddressPage = Loadable(lazy(() => import('views/admin/address')));
const ProductCategoryPage = Loadable(
    lazy(() => import('views/admin/productCategory'))
);
const StaffPage = Loadable(lazy(() => import('views/admin/staff')));
const StaffForm = Loadable(lazy(() => import('views/admin/staff/form')));

const ProductPage = Loadable(lazy(() => import('views/admin/product')));
const ProductCreate = Loadable(
    lazy(() => import('views/admin/product/create'))
);
const ProductUpdate = Loadable(
    lazy(() => import('views/admin/product/update'))
);

const PromotionPage = Loadable(lazy(() => import('views/admin/promotion')));
const PromotionCreate = Loadable(
    lazy(() => import('views/admin/promotion/create'))
);
const PromotionUpdate = Loadable(
    lazy(() => import('views/admin/promotion/update'))
);

const UnitPage = Loadable(lazy(() => import('views/admin/unit')));
const UnitCreate = Loadable(lazy(() => import('views/admin/unit/create')));
const UnitUpdate = Loadable(lazy(() => import('views/admin/unit/update')));

const CarInfoPage = Loadable(lazy(() => import('views/admin/carInfo')));
const CarInfoCreate = Loadable(
    lazy(() => import('views/admin/carInfo/create'))
);
const CarInfoUpdate = Loadable(
    lazy(() => import('views/admin/carInfo/update'))
);

const PriceCreate = Loadable(lazy(() => import('views/admin/price/create')));
const PriceUpdate = Loadable(lazy(() => import('views/admin/price/update')));
const PricePage = Loadable(lazy(() => import('views/admin/price')));

const BookingForm = Loadable(lazy(() => import('views/admin/booking/form')));
const BookingPage = Loadable(lazy(() => import('views/admin/booking')));

const HomePage = Loadable(lazy(() => import('views/home')));

const BookingHandle = Loadable(
    lazy(() => import('views/admin/booking/handleBooking'))
);
const BookingDetail = Loadable(
    lazy(() => import('views/admin/booking/detail'))
);

const OrderCreate = Loadable(lazy(() => import('views/admin/order/create')));
const OrderPage = Loadable(lazy(() => import('views/admin/order')));
const OrderDetail = Loadable(lazy(() => import('views/admin/order/detail')));

const CustomerPage = Loadable(lazy(() => import('views/admin/customer')));
const CustomerCreate = Loadable(lazy(() => import('views/admin/customer/create')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '',
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
            element: <StaffPage />
        },
        {
            path: 'staff/form',
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
            path: 'product/create',
            element: <ProductCreate />
        },
        {
            path: 'product/update',
            element: <ProductUpdate />
        },
        // ------------ unit --------------
        {
            path: 'unit',
            element: <UnitPage />
        },
        {
            path: 'unit/create',
            element: <UnitCreate />
        },
        {
            path: 'unit/update',
            element: <UnitUpdate />
        },

        // ---------- price -------------

        {
            path: 'price/create',
            element: <PriceCreate />
        },
        {
            path: 'price/update',
            element: <PriceUpdate />
        },
        {
            path: 'price',
            element: <PricePage />
        },

        // ------------ order ----------------

        {
            path: 'order/create',
            element: <OrderCreate />
        },
        {
            path: 'order',
            element: <OrderPage />
        },
        {
            path: 'order/detail',
            element: <OrderDetail />
        },

        //  -------------- promotion -------------------

        {
            path: 'promotion/create',
            element: <PromotionCreate />
        },
        {
            path: 'promotion/update',
            element: <PromotionUpdate />
        },
        {
            path: 'promotion',
            element: <PromotionPage />
        },

        // ------------------- carInfo ---------------------

        {
            path: 'car-info/create',
            element: <CarInfoCreate />
        },
        {
            path: 'car-info/update',
            element: <CarInfoUpdate />
        },
        {
            path: 'car-info',
            element: <CarInfoPage />
        },

        // {
        //     path: 'booking/create',
        //     element: <BookingCreate />
        // },
        // {
        //     path: 'booking/update',
        //     element: <BookingUpdate />
        // },

        {
            path: 'booking/detail',
            element: <BookingDetail />
        },
        {
            path: 'booking',
            element: <BookingPage />
        },
        {
            path: 'booking/handle',
            element: <BookingHandle />
        },
        {
            path: 'customer/update',
            element: <CustomerUpdate />
        },
        {
            path: 'customer',
            element: <CustomerPage />
        },
        {
            path: 'customer/create',
            element: <CustomerCreate />
        }
    ]
};

export default MainRoutes;
