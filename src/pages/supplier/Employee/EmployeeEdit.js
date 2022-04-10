import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierEmpFormSchema from '../../../validations/supplierEmpFormValidation';
import * as Mat from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

class SupplierEmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.updateEmployeeDetails = this.updateEmployeeDetails.bind(this);
    this.state = {
      type: 'Supplier',
      branches: null,
      branchId: null,
      supp_branch_name: null,
      supp_emp_name: '',
      supp_emp_email: '',
      supp_emp_contact_no: '',
      supp_emp_designation: '',
    }
  }

  componentDidMount = () => {
    // get single employee data by using emp id
    Axios.get(`supplier_employee/${this.props.id}/`)
      .then(res => {        
        const data = res.data;            
        const branchname = this.props.branches.find(x=> x.id == data.supplier_branch_id).supp_br_city;             
        this.setState({
          supp_emp_name: data.supp_emp_name ? data.supp_emp_name : '',
          supp_branch_name: branchname ? branchname : '',
          supp_emp_email: data.supp_emp_email ? data.supp_emp_email : '',
          supp_emp_contact_no: data.supp_emp_contact_no ? data.supp_emp_contact_no : '',
          supp_emp_designation: data.supp_emp_designation ? data.supp_emp_designation : '',
          branchId: data.supplier_branch_id ? data.supplier_branch_id : '',
        });
      }).catch(err => {
        console.log(err);
      });
    // get all branches according to supplierId
    Axios.get(`supplier_branch/branches/${this.props.supplierId}/`)
      .then(res => {        
        let data = res.data;
        data.map((value) => {
          value.label = value.supp_br_city
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
      supp_branch_name: this.state.supp_branch_name,
      supp_emp_email: this.state.supp_emp_email,
      supp_emp_contact_no: this.state.supp_emp_contact_no,
      supp_emp_designation: this.state.supp_emp_designation,
    }
  }

  
  updateEmployeeDetails(values) {
    Axios.patch(`supplier_employee/${this.props.id}/`, values)
      .then(res => {        
        this.props.showAlertMsg(false, 'Supplier Employee Updated Successfully.', 'success'); //popup close
        this.props.refreshTable();
      }).catch(error => {
        this.props.showAlertMsg(false, 'Something Went Wrong.', 'error'); //popup close               
      });
  }


  render() {
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          enableReinitialize
          validationSchema={supplierEmpFormSchema}
          onSubmit={values => {
            this.updateEmployeeDetails(values)
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
                    value={values.supp_branch_name}
                    options={this.state.branches ? this.state.branches: []}                    
                    onChange={(e, value) => {                                            
                      this.setState({"branchId": value !== null ? value.id : values.branchId});
                      this.setState({"supp_branch_name": value.supp_br_city});
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

export default SupplierEmployeeEdit;