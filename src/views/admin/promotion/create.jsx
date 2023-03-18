import { Autocomplete, Box, Button, TextField, } from '@mui/material';
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
    const [promotionRows, setPromotionRows] = useState([]);
    const [titlePromotionLine, setTitlePromotionLine] = useState();
    const [promotionCode, setPromotionCode] = useState();
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [type, setType] = useState();
    const [statusPromotionLine, setStatusPromotionLine] = useState("Có");

    const [reductionAmount, setReductionAmount] = useState();
    const [percent, setPercent] = useState();
    const [maxQuantityPerCustomer, setNoteMaxQuantityPerCustomer] = useState()
    const [maxQuantityPerCustomerPerDay, setMaxQuantityPerCustomerPerDay] = useState()


    const [promotionOption, setPromotionOption] = useState();

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setListProduct(value.data)
        })
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data)
        })
    },[])

    useEffect(() => {
        setReductionAmount('');
        setPercent('')
    }, [promotionOption])

    const handleToggle = () => {
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
            type: promotionOption.value,
            reduction_amount: reductionAmount,
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

    const promotionOptions = [
        {value:'PERCENT', label:'Giảm giá theo %'},
        {value: 'PRICE', label: 'Giảm giá theo giá'},
    ]

    const RenderPromotionOPtion = () => {
        switch (promotionOption?.value) {
            case 'PERCENT':
               return (
                <>
                    <TextField 
                        label={'Nhập %'}
                        fullWidth={true}
                        value={reductionAmount}
                        onChange={(event) =>  {setReductionAmount(event.target.value)}}
                    />
                </>
               )     
            case 'PRICE':
                return (
                    <>
                        <TextField 
                            label={'Nhập số tiền'}
                            fullWidth={true}
                            defaultValue={percent}
                            onChange={(event) =>  {setPercent(event.target.value)}}
                        />
                    </>
                )
            default:
                return <></>
        }
    }

    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />
            
            <FormTableLayout columns={subCols} rows={promotionRows  ?? [] } handleAddButton={handleAddButton}/>
            <FormToggle open={openForm} handleToggle={handleToggle} fields={subFields} handleSubmit={handleSubmitToggle}>
                <Autocomplete
                    disablePortal
                    options={promotionOptions}
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
