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
import { v4 as uuid } from 'uuid';



const OrderCreate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [openForm, setOPenForm ] = useState(false);
    const [listProducts, setListProduct] = useState([])
    const [listOrderDetailRows, setListOrderDetailRows] = useState([]);
    const [listUnit, setListUnit] = useState([]);

    //unit

    const [total, setTotal] = useState(0)
    const [finalTotal, setFinalTotal] = useState(0)

    // unit

    const [unit, setUnit] = useState();
    const [quality, setQuality] = useState(1);
    const [ product, setProduct] = useState();
    const [price, setPrice] = useState()
    const [priceValue, setPriceValue] = useState(0);

    const [unitRows, setUnitRows] = useState([]);

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setListProduct(value.data)
        })
        
    },[])

    useEffect(() => {
        listOrderDetailRows.map((item) => {
            setTotal(total + item.total)
            setFinalTotal(total+ item.total)
        })
    },[listOrderDetailRows])

    const handleToggle = () => {
        setProduct('')
        setQuality(1)
        setUnit('')
        setPriceValue(0)
        setOPenForm(!openForm)
    }

    useEffect(() => {

        if(!product) return;
        
        axios.get(apiConfig.UNIT_API.GET_BY_PRODUCT_ID, { params: { product_id: product.id } }).then((value) => {
            setListUnit(value.data)
        })
    },[product]) 

    useEffect(() => {

        if(!product || !unit) return;
        
        axios.get(apiConfig.PRICE_LINE.GET_BY_PRODUCT_ID_AND_UNIT_ID, { params: { product_id: product.id, unit_id: unit.id, } })
        .then((value) => {
            setPrice(value.data)
            setPriceValue(value.data.price ?? 0)
        });
    },[product, unit]) 


    const handleSubmit = async() => {
        const customOrderDetail = listOrderDetailRows.map(({ product, total, unit, price ,...listOrderDetailRows}) => {return {
            ...listOrderDetailRows,
        }})
        var params = {
            item: {
                id: uuid(),
                total: total, 
                status: 'SERVICE',
                final_total: finalTotal

            },  
            orderDetails: customOrderDetail
        };
        await axios.post(apiConfig.ORDER_API.CREATE, params).then(() => {
            navigate('/order');
        });
        
    };

    const handleSubmitOrderDetail = async () => {
        if (!price) {
            alert("Sản phẩm này chưa có bảng giá");
            handleToggle();
            return;
        }
        const item = {
            id: uuid(),
            product: product.title,
            product_id: product.id,
            unit: unit.title,
            unit_id: unit.id,
            quality: quality,
            price: price.price,
            price_line_id: price.id,
            total: quality * price.price,
        }
        
        setListOrderDetailRows([...listOrderDetailRows, item])
        handleToggle()
        // await axios.post(apiConfig.UNIT_EXCHANGE_API.UPDATE, params)
        // window.location.reload()
    }

    const orderFields = [
        {
            label: 'total',
            name: 'title',
            useState: [total, setTotal],
            disabled: true,
        },
        {
            label: 'final_total',
            name: 'description',
            useState: [finalTotal, setFinalTotal],
            disabled: true,
        },
        
    ]

    const orderDetailFields = [
        {
            label: 'products',
            type: 'combo',
            values: listProducts,
            useState: [product, setProduct],
        },
        {
            label: 'unit',
            type: 'combo',
            values: listUnit,
            useState: [unit, setUnit],
        },
        {
            label: 'price',
            disabled: true,
            useState: [priceValue, setPriceValue],
        },
        {
            label: 'quality',
            useState: [quality, setQuality],
        },
    ]

    const orderDetailCols = [
        { field: 'product', flex: 1 },
        { field: 'unit', flex: 1 },
        { field: 'price', flex: 1 },
        { field: 'quality', flex: 1 },
        { field: 'total', flex: 1 },
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
                        axios.delete(apiConfig.ORDER_API.DELETE, { data: { id: params.id }}).then(() => {
                            window.location.reload();
                        })
                    }
                }}
                showInMenu
              />,
            ],
        },
        
    ]

    return (
        <Box>
            <FormSimpleLayout fields={orderFields} handleSubmit={handleSubmit} />
            <FormTableLayout columns={orderDetailCols} rows={listOrderDetailRows ?? []} handleAddButton={handleToggle}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={orderDetailFields} handleSubmit={handleSubmitOrderDetail}/>
        </Box>
    );
};

export default OrderCreate;
