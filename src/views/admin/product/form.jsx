import { Box, } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation } from "react-router-dom";
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
import { renderGender } from 'utils/dataToView';
import axios from 'axios';


const StaffForm = () => {
    const {state} = useLocation();
    const [roles, setRoles] = useState([])
    // const [roleSeleted, setRoleSelected] = useState(null);
    
    useEffect(() => {
        axios.get(apiConfig.ROLE_API.GET_ALL).then((value) => {
            setRoles(value.data)
        })
    },[])

    // console.log(roleSeleted);

    const [addressLevel1, setAdrressLevel1] = useState (null);
    const [addressLevel2, setAdrressLevel2] = useState (null);
    const [addressLevel3, setAdrressLevel3] = useState (null);
    const [addressLevel4, setAdrressLevel4] = useState (null);

    // console.log(roles);

    const listAddressLevel = [
        {
            label: 'Thành phố',
            data: addressLevel1,
            setData: setAdrressLevel1
        },
        {
            label: 'Quận / Huyện',
            data: addressLevel2,
            setData: setAdrressLevel2
        },
        {
            label: 'Tỉnh',
            data: addressLevel3,
            setData: setAdrressLevel3
        },
        {
            label: 'Địa chỉ',
            data: addressLevel4,
            setData: setAdrressLevel4
        },
    ]

    console.log(state.data)

    // const roles = [
    //     {
    //         label: 'customer'
    //     },
    //     {
    //         label: 'admin' 
    //     }
    // ];
    const [fullName, setFullName] = useState(state.data.full_name)
    const [phone, setPhone] = useState(state.data.phone)
    const [email, setEmail] = useState(state.data.email)
    const [gender, setGender] = useState(renderGender(state.data.gender) )
    const [note, setNote] = useState(state.data.note)
    const [role, setRole] = useState(state.data.role)
    // const [fullName, setFullName] = useState(state.data.full_name)
    const fields = [
        {
            name: 'id',
            value: state.data.id,
            type: 'hidden'
        },
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
            // apiData: apiConfig.ROLE_API.GET_ALL,
            type: 'combo',
            useState: [role, setRole],
            name: 'role',
        },
        // {
        //     label: 'Address',
        //     values: state.data.address_paths,
        //     listData: listAddressLevel,
        //     apiData: apiConfig.ADDRESS_API.GET, 
        //     labelOption: 'title',
        //     type: 'tree',
        //     name: 'address',
        // },
        
        // {
        //     label: 'Avatar',
        //     value: state.data.avatar,
        //     type: 'file',
        //     name: 'avatar'
        // },
    ]

    // console.log(fields);

    return (
        <Box>
            <FormSimpleLayout mode={state.mode} fields={fields} api={state.api} />
        </Box>
    );
};

export default StaffForm;
