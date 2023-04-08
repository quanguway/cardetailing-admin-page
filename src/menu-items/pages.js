// assets
import { IconUser, IconBuildingStore, IconArchive   } from '@tabler/icons';
import { roles } from 'utils/auth';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MenuIcon from '@mui/icons-material/Menu';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'catalog',
    title: 'Danh mục',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'sale',
            title: 'Bán hàng',
            type: 'collapse',
            icon: IconBuildingStore,
            children: [
                {
                    id: 'booking',
                    title: 'Xếp lịch & chỗ',
                    type: 'item',
                    url: '/booking',
                    roles: [roles.ROLE_ADMIN, roles.ROLE_CUSTOMER],
                    target: true
                },
                {
                    id: 'order',
                    title: 'Hóa đơn',
                    type: 'item',
                    url: '/order',
                    roles: [roles.ROLE_ADMIN, roles.ROLE_CUSTOMER],
                    target: true
                },
                
            ]
        },
        {
            id: 'user',
            title: 'Người dùng',
            type: 'collapse',
            icon: IconUser,
            children: [
                // {
                //     id: 'address',
                //     title: 'Địa chỉ',
                //     type: 'item',
                //     url: '/address',
                //     roles: [roles.ROLE_ADMIN],
                //     target: true
                // },
                {
                    id: 'staff',
                    title: 'Nhân viên',
                    type: 'item',
                    url: '/staff',
                    roles: [roles.ROLE_ADMIN],
                    target: true
                },
                {
                    id: 'customer',
                    title: 'Khách hàng',
                    type: 'item',
                    url: '/customer',
                    roles: [roles.ROLE_ADMIN],
                    target: true
                },

            ]
        },
        {
            id: 'promotion',
            title: 'Khuyến mãi',
            type: 'item',
            url: '/promotion',
            icon: CardGiftcardIcon,
            roles: [roles.ROLE_ADMIN],
            target: true
        },
        {
            id: 'product',
            title: 'Dịch vụ',
            type: 'collapse',
            icon: IconArchive ,
            children: [

                {
                    id: 'products',
                    title: 'Dịch vụ',
                    type: 'item',
                    url: '/product',
                    roles: [roles.ROLE_ADMIN],
                    target: true
                },
                // {
                //     id: 'unit',
                //     title: 'Đơn vị',
                //     type: 'item',
                //     url: '/unit',
                //     roles: [roles.ROLE_ADMIN],
                //     target: true
                // },

                {
                    id: 'price',
                    title: 'Bảng giá',
                    type: 'item',
                    url: '/price',
                    roles: [roles.ROLE_ADMIN],
                    target: true
                },
            ]
        }, 
        {
            id: 'catalog',
            title: 'Thông tin chung',
            type: 'collapse',
            icon: MenuIcon,
            children: [
                {
                    id: 'carInfo',
                    title: 'Thông tin xe',
                    type: 'item',
                    url: '/car-info',
                    roles: [roles.ROLE_ADMIN, roles.ROLE_CUSTOMER],
                    target: true
                },
                {
                    id: 'category',
                    title: 'Loại dịch vụ',
                    type: 'item',
                    url: '/product-category',
                    roles: [roles.ROLE_ADMIN],
                    target: true
                },
            ]
        },
    ]
};

export default pages;
