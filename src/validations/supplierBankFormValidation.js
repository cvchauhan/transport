import * as Yup from 'yup';
// add validation to bank form
const supplierEmpFormSchema = Yup.object().shape({
    supp_bank_name: Yup.string().required('Bank name is required'),
    supp_bank_ifsc: Yup.string().required('IFSC is required'), 
    supp_bank_ah_name: Yup.string().required("Account holder name is required"),
    supp_bank_acc_no: Yup.string().required('Account no is required'),
});

export default supplierEmpFormSchema;