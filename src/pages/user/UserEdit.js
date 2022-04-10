import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import userFormSchema from '../../validations/userFormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.updateUserDetails = this.updateUserDetails.bind(this);    
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
  componentDidMount = () => {
    Axios.get(`admin/get/${this.props.id}`).then(res => {      
      const data = res.data.result;
      this.setState({
        email: data.email ? data.email : '',
        username: data.username ? data.username : '',
        password: data.tmp_pass ? data.tmp_pass : '',
        tmp_pass: data.tmp_pass ? data.tmp_pass : '',
        user_contact_no: data.user_contact_no ? data.user_contact_no : '',
        user_pan: data.user_pan ? data.user_pan : '',
        add_line1: data.add_line1 ? data.add_line1 : '',
        add_line2: data.add_line2 ? data.add_line2 : '',
        add_line3: data.add_line3 ? data.add_line3 : '',
        city: data.city ? data.city : '',
        state: data.state ? data.state : '',
        pin_code: data.pin_code ? data.pin_code : ''        
      })
    }).catch(err => {
      console.log(err);
    });
  }

  updateUserDetails(values) {   
    values.tmp_pass = values.password;    
    Axios.put(`admin/update/${this.props.id}`, values)
      .then(res => {        
        this.props.popupChange(false, 'User Updated Successfully.', 'success'); //popup close
        this.props.refreshTable();        
      }).catch(error => {        
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
            this.updateUserDetails(values)
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
                    value={values.username}
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
                    value={values.email}
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
                    value={values.password}
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
                    value={values.user_contact_no}
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
                    value={values.add_line1}
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
                    value={values.add_line2}
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
                    value={values.add_line3}
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
                    value={values.city}
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
                    value={values.state}
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
                    value={values.pin_code}
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
                    value={values.user_pan}
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

export default UserFormEdit;