import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
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
import Swal from 'sweetalert2';

const PromotionCreate = () => {
    const navigate = useNavigate();
    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);
    const [listUnit, setListUnit] = useState([]);

    const [title, setTitle] = useState();
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState('Kích hoạt');
    const [note, setNote] = useState();

    const [helperPromotionEndDate, setHelperPromotionEndDate] = useState();
    const [helperPromotionStartDate, setHelperPromotionStartDate] = useState();
    const [helperCode, setHelperCode] = useState();
    const [helperTitle, setHelperTitle] = useState();

    const [isErrorPromotionEndDate, setIsErrorPromotionEndDate] =
        useState(false);
    const [isErrorPromotionStartDate, setIsErrorPromotionStartDate] =
        useState(false);
    const [isErrorCode, setIsErrorCode] = useState(false);
    const [isErrorTitle, setIsErrorTitle] = useState(false);

    // price line

    const [promotionRows, setPromotionRows] = useState([]);

    const [promotionStartDate, setPromotionStartDate] = useState(
        dayjs(new Date())
    );
    const [promotionEndDate, setPromotionEndDate] = useState(
        dayjs(new Date()).add(1, 'day')
    );

    const [titlePromotionLine, setTitlePromotionLine] = useState();
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [statusPromotionLine, setStatusPromotionLine] = useState('Kích hoạt');
    const [promotionCode, setPromotionCode] = useState();
    const [endDate, setEndDate] = useState(dayjs(new Date()).add(1, 'day'));

    const [reductionAmountMaximum, setReductionAmountMaximum] = useState();
    const [totalBudget, setTotalBudget] = useState();
    const [maxCustomer, setMaxCustomer] = useState();
    const [percent, setPercent] = useState();
    const [getProduct, setGetProduct] = useState(null);

    const [conditionProduct, setConditionProduct] = useState();
    const [quantityProductBuy, setQuanlityProductBuy] = useState();
    const [quantityProductReceive, setQuanlityProductReceive] = useState();
    const [minimumTotal, setMinimumTotal] = useState();

    const [maxQuantityPerCustomer, setNoteMaxQuantityPerCustomer] = useState();
    const [maxQuantityPerCustomerPerDay, setMaxQuantityPerCustomerPerDay] =
        useState();

    const [promotionOption, setPromotionOption] = useState();
    const [conditionOption, setConditionOption] = useState();
    const [conditionPromotionOptions, setConditionPromotionOptions] =
        useState();

    const [maximumReductionAmountMaximum, setMaxReductionAmountMaximum] =
        useState();

    useEffect(() => {
        setConditionOption({
            value: 'CONDITION_PRODUCT',
            label: 'Dịch vụ'
        });
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            console.log(value.data);
            setListProduct(value.data);
        });
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data);
        });
    }, []);

    useEffect(() => {
        setReductionAmountMaximum(null);
        setPercent(null);
        setGetProduct(null);
    }, [promotionOption]);

    useEffect(() => {
        setConditionProduct(null);
        setQuanlityProductBuy(null);
        setMinimumTotal(null);
        const listOption = promotionOptions.filter(
            (item) => item.condition === conditionOption?.value
        );
        setConditionPromotionOptions(listOption);
        setPromotionOption(listOption[0]);
    }, [conditionOption]);

    const handleToggle = () => {
        setTitlePromotionLine('');
        setPromotionCode('');
        setNoteMaxQuantityPerCustomer('');
        setMaxQuantityPerCustomerPerDay('');
        setOPenForm(!openForm);
    };

    const checkTitlePromotion = () => {
        if (!title || title === '') {
            setHelperTitle('* Bắt buộc nhập tên bảng khuyến mãi');
            setIsErrorTitle(true);
            return true;
        } else {
            setHelperTitle('');
            setIsErrorTitle(false);
            return false;
        }
    };
    // useEffect(() =>{
    //     checkTitlePromotion();
    // },[title])

    const checkPromotionDate = () => {
        if (!promotionEndDate || promotionEndDate === '') {
            setHelperPromotionEndDate('* Bắt buộc nhập Ngày kết thúc');
            setIsErrorPromotionEndDate(true);
            Swal.fire({
                icon: 'error',
                title: '* Bắt buộc nhập Ngày kết thúc'
            });
            return true;
        } else if (!promotionStartDate || promotionStartDate === '') {
            setHelperPromotionStartDate('* Bắt buộc nhập ngày áp dụng');
            setIsErrorPromotionStartDate(true);
            Swal.fire({
                icon: 'error',
                title: '* Bắt buộc nhập ngày áp dụng'
            });
            return true;
        }
        if (!(!promotionStartDate || promotionStartDate === '')) {
            console.log('test');
            setHelperPromotionStartDate('');
            setIsErrorPromotionStartDate(false);
        }
        if (!(!promotionEndDate || promotionEndDate === '')) {
            setHelperPromotionEndDate('');
            setIsErrorPromotionEndDate(false);
        }
        return false;
    };
    // useEffect(() =>{
    //     checkPromotionEndDate();
    // },[promotionEndDate])

    const checkCodePromotion = () => {
        if (!code || code === '') {
            setHelperCode('* Bắt buộc nhập mã');
            setIsErrorCode(true);
            return true;
        } else {
            setHelperCode('');
            setIsErrorCode(false);
            return false;
        }
    };
    // useEffect(() =>{
    //     checkCodePromotion();
    // },[code])

    const handleSubmit = async () => {
        if (
            !(
                !checkTitlePromotion() &&
                !checkCodePromotion() &&
                !checkPromotionDate()
            )
        ) {
            return;
        }

        // const promotionRowsCustomer = promotionRows.map((item) =>  ({...item, id: uuid()}))
        var params = {
            promotion: {
                id: uuid(),
                title: title,
                description: description,
                note: note,
                status: status === 'Kích hoạt' ? true : false,
                date_start: promotionStartDate.format(dateSQL),
                date_end: promotionEndDate.format(dateSQL)
            },
            promotionDetail: promotionRows
        };

        console.log(params);
        await axios.post(apiConfig.PROMOTION_API.CREATE, params).then(() => {
            navigate('/promotion');
        });
    };

    const handleSubmitToggle = async () => {
        const rows = {
            id: uuid(),
            promotion_code: promotionCode,
            title: titlePromotionLine,
            type: conditionOption.value + '/' + promotionOption.value,
            status: statusPromotionLine,
            maximum_reduction_amount: reductionAmountMaximum ?? null,
            product_title: getProduct?.title ?? '',
            product_received_id: getProduct?.id ?? null,
            product_buy_id: conditionProduct?.id ?? null,
            quantity_product_buy: quantityProductBuy ?? null,
            quantity_product_received: quantityProductReceive ?? null,
            minimum_total: minimumTotal ?? null,
            percent: percent ?? null,
            total_budget: totalBudget ?? null,
            max_customer: maxCustomer ?? null,
            start_date: startDate.format(dateSQL),
            end_date: endDate.format(dateSQL)
        };
        console.log([...promotionRows, rows]);
        setPromotionRows([...promotionRows, rows]);
        handleToggle();
    };

    const fields = [
        {
            label: 'Tên bảng khuyến mãi',
            name: 'title',
            helper: helperTitle,
            isError: isErrorTitle,
            useState: [title, setTitle]
        },
        {
            label: 'Mã bảng khuyến mãi',
            name: 'code',
            helper: helperCode,
            isError: isErrorCode,
            useState: [code, setCode]
        },
        {
            label: 'Trạng thái',
            useState: [status, setStatus],
            values: [
                {
                    value: 'Kích hoạt'
                },
                {
                    value: 'Không kích hoạt'
                }
            ],
            type: 'radio'
        },
        {
            label: 'Ngày bắt đầu',
            useState: [promotionStartDate, setPromotionStartDate],
            helper: helperPromotionStartDate,
            isError: isErrorPromotionStartDate,
            type: 'date-picker'
        },
        {
            label: 'Ngày kết thúc',
            useState: [promotionEndDate, setPromotionEndDate],
            helper: helperPromotionEndDate,
            isError: isErrorPromotionEndDate,
            type: 'date-picker'
        },
        {
            label: 'Mô tả',
            useState: [description, setDescription],
            type: 'textarea'
        },
        {
            label: 'Chú thích',
            useState: [note, setNote],
            type: 'textarea'
        }
    ];

    const subFields = [
        {
            label: 'Mã khuyến mãi',
            useState: [promotionCode, setPromotionCode]
        },
        {
            label: 'Tên khuyễn mãi',
            useState: [titlePromotionLine, setTitlePromotionLine]
        },
        {
            label: 'Ngày áp dụng',
            useState: [startDate, setStartDate],
            type: 'date-picker'
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        },
        {
            label: 'Trạng thái',
            useState: [statusPromotionLine, setStatusPromotionLine],
            values: [
                {
                    value: 'Kích hoạt'
                },
                {
                    value: 'Không kích hoạt'
                }
            ],
            type: 'radio'
        }
        // {
        //     label: 'Mỗi khách hàng được sử dụng tối đa',
        //     useState: [maxQuantityPerCustomer, setNoteMaxQuantityPerCustomer]
        // },
        // {
        //     label: 'Số lần sử dụng tối đa trong ngày',
        //     useState: [
        //         maxQuantityPerCustomerPerDay,
        //         setMaxQuantityPerCustomerPerDay
        //     ]
        // }
    ];

    const subCols = [
        { field: 'promotion_code', headerName: 'Mã khuyến mãi', flex: 1 },
        { field: 'title', headerName: 'Tên khuyến mãi', flex: 1 },
        { field: 'start_date', headerName: 'Ngày áp dụng', flex: 1 },
        { field: 'end_date', headerName: 'Ngày kết thúc', flex: 1 },
        { field: 'type', headerName: 'Loại khuyến mãi', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Xóa"
                    onClick={() => {
                        if (confirm('Bạn muốn xóa khuyến mãi này ?')) {
                            setPromotionRows(
                                promotionRows.filter(
                                    (item) => item.id !== params.row.id
                                )
                            );
                        }
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Chỉnh sửa"
                    onClick={() => {
                        handleToggle();
                    }}
                    showInMenu
                />
            ]
        }
    ];

    const handleAddButton = () => {
        handleToggle();
    };

    const promotionOptions = [
        {
            value: 'PERCENT',
            condition: 'CONDITION_PRICE',
            label: 'Giảm giá theo %'
        },
        {
            value: 'PRICE',
            condition: 'CONDITION_PRICE',
            label: 'Giảm giá theo số tiền cụ thể'
        },
        {
            value: 'GET_PRODUCT',
            condition: 'CONDITION_PRODUCT',
            label: 'Tặng dịch vụ'
        }
    ];

    const conditionOptions = [
        { value: 'CONDITION_PRODUCT', label: 'Dịch vụ' },
        { value: 'CONDITION_PRICE', label: 'Hóa đơn' }
    ];

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
                            getOptionLabel={(option) => option?.title ?? ''}
                            options={listProducts ?? []}
                            fullWidth={true}
                            onChange={(event, newValue) => {
                                setConditionProduct(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={'Dịch vụ sử dụng'}
                                />
                            )}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng sử dụng'}
                            fullWidth={true}
                            defaultValue={quantityProductBuy}
                            onBlur={(event) => {
                                setQuanlityProductBuy(event.target.value);
                            }}
                        />
                    </>
                );
            case 'CONDITION_PRICE':
                return (
                    <>
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Tổng tiền hóa đơn tối thiểu'}
                            fullWidth={true}
                            defaultValue={minimumTotal}
                            onBlur={(event) => {
                                setMinimumTotal(event.target.value);
                            }}
                        />
                    </>
                );
            default:
                return <></>;
        }
    };

    const RenderPromotionOPtion = () => {
        switch (promotionOption?.value) {
            case 'PERCENT':
                return (
                    <>
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Nhập % được giảm'}
                            fullWidth={true}
                            defaultValue={percent}
                            onBlur={(event) => {
                                setPercent(event.target.value);
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số tiền giảm tối đa'}
                            fullWidth={true}
                            defaultValue={reductionAmountMaximum}
                            onBlur={(event) => {
                                setReductionAmountMaximum(event.target.value);
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Tổng ngân sách áp dụng'}
                            fullWidth={true}
                            defaultValue={totalBudget}
                            onBlur={(event) => {
                                setTotalBudget(event.target.value);
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng khách áp dụng'}
                            fullWidth={true}
                            defaultValue={maxCustomer}
                            onBlur={(event) => {
                                setMaxCustomer(event.target.value);
                            }}
                        />
                    </>
                );
            case 'PRICE':
                return (
                    <>
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Nhập số tiền cụ thể'}
                            fullWidth={true}
                            defaultValue={reductionAmountMaximum}
                            onBlur={(event) => {
                                setReductionAmountMaximum(event.target.value);
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Tổng ngân sách áp dụng'}
                            fullWidth={true}
                            defaultValue={totalBudget}
                            onBlur={(event) => {
                                setTotalBudget(event.target.value);
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng khách áp dụng'}
                            fullWidth={true}
                            defaultValue={maxCustomer}
                            onBlur={(event) => {
                                setMaxCustomer(event.target.value);
                            }}
                        />
                    </>
                );
            case 'GET_PRODUCT':
                return (
                    <>
                        <Autocomplete
                            sx={{ marginTop: '20px' }}
                            disablePortal
                            value={{
                                title: getProduct?.title ?? ''
                            }}
                            getOptionLabel={(option) => option?.title ?? ''}
                            options={listProducts ?? []}
                            fullWidth={true}
                            onChange={(event, newValue) => {
                                setGetProduct(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={'Dịch vụ được tặng'}
                                />
                            )}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng được tặng'}
                            fullWidth={true}
                            defaultValue={quantityProductReceive}
                            onBlur={(event) => {
                                setQuanlityProductReceive(event.target.value);
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng khách áp dụng'}
                            fullWidth={true}
                            defaultValue={maxCustomer}
                            onBlur={(event) => {
                                setMaxCustomer(event.target.value);
                            }}
                        />
                    </>
                );
            default:
                return <></>;
        }
    };

    // console.log(conditionOption);

    return (
        <Box>
            <FormSimpleLayout
                returnButton={true}
                nameButtonSave="Lưu thông tin"
                nameForm="Thêm bảng khuyến mãi"
                fields={fields}
                handleSubmit={handleSubmit}
            />

            <FormTableLayout
                columns={subCols}
                rows={promotionRows ?? []}
                handleAddButton={handleAddButton}
            />
            <FormToggle
                open={openForm}
                handleToggle={handleToggle}
                fields={subFields}
                handleSubmit={handleSubmitToggle}
            >
                <Autocomplete
                    sx={{ marginTop: '20px' }}
                    disablePortal
                    options={conditionOptions}
                    defaultValue={{
                        value: 'CONDITION_PRODUCT',
                        label: 'Dịch vụ'
                    }}
                    fullWidth={true}
                    onChange={(event, newValue) => {
                        setConditionOption(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={'khuyến mãi áp dụng cho'}
                        />
                    )}
                />
                <RenderConditionOPtion />

                <Autocomplete
                    sx={{ marginTop: '20px' }}
                    disablePortal
                    options={conditionPromotionOptions}
                    value={promotionOption}
                    fullWidth={true}
                    onChange={(event, newValue) => {
                        setPromotionOption(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label={'Khuyến mãi nhận được'} />
                    )}
                />
                <RenderPromotionOPtion />
            </FormToggle>
        </Box>
    );
};

export default PromotionCreate;
