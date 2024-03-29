export const renderGender = (value) => {
    return value ? 'Nam' : 'Nữ';
};

export const genderToBool = (value) => {
    return value === 'Nam' ? true : false;
};

export const renderYesNo = (value) => {
    return value || value == 1 ? 'Có' : 'Không';
};

export const YesNoToBool = (value) => {
    return value === 'Có' ? true : false;
};
