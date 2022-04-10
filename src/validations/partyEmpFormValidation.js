import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/
// add validation to driver form
const partyEmpFormSchema = Yup.object().shape({
    branchId: Yup.string().required('Please select branch'),
    party_emp_name: Yup.string().required('Employee name is required'),
    // party_emp_email: Yup.string().email('Invalid email').required('Email is required'), 
    party_emp_contact_no: Yup.string()
        .required("Phone no is required")
        .matches(phoneRegExp, 'Phone number is not valid'),
    // party_emp_designation: Yup.string().required('Designation is required'),
})

export default partyEmpFormSchema;