import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import userBankFormSchema from '../../../validations/userBankFormValidation';
import * as Mat from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserBankEdit extends React.Component {
  constructor(props) {
    super(props);
    this.sendBankDetails = this.sendBankDetails.bind(this);
    this.state = {
      type: 'User',
      user_bank_branch_name: '',
      branches: null,
      branchId: null,
      user_bank_name: '',
      user_bank_ifsc: '',
      user_bank_ah_name: '',
      user_bank_acc_no: '',
    }
  }

  componentDidMount = () => {      
    Axios.get(`user_bank/${this.props.id}/`)
      .then(res => {        
        const data = res.data;
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });      
      const branchname = this.props.branches.find(x=> x.id == data.user_branch_id).user_br_city;      
        this.setState({
          user_bank_branch_name: branchname ? branchname : '',
          user_bank_name: data.user_bank_name ? data.user_bank_name : '',
          user_bank_ifsc: data.user_bank_ifsc ? data.user_bank_ifsc : '',
          user_bank_ah_name: data.user_bank_ah_name ? data.user_bank_ah_name : '',
          user_bank_acc_no: data.user_bank_acc_no ? data.user_bank_acc_no : '',
          branchId: data.user_branch_id ? data.user_branch_id : '',
        });
      }).catch(err => {
        console.log(err);
      });
    // get all branches according to userId
    Axios.get(`user_branch/branches/${this.props.id}/`)
      .then(res => {        
        let data = res.data;
        data.map((value) => {
          value.label = value.user_br_city
        });
        this.setState({
          branches: data
        });
      }).catch(err => {
        console.log(err);
      });
  }

  initialValues() {
    let id = JSON.parse(localStorage.getItem('user')).id;  
    return {
      userId: id,
      branchId: this.state.branchId,
      user_bank_branch_name: this.state.user_bank_branch_name,
      user_bank_name: this.state.user_bank_name,
      user_bank_ifsc: this.state.user_bank_ifsc,
      user_bank_ah_name: this.state.user_bank_ah_name,
      user_bank_acc_no: this.state.user_bank_acc_no,
    }
  }

  
  sendBankDetails(values) {
    Axios.patch(`user_bank/${this.props.id}/`, values)
      .then(res => {        
        this.props.showAlertMsg(false, 'User Bank Added Successfully.', 'success'); //popup close
        this.props.refreshTable();
      }).catch(error => {
        this.props.showAlertMsg(false, 'Something Went Wrong.', 'error'); //popup close        
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
          validationSchema={userBankFormSchema}
          onSubmit={values => {
            this.sendBankDetails(values)
          }}
        >
          {({ values, errors, touched, setFieldValue, handleChange }) => (
            <Form>
              <div className="row">
                <div className="col-sm-12">
                  <Autocomplete
                    id="branchId"
                    className="branch-select"
                    name="branchId"
                    value={values.user_bank_branch_name}
                    options={this.state.branches ? this.state.branches: []}                    
                    onChange={(e, value) => {                      
                      setFieldValue("branchId", value !== null ? value.id : values.branchId);
                    }}
                    renderInput={params => (
                      <Mat.TextField
                        {...params}
                        name="branchId"
                        label="Select Branch"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                  <Controls.Error name="branchId" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm-6">
                  <Field
                    as={Controls.Input}
                    name="user_bank_name"
                    label="Bank Name"
                    value={values.user_bank_name}
                    type="text"
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_bank_name" />
                </div>
                <div className="col-sm-6">
                  <Field
                    as={Controls.Input}
                    name="user_bank_ifsc"
                    label="IFSC"
                    type="text"
                    value={values.user_bank_ifsc}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_bank_ifsc" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="user_bank_ah_name"
                    label="Account Holder Name"
                    type="text"
                    value={values.user_bank_ah_name}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_bank_ah_name" />
                </div>
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="user_bank_acc_no"
                    label="Account Number"
                    type="text"
                    value={values.user_bank_acc_no}
                    onChange={handleChange}
                  />
                  <Controls.Error name="user_bank_acc_no" />
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

export default UserBankEdit;