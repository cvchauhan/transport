import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import passwordFormSchema from '../../validations/passwordFormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserPasswordChange extends React.Component {
  constructor(props) {
    super(props);
    this.updatePasswordDetails = this.updatePasswordDetails.bind(this);    
    this.state = {      
      password: '',
      oldpassword:'',
      confirm_password:''
    }
  }
  initialValues() {
    return {      
      password: this.state.password,
      oldpassword: this.state.password,
      confirm_password: this.state.confirm_password
    }
  }

  updatePasswordDetails(values) {        
    Axios.post(`admin/change-password/${this.props.id}`, values)
      .then(res => {        
        this.props.popupChange(false, 'Password Updated Successfully.', 'success'); //popup close                  
      }).catch(error => {    
        console.log(error)    
        if (error.response && error.response.data) {
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
        <Formik
          initialValues={this.initialValues()}
          enableReinitialize
          validationSchema={passwordFormSchema}
          onSubmit={values => {
            this.updatePasswordDetails(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <div className="row">               
                <div className="col-sm-4">
                <Field
                    as={Controls.Input}
                    name="oldpassword"
                    label="Old Password"                    
                    type="password"
                    onChange={handleChange}
                  />
                  <Controls.Error name="oldpassword" />
                </div>
                <div className="col-sm-4">
                <Field
                    as={Controls.Input}
                    name="password"
                    label="Password"                    
                    type="password"
                    onChange={handleChange}
                  />
                  <Controls.Error name="password" />
                </div>
                <div className="col-sm-4">
                <Field
                    as={Controls.Input}
                    name="confirm_password"
                    label="Confirm Password"                    
                    type="password"
                    onChange={handleChange}
                  />
                  <Controls.Error name="confirm_password" />
                </div>
              </div>                                       
              <div className="row mt-4 float-right">
                <Controls.Button text="Save" size="medium" color="info" mr={3} type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default UserPasswordChange;