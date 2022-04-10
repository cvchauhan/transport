import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/
// add validation to driver form
const supplierFormSchema = Yup.object().shape({
    supp_name: Yup.string().required('Supplier name is required'),
    supp_contact_no: Yup.string()
        .required("Phone no is required")
        .matches(phoneRegExp, 'Phone number is not valid'),
    supp_email: Yup.string().email('Invalid email'),
    supp_pan: Yup.string().length(10, 'PAN number must be 10 charecters.')
});

export default supplierFormSchema;