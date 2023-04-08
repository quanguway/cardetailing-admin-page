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
import Swal from 'sweetalert2';

const PriceCreate = () => {
    const navigate = useNavigate();
    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);
    const [listUnit, setListUnit] = useState([]);

    const [title, setTitle] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isActive, setIsActive] = useState('Có');

    // price line

    const [priceLineId, setPriceLineId] = useState();
    const [price, setPrice] = useState();
    const [isActivePriceLine, setIsActivePriceLine] = useState('Có');
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
        setOPenForm(!openForm);
    };

    const handleSubmit = async () => {
        const princeLinecustom = priceLineRows.map(
            ({ product, product_title, unit, unit_title, ...orther }) => orther
        );

        if (princeLinecustom.length <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Chưa có sản phẩm trong bảng giá'
            });
            return;
        }
        console.log(title);
        if (title === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Chưa nhập tên bảng giá'
            });
            return;
        }

        var params = {
            priceHeader: {
                id: uuid(),
                title: title,
                start_date: startDate.format(dateSQL),
                end_date: endDate.format(dateSQL),
                is_active: YesNoToBool(isActive)
            },

            priceLines: princeLinecustom
        };

        await axios
            .post(apiConfig.PRICE_HEADER.CREATE, params)
            .then((reponse) => {
                console.log(reponse.data);
                if (reponse.data.status === 'FAIL') {
                    var note = '';
                    reponse.data.data.map(
                        (item) =>
                            (note +=
                                ' Dịch vụ <b>' +
                                item.productTitle +
                                ' / ' +
                                item.unitTitle +
                                '</b> đang kích hoạt trong bảng giá <b>' +
                                item.headerTitle +
                                '</b> <br/>')
                    );
                    Swal.fire({
                        icon: 'error',
                        title: 'Tạo bảng giá không thành công',
                        html: `<div> ${note} </div>`
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tạo bảng giá thành công',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/price');
                }
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
            unit_title: unit.title
        };
        setPriceLineRows([...priceLineRows, rows]);
        handleToggle();
    };

    const fields = [
        {
            label: 'Tên bảng giá',
            name: 'title',
            useState: [title, setTitle]
        },
        {
            label: 'Kích hoạt',
            useState: [isActive, setIsActive],
            values: [
                {
                    value: 'Có'
                    //disabled: true
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
            type: 'date-picker'
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        }
    ];

    const priceLineFields = [
        {
            label: 'Dịch vụ & sản phẩm',
            type: 'combo',
            values: listProducts,
            useState: [product, setProduct]
        },
        {
            label: 'Đơn vị',
            type: 'combo',
            values: listUnit,
            useState: [unit, setUnit]
        },
        {
            label: 'Giá sản phẩm',
            useState: [price, setPrice]
        },
        {
            label: 'Kích hoạt',
            useState: [isActivePriceLine, setIsActivePriceLine],
            values: [
                {
                    value: 'Có'
                    //disabled: true
                },
                {
                    value: 'Không'
                }
            ],
            type: 'radio'
        }
    ];

    const priceLineCols = [
        { field: 'product_title', flex: 1, headerName: 'Tên dịch vụ' },
        { field: 'price', flex: 1, headerName: 'Giá' },
        { field: 'unit_title', flex: 1, headerName: 'Đơn vị' },
        { field: 'is_active', flex: 1, headerName: 'Kích hoạt' },
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
                        if (
                            confirm('Bạn muốn xóa sản phẩm này khỏi bảng giá ?')
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
        }
    ];

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
                fields={fields}
                handleSubmit={handleSubmit}
                nameForm="Thêm bảng giá"
                returnButton={true}
                nameButtonSave="Lưu thông tin bảng giá"
            />

            <FormTableLayout
                nameTable="Danh sách chi tiết"
                columns={priceLineCols}
                rows={priceLineRows ?? []}
                handleAddButton={handleAddButton}
            />
            <FormToggle
                open={openForm}
                handleToggle={handleToggle}
                fields={priceLineFields}
                handleSubmit={handleSubmitPriceLine}
            />
        </Box>
    );
};

export default PriceCreate;
