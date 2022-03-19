import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/

const profileFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),          
    username: Yup.string().required("Username is required"),  
    user_contact_no: Yup.string().required("Phone number is required").matches(phoneRegExp, 'Phone number is not valid'),    
    user_pan: Yup.string().required('PAN number is required.')
                    .length(10, 'PAN number must be 10 charecters.')      
})

export default profileFormSchema;