export const appConfig = {
    URL_API : 'http://localhost:8000',
}

export const apiConfig = {
    ADDRESS_API: {
        GET: `${appConfig.URL_API}/address`,
        SAVE: `${appConfig.URL_API}/address/save`
    },
    STAFF_API: {
        GET_ALL: `${appConfig.URL_API}/staff`,
        SAVE: `${appConfig.URL_API}/staff/save`,
        DELETE: `${appConfig.URL_API}/staff`
    },
    ROLE_API: {
        GET_ALL: `${appConfig.URL_API}/role`,
        SAVE: `${appConfig.URL_API}/role/save`,
        DELETE: `${appConfig.URL_API}/role`
    },
}