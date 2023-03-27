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

const UnitCreate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [unitCode, setUnitCode] = useState('');
    const [note, setNote] = useState('');

    const [helperTitle, setHelperTitle] = useState();
    const [helperUnitCode, setHelperUnitCode] = useState();

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorUnitCode, setErrorUnitCode] = useState(false);

    const handleSubmit = async () => {
        if (!title || title.trim() === '') {
            setErrorTitle(true);
            setHelperTitle('* Tên đơn vị không được trống');
        } else {
            setErrorTitle(false);
            setHelperTitle('');
        }
        if (!unitCode || unitCode.trim() === '') {
            setErrorUnitCode(true);
            setHelperUnitCode('* Mã đơn vị không được trống');
        } else {
            setErrorUnitCode(false);
            setHelperUnitCode('');
        }

        if (
            !unitCode ||
            unitCode.trim() === '' ||
            !title ||
            title.trim() === ''
        )
            return;

        const unitID = uuid();
        const params = {
            id: unitID,
            title: title,
            description: description,
            note: note,
            unit_code: unitCode
        };

        await axios
            .post(apiConfig.UNIT_API.CREATE, { unit: params })
            .then((res) => {
                if (res.data.status === 'SUCCESS') navigate('/unit');
                else console.log('Fail  when create unit');
            });
    };

    const fields = [
        {
            name: 'Title',
            label: 'Tên đơn vị',
            useState: [title, setTitle],
            helper: helperTitle,
            isError: errorTitle
        },
        {
            name: 'unit_code',
            label: 'Mã đơn vị',
            useState: [unitCode, setUnitCode],
            helper: helperUnitCode,
            isError: errorUnitCode
        },
        {
            name: 'description',
            label: 'Mô tả',
            useState: [description, setDescription],
            type: 'textarea'
        },
        {
            name: 'note',
            label: 'Chú thích',
            useState: [note, setNote],
            type: 'textarea'
        }
    ];

    return (
        <Box>
            <FormSimpleLayout
                fields={fields}
                handleSubmit={handleSubmit}
                nameButtonSave="Thêm đơn vị"
                returnButton={true}
            />
        </Box>
    );
};

export default UnitCreate;
