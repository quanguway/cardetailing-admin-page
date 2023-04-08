const LOCALSTORAGE_AUTH = 'auth'

export const roles = {
    ROLE_CUSTOMER : 'Customer',
    ROLE_ADMIN : 'Admin'
}

export const getAuth = () => {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH))
}

export const setAuth = (auth) => {
    return localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(auth));
}

export const removeAuth = (auth) => {
    return localStorage.removeItem(LOCALSTORAGE_AUTH);
}