import { Box, Button } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const UnitCreate = () => {
    const navigate = useNavigate();

    // const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [code, setCode] = useState('');
    const [branch, setBranch] = useState('');

    const carTypes = [
        {title: 'Hạng xe lớn (Large)'}, 
        {title: 'Hạng xe trung (Midsize)'}, 
        {title: 'Hạng xe nhỏ gọn (Compact)'},
        {title: 'Hạng xe nhỏ (Mini Car)'}, 
    ]

    const [helperTitle, setHelperTitle] = useState();
    const [helperCode, setHelperCode] = useState();

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorCode, setErrorCode] = useState(false);

    const handleSubmit = async () => {
        // if (!title || title.trim() === '') {
        //     setErrorTitle(true);
        //     setHelperTitle('* Tên đơn vị không được trống');
        // } else {
        //     setErrorTitle(false);
        //     setHelperTitle('');
        // }
        // if (!unitCode || unitCode.trim() === '') {
        //     setErrorUnitCode(true);
        //     setHelperUnitCode('* Mã đơn vị không được trống');
        // } else {
        //     setErrorUnitCode(false);
        //     setHelperUnitCode('');
        // }

        // if (
        //     !unitCode ||
        //     unitCode.trim() === '' ||
        //     !title ||
        //     title.trim() === ''
        // )
        //     return;

        const carInfoID = uuid();
        const params = {
            item: {
                id: carInfoID,
                code: code,
                type: type.title,
                branch: branch
            }
        };

        await axios
            .post(apiConfig.CAR_INFO.CREATE,  params)
            .then((res) => {
                navigate('/car-info');
            });
    };

    const fields = [
        {
            name: 'code',
            label: 'Mã Thông tin xe',
            useState: [code, setCode],
            helper: helperCode,
            isError: errorCode
        },
        {
            name: 'type',
            label: 'Loại xe',
            useState: [type, setType],
            type: 'combo',
            values: carTypes,
        },
        {
            name: 'branch',
            label: 'Dòng xe',
            useState: [branch, setBranch],
        }
    ];

    return (
        <Box>
            <FormSimpleLayout
                fields={fields}
                handleSubmit={handleSubmit}
                nameButtonSave="Thêm thông tin xe"
                returnButton={true}
            />
        </Box>
    );
};

export default UnitCreate;
