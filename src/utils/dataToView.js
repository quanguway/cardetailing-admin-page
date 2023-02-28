export const renderGender = (value) => {
    return value ? 'Nam': 'Nữ';
}

export const renderYesNo = (value) => {
    return value ? 'Có': 'Không';
}

export const YesNoToBool = (value) => {
    return value === 'Có' ? true : false;
}