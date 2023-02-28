// assets
import { IconUser  } from '@tabler/icons';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'catalog',
    title: 'Catalog',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'User',
            type: 'collapse',
            icon: IconUser,
            children: [
                {
                    id: 'address',
                    title: 'Address',
                    type: 'item',
                    url: '/address',
                    target: true
                },
                {
                    id: 'staff',
                    title: 'Staff',
                    type: 'item',
                    url: '/staff',
                    target: true
                },
            ]
        },
        {
            id: 'product',
            title: 'Product',
            type: 'collapse',
            icon: IconUser,
            children: [
                {
                    id: 'category',
                    title: 'Catagory',
                    type: 'item',
                    url: '/product-category',
                    target: true
                },
                {
                    id: 'products',
                    title: 'Product',
                    type: 'item',
                    url: '/product',
                    target: true
                },
                {
                    id: 'unit',
                    title: 'Unit',
                    type: 'item',
                    url: '/unit',
                    target: true
                },
                {
                    id: 'promotion',
                    title: 'Promotion',
                    type: 'item',
                    url: '/promotion',
                    target: true
                },
            ]
        }
    ]
};

export default pages;
