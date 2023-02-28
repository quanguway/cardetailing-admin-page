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
        GET: `${appConfig.URL_API}/product-category`,
        SAVE: `${appConfig.URL_API}/product-category/save`
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
        DELETE: `${appConfig.URL_API}/product`
    },
    UNIT_API: {
        GET_ALL: `${appConfig.URL_API}/unit`,
        UPDATE: `${appConfig.URL_API}/unit/update`,
        DELETE: `${appConfig.URL_API}/unit`
    },
    UNIT_EXCHANGE_API: {
        GET_ALL: `${appConfig.URL_API}/unit-exchange`,
        UPDATE: `${appConfig.URL_API}/unit-exchange/update`,
        DELETE: `${appConfig.URL_API}/unit-exchange`
    },
    PROMOTION_API: {
        GET_ALL: `${appConfig.URL_API}/promotion`,
        UPDATE: `${appConfig.URL_API}/promotion/update`,
        DELETE: `${appConfig.URL_API}/promotion`
    },
    ROLE_API: {
        GET_ALL: `${appConfig.URL_API}/role`,
        SAVE: `${appConfig.URL_API}/role/save`,
        DELETE: `${appConfig.URL_API}/role`
    },
}