import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierEmpFormSchema from '../../../validations/supplierEmpFormValidation';
import * as Mat from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

class SupplierEmployeeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.sendEmployeeDetails = this.sendEmployeeDetails.bind(this);
    this.state = {
      type: 'Supplier',
      branches: null,
      branchId: null,
      supp_emp_name: '',
      supp_emp_email: '',
      supp_emp_contact_no: '',
      supp_emp_designation: '',
    }
  }

  componentDidMount = () => {
    // get all branches according to supplierId
    Axios.get(`supplier_branch/branches/${this.props.supplierId}/`)
      .then(res => {
        console.log(res);
        let data = res.data;
        data.map((value) => {
          value.label = value.supp_br_state
        });
        this.setState({
          branches: data
        });
      }).catch(err => {
        console.log(err);
      });
  }

  initialValues() {
    return {
      supplierId: this.props.supplierId,
      branchId: this.state.branchId,
      supp_emp_name: this.state.supp_emp_name,
      supp_emp_email: this.state.supp_emp_email,
      supp_emp_contact_no: this.state.supp_emp_contact_no,
      supp_emp_designation: this.state.supp_emp_designation,
    }
  }

  
  sendEmployeeDetails(values) {
    Axios.post(`supplier_employee/add/`, values)
      .then(res => {
        console.log(res);
        this.props.popupChange(false, 'Supplier Employee Added Successfully.', 'success'); //popup close
      }).catch(error => {
        this.props.popupChange(false, 'Something Went Wrong.', 'error'); //popup close
        console.log(error);
        if (error.response) {
          console.log(error.response)
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }


  render() {
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          validationSchema={supplierEmpFormSchema}
          onSubmit={values => {
            this.sendEmployeeDetails(values)
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
                    options={this.state.branches ? this.state.branches: []}
                    getOptionLabel={option => option.supp_br_state}
                    onChange={(e, value) => {
                      console.log(value);
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
                    name="supp_emp_name"
                    label="Name"
                    value={values.supp_emp_name}
                    type="text"
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_emp_name" />
                </div>
                <div className="col-sm-6">
                  <Field
                    as={Controls.Input}
                    name="supp_emp_email"
                    label="Email"
                    type="text"
                    value={values.supp_emp_email}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_emp_email" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="supp_emp_contact_no"
                    label="Phone No"
                    type="text"
                    value={values.supp_emp_contact_no}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_emp_contact_no" />
                </div>
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="supp_emp_designation"
                    label="Designation"
                    type="text"
                    value={values.supp_emp_designation}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_emp_designation" />
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

export default SupplierEmployeeAdd;