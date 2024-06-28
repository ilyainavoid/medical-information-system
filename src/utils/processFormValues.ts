export const processFormValues = (values: any) => {
    if (typeof values.speciality === 'object' && 'value' in values.speciality) {
        values.speciality = values.speciality.value;
    }
    if (typeof values.gender === 'object' && 'value' in values.gender) {
        values.gender = values.gender.value;
    }
    return values;
};