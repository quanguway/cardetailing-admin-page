import { Autocomplete, Box, Button, TextField, } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate  } from "react-router-dom";
import FormSimpleLayout from 'layout/FormLayout/FormSimpleLayout';
import { useState, useEffect } from 'react';
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

    const [promotionRows, setPromotionRows] = useState([]);

    const [promotionStartDate, setPromotionStartDate] = useState(dayjs(new Date()));
    const [promotionEndDate, setPromotionEndDate] = useState(dayjs(new Date()).add(1, 'day'));


    const [titlePromotionLine, setTitlePromotionLine] = useState();
    const [promotionCode, setPromotionCode] = useState();
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()).add(1, 'day'));

    const [reductionAmount, setReductionAmount] = useState();
    const [percent, setPercent] = useState();
    const [getProduct, setGetProduct] = useState(null)

    const [conditionProduct, setConditionProduct] = useState();
    const [quantityProductBuy, setQuanlityProductBuy] = useState();
    const [minimumTotal, setMinimumTotal] = useState();

    const [maxQuantityPerCustomer, setNoteMaxQuantityPerCustomer] = useState()
    const [maxQuantityPerCustomerPerDay, setMaxQuantityPerCustomerPerDay] = useState()


    const [promotionOption, setPromotionOption] = useState();
    const [conditionOption, setConditionOption] = useState();
    const [conditionPromotionOptions, setConditionPromotionOptions] = useState();

    const [maximumReductionAmount, setMaxReductionAmount] = useState();
    

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            console.log(value.data);
            setListProduct(value.data)
        })
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data)
        })
    },[])

    useEffect(() => {
        setReductionAmount(null);
        setPercent(null);
        setGetProduct(null);
    }, [promotionOption])
    
    useEffect(() => {
        setConditionProduct(null);
        setQuanlityProductBuy(null);
        setMinimumTotal(null);
        setConditionPromotionOptions(promotionOptions.filter((item) => (item.condition === conditionOption?.value) ));
    }, [conditionOption])

    const handleToggle = () => {
        setTitlePromotionLine('');
        setPromotionCode('');
        setNoteMaxQuantityPerCustomer('')
        setMaxQuantityPerCustomerPerDay('')
        setOPenForm(!openForm)
    }

    const handleSubmit = async() => {
        // const promotionRowsCustomer = promotionRows.map((item) =>  ({...item, id: uuid()}))
        var params = {
            promotion: {
                id: uuid(),
                title: title,
                description: description,
                note: note,
            },
            promotionDetail: promotionRows,
            
        };

        await axios.post(apiConfig.PROMOTION_API.CREATE, params).then(() => {
            // navigate('/price');
        });
        
    };


    const handleSubmitToggle = async () => {
        const rows = {
            id: uuid(),
            promotion_code: promotionCode,
            type: conditionOption.value,
            reduction_amount: reductionAmount,
            product_title: getProduct?.title ?? '',
            product_received_id: getProduct?.id ?? null,
            product_buy_id: conditionProduct?.id ?? null,
            quantity_product_buy: quantityProductBuy ?? 1,
            minimum_total: minimumTotal ?? 0,
            percent: percent,
            start_date: startDate.format(dateSQL),
            end_date: endDate.format(dateSQL)
            
        }
        setPromotionRows([...promotionRows ,rows])
        handleToggle()
    }

    const fields = [
        {
            label: 'Title',
            name: 'title',
            useState: [title, setTitle]
        },
        // {
        //     label: 'status',
        //     useState: [status, setStatus],
        //     values: [
        //         {
        //             value: 'Có',
        //         },
        //         {
        //             value: 'Không',
        //         },
        //     ],
        //     type: 'radio'
        // },
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
        {
            label: 'start date',
            useState: [promotionStartDate, setPromotionStartDate],
            type: 'date-picker'
        },
        {
            label: 'end date',
            useState: [promotionEndDate, setPromotionEndDate],
            type: 'date-picker'
        },
    ]


    const subFields = [
        {
            label: 'Promotion Code',
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
        // {
        //     label: 'status',
        //     useState: [statusPromotionLine, setStatusPromotionLine],
        //     values: [
        //         {
        //             value: 'Có',
        //             disabled: true
        //         },
        //         {
        //             value: 'Không',
        //         },
        //     ],
        //     type: 'radio'
        // },
        {
            label: 'Mỗi khách hàng được sử dụng tối đa',
            useState: [maxQuantityPerCustomer, setNoteMaxQuantityPerCustomer]
        },
        {
            label: 'Số lần sử dụng tối đa trong ngày',
            useState: [maxQuantityPerCustomerPerDay, setMaxQuantityPerCustomerPerDay]
        }
    ]

    const subCols = [
        { field: 'promotion_code', flex: 1 },
        { field: 'start_date', flex: 1 },
        { field: 'end_date', flex: 1 },
        { field: 'type', flex: 1},
        { field: 'percent', flex: 1},
        { field: 'reduction_amount', flex: 1},
        { field: 'product_title', flex: 1},

        // { field: 'status', flex: 1 },
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
                        setPromotionRows(promotionRows.filter( (item) => item.id !== params.row.id) )
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

    const promotionOptions = [
        {value:'PERCENT',condition: 'CONDITION_PRICE' , label:'Giảm giá theo %'},
        {value: 'PRICE', condition: 'CONDITION_PRICE' , label: 'Giảm giá theo số tiền'},
        {value: 'GET_PRODUCT',condition: 'CONDITION_PRODUCT' ,label: 'Tặng dịch vụ'}
    ]

    const conditionOptions = [
        {value:'CONDITION_PRODUCT', label:'Theo Dịch vụ'},
        {value: 'CONDITION_PRICE', label: 'Theo tổng đơn giá'},
    ]

    const RenderConditionOPtion = () => {
        switch (conditionOption?.value) {
            case 'CONDITION_PRODUCT':
               return (
                <>
                    <Autocomplete
                        sx={{ marginTop: '20px' }}
                        disablePortal
                        value={{
                            title: conditionProduct?.title ?? ''
                        }}
                        getOptionLabel={(option) =>
                            option?.title ?? ''
                        }
                        options={listProducts ?? []}
                        fullWidth={true}
                        onChange={(event, newValue) => {
                            setConditionProduct(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params} label={'Tặng dịch vụ'}
                            />
                        )}
                    />
                    <TextField 
                        label={'Số lượng dịch vụ'}
                        fullWidth={true}
                        defaultValue={quantityProductBuy}
                        onBlur={(event) =>  {setQuanlityProductBuy(event.target.value)}}
                        />
                    
                </>
               )     
            case 'CONDITION_PRICE':
                return (
                    <>
                        
                        <TextField 
                        label={'Tổng tiền tối thiểu'}
                        fullWidth={true}
                        defaultValue={minimumTotal}
                        onBlur={(event) =>  {setMinimumTotal(event.target.value)}}
                        />
                    </>
                )
            default:
                return <></>
        }
    }

    const RenderPromotionOPtion = () => {
        switch (promotionOption?.value) {
            case 'PERCENT':
               return (
                <>
                    <TextField 
                        label={'Nhập %'}
                        fullWidth={true}
                        value={percent}
                        onBlur={(event) =>  {setPercent(event.target.value)}}
                    />
                    {/* <TextField 
                        label={'Số tiền giảm tối đa'}
                        fullWidth={true}
                        value={reductionAmount}
                        onBlur={(event) =>  {setReductionAmount(event.target.value)}}
                    />
                    <TextField 
                        label={'Tổng ngân thu'}
                        fullWidth={true}
                        value={reductionAmount}
                        onBlur={(event) =>  {setReductionAmount(event.target.value)}}
                    /> */}
                </>
               )     
            case 'PRICE':
                return (
                    <>
                        <TextField 
                            label={'Nhập số tiền'}
                            fullWidth={true}
                            defaultValue={reductionAmount}
                            onBlur={(event) =>  {setReductionAmount(event.target.value)}}
                        />
                    </>
                )
            case 'GET_PRODUCT':
                return (
                    <>
                        <Autocomplete
                            sx={{ marginTop: '20px' }}
                            disablePortal
                            value={{
                                title: getProduct?.title ?? ''
                            }}
                            getOptionLabel={(option) =>
                                option?.title ?? ''
                            }
                            options={listProducts ?? []}
                            fullWidth={true}
                            onChange={(event, newValue) => {
                                setGetProduct(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params} label={'Tặng dịch vụ'}
                                />
                            )}
                        />
                    </>
                )
            default:
                return <></>
        }
    }

    console.log(conditionOption);

    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />
            
            <FormTableLayout columns={subCols} rows={promotionRows  ?? [] } handleAddButton={handleAddButton}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={subFields} handleSubmit={handleSubmitToggle}>

                <Autocomplete
                    disablePortal
                    options={conditionOptions}
                    fullWidth={true}
                    onChange = {
                        (event, newValue) => {
                            setConditionOption(newValue);
                        }
                    }
                    renderInput={(params) => <TextField {...params} label={'Điều kiện giảm giá'} />}
                />
                <RenderConditionOPtion/>

                <Autocomplete
                    disablePortal
                    options={conditionPromotionOptions}
                    fullWidth={true}
                    onChange = {
                        (event, newValue) => {
                            setPromotionOption(newValue);
                        }
                    }
                    renderInput={(params) => <TextField {...params} label={'Loại giảm giá'} />}
                />
                <RenderPromotionOPtion/>
            </FormToggle>
            
        </Box>
    );
};

export default PromotionCreate;
