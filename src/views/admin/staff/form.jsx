import { Box, Button, } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate  } from "react-router-dom";
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
import { renderGender } from 'utils/dataToView';
import axios from 'axios';


const StaffForm = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([])

    const [fullName, setFullName] = useState(state.data?.full_name ?? '')
    const [phone, setPhone] = useState(state.data?.phone ?? '')
    const [email, setEmail] = useState(state.data?.email ?? '')
    const [gender, setGender] = useState(renderGender(state.data?.gender) ?? 'Nam')
    const [note, setNote] = useState(state.data?.note ?? '')
    const [role, setRole] = useState(state.data?.role ?? '')
    const [address, setAddress] = useState([])
    
    useEffect(() => {
        axios.get(apiConfig.ROLE_API.GET_ALL).then((value) => {
            setRoles(value.data)
        })
    },[])

    useEffect(() => {
        if(state.mode == 'UPDATE') {
            const params = {ids: state.data.address_paths}

            axios.get(apiConfig.ADDRESS_API.GET_MANY_BY_IDs, {params}).then((value) => {
                setAddress(value.data);
            })
        } else {
            axios.get(apiConfig.ADDRESS_API.GET_ALL).then((value) => {
                setAddress([value.data[0]]);
            })
        }
    },[])

    const handleSubmit = async() => {
        const addrLength = address?.length-1
        var params = {
            id: state.data?.id ?? undefined ,
            item: {
                full_name: fullName,
                phone: phone,
                email: email,
                gender: gender == 'Nam' ? true : false,
                note: note,
                role_id: role.id,
                address: address[addrLength]
            }
            
        };
        // log
        console.log(params);
        if(state.mode == 'UPDATE') {
            await axios.post(apiConfig.STAFF_API.UPDATE, params).then(() => {
                navigate('/staff');
            });
        } else if(state.mode == 'CREATE') {
            await axios.post(apiConfig.STAFF_API.CREATE, params).then(() => {
                navigate('/staff');
            });
        }
        
    };

    const fields = [
        {
            label: 'Full name',
            name: 'full_name',
            useState: [fullName, setFullName]
        },
        {
            label: 'Phone',
            name: 'phone',
            useState: [phone, setPhone]
        },
        {
            label: 'Email',
            name: 'email',
            useState: [email, setEmail]
        },
        {
            label: 'Gender',
            useState: [gender, setGender],
            name: 'gender',
            values: [
                {
                    value: 'Nam'
                },
                {
                    value: 'Nữ'
                },
            ],
            type: 'radio'
        },
        {
            label: 'Note',
            type: 'textarea',
            name: 'note',
            useState: [note, setNote]
        },
        {
            label: 'Role',
            values: roles,
            type: 'combo',
            useState: [role, setRole],
            name: 'role',
        },
        {
            label: 'Address',
            useState: [address, setAddress],
            type: 'tree',
            name: 'address',
            labels: ['Thành phố', 'Quận / Huyện', 'Tỉnh thành', 'Địa chỉ']
        },
        
        // {
        //     label: 'Avatar',
        //     value: state.data.avatar,
        //     type: 'file',
        //     name: 'avatar'
        // },
    ]

    return (
        <Box>
            <FormSimpleLayout mode={state.mode} fields={fields} api={state.api} handleSubmit={handleSubmit} />
        </Box>
    );
};

export default StaffForm;
