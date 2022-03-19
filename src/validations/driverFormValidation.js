import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/
// add validation to driver form
const driverFormSchema = Yup.object().shape({
    drvr_name: Yup.string().required('Driver name is required'),
    drvr_contact_no: Yup.string()
        .required("Phone no is required")
        .matches(phoneRegExp, 'Phone number is not valid'),
    // drvr_licns_no: Yup.string().required('Driver license number is required'),
    // drvr_licns_exp_date: Yup.string(),
})

export default driverFormSchema;