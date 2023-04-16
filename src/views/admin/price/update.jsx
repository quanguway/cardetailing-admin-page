import { Box, Button } from '@mui/material';
import { apiConfig } from 'config/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
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

const PriceUpdate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);
    const [listUnit, setListUnit] = useState([]);

    const [title, setTitle] = useState(state.data.title);
    const [startDate, setStartDate] = useState(dayjs(state.data.start_date));
    const [endDate, setEndDate] = useState(dayjs(state.data.end_date));
    const [isActive, setIsActive] = useState(renderYesNo(state.data.is_active));
    const [isUpdate, setIsUpdate] = useState(false);

    // price line

    const [priceLineId, setPriceLineId] = useState();
    const [price, setPrice] = useState();
    const [isActivePriceLine, setIsActivePriceLine] = useState(
        renderYesNo(state.data.is_active)
    );
    const [product, setProduct] = useState();
    const [unit, setUnit] = useState();
    const [priceLineRows, setPriceLineRows] = useState([]);

    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL_WITHOUT_PRICE).then((value) => {
            setListProduct(value.data);
        });
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data);
        });
    }, []);

    const handleToggle = () => {
        if (openForm) setIsUpdate(false);
        setOPenForm(!openForm);
    };

    useEffect(() => {
        axios
            .get(apiConfig.PRICE_LINE.GET_BY_PRICE_HEADER_ID, {
                params: { price_header_id: state.data.id }
            })
            .then((value) => {
                const dataCustom = value.data.map((item) => {
                    return {
                        id: item.id,
                        product_id: item.product.id,
                        product_title: item.product.title,
                        unit_title: item.unit.title,
                        product: item.product,
                        unit: item.unit,
                        is_active: renderYesNo(item.is_active),
                        price: item.price
                    };
                });
                setPriceLineRows(dataCustom);
            });
    }, []);

    const handleSubmit = async () => {
        const princeLinecustom = priceLineRows.map(
            ({ product, product_title, unit, unit_title, ...orther }) => orther
        );
        var params = {
            priceHeader: {
                id: uuid(),
                title: title,
                start_date: startDate.format(dateSQL),
                end_date: endDate.format(dateSQL)
            },
            priceLines: princeLinecustom
        };

        await axios.post(apiConfig.PRICE_HEADER.UPDATE, params).then(() => {
            navigate('/price');
        });
    };

    const handleSubmitPriceLine = async () => {
        if (!product || product === null || product === undefined) {
            alert('Phải chọn sản phẩm để thêm vào bảng giá');
            return;
        }
        const priceList = price.split(',');
        const priceNew = priceList.join('');
        if (price !== '') {
            if (Number.parseInt(priceNew) <= 0) {
                alert('Giá dịch vụ phải lớn hơn 0');
                return;
            }
        } else {
            alert('Giá dịch vụ không được trống');
            return;
        }

        const tmp = priceLineRows.findIndex(
            (item) => item.product_id === product.id
        );

        if (tmp >= 0 && !isUpdate) {
            alert('Sản phẩm đã có trong bảng giá, hãy chọn sản phẩm khác !');
            return;
        }
        const rows = {
            id: uuid(),
            price: priceList.join(''),
            is_active: YesNoToBool(isActivePriceLine),
            product: product,
            product_id: product.id,
            product_title: product.title,
            unit: {
                id: '276ac4a3-d5d6-11ed-a956-0242ac150002',
                title: 'Lượt',
                description: 'Không có mô tả',
                unit_code: 'LUOT',
                unitExchanges: null
            },
            unit_id: '276ac4a3-d5d6-11ed-a956-0242ac150002',
            unit_title: 'Lượt'
        };
        setProduct(null);
        if (isUpdate) {
            const newRows = priceLineRows.map((item) => {
                if (item.product_id === rows.product_id) {
                    return rows;
                } else {
                    return item;
                }
            });
            setPriceLineRows(newRows);
        } else {
            setPriceLineRows([...priceLineRows, rows]);
        }
        setIsUpdate(false);
        handleToggle();
    };

    const fields = [
        {
            label: 'Tên bảng giá',
            name: 'title',
            useState: [title, setTitle],
            disabled: true
        },
        {
            label: 'Kích hoạt',
            useState: [isActive, setIsActive],
            values: [
                {
                    value: 'Có'
                },
                {
                    value: 'Không'
                }
            ],
            type: 'radio'
        },
        {
            label: 'Ngày áp dụng',
            useState: [startDate, setStartDate],
            type: 'date-picker',
            minDate: dayjs().add(1, 'day'),
            maxDate: endDate,
            disabled: !dayjs(startDate).isAfter(dayjs())
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            type: 'date-picker',
            minDate: startDate
        }
    ];

    const priceLineFields = [
        {
            label: 'Dịch vụ & sản phẩm',
            type: 'combo',
            values: listProducts,
            useState: [product, setProduct],
            disabled: isUpdate
        },
        {
            label: 'Giá sản phẩm',
            useState: [price, setPrice],
            type: 'text-price'
        }
    ];

    const renderColumnLine = () => {
        var fieldsLine = [
            { field: 'product_title', flex: 1, headerName: 'Tên dịch vụ' },
            {
                field: 'price',
                flex: 1,
                headerName: 'Giá',
                headerAlign: 'right',
                renderCell: (params) => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <b>
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(params.value)}
                        </b>
                    </div>
                )
            }
        ];
        if (dayjs(startDate).isAfter(dayjs())) {
            fieldsLine.push({
                field: 'actions',
                type: 'actions',
                headerName: 'hành động',
                flex: 1,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<IconTrash />}
                        label="Xóa"
                        onClick={() => {
                            if (
                                confirm(
                                    'Bạn muốn xóa sản phẩm này khỏi bảng giá ?'
                                )
                            ) {
                                setPriceLineRows(
                                    priceLineRows.filter(
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
                            setIsUpdate(true);
                            setPriceLineId(params.row.id);
                            setPrice(params.row.price);
                            setIsActivePriceLine('Không');
                            setProduct(params.row.product);
                            setUnit(params.row.unit);
                            handleToggle();
                        }}
                        showInMenu
                    />
                ]
            });
        }
        return fieldsLine;
    };

    const priceLineCols = renderColumnLine();
    const handleAddButton = () => {
        setPriceLineId('');
        setPrice('');
        setIsActivePriceLine('Có');
        setProduct();
        setUnit();
        handleToggle();
    };

    return (
        <Box>
            <FormSimpleLayout
                nameButtonSave={'Cập nhật bảng giá'}
                fields={fields}
                handleSubmit={handleSubmit}
                returnButton={true}
            />

            <FormTableLayout
                columns={priceLineCols}
                rows={priceLineRows ?? []}
                addButton={dayjs(startDate).isAfter(dayjs())}
                handleAddButton={handleAddButton}
            />

            <FormToggle
                open={openForm}
                handleToggle={handleToggle}
                fields={priceLineFields}
                handleSubmit={handleSubmitPriceLine}
                nameForm="Thông tin giá dịch vụ"
            />
        </Box>
    );
};

export default PriceUpdate;
