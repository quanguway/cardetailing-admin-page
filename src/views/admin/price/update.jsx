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


const PriceUpdate= () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [openForm, setOPenForm ] = useState(false);
    const [listProducts, setListProduct] = useState([])
    const [listUnit, setListUnit] = useState([])

    const [title, setTitle] = useState(state.data.title)
    const [startDate, setStartDate] = useState(dayjs(state.data.start_date))
    const [endDate, setEndDate] = useState(dayjs(state.data.endDate))
    const [isActive, setIsActive] = useState(renderYesNo(state.data.is_active))

    // price line

    const [priceLineId, setPriceLineId] = useState();
    const [price, setPrice] = useState();
    const [isActivePriceLine, setIsActivePriceLine] = useState(renderYesNo(state.data.is_active));
    const [product, setProduct] = useState();
    const [unit, setUnit] = useState();
    const [priceLineRows, setPriceLineRows] = useState([]);

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setListProduct(value.data)
        })
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data)
        })
    },[])

    const handleToggle = () => {
        setOPenForm(!openForm)
    }

    useEffect(() => {
        axios.get(apiConfig.PRICE_LINE.GET_BY_PRICE_HEADER_ID,{params: {price_header_id: state.data.id}}).then((value) => {
            const dataCustom = value.data.map(({...item}) => ({

                product_title: item.product.title,
                unit_title: item.unit.title,
                ...item}))
            setPriceLineRows(dataCustom)
        })
    },[])

    const handleSubmit = async() => {
        const princeLinecustom = priceLineRows.map(({product, product_title, unit,unit_title ,...orther}) =>  orther)
        var params = {
            priceHeader: {
                id: uuid(),
                title: title,
                start_date: startDate.format(dateSQL),
                end_date: endDate.format(dateSQL),
            },
            priceLines: princeLinecustom,
            
        };

        await axios.post(apiConfig.PRICE_HEADER.CREATE, params).then(() => {
            navigate('/price');
        });
        
    };


    const handleSubmitPriceLine = async () => {
        const params = {
            id: priceLineId,
            item:{
                is_active: YesNoToBool(isActivePriceLine),
            }
        }
        await axios.post(apiConfig.PRICE_LINE.UPDATE, params)
        window.location.reload();
    }

    const fields = [
        {
            label: 'Title',
            name: 'title',
            useState: [title, setTitle],
            disabled: true
        },
        {
            label: 'isActive',
            useState: [isActive, setIsActive],
            values: [
                {
                    value: 'Có',
                    disabled: true
                },
                {
                    value: 'Không',
                },
            ],
            type: 'radio'
        },
        {
            label: 'start date',
            useState: [startDate, setStartDate],
            type: 'date-picker',
            disabled: true,
        },
        {
            label: 'end date',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        },
    ]

    const priceLineFields = [
        {
            label: 'price',
            useState: [price, setPrice],
            disabled: true,
        },
        {
            label: 'isActive',
            useState: [isActivePriceLine, setIsActivePriceLine],
            values: [
                {
                    value: 'Có',
                    disabled: true
                },
                {
                    value: 'Không',
                },
            ],
            type: 'radio'
        },
        {
            label: 'Product',
            type: 'combo',
            values: listProducts,
            useState: [product, setProduct],
            disabled: true
        },
        {
            label: 'Unit',
            type: 'combo',
            values: listUnit,
            useState: [unit, setUnit],
            disabled: true
        },
    ]

    const priceLineCols = [
        { field: 'price', flex: 1 },
        { field: 'is_active', flex: 1 },
        { field: 'product_title', flex: 1 },
        { field: 'unit_title', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'actions',
            flex:1,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<IconPencil />}
                label="Edit"
                onClick={() => {
                    setPriceLineId(params.row.id)
                    setPrice(params.row.price);
                    setIsActivePriceLine("Không");
                    setProduct(params.row.product);
                    setUnit(params.row.unit);
                    handleToggle();
                }}
                showInMenu
              />,
            ],
        },
        
    ]

    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />
            
            <FormTableLayout columns={priceLineCols} rows={priceLineRows ?? [] } addButton={false}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={priceLineFields} handleSubmit={handleSubmitPriceLine}/>
            
        </Box>
    );
};

export default PriceUpdate;
