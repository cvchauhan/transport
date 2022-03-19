import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import userFormSchema from '../../validations/userFormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.sendUserDetails = this.sendUserDetails.bind(this);
    this.state = {
      email: '',
      password: '',
      tmp_pass:'',
      username: '',
      user_contact_no: '',
      user_pan: '',
      add_line1: '',
      add_line2: '',
      add_line3: '',
      city: '',
      state: '',
      pin_code: '',      
    }
  }

  initialValues() {
    return {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      tmp_pass: this.state.password,
      user_contact_no: this.state.user_contact_no,
      user_pan: this.state.user_pan,
      add_line1: this.state.add_line1,
      add_line2: this.state.add_line2,
      add_line3: this.state.add_line3,
      city: this.state.city,
      state: this.state.state,
      pin_code: this.state.pin_code
    }
  }

  sendUserDetails(values) {    
    Axios.post(`admin/registration`, values)
      .then(res => {        
        this.props.popupChange(false, 'User Added Successfully.', 'success'); //popup close
        this.props.refreshTable();
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
        // this.props.popupChange(false, 'Something Went Wrong.', 'error'); //popup close
        console.log(error);
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
          validationSchema={userFormSchema}
          onSubmit={values => {
            this.sendUserDetails(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <div className="row">
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="username"
                    label="Username"                    
                    type="text"
                    onChange={handleChange}
                  />
                  <Controls.Error name="username" />
                </div>
                <div className="col-sm-4">
                <Field
                    as={Controls.Input}
                    name="email"
                    label="Email"                    
                    type="email"
                    onChange={handleChange}
                  />
                  <Controls.Error name="email" />
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
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="user_contact_no"
                    label="Phone number"
                    type="number"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_contact_no" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="add_line1"
                    label="Enter address line 1"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="add_line1" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="add_line2"
                    label="Enter address line 2"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="add_line2" />
                </div>
                </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="add_line3"
                    label="Enter address line 3"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="add_line3" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="city"
                    label="City"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="city" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="state"
                    label="State"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="state" />
                </div>
              </div>
              <div className="row mt-4">                
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="pin_code"
                    label="Pincode"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="pin_code" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="user_pan"
                    label="PAN No"
                    type="text"                    
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_pan" />
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

export default UserForm;