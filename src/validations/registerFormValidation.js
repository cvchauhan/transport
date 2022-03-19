import * as Yup from 'yup';
const phoneRegExp = /^[6-9]\d{9}$/
const pinRegExp = /^[0-9]\d{5}$/
const registerFormSchema = Yup.object().shape({    
    email: Yup.string().email('Invalid email').required('Email is required'), 
    password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),       
    confirm_password: Yup.string().required("Confirm Password is required")
       .oneOf([Yup.ref('password'), null], 'Passwords must match'),
       username: Yup.string().required("Username is required"),  
       user_contact_no: Yup.string().required("Phone number is required").matches(phoneRegExp, 'Phone number is not valid'),
       add_line1: Yup.string().required("Address is required"),                         
       city: Yup.string().required("City is required"),           
       state: Yup.string().required("State is required"),           
       pin_code: Yup.string().required("Pincode is required").matches(pinRegExp, 'Pincode is not valid'),  
       user_pan: Yup.string().required('PAN number is required.')
                    .length(10, 'PAN number must be 10 charecters.')                
})

export default registerFormSchema;