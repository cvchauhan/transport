import * as Yup from 'yup';
// const phoneRegExp = /^[0-9]/
// add validation to driver form
const ewaybillFormSchema = Yup.object().shape({
    ewaybill_number_form: Yup.string().required('Ewaybill number is required')    
})

export default ewaybillFormSchema;