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
    const [startDate, setStartDate] = useState(dayjs().add(1, 'day'));
    const [endDate, setEndDate] = useState(dayjs().add(1, 'day'));
    const [isActive, setIsActive] = useState('Có');
    const [isUpdate, setIsUpdate] = useState(false);

    // price line

    const [priceLineId, setPriceLineId] = useState();
    const [price, setPrice] = useState();
    const [isActivePriceLine, setIsActivePriceLine] = useState('Có');
    const [product, setProduct] = useState();
    const [unit, setUnit] = useState({
        id: '276ac4a3-d5d6-11ed-a956-0242ac150002',
        title: 'Lượt',
        description: 'Không có mô tả',
        unit_code: 'LUOT',
        unitExchanges: null
    });
    const [priceLineRows, setPriceLineRows] = useState([]);


    useEffect(() => {
        axios.get(apiConfig.PRODUCT_API.GET_ALL_WITHOUT_PRICE).then((value) => {
            setListProduct(value.data);
        });
        // axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
        //     console.log(value.data);
        //     console.log(value.data[0]);
        //     setListUnit(value.data);
        //     setUnit(value.data[0]);
        // });
    }, []);

    const handleToggle = () => {
        if (openForm) setIsUpdate(false);
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
        console.log(startDate);
        if (title === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Chưa nhập tên bảng giá'
            });
            return;
        }

        if (!startDate || startDate === null) {
            Swal.fire({
                icon: 'error',
                title: 'Chưa nhập ngày bắt đầu bảng giá'
            });
            return;
        }

        if (!endDate || endDate === null) {
            Swal.fire({
                icon: 'error',
                title: 'Chưa nhập ngày kết thúc bảng giá'
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
                                '</b> đang kích hoạt trong: <b>' +
                                item.headerTitle +
                                '</b> <br/>')
                    );
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        html: `<h3>Tạo bảng giá không thành công</h3><div> ${note} </div>`
                    });
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        html: `<h3>Tạo bảng giá thành công</h3>`,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1500
                    });
                    navigate('/price');
                }
            });
    };

    const handleSubmitPriceLine = async () => {
        console.log(product);
        if (!product || product === null || product === undefined) {
            alert('Phải chọn sản phẩm để thêm vào bảng giá');
            return;
        }

        const priceList = price.split(',');
        const priceNew = priceList.join('');
        console.log(priceNew);
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
            type: 'date-picker',
            minDate: dayjs().add(1, 'day'),
            maxDate: endDate
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
        // {
        //     label: 'Đơn vị',
        //     type: 'combo',
        //     values: listUnit,
        //     useState: [unit, setUnit]
        // },
        {
            label: 'Giá sản phẩm',
            useState: [price, setPrice],
            type: 'text-price'
        }
        // {
        //     label: 'Kích hoạt',
        //     useState: [isActivePriceLine, setIsActivePriceLine],
        //     values: [
        //         {
        //             value: 'Có'
        //             //disabled: true
        //         },
        //         {
        //             value: 'Không'
        //         }
        //     ],
        //     type: 'radio'
        // }
    ];

    const priceLineCols = [
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
        },
        // { field: 'unit_title', flex: 1, headerName: 'Đơn vị' },
        // { field: 'is_active', flex: 1, headerName: 'Kích hoạt' },
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
                nameForm="Thông tin giá dịch vụ"
            />
        </Box>
    );
};

export default PriceCreate;
