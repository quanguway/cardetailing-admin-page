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
    const [roleSeleted, setRoleSelected] = useState(null);
    
    useEffect(() => {
        axios.get(apiConfig.ROLE_API.GET_ALL).then((value) => {
            setRoles(value.data)
            console.log(state.id);
            setRoleSelected(value.data.filter((role) => { return role.id === state.role_id} )[0].title);
        })
    },[])

    console.log(roleSeleted);

    const [addressLevel1, setAdrressLevel1] = useState (null);
    const [addressLevel2, setAdrressLevel2] = useState (null);
    const [addressLevel3, setAdrressLevel3] = useState (null);
    const [addressLevel4, setAdrressLevel4] = useState (null);

    console.log(roles);

    // const [roles, setRoles] = useState(async () => {
    //     const response = await axios.get(apiConfig.ROLE_API.GET_ALL);
    //     // const responseChangeField = response.data.map(({title, ...other}) => {label : title, other});
    //     // console.log(responseChangeField);
    //     return response
    // });

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

    console.log(state)

    // const roles = [
    //     {
    //         label: 'customer'
    //     },
    //     {
    //         label: 'admin' 
    //     }
    // ];

    const fields = [
        {
            name: 'id',
            value: state.id,
            type: 'hidden'
        },
        {
            label: 'Full name',
            value: state.full_name,
            name: 'full_name'
        },
        {
            label: 'Phone',
            value: state.phone,
            name: 'phone'
        },
        {
            label: 'Email',
            value: state.email,
            name: 'email'
        },
        {
            label: 'Gender',
            value: state.gender,
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
            value: state.note,
            type: 'textarea',
            name: 'note',
        },
        {
            label: 'Role',
            value: roleSeleted,
            values: roles,
            apiData: apiConfig.ROLE_API.GET_ALL,
            type: 'combo',
            name: 'role',
        },
        {
            label: 'Address',
            // value: state.address_id,
            values: listAddressLevel,
            apiData: apiConfig.ADDRESS_API.GET, 
            labelOption: 'title',
            type: 'tree',
            name: 'address',
        },
        
        // {
        //     label: 'Avatar',
        //     value: state.avatar,
        //     type: 'file',
        //     name: 'avatar'
        // },
    ]

    // console.log(fields);

    return (
        <Box>
            <FormSimpleLayout fields={fields} />
        </Box>
    );
};

export default StaffForm;
