import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/
// add validation to driver form
const employeeFormSchema = Yup.object().shape({
    emp_name: Yup.string().required('Employee name is required'),
    emp_email: Yup.string().email('Invalid email').required('Email is required'), 
    emp_contact_no: Yup.string()
        .required("Phone no is required")
        .matches(phoneRegExp, 'Phone number is not valid'),
    emp_designation: Yup.string().required('Designation is required'),
})

export default employeeFormSchema;

