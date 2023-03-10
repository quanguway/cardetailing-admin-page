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


const UnitCreate = () => {
    const navigate = useNavigate();
    const [openForm, setOPenForm ] = useState(false);
    const [listProducts, setListProduct] = useState([])
    const [listUnit, setListUnit] = useState([])

    const [title, setTitle] = useState()
    const [startDate, setStartDate] = useState(dayjs(new Date()))
    const [endDate, setEndDate] = useState(dayjs(new Date()))
    const [isActive, setIsActive] = useState('Không')

    // price exchange

    const [priceLineId, setPriceLineId] = useState();
    const [price, setPrice] = useState();
    const [isActivePriceLine, setIsActivePriceLine] = useState("Không");
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
            type: 'date-picker'
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
            useState: [price, setPrice] 
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
        },
        {
            label: 'Unit',
            type: 'combo',
            values: listUnit,
            useState: [unit, setUnit],
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

    const handleAddButton = () => {
        setPriceLineId("")
        setPrice("");
        setIsActivePriceLine("Không");
        setProduct();
        setUnit();
        handleToggle();
    }

    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />
            
            <FormTableLayout columns={priceLineCols} rows={priceLineRows ?? [] } handleAddButton={handleAddButton}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={priceLineFields} handleSubmit={handleSubmitPriceLine}/>
            
        </Box>
    );
};

export default UnitCreate;
