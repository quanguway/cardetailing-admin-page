import { Box, Button, } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate  } from "react-router-dom";
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


const ProductUpdate = () => {
    const { state } = useLocation();

    const navigate = useNavigate();
    const [openForm, setOPenForm ] = useState(false);
    const [listProducts, setListProduct] = useState([])
    const [listUnit, setListUnit] = useState([])

    const [productCode, setProductCode] = useState(state.data.product_code)
    const [title, setTitle] = useState(state.data.title)
    const [description, setDescription] = useState(state.data.description)
    const [time, setTime] = useState(state.data.time)
    // const [status, setTime] = useState('0')
    const [note, setNote] = useState(state.data.note);
    const [category, setCategory] = useState();

    

    useEffect(() => {
        const params = {ids: state.data.category_path_ids}
        axios.get(apiConfig.PRODUCT_CATEGORY.GET_MANY_BY_IDs, {params}).then((value) => {
            setCategory(value.data);
        })
    },[])


    const handleSubmit = async() => {
        var params = {
            id: state.data.id,
            item: {
                product_code: productCode,
                type: category[1].title.toUpperCase(),
                title: title,
                description: description,
                time: time,
                note: note,
                category_id: category[2].id
            }
            
        };

        await axios.post(apiConfig.PRODUCT_API.UPDATE, params).then(() => {
            navigate('/product');
        });
        
    };

    const fields = [
        {
            label: 'Product Code',
            useState: [productCode, setProductCode]
        },
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


    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />
        </Box>
    );
};

export default ProductUpdate;
