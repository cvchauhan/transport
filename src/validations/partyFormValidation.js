import * as Yup from 'yup';
// add validation to driver form
const partyFormSchema = Yup.object().shape({
    party_name: Yup.string().required('Party name is required'),
    // party_email: Yup.string().email('Invalid email').required('Email is required'),
    party_gst: Yup.string().required('GST number is required')
            .length(15, 'GST number must be 15 charecters.'),
    // party_tan: Yup.string().required('TAN number is required'),
})

export default partyFormSchema;