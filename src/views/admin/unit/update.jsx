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
import DrawerToggle from 'component/DrawerToggle';
import TableEditableLayout from 'layout/TableLayout/TableEditableLayout';
import ProgressAction from 'layout/TableLayout/TableEditableLayout/ProgressAction';
import FormToggle from 'component/DrawerToggle/FormToggle';

const UnitUpdate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [openForm, setOPenForm] = useState(false);
    const [listProducts, setListProduct] = useState([]);

    //unit

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [unitCode, setUnitCode] = useState('');
    const [note, setNote] = useState('');

    const [helperTitle, setHelperTitle] = useState();
    const [helperUnitCode, setHelperUnitCode] = useState();

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorUnitCode, setErrorUnitCode] = useState(false);

    // unitExchange

    const [unitExchangeId, setUnitExchangeId] = useState();
    const [value, setValue] = useState();
    const [isBaseUnit, setIsBaseUnit] = useState();
    const [isReport, setIsReport] = useState();
    const [isActive, setIsActive] = useState();
    const [allowSale, setAllowSale] = useState();
    const [product, setProduct] = useState();

    const [unitExchangeRows, setUnitExchangeRows] = useState([]);

    useEffect(() => {
        if (!state?.data) navigate('/unit');
        else {
            setTitle(state?.data?.title);
            setDescription(state?.data?.description);
            setUnitCode(state?.data?.unit_code);
            setNote(state?.data?.note);
            // setUnitExchangeRows(state.data.unitExchanges.map((element) => {return {...element, product_title: element.product.title}}))
            axios
                .get(apiConfig.UNIT_EXCHANGE_API.GET_BY_UNIT_ID, {
                    params: { unit_id: state?.data?.id }
                })
                .then((value) => {
                    setUnitExchangeRows(
                        value.data.map((element) => {
                            return {
                                ...element,
                                product_title: element.product.title
                            };
                        })
                    );
                });

            axios.get(apiConfig.PRODUCT_API.GET_ALL).then((value) => {
                setListProduct(value.data);
            });
        }
    }, []);

    const handleToggle = () => {
        setOPenForm(!openForm);
    };

    const handleSubmit = async () => {
        if (!title || title.trim() === '') {
            setErrorTitle(true);
            setHelperTitle('* Tên đơn vị không được trống');
        } else {
            setErrorTitle(false);
            setHelperTitle('');
        }
        if (!unitCode || unitCode.trim() === '') {
            setErrorUnitCode(true);
            setHelperUnitCode('* Mã đơn vị không được trống');
        } else {
            setErrorUnitCode(false);
            setHelperUnitCode('');
        }

        if (
            !unitCode ||
            unitCode.trim() === '' ||
            !title ||
            title.trim() === ''
        )
            return;

        var params = {
            id: state.data?.id ?? undefined,
            unit: {
                title: title,
                description: description,
                note: note,
                unit_code: unitCode
            }
        };
        // log
        if (state.mode == 'UPDATE') {
            await axios.post(apiConfig.UNIT_API.UPDATE, params).then((res) => {
                if (res.data.status === 'SUCCESS') navigate('/unit');
                else console.log('Fail  when create unit');
            });
        } else if (state.mode == 'CREATE') {
            await axios.post(apiConfig.UNIT_API.CREATE, params).then((res) => {
                if (res.data.status === 'SUCCESS') navigate('/unit');
                else console.log('Fail  when create unit');
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
        };
        await axios.post(apiConfig.UNIT_EXCHANGE_API.UPDATE, params);
        window.location.reload();
    };

    const fields = [
        {
            name: 'Title',
            label: 'Tên đơn vị',
            useState: [title, setTitle],
            helper: helperTitle,
            isError: errorTitle
        },
        {
            name: 'unit_code',
            label: 'Mã đơn vị',
            useState: [unitCode, setUnitCode],
            helper: helperUnitCode,
            isError: errorUnitCode
        },
        {
            name: 'description',
            label: 'Mô tả',
            useState: [description, setDescription],
            type: 'textarea'
        },
        {
            name: 'note',
            label: 'Chú thích',
            useState: [note, setNote],
            type: 'textarea'
        }
    ];

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
                }
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
                }
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
                }
            ],
            type: 'radio'
        },
        {
            label: 'allowSale',
            useState: [allowSale, setAllowSale],
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
            label: 'products',
            type: 'combo',
            values: listProducts,
            useState: [product, setProduct]
        }
    ];

    const unitExchangeCols = [
        { field: 'value', flex: 1 },
        { field: 'is_base_unit', flex: 1 },
        { field: 'is_report', flex: 1 },
        { field: 'product_title', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'actions',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<IconTrash />}
                    label="Delete"
                    onClick={() => {
                        if (confirm('Do you want delete this item ?')) {
                            axios
                                .delete(apiConfig.UNIT_API.DELETE, {
                                    data: { id: params.id }
                                })
                                .then(() => {
                                    window.location.reload();
                                });
                        }
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<IconPencil />}
                    label="Edit"
                    onClick={() => {
                        setUnitExchangeId(params.row.id);
                        setValue(params.row.value);
                        setAllowSale(renderYesNo(params.row.allow_sale));
                        setIsBaseUnit(renderYesNo(params.row.is_base_unit));
                        setIsActive(renderYesNo(params.row.is_active));
                        setProduct(params.row.product);
                        handleToggle();
                    }}
                    showInMenu
                />
            ]
        }
    ];

    return (
        <Box>
            <FormSimpleLayout
                mode={state?.mode}
                fields={fields}
                api={state?.api}
                handleSubmit={handleSubmit}
                returnButton={true}
            />
            {/* <FormTableLayout
                columns={unitExchangeCols}
                rows={unitExchangeRows ?? []}
            />
            <FormToggle
                open={openForm}
                handleToggle={handleToggle}
                fields={unitExchangeFields}
                handleSubmit={handleSubmitUniExchange}
            /> */}
        </Box>
    );
};

export default UnitUpdate;
