import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import userBranchFormSchema from '../../../validations/userBranchFormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as LorryServices from '../../LR/lorry-services';

class UserBranchEdit extends React.Component {
  constructor(props) {
    super(props);
    this.updateBranchDetails = this.updateBranchDetails.bind(this);
    this.state = {
      type: 'User',
      user_state_list: [],
      user_br_add1: '',
      user_br_state_id: '',
      user_br_add2: '',
      user_br_add3: '',
      user_br_city: '',
      user_br_state: '',
      user_br_pin_code: '',
    }
  }

  componentDidMount = async() => {
    const statedata = await LorryServices.default.allStateList();    
    this.setState({user_state_list: statedata.result})
    Axios.get(`user_branch/${this.props.id}/`).then(res => {			
			const data = res.data;
			this.setState({
				user_br_add1: data.user_br_add1 ? data.user_br_add1 : '',
				user_br_state_id: data.user_br_state_id ? data.user_br_state_id : '',
				user_br_add2: data.user_br_add2 ? data.user_br_add2 : '',
				user_br_add3: data.user_br_add3 ? data.user_br_add3 : '',
				user_br_city: data.user_br_city ? data.user_br_city : '',
        user_br_state: data.user_br_state ? data.user_br_state : '',
        user_br_pin_code: data.user_br_pin_code ? data.user_br_pin_code : '',
			});
		}).catch(err => {
			console.log(err);
		});
  }

  initialValues() {
    return {
      userId: this.props.userId,
      type: this.state.type,
      user_br_state_id: this.state.user_br_state_id,
      user_br_add1: this.state.user_br_add1,
      user_br_add2: this.state.user_br_add2,
      user_br_add3: this.state.user_br_add3,
      user_br_city: this.state.user_br_city,
      user_br_state: this.state.user_br_state,
      user_br_pin_code: this.state.user_br_pin_code,
    }
  }

  updateBranchDetails(values) {
    Axios.patch(`user_branch/${this.props.id}/`, values)
      .then(res => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        this.props.showAlertMsg(false, 'User Branch Updated Successfully.', 'success'); //popup close
        this.props.refreshTable();
      }).catch(err => {
        this.props.showAlertMsg(false, 'Something Went Wrong.', 'error'); //popup close
        console.log(err);
      });
  }


  render() {
    const stateslist = this.state.user_state_list;
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
          validationSchema={userBranchFormSchema}
          onSubmit={values => {
            this.updateBranchDetails(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form autoComplete="off">
              <div className="row">
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="user_br_add1"
                    label="Address Line 1."
                    type="text"
                    value={values.user_br_add1}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_br_add1" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="user_br_add2"
                    label="Address Line 2."
                    type="text"
                    value={values.user_br_add2}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_br_add2" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="user_br_add3"
                    label="Address Line 3."
                    type="text"
                    value={values.user_br_add3}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_br_add3" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="user_br_city"
                    label="City"
                    type="text"
                    value={values.user_br_city}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_br_city" />
                </div>
                <div className="col-md-4">
                <Field
                    as={Controls.AutoComplete}
                    label="State"
                    name="user_br_state"                    
                    value={values.user_br_state}                    
                    options={stateslist}
                    onChange={(e, newValue) => {                      
                      if (newValue != null) {
                        if (typeof newValue === 'string') {
                          let val = newValue.value;
                          values.user_br_state = val;
                          this.setState({ user_br_state: val });
                          this.setState({ user_br_state_id: newValue.id });
                        } else if (newValue && newValue.values) {
                          let value2 = newValue.values;
                          this.setState({ user_br_state: value2 });
                          this.setState({ user_br_state_id: newValue.id });
                          values.user_br_state = value2;
                        } else {           
                          let value = newValue.label;
                          values.user_br_state = value;
                          this.setState({ user_br_state: value });         
                          this.setState({ user_br_state_id: newValue.id });                               
                        }
                      }
                    }}                    
                  />
                  {/* <Field
                    as={Controls.Input}
                    name="user_br_state"
                    label="State"
                    type="text"
                    value={values.user_br_state}
                    onChange={handleChange}
                  /> */}
                  <Controls.Error name="user_br_state" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="user_br_pin_code"
                    label="Pincode"
                    type="number"
                    value={values.user_br_pin_code}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_br_pin_code" />
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

export default UserBranchEdit;