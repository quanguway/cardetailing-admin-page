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
        axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
            setListProduct(value.data);
        });
        axios.get(apiConfig.UNIT_API.GET_ALL).then((value) => {
            setListUnit(value.data);
        });
    }, []);

    const handleToggle = () => {
        setOPenForm(!openForm);
    };

    useEffect(() => {
        axios
            .get(apiConfig.PRICE_LINE.GET_BY_PRICE_HEADER_ID, {
                params: { price_header_id: state.data.id }
            })
            .then((value) => {
                const dataCustom = value.data.map((item) => {
                    // console.log(item.is_active);
                    return {
                        id: item.id,
                        product_title: item.product.title,
                        unit_title: item.unit.title,
                        is_active: renderYesNo(item.is_active),
                        price: item.price
                    };
                });
                console.log(value);
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

        await axios.post(apiConfig.PRICE_HEADER.CREATE, params).then(() => {
            navigate('/price');
        });
    };

    const handleSubmitPriceLine = async () => {
        const params = {
            id: priceLineId,
            item: {
                is_active: YesNoToBool(isActivePriceLine)
            }
        };
        await axios.post(apiConfig.PRICE_LINE.UPDATE, params);
        window.location.reload();
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
                    value: 'Có',
                    disabled: true
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
            disabled: true
        },
        {
            label: 'Ngày kết thúc',
            useState: [endDate, setEndDate],
            type: 'date-picker'
        }
    ];

    const priceLineCols = [
        { field: 'product_title', flex: 1, headerName: 'Tên dịch vụ' },
        { field: 'price', flex: 1, headerName: 'Giá' },
        { field: 'unit_title', flex: 1, headerName: 'Đơn vị' },
        { field: 'is_active', flex: 1, headerName: 'Kích hoạt ' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'hành động',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Hủy kích hoạt"
                    sx={{ backgroundColor: 'red' }}
                    onClick={() => {
                        console.log(params);
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <FormSimpleLayout fields={fields} handleSubmit={handleSubmit} />

            <FormTableLayout
                columns={priceLineCols}
                rows={priceLineRows ?? []}
                addButton={false}
            />
        </Box>
    );
};

export default PriceUpdate;
