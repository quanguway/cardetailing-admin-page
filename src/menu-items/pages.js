// assets
import { IconUser, IconBuildingStore, IconArchive   } from '@tabler/icons';

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
                    target: true
                },
                {
                    id: 'order',
                    title: 'Hóa đơn',
                    type: 'item',
                    url: '/order',
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
                {
                    id: 'address',
                    title: 'Địa chỉ',
                    type: 'item',
                    url: '/address',
                    target: true
                },
                {
                    id: 'staff',
                    title: 'Nhân viên',
                    type: 'item',
                    url: '/staff',
                    target: true
                },
            ]
        },
        {
            id: 'product',
            title: 'Dịch vụ',
            type: 'collapse',
            icon: IconArchive ,
            children: [
                {
                    id: 'category',
                    title: 'Loại dịch vụ',
                    type: 'item',
                    url: '/product-category',
                    target: true
                },
                {
                    id: 'products',
                    title: 'Dịch vụ',
                    type: 'item',
                    url: '/product',
                    target: true
                },
                {
                    id: 'unit',
                    title: 'Đơn vị',
                    type: 'item',
                    url: '/unit',
                    target: true
                },
                {
                    id: 'promotion',
                    title: 'Khuyến mãi',
                    type: 'item',
                    url: '/promotion',
                    target: true
                },
                {
                    id: 'price',
                    title: 'Bảng giá',
                    type: 'item',
                    url: '/price',
                    target: true
                },
            ]
        }, 
    ]
};

export default pages;
