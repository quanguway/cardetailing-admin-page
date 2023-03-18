import { Box, Button } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
import { renderGender, renderYesNo, YesNoToBool } from 'utils/dataToView';
import axios from 'axios';
import FormTableLayout from 'layout/FormLayout/FormTableLayout';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPencil, IconTrash } from '@tabler/icons';
import FormToggle from 'component/DrawerToggle/FormToggle';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { dateSQL } from 'utils/variable';

const ProductCreate = () => {
    const navigate = useNavigate();
    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);
    const [listUnit, setListUnit] = useState([]);

    const [productCode, setProductCode] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [time, setTime] = useState();
    // const [status, setTime] = useState('0')
    const [note, setNote] = useState();
    const [category, setCategory] = useState();

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_CATEGORY.GET_ALL).then((value) => {
            setCategory([value.data[0]]);
        });
    }, []);

    const handleToggle = () => {
        setOPenForm(!openForm);
    };

    const handleSubmit = async () => {
        var params = {
            item: {
                product_code: '123',
                type: category[1].title.toUpperCase(),
                title: title,
                description: description,
                time: time,
                note: note,
                category_id: category[2].id
            }
        };

        await axios.post(apiConfig.PRODUCT_API.CREATE, params).then(() => {
            navigate('/product');
        });
    };

    const fields = [
        // {
        //     label: 'Product Code',
        //     useState: [productCode, setProductCode]
        // },
        {
            label: 'Tên dịch vụ',
            useState: [title, setTitle]
        },
        {
            label: 'Mô tả',
            useState: [description, setDescription],
            type: 'textarea'
        },
        {
            label: 'Chú thích',
            useState: [note, setNote],
            type: 'textarea'
        },
        {
            label: 'Thời gian dự kiến',
            useState: [time, setTime]
        },
        {
            label: 'Loại dịch vụ',
            useState: [category, setCategory],
            type: 'tree-simple',
            lengthItem: 2,
            labels: ['Sản phẩm & Dịch vụ', 'Loại']
        }
    ];

   // console.log(category);
    return (
        <Box>
            <FormSimpleLayout
                fields={fields}
                handleSubmit={handleSubmit}
                nameForm="Thêm dịch vụ"
            />
        </Box>
    );
};

export default ProductCreate;
