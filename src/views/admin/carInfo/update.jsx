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
import DrawerToggle from 'component/DrawerToggle';
import TableEditableLayout from 'layout/TableLayout/TableEditableLayout';
import ProgressAction from 'layout/TableLayout/TableEditableLayout/ProgressAction';
import FormToggle from 'component/DrawerToggle/FormToggle';

const UnitUpdate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);

    //unit

    const [type, setType] = useState({title: state.data.type});
    const [code, setCode] = useState(state.data.code);
    const [branch, setBranch] = useState(state.data.branch);


    const carTypes = [
        {title: 'Hạng xe lớn (Large)'}, 
        {title: 'Hạng xe trung (Midsize)'}, 
        {title: 'Hạng xe nhỏ gọn (Compact)'},
        {title: 'Hạng xe nhỏ (Mini Car)'}, 
    ]

    const [unitExchangeRows, setUnitExchangeRows] = useState([]);

    const handleToggle = () => {
        setOPenForm(!openForm);
    };

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

        const params = {
            item: {
                id: state.data.id,
                code: code,
                type: type.title,
                branch: branch
            }
        };
        await axios.post(apiConfig.CAR_INFO.UPDATE, params).then((res) => {
            navigate('/car-info');
        });
    };

    const handleSubmitUniExchange = async () => {
        const params = {
            id: unitExchangeId,
            item: {
                value: value,
                is_active: YesNoToBool(isActive),
                is_base_unit: YesNoToBool(isBaseUnit),
                is_report: YesNoToBool(isReport),
                allow_sale: YesNoToBool(allowSale),
                product_id: product.id
            }
        };
        await axios.post(apiConfig.UNIT_EXCHANGE_API.UPDATE, params);
        window.location.reload();
    };

    const fields = [
        {
            name: 'code',
            label: 'Mã Thông tin xe',
            useState: [code, setCode],
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
                mode={state?.mode}
                fields={fields}
                api={state?.api}
                handleSubmit={handleSubmit}
                returnButton={true}
            />
           
        </Box>
    );
};

export default UnitUpdate;
