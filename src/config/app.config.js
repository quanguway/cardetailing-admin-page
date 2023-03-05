export const appConfig = {
    URL_API : 'http://localhost:8000',
}

export const apiConfig = {
    ADDRESS_API: {
        GET_ALL: `${appConfig.URL_API}/address`,
        GET: `${appConfig.URL_API}/address/none-root`,
        SAVE: `${appConfig.URL_API}/address/save`,
        GET_BY_ID: `${appConfig.URL_API}/address/id`,
        GET_MANY_BY_IDs: `${appConfig.URL_API}/address/ids`
    },
    PRODUCT_CATEGORY: {
        GET_ALL: `${appConfig.URL_API}/product-category`,
        SAVE: `${appConfig.URL_API}/product-category/save`,
        GET_MANY_BY_IDs: `${appConfig.URL_API}/product-category/ids`,
    },
    STAFF_API: {
        GET_ALL: `${appConfig.URL_API}/staff`,
        UPDATE: `${appConfig.URL_API}/staff/update`,
        CREATE: `${appConfig.URL_API}/staff/create`,
        DELETE: `${appConfig.URL_API}/staff`,
    },
    PRODUCT_API: {
        GET_ALL: `${appConfig.URL_API}/product`,
        UPDATE: `${appConfig.URL_API}/product/update`,
        DELETE: `${appConfig.URL_API}/product`,
        CREATE: `${appConfig.URL_API}/product/create`
    },
    BOOKING_API: {
        GET_ALL: `${appConfig.URL_API}/booking`,
        UPDATE: `${appConfig.URL_API}/booking/update`,
        DELETE: `${appConfig.URL_API}/booking`
    },
    BOOKING_DETAIL_API: {
        GET_ALL: `${appConfig.URL_API}/booking-detail`,
        UPDATE: `${appConfig.URL_API}/booking-detail/update`,
        DELETE: `${appConfig.URL_API}/booking-detail`,
        GET_BY_BOOKING_ID: `${appConfig.URL_API}/price-line/booking-id`
    },
    UNIT_API: {
        GET_ALL: `${appConfig.URL_API}/unit`,
        UPDATE: `${appConfig.URL_API}/unit/update`,
        DELETE: `${appConfig.URL_API}/unit`,
        GET_BY_PRODUCT_ID: `${appConfig.URL_API}/unit/product`
    },
    PRICE_HEADER: {
        GET_ALL: `${appConfig.URL_API}/price-header`,
        UPDATE: `${appConfig.URL_API}/price-header/update`,
        CREATE: `${appConfig.URL_API}/price-header/create`,
        DELETE: `${appConfig.URL_API}/price-header`
    },
    PRICE_LINE: {
        GET_ALL: `${appConfig.URL_API}/price-line`,
        UPDATE: `${appConfig.URL_API}/price-line/update`,
        DELETE: `${appConfig.URL_API}/price-line`,
        GET_BY_PRICE_HEADER_ID: `${appConfig.URL_API}/price-line/price-header-id`,
        GET_BY_PRODUCT_ID_AND_UNIT_ID: `${appConfig.URL_API}/price-line/product-and-unit`,
        
    },
    UNIT_EXCHANGE_API: {
        GET_ALL: `${appConfig.URL_API}/unit-exchange`,
        UPDATE: `${appConfig.URL_API}/unit-exchange/update`,
        DELETE: `${appConfig.URL_API}/unit-exchange`,
        GET_BY_UNIT_ID: `${appConfig.URL_API}/unit-exchange/unit_id`,
        GET_BY_PRODUCT_ID: `${appConfig.URL_API}/unit-exchange/product_id`
    },
    PROMOTION_API: {
        GET_ALL: `${appConfig.URL_API}/promotion`,
        UPDATE: `${appConfig.URL_API}/promotion/update`,
        DELETE: `${appConfig.URL_API}/promotion`
    },
    ORDER_API: {
        GET_ALL: `${appConfig.URL_API}/order`,
        UPDATE: `${appConfig.URL_API}/order/update`,
        DELETE: `${appConfig.URL_API}/order`,
        CREATE: `${appConfig.URL_API}/order/create`,
    },
    ROLE_API: {
        GET_ALL: `${appConfig.URL_API}/role`,
        SAVE: `${appConfig.URL_API}/role/save`,
        DELETE: `${appConfig.URL_API}/role`
    },
}