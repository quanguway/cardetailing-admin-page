import { Box, Button } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

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


    const [helperTitle, setHelperTitle] = useState();
    const [helperCode, setHelperCode] = useState();
    const [helperTime, setHelperTime] = useState();
    const [helperCategory, setHelperCategory] = useState();


    const [errorTitle, setErrorTitle] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [errorTime, setErrorTime] = useState(false);
    const [errorCategory, setErrorCategory] = useState(false);


    useEffect(() => {
        axios.get(apiConfig.PRODUCT_CATEGORY.GET_ALL).then((value) => {
            setCategory([value.data[0]]);
        });
        axios.get(apiConfig.PRODUCT_API.GET_ALL_WITHOUT_PRICE).then((value) => {
            setListProduct(value.data[0]);
        })
        
    }, []);

    useEffect(() => {
        const products = listProducts.filter((item) => (item.product_code == productCode));
        // if (products.length() != 0) 
    }, [productCode]);

    const handleToggle = () => {
        setOPenForm(!openForm);
    };

    const handleSubmit = async () => {

        if (!title || title.trim() === '') {
            setErrorTitle(true);
            setHelperTitle('* Tên sản phẩm không được trống');
        } else {
            setErrorTitle(false);
            setHelperTitle('');
        }
        if (!productCode || productCode.trim() === '') {
            setErrorCode(true);
            setHelperCode('* Mã sản phẩm không được trống');
        } else {
            setErrorCode(false);
            setHelperCode('');
        }

        if (!time || time.trim() === '') {
            setErrorTime(true);
            setHelperTime('* Thời gian không được trống');
        } else {
            setErrorTime(false);
            setHelperTime('');
        }

        if (category.length === 1 ) {
            setErrorCategory(true);
            setHelperCategory('* Loại sản phẩm không được trống');
        } else {
            setErrorCategory(false);
            setHelperCategory('');
        }

        if (errorCategory || errorCode || errorTime || errorTitle)
            return;

        var params = {
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

        await axios.post(apiConfig.PRODUCT_API.CREATE, params).then(() => {
            navigate('/product');
        });
    };

    const fields = [
        {
            label: 'Mã dịch vụ',
            useState: [productCode, setProductCode],
            helper: helperCode,
            isError: errorCode,
        },
        {
            label: 'Tên dịch vụ',
            useState: [title, setTitle],
            helper: helperTitle,
            isError: errorTitle,
        },
        {
            label: 'Mô tả',
            useState: [description, setDescription],
            type: 'textarea',
        },
        {
            label: 'Chú thích',
            useState: [note, setNote],
            type: 'textarea'
        },
        {
            label: 'Thời gian dự kiến',
            useState: [time, setTime],
            helper: helperTime,
            isError: errorTime
        },
        {
            label: 'Loại dịch vụ',
            useState: [category, setCategory],
            type: 'tree-simple',
            lengthItem: 2,
            labels: ['Sản phẩm & Dịch vụ', 'Loại'],
            helper: helperCategory,
            isError: errorCategory
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
