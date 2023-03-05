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


const PromotionCreate = () => {
    const navigate = useNavigate();
    const [openForm, setOPenForm ] = useState(false);
    const [listProducts, setListProduct] = useState([])
    const [listUnit, setListUnit] = useState([])

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [status, setStatus] = useState("Có")
    const [note, setNote] = useState()

    // price line

    const [priceLineId, setPriceLineId] = useState();
    const [listPromotionLine, setListPromotionLine] = useState();
    const [titlePromotionLine, setTitlePromotionLine] = useState();
    const [promotionCode, setPromotionCode] = useState();
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [type, setType] = useState();
    const [statusPromotionLine, setStatusPromotionLine] = useState("Có");

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
        const rows = {
            id: uuid(),
            price: price,
            is_active: YesNoToBool(isActivePriceLine),
            product: product,
            product_id: product.id,
            product_title: product.title,
            unit: unit,
            unit_id: unit.id,
            unit_title: unit.title,
        }
        setPriceLineRows([...priceLineRows, rows])
        handleToggle()
    }

    const fields = [
        {
            label: 'Title',
            name: 'title',
            useState: [title, setTitle]
        },
        {
            label: 'status',
            useState: [status, setStatus],
            values: [
                {
                    value: 'Có',
                },
                {
                    value: 'Không',
                },
            ],
            type: 'radio'
        },
        {
            label: 'description',
            useState: [description, setDescription],
            type: 'textarea'
        },
        {
            label: 'note',
            useState: [note, setNote] ,
            type: 'textarea'
        },
    ]


    const subFields = [
        {
            label: 'Promotion Code',
            disabled: true,
            useState: [promotionCode, setPromotionCode],
        },
        {
            label: 'title',
            useState: [titlePromotionLine, setTitlePromotionLine] 
        },
        {
            label: 'start_date',
            useState: [startDate, setStartDate],
            type: 'date-picker'
        },
        {
            label: 'end date',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        },
        {
            label: 'status',
            useState: [statusPromotionLine, setStatusPromotionLine],
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
            label: 'max quanlity',
            useState: [titlePromotionLine, setTitlePromotionLine] 
        },
        
    ]

    const subCols = [
        { field: 'title', flex: 1 },
        { field: 'promotion_code', flex: 1 },
        { field: 'start_date', flex: 1 },
        { field: 'end_date', flex: 1 },
        { field: 'status', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'actions',
            flex:1,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<IconTrash />}
                label="Delete"
                onClick={() => {
                  if(confirm("Do you want delete this item ?")) {
                        setPriceLineRows(priceLineRows.filter( (item) => item.id !== params.row.id) )
                    }
                }}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<IconPencil />}
                label="Edit"
                onClick={() => {
                    handleToggle();
                }}
                showInMenu
              />,
            ],
        },
        
    ]

    const handleAddButton = () => {
        handleToggle();
    }

    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />
            
            <FormTableLayout columns={subCols} rows={listPromotionLine  ?? [] } handleAddButton={handleAddButton}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={subFields} handleSubmit={handleSubmitPriceLine}/>
            
        </Box>
    );
};

export default PromotionCreate;
