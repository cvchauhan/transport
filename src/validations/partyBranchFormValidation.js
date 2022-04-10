import * as Yup from 'yup';

// add validation to party branch form
const partyBranchFormSchema = Yup.object().shape({
    // party_br_add1: Yup.string().required('Address line 1 is required'),
    // party_br_add2: Yup.string().required('Address line 2 is required'),
    // party_br_add3: Yup.string().required('Address line 3 is required'),
    party_br_city: Yup.string().required('City Name is required'),
    party_br_state: Yup.string().required('State Name is required'),
    // party_br_pin_code: Yup.string().required("Pincode is required")
    //     .length(6, 'Pincode must be 6 digit number.'),
});

export default partyBranchFormSchema;
