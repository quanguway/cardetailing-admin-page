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
        }
    ]
};

export default pages;
