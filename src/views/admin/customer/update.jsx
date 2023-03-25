import {
    Autocomplete,
    Box,
    Button,
    FormControlLabel,
    FormGroup,
    TextField
} from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
import {
    genderToBool,
    renderGender,
    renderYesNo,
    YesNoToBool
} from 'utils/dataToView';
import axios from 'axios';
import FormTableLayout from 'layout/FormLayout/FormTableLayout';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { IconPencil, IconTrash } from '@tabler/icons';
import FormToggle from 'component/DrawerToggle/FormToggle';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { dateSQL } from 'utils/variable';
import FormSimpleLayoutV2 from 'layout/FormLayout/FormSimpleLayoutV2';

const CustomerUpdate = () => {
    const { state } = useLocation();

    const navigate = useNavigate();

    const [customerFullName, setCustomerFullName] = useState(
        state.data?.full_name ?? ''
    );
    const [customerPhone, setCustomerPhone] = useState(state.data?.phone ?? '');
    const [customerEmail, setCustomerEmail] = useState(state.data?.email ?? '');
    const [customerGender, setCustomerGender] = useState(
        state.data?.gender ?? 'Nam'
    );
    const [customerNote, setCustomerNote] = useState(state.data?.note ?? '');
    const [customerAddress, setCustomerAddress] = useState();

    const [title, setTitle] = useState(state.data.title);
    const [description, setDescription] = useState(state.data.description);
    const [time, setTime] = useState(state.data.time);
    // const [status, setTime] = useState('0')
    const [note, setNote] = useState(state.data.note);
    const [category, setCategory] = useState();

    useEffect(() => {
        const params = { ids: state.data.address_paths };

        axios
            .get(apiConfig.ADDRESS_API.GET_MANY_BY_IDs, { params })
            .then((value) => {
                console.log(value);
                setCustomerAddress(value.data);
            });
    }, []);

    const handleSubmit = async () => {
        const addrLength = customerAddress?.length - 1;
        var params = {
            id: state.data.id,
            item: {
                full_name: customerFullName,
                phone: customerPhone,
                email: customerEmail,
                gender: customerGender == 'Nam' ? true : false,
                note: customerNote,
                address: customerAddress[addrLength]
            }
        };

        await axios.post(apiConfig.CUSTOMER_API.UPDATE, params).then(() => {
            navigate('/customer');
        });
    };

    const customerFields = [
        {
            label: 'Tên khách hàng',
            useState: [customerFullName, setCustomerFullName]
        },
        // {
        //   label: 'Số điện thoại',
        //   useState: [customerPhone, setCustomerPhone]
        // },
        {
            label: 'Email',
            useState: [customerEmail, setCustomerEmail]
        },
        {
            label: 'Giới tính',
            useState: [customerGender, setCustomerGender],
            values: [
                {
                    value: 'Nam'
                },
                {
                    value: 'Nữ'
                }
            ],
            type: 'radio'
        },
        {
            label: 'Ghi chú',
            useState: [customerNote, setCustomerNote],
            type: 'textarea'
        },
        {
            label: 'Địa chỉ',
            useState: [customerAddress, setCustomerAddress],
            type: 'tree',
            name: 'address',
            labels: [
                'Tỉnh / Thành phố',
                'Quận / Huyện',
                'Tỉnh thành',
                'Địa chỉ'
            ]
        }
    ];

    return (
        <Box>
            <FormSimpleLayout
                label={'Thông tin khác hàng'}
                fields={customerFields}
                api={state.api}
                handleSubmit={handleSubmit}
                returnButton={true}
                nameButtonSave={'Cập nhật thông tin khách hàng'}
            >
                <TextField
                    sx={{ marginY: '8px' }}
                    key={'customer phone'}
                    //helperText="Some important text"
                    variant="outlined"
                    label={'Số điện thoại'}
                    value={customerPhone}
                    fullWidth={true}
                    disabled={true}
                    //onBlur={(event) => setCustomerPhone(event.target.value)}
                    //onChange={(e) => {console.log(event.target.value); }}
                />
            </FormSimpleLayout>
        </Box>
    );
};

export default CustomerUpdate;
