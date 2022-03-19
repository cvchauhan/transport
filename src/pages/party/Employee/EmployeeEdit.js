import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import partyEmpFormSchema from '../../../validations/partyEmpFormValidation';
import * as Mat from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


class PartyEmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.updateEmployeeDetails = this.updateEmployeeDetails.bind(this);
    this.state = {
      type: 'Party',
      branches: null,
      branchId: null,
      party_emp_name: '',
      party_emp_email: '',
      party_emp_contact_no: '',
      party_emp_designation: '',
    }
  }

  componentDidMount = () => {
    // get single employee data by using emp id
    Axios.get(`party_employee/${this.props.id}/`)
      .then(res => {
        console.log(res);
        const data = res.data;
        this.setState({
          party_emp_name: data.party_emp_name ? data.party_emp_name : '',
          party_emp_email: data.party_emp_email ? data.party_emp_email : '',
          party_emp_contact_no: data.party_emp_contact_no ? data.party_emp_contact_no : '',
          party_emp_designation: data.party_emp_designation ? data.party_emp_designation : '',
        });
      }).catch(err => {
        console.log(err);
      });
    // get all branches according to partyId
    Axios.get(`party_branch/branches/${this.props.partyId}/`)
      .then(res => {
        console.log(res);
        let data = res.data;
        data.map((value) => {
          value.label = value.party_br_state
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
      partyId: this.props.partyId,
      branchId: this.state.branchId,
      party_emp_name: this.state.party_emp_name,
      party_emp_email: this.state.party_emp_email,
      party_emp_contact_no: this.state.party_emp_contact_no,
      party_emp_designation: this.state.party_emp_designation,
    }
  }

  updateEmployeeDetails(values) {
    Axios.patch(`party_employee/${this.props.id}/`, values)
      .then(res => {
        console.log(res);
        this.props.showAlertMsg(false, 'Party Employee Updated Successfully.', 'success'); //popup close
        this.props.refreshTable();
      }).catch(error => {
        this.props.showAlertMsg(false, 'Something Went Wrong.', 'error'); //popup close
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
          enableReinitialize
          validationSchema={partyEmpFormSchema}
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
                    options={this.state.branches ? this.state.branches: []}
                    getOptionLabel={option => option.party_br_state}
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
                    name="party_emp_name"
                    label="Name"
                    value={values.party_emp_name}
                    type="text"
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_emp_name" />
                </div>
                <div className="col-sm-6">
                  <Field
                    as={Controls.Input}
                    name="party_emp_email"
                    label="Email"
                    type="text"
                    value={values.party_emp_email}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_emp_email" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="party_emp_contact_no"
                    label="Phone No"
                    type="text"
                    value={values.party_emp_contact_no}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_emp_contact_no" />
                </div>
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="party_emp_designation"
                    label="Designation"
                    type="text"
                    value={values.party_emp_designation}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_emp_designation" />
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

export default PartyEmployeeEdit;