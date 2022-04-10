import * as Yup from 'yup';

const loginFormSchema = Yup.object().shape({    
    email: Yup.string().email('Invalid email').required('Email is required'), 
    password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),   
})

export default loginFormSchema;