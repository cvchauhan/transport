import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/
const numberRegExp = /^[0-9]/
// add validation to vehicle form
const vehicleFormSchema = Yup.object().shape({
    veh_no: Yup.string().required('Vehicle number is required.'),
    // veh_type: Yup.string().required('Vehicle type is required.'),
    veh_owner_contact: Yup.string()        
        .length(10, 'Contact number must be 10 digits.')
        .matches(phoneRegExp, 'Phone number is not valid.'),
    // veh_reg_valid_date: Yup.date().required('Vehicle Reg. date is required.'),
    veh_unladen_wght: Yup.string().matches(numberRegExp, 'Vehicle weight is not valid.'),
    veh_laden_wght: Yup.string().matches(numberRegExp, 'Gross weight is not valid.'),
    // veh_capacity: Yup.string().required('Capacity is required.'),
        //     .matches(numberRegExp, 'Capacity weight is not valid.'),    
    // veh_owner_name: Yup.string().required('Owner name is required.'),
    // veh_owner_pan: Yup.string().required('PAN number is required.')
    //                 .length(10, 'PAN number must be 10 charecters.')
})

export default vehicleFormSchema;