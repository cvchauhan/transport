import * as Yup from 'yup';
const passwordFormSchema = Yup.object().shape({     
    password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
    oldpassword: Yup.string()    
    .required("Old password is required"),
    confirm_password: Yup.string().required("Confirm Password is required")
       .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export default passwordFormSchema;