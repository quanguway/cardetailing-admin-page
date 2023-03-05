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


const UnitForm = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [openForm, setOPenForm ] = useState(false);
    const [listProducts, setListProduct] = useState([])

    // booking

    const [status, setStatus] = useState(state.data?.title ?? '')
    const [note, setNote] = useState(state.data?.description ?? '')

    // booking detail

    // id?: string
    // status?: 'PENDING' | 'CONFIRMED' | 'CANCEL' | 'PROCESSING' | 'FINISHED'
    // booking_id?: string
    // product_id?: string
    // unit_exchange_id?: string
    // price_id?: string
    // note?: string 
    // date_created?: Date
    // date_updated?: Date
    // user_created?: Date
    // user_updated?: Date

    const [ statusBookingDetail, setStatusBookingDetail ] = useState();
    const [ product, setProduct ] = useState();
    const [ unitExchange, setUnitExchange ] = useState();
    const [ price, setPrice ] = useState();

    const [bookingDetailRows, setBookingDetailRows] = useState([]);

    useEffect(() => {
        // setUnitExchangeRows(state.data.unitExchanges.map((element) => {return {...element, product_title: element.product.title}}))
        axios.get(apiConfig.BOOKING_DETAIL_API.GET_BY_BOOKING_ID, { params: { booking_id: state.data.id } } ).then((value) => {
            setBookingDetailRows(value.data.map((element) => {return {
                ...element, 
                product_title: element.product.title,
                unit_exchange_value: element.unitExchange.value,
                price: element.price.price
            }}))
        })
    }, [])

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setListProduct(value.data)
        })
    },[])

    const handleToggle = () => {
        setOPenForm(!openForm)
    }
    
    const handleSubmit = async() => {
        var params = {
            id: state.data?.id ?? undefined ,
            item: {
                title: title,
                description: description,
            }
            
        };
        // log
        if(state.mode == 'UPDATE') {
            await axios.post(apiConfig.BOOKING_API.UPDATE, params).then(() => {
                navigate('/booking');
            });
        } else if(state.mode == 'CREATE') {
            await axios.post(apiConfig.BOOKING_API.CREATE, params).then(() => {
                navigate('/booking');
            });
        }
        
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
        }
        await axios.post(apiConfig.UNIT_EXCHANGE_API.UPDATE, params)
        window.location.reload()
    }

    const fields = [
        {
            label: 'Title',
            name: 'title',
            useState: [title, setTitle]
        },
        {
            label: 'Description',
            name: 'description',
            useState: [description, setDescription],
            type: 'textarea'
        },
        
    ]

    const unitExchangeFields = [
        {
            label: 'Full name',
            useState: [value, setValue]
        },
        {
            label: 'isBaseUnit',
            useState: [isBaseUnit, setIsBaseUnit],
            values: [
                {
                    value: 'Có'
                },
                {
                    value: 'Không'
                },
            ],
            type: 'radio'
        },
        {
            label: 'isReport',
            useState: [isReport, setIsReport],
            values: [
                {
                    value: 'Có'
                },
                {
                    value: 'Không'
                },
            ],
            type: 'radio'
        },
        {
            label: 'isActive',
            useState: [isActive, setIsActive],
            values: [
                {
                    value: 'Có'
                },
                {
                    value: 'Không'
                },
            ],
            type: 'radio'
        },
        {
            label: 'allowSale',
            useState: [allowSale , setAllowSale],
            values: [
                {
                    value: 'Có'
                },
                {
                    value: 'Không'
                },
            ],
            type: 'radio'
        },
        {
            label: 'products',
            type: 'combo',
            values: listProducts,
            useState: [product, setProduct],
        },
    ]

    const unitExchangeCols = [
        { field: 'value', flex: 1 },
        { field: 'is_base_unit', flex: 1 },
        { field: 'is_report', flex: 1 },
        { field: 'product_title', flex: 1 },
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
                        axios.delete(apiConfig.UNIT_API.DELETE, { data: { id: params.id }}).then(() => {
                            window.location.reload();
                        })
                    }
                }}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<IconPencil />}
                label="Edit"
                onClick={() => {
                    setUnitExchangeId(params.row.id)
                    setValue(params.row.value);
                    setAllowSale(renderYesNo(params.row.allow_sale));
                    setIsBaseUnit(renderYesNo(params.row.is_base_unit));
                    setIsActive(renderYesNo(params.row.is_active));
                    setProduct(params.row.product);
                    handleToggle();
                }}
                showInMenu
              />,
            ],
        },
        
    ]

    return (
        <Box>
            <FormSimpleLayout mode={state.mode} fields={fields} api={state.api} handleSubmit={handleSubmit} />
            <FormTableLayout columns={unitExchangeCols} rows={bookingDetailRows ?? []}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={unitExchangeFields} handleSubmit={handleSubmitUniExchange}/>
        </Box>
    );
};

export default UnitForm;
