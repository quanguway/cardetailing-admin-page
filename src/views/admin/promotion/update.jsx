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
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';

const PromotionUpdate = () => {
    const { state } = useLocation();
    const [mode, setMode] = useState('CREATE');
    const navigate = useNavigate();
    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);
    const [listUnit, setListUnit] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isUpdateID, setIsUpdateID] = useState();

    const [title, setTitle] = useState(state && state?.data.title);
    const [code, setCode] = useState(state && state?.data.code);
    const [description, setDescription] = useState(
        state && state?.data.description
    );
    const [status, setStatus] = useState(
        state && state?.data.status ? 'Kích hoạt' : 'Không kích hoạt'
    );
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
        state ? dayjs(state?.data?.date_start) : dayjs(new Date()).add(1, 'day')
    );
    const [promotionEndDate, setPromotionEndDate] = useState(
        state ? dayjs(state?.data?.date_end) : dayjs(new Date()).add(1, 'day')
    );

    const [titlePromotionLine, setTitlePromotionLine] = useState();
    const [startDate, setStartDate] = useState();
    const [statusPromotionLine, setStatusPromotionLine] = useState('Kích hoạt');
    const [promotionCode, setPromotionCode] = useState();
    const [endDate, setEndDate] = useState();

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
        const listOption = promotionOptions.filter(
            (item) => item.condition === 'CONDITION_PRODUCT'
        );
        setConditionPromotionOptions(listOption);
        axios.get(apiConfig.PRODUCT_API.GET_ALL_WITHOUT_PRICE).then((value) => {
            setPromotionRows(state?.data.promotionLines);
            state?.data.promotionLines.map((item) => {
                console.log(item);
            });
            setListProduct(value.data);
        });
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data);
        });
        if (state) {
            console.log(state);
            setMode(state.mode);
        }
    }, []);

    // useEffect(() => {
    //     setReductionAmountMaximum(null);
    //     setPercent(null);
    //     setGetProduct(null);
    // }, [promotionOption]);

    useEffect(() => {
        // setConditionProduct(null);
        // setQuanlityProductBuy(null);
        // setMinimumTotal(null);
        const listOption = promotionOptions.filter(
            (item) => item.condition === conditionOption?.value
        );
        setConditionPromotionOptions(listOption);
        setPromotionOption(listOption[0]);
    }, [conditionOption]);

    const handleToggle = () => {
        if (openForm) {
            setConditionOption({
                value: 'CONDITION_PRODUCT',
                label: 'Dịch vụ'
            });
            const listOption = promotionOptions.filter(
                (item) => item.condition === 'CONDITION_PRODUCT'
            );
            setIsUpdate(false);
            setMaxCustomer(null);
            setConditionPromotionOptions(listOption);
            setConditionProduct(null);
            setQuanlityProductBuy(null);
            setReductionAmountMaximum(null);
            setPercent(null);
            setGetProduct(null);
            setTitlePromotionLine(null);
            setPromotionCode(null);
            setMinimumTotal(null);
            setNoteMaxQuantityPerCustomer(null);
            setMaxQuantityPerCustomerPerDay(null);
            setStatusPromotionLine('Kích hoạt');
        }
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
        if (!(!checkTitlePromotion() && !checkCodePromotion())) {
            return;
        }
        console.log('prem');
        // const promotionRowsCustomer = promotionRows.map((item) =>  ({...item, id: uuid()}))
        var params = {
            promotion: {
                id: uuid(),
                code: code,
                title: title,
                description: description,
                note: note,
                status: status === 'Kích hoạt' ? true : false,
                date_start: promotionStartDate.format(dateSQL),
                date_end: promotionEndDate.format(dateSQL)
            },
            promotionDetail: promotionRows
        };
        await axios
            .post(apiConfig.PROMOTION_API.CREATE, params)
            .then((value) => {
                navigate('/promotion');
            });
    };

    const handleSubmitToggle = async () => {
        if (!promotionCode || promotionCode === null) {
            alert('Chưa nhập mã khuyến mãi');
            return;
        }

        if (!titlePromotionLine || titlePromotionLine === null) {
            alert('Chưa nhập tên khuyến mãi');
            return;
        }

        if (!startDate || startDate === null) {
            alert('Chưa nhập ngày bắt đầu khuyến mãi');
            return;
        }

        if (!endDate || endDate === null) {
            alert('Chưa nhập ngày kết thúc khuyến mãi');
            return;
        }

        if (conditionOption?.value) {
            if (conditionOption?.value === 'CONDITION_PRODUCT') {
                if (
                    !conditionProduct ||
                    conditionProduct === null ||
                    conditionProduct === ''
                ) {
                    alert('Chưa nhập dịch vụ sử dụng');
                    return;
                }
                if (!getProduct || getProduct === null || getProduct === '') {
                    alert('Chưa nhập dịch vụ được tặng');
                    return;
                }
            } else {
                if (
                    !minimumTotal ||
                    minimumTotal === null ||
                    minimumTotal === ''
                ) {
                    alert('Chưa nhập giá trị hóa đơn tối thiểu');
                    return;
                } else {
                    const priceList = minimumTotal.split(',');
                    const priceNew = priceList.join('');
                    if (Number.parseInt(priceNew) <= 0) {
                        alert('Giá trị hóa đơn tối thiểu phải lớn hơn 0');
                        return;
                    }
                }

                if (promotionOptions) {
                    if (promotionOption?.value === 'PRICE') {
                        if (
                            !reductionAmountMaximum ||
                            reductionAmountMaximum === null ||
                            reductionAmountMaximum === ''
                        ) {
                            alert('Chưa nhập số tiền giảm');
                            return;
                        } else {
                            const priceList = reductionAmountMaximum.split(',');
                            const priceNew = priceList.join('');
                            if (Number.parseInt(priceNew) <= 0) {
                                alert('Số tiền giảm phải lớn hơn 0');
                                return;
                            }
                        }
                    } else if (promotionOption?.value === 'PERCENT') {
                        if (!percent || percent === null || percent === '') {
                            alert('Chưa nhập % giảm giá');
                            return;
                        } else {
                            if (Number.parseInt(percent) <= 0) {
                                alert('% giảm giá phải lớn hơn 0');
                                return;
                            } else if (Number.parseInt(percent) > 100) {
                                alert('% giảm giá phải nhỏ hơn 100');
                                return;
                            }
                        }
                        if (
                            !reductionAmountMaximum ||
                            reductionAmountMaximum === null ||
                            reductionAmountMaximum === ''
                        ) {
                            alert('Chưa nhập số tiền giảm tối đa');
                            return;
                        } else {
                            const priceList = reductionAmountMaximum.split(',');
                            const priceNew = priceList.join('');
                            if (Number.parseInt(priceNew) <= 0) {
                                alert('Số tiền giảm tối đa phải lớn hơn 0');
                                return;
                            }
                        }
                    }
                }
            }
        }

        //const priceList = reductionAmountMaximum?.split(',').join('');
        // const priceNew = priceList.join('');

        const rows = {
            id: isUpdate ? isUpdateID : uuid(),
            promotion_code: promotionCode,
            title: titlePromotionLine,
            type: conditionOption.value + '/' + promotionOption.value,
            status: statusPromotionLine,
            maximum_reduction_amount:
                reductionAmountMaximum?.split(',')?.join('') ?? null,
            product_title: getProduct?.title ?? '',
            product_received_id: getProduct?.id ?? null,
            product_buy_id: conditionProduct?.id ?? null,
            quantity_product_buy: 1,
            quantity_product_received: 1,
            minimum_total: minimumTotal?.split(',')?.join('') ?? null,
            percent: percent ?? null,
            total_budget: totalBudget ?? null,
            max_customer: maxCustomer ?? null,
            start_date: startDate.format(dateSQL),
            end_date: endDate.format(dateSQL),
            product_received: getProduct ?? null,
            product_buy: conditionProduct ?? null
        };
        console.log(rows);
        if (isUpdate) {
            const tmp = promotionRows.map((item) => {
                if (item.id === rows.id) return rows;
                else return item;
            });
            setPromotionRows(tmp);
        } else {
            setPromotionRows([...promotionRows, rows]);
        }
        handleToggle();
    };

    const fields = [
        {
            label: 'Tên bảng khuyến mãi',
            name: 'title',
            helper: helperTitle,
            isError: isErrorTitle,
            useState: [title, setTitle],
            disabled: !dayjs(promotionStartDate).isAfter(dayjs())
        },
        {
            label: 'Mã bảng khuyến mãi',
            name: 'code',
            helper: helperCode,
            isError: isErrorCode,
            useState: [code, setCode],
            disabled: !dayjs(promotionStartDate).isAfter(dayjs())
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
            minDate: dayjs().add(1, 'day'),
            maxDate: promotionEndDate,
            type: 'date-picker',
            disabled: !dayjs(promotionStartDate).isAfter(dayjs())
        },
        {
            label: 'Ngày kết thúc',
            useState: [promotionEndDate, setPromotionEndDate],
            helper: helperPromotionEndDate,
            isError: isErrorPromotionEndDate,
            type: 'date-picker',
            minDate: promotionStartDate
        },
        {
            label: 'Mô tả',
            useState: [description, setDescription],
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
            minDate: promotionStartDate,
            maxDate:
                endDate !== null
                    ? dayjs(endDate).isBefore(promotionEndDate)
                        ? endDate
                        : promotionEndDate
                    : promotionEndDate,
            type: 'date-picker'
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            minDate:
                startDate !== null
                    ? dayjs(startDate).isAfter(promotionStartDate)
                        ? startDate
                        : promotionStartDate
                    : promotionStartDate,
            maxDate: promotionEndDate,
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
        {
            field: 'start_date',
            headerName: 'Ngày áp dụng',
            flex: 1,
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
        {
            field: 'end_date',
            headerName: 'Ngày kết thúc',
            flex: 1,
            valueFormatter: (params) =>
                moment(params?.value).format('DD/MM/YYYY')
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params) => (
                <p>{params.value ? 'Kích hoạt' : 'Dừng hoạt động'} </p>
            )
        },
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
                        console.log(params.row);
                        const tmp = params.row.type.split('/');
                        setConditionOption(
                            conditionOptions.filter(
                                (item) => item.value === tmp[0]
                            )[0]
                        );
                        setConditionPromotionOptions(
                            promotionOptions.filter(
                                (item) => item.value === tmp[1]
                            )[0]
                        );
                        setMaxCustomer(params.row.max_customer);
                        setConditionProduct(params.row.product_buy);
                        setReductionAmountMaximum(
                            params.row.maximum_reduction_amount
                        );
                        setIsUpdateID(params.row.id);
                        setPercent(params.row.percent);
                        setGetProduct(params.row.product_received);
                        setTitlePromotionLine(params.row.title);
                        setPromotionCode(params.row.promotion_code);
                        setStatusPromotionLine(params.row.status);
                        setMinimumTotal(params.row.minimum_total);
                        setStartDate(dayjs(params.row.start_date));
                        setEndDate(dayjs(params.row.end_date));
                        setIsUpdate(true);
                        handleToggle();
                    }}
                    showInMenu
                />
            ]
        }
    ];

    const handleAddButton = () => {
        if (!promotionStartDate || promotionStartDate === null) {
            Swal.fire({
                icon: 'error',
                html: '<b>Chưa nhập ngày bắt đầu bảng khuyến mãi</b>'
            });
            return;
        }

        if (!promotionEndDate || promotionEndDate === null) {
            Swal.fire({
                icon: 'error',
                html: '<b>Chưa nhập ngày kết thúc bảng khuyến mãi</b>'
            });
            return;
        }

        setStartDate(promotionStartDate);
        setEndDate(promotionEndDate);

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
                        {/* <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng sử dụng'}
                            fullWidth={true}
                            defaultValue={quantityProductBuy}
                            onBlur={(event) => {
                                setQuanlityProductBuy(event.target.value);
                            }}
                        /> */}
                    </>
                );
            case 'CONDITION_PRICE':
                return (
                    <>
                        <NumericFormat
                            key="minimumTotalaa"
                            customInput={TextField}
                            sx={{ marginTop: '20px' }}
                            variant="outlined"
                            label={'Tổng tiền hóa đơn tối thiểu'}
                            value={minimumTotal}
                            fullWidth={true}
                            onBlur={(event) => {
                                setMinimumTotal(
                                    event.target.value.split(' VND')[0]
                                );
                            }}
                            thousandSeparator
                            valueIsNumericString
                            suffix=" VND"
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
                        <NumericFormat
                            customInput={TextField}
                            sx={{ marginTop: '20px' }}
                            variant="outlined"
                            label={'Số tiền giảm tối đa'}
                            value={reductionAmountMaximum}
                            fullWidth={true}
                            onBlur={(event) => {
                                console.log(event);
                                setReductionAmountMaximum(
                                    event.target.value.split(' VND')[0]
                                );
                            }}
                            thousandSeparator
                            valueIsNumericString
                            suffix=" VND"
                        />
                        <NumericFormat
                            customInput={TextField}
                            sx={{ marginTop: '20px' }}
                            variant="outlined"
                            label={'Tổng ngân sách áp dụng'}
                            value={totalBudget}
                            fullWidth={true}
                            onBlur={(event) => {
                                setTotalBudget(
                                    event.target.value.split(' VND')[0]
                                );
                            }}
                            thousandSeparator
                            valueIsNumericString
                            suffix=" VND"
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
                        <NumericFormat
                            customInput={TextField}
                            sx={{ marginTop: '20px' }}
                            variant="outlined"
                            label={'Nhập số tiền cụ thể'}
                            value={reductionAmountMaximum}
                            fullWidth={true}
                            onBlur={(event) => {
                                setReductionAmountMaximum(
                                    event.target.value.split(' VND')[0]
                                );
                            }}
                            thousandSeparator
                            valueIsNumericString
                            suffix=" VND"
                        />
                        <NumericFormat
                            key="totalBudget"
                            customInput={TextField}
                            sx={{ marginTop: '20px' }}
                            variant="outlined"
                            label={'Tổng ngân sách áp dụng'}
                            value={totalBudget}
                            fullWidth={true}
                            onBlur={(event) => {
                                setTotalBudget(
                                    event.target.value.split(' VND')[0]
                                );
                            }}
                            thousandSeparator
                            valueIsNumericString
                            suffix=" VND"
                        />
                        <TextField
                            key="maxCustomer"
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
                        {/* <TextField
                            sx={{ marginTop: '20px' }}
                            label={'Số lượng được tặng'}
                            fullWidth={true}
                            defaultValue={quantityProductReceive}
                            onBlur={(event) => {
                                setQuanlityProductReceive(event.target.value);
                            }}
                        /> */}
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
                nameTable={'Danh sách khuyến mại'}
                columns={subCols}
                rows={promotionRows ?? []}
                addButton={dayjs(promotionStartDate).isAfter(dayjs())}
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

export default PromotionUpdate;
