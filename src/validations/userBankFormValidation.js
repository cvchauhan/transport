import * as Yup from 'yup';
// add validation to bank form
const userEmpFormSchema = Yup.object().shape({
    user_bank_name: Yup.string().required('Bank name is required'),
    user_bank_ifsc: Yup.string().required('IFSC is required'), 
    user_bank_ah_name: Yup.string().required("Account holder name is required"),
    user_bank_acc_no: Yup.string().required('Account no is required'),
});

export default userEmpFormSchema;