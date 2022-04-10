import * as Yup from 'yup';
// add validation to driver form
const branchFormSchema = Yup.object().shape({
    address_1: Yup.string().required('Address line 1 is required'),
    address_2: Yup.string().required('Address line 2 is required'),
    address_3: Yup.string().required('Address line 3 is required'),
    city: Yup.string().required('City Name is required'),
    state: Yup.string().required('State Name is required'),
    pincode: Yup.string().required("Pincode is required")
        .length(6, 'Pincode must be 6 digit number.'),
})

export default branchFormSchema;
