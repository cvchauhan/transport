import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginformSchema from "../../validations/loginFormValidation";
import "bootstrap/dist/css/bootstrap.css";
import Axios from '../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { Link,Redirect } from 'react-router-dom';
// import login from '../../login.png';
class Login extends React.Component {
    constructor(props) {
        super(props);        
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            password: '',
            message: '',
        };
    }
    initialValues() {
        return {
            email: this.state.email,
            password: this.state.password        
        }
    }
    login(values) {        
        Axios.post(`admin/login`, values)
        .then(res => {
            if (res.data) {
                localStorage.setItem('authToken',res.data.result.token)
                localStorage.setItem('user',JSON.stringify(res.data.result.data))                                         
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
            this.props.history.push('/');
            window.location.reload();
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
    if (localStorage.getItem('authToken')) {
      return (<Redirect to='/'  />);
    }
    return (
      <div className="content">
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
              validationSchema={loginformSchema}
              onSubmit={(values) => {
                this.login(values)
              }}
            >
              {({ touched, errors, isSubmitting, values }) =>  (              
                  <div>
                    <div className="row mb-5">
                      <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Login</h1>
                      </div>
                    </div>
                    <Form>                   
                      <div className="row justify-content-center">                      
                        {/* <img src={login} height={100} width={100} alt="login" /> */}
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">                                                                       
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
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mt-4"
                      >
                        Submit
                      </button>
                      <span>Dont't have account? <Link to='/register'>Register here</Link></span>
                      </div>
                      </div>                      
                    </Form>                  
                  </div>
                )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
  
export default Login;