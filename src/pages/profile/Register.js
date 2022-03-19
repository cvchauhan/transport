import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import registerFormSchema from "../../validations/registerFormValidation";
import "bootstrap/dist/css/bootstrap.css";
import Axios from '../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);        
        this.RegisterForm = this.RegisterForm.bind(this);
        this.state = {
            email: '',
            password: '',
            username:'',
            user_contact_no:'',
            confirm_password: '',
            user_pan:'',           
            add_line1:'',           
            add_line2:'',           
            add_line3:'', 
            city:'',
            state:'',
            pin_code:''          
        };
    }
    initialValues() {
        return {
            email: this.state.email,
            password: this.state.password,      
            confirm_password: this.state.confirm_password,      
            username: this.state.username,      
            user_contact_no: this.state.user_contact_no,      
            user_pan: this.state.user_pan,      
            add_line1: this.state.add_line1,      
            add_line2: this.state.add_line2,      
            add_line3: this.state.add_line3,
            city: this.state.city,
            state: this.state.state,
            pin_code: this.state.pin_code,
        }
    }
    RegisterForm(values) {        
        Axios.post(`admin/registration`, values)
        .then(res => {
            if (res.data) {                                        
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });            
            }
            // this.props.popupChange(false, 'Login Successfully.', 'success'); //popup close            
        }).then(()=>{
            this.props.history.push('/login');
            // window.location.reload();
        }).catch(error => {  
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });                                              
              }                      
        });
    }
  render() {
    return (
      <div className="container">
        <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={this.initialValues()}
              validationSchema={registerFormSchema}
              onSubmit={(values) => {                  
                this.RegisterForm(values)
              }}
            >
              {({ touched, errors, isSubmitting, values }) =>  (              
                  <div>
                    <div className="row mb-5">
                      <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Register Form</h1>
                      </div>
                    </div>
                    <Form>                   
                        <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">                                                                     
                        <Field
                          type="text"
                          name="username"
                          placeholder="Enter Username"
                          autoComplete="off"
                          className={`mt-2 form-control
                          ${touched.username && errors.username ? "is-invalid" : ""}`}
                        />
        
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="invalid-feedback"
                        />                                                                                                                
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          autoComplete="off"
                          className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      <Field
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          className={`mt-2 form-control
                          ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback"
                        />
                      <Field
                          type="password"
                          name="confirm_password"
                          placeholder="Enter confirm password"
                          className={`mt-2 form-control
                          ${
                            touched.confirm_password && errors.confirm_password
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="confirm_password"
                          className="invalid-feedback"
                        />
                      <Field
                          type="test"
                          name="user_pan"
                          placeholder="Enter Pan number"
                          className={`mt-2 form-control
                          ${
                            touched.user_pan && errors.user_pan
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="user_pan"
                          className="invalid-feedback"
                        />
                      <Field
                          type="test"
                          name="add_line1"
                          placeholder="Enter address line 1"
                          className={`mt-2 form-control
                          ${
                            touched.add_line1 && errors.add_line1
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="add_line1"
                          className="invalid-feedback"
                        />
                      <Field
                          type="test"
                          name="add_line2"
                          placeholder="Enter address line 2"
                          className={`mt-2 form-control
                          ${
                            touched.add_line2 && errors.add_line2
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="add_line2"
                          className="invalid-feedback"
                        />
                      <Field
                          type="test"
                          name="add_line3"
                          placeholder="Enter address line 3"
                          className={`mt-2 form-control
                          ${
                            touched.add_line3 && errors.add_line3
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="add_line3"
                          className="invalid-feedback"
                        />
                      <Field
                          type="text"
                          name="user_contact_no"
                          placeholder="Enter Phone number"
                          autoComplete="off"
                          className={`mt-2 form-control
                          ${touched.user_contact_no && errors.user_contact_no ? "is-invalid" : ""}`}
                        />
        
                        <ErrorMessage
                          component="div"
                          name="user_contact_no"
                          className="invalid-feedback"
                        />
                      <Field
                          type="text"
                          name="city"
                          placeholder="Enter City"
                          autoComplete="off"
                          className={`mt-2 form-control
                          ${touched.city && errors.city ? "is-invalid" : ""}`}
                        />
        
                        <ErrorMessage
                          component="div"
                          name="city"
                          className="invalid-feedback"
                        />                                                                                        
                      <Field
                          type="text"
                          name="state"
                          placeholder="Enter State"
                          autoComplete="off"
                          className={`mt-2 form-control
                          ${touched.state && errors.state ? "is-invalid" : ""}`}
                        />
        
                        <ErrorMessage
                          component="div"
                          name="state"
                          className="invalid-feedback"
                        />                                                                     
                      <Field
                          type="text"
                          name="pin_code"
                          placeholder="Enter Pincode"
                          autoComplete="off"
                          className={`mt-2 form-control
                          ${touched.pin_code && errors.pin_code ? "is-invalid" : ""}`}
                        />        
                        <ErrorMessage
                          component="div"
                          name="pin_code"
                          className="invalid-feedback"
                        />
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mt-4"
                      >
                        Register
                      </button>
                      <span>Already have account? <Link to='/login'>Login here</Link></span>
                      </div></div>                      
                    </Form>                  
                  </div>
                )}
            </Formik>
          </div>
        </div>
        <div className="row">&nbsp;</div>
      </div>
    );
  }
}
  
export default Register;