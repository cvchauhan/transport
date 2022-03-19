import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierBankFormSchema from '../../../validations/supplierBankFormValidation';
import * as Mat from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

class SupplierBankAdd extends React.Component {
  constructor(props) {
    super(props);
    this.sendBankDetails = this.sendBankDetails.bind(this);
    this.state = {
      type: 'Supplier',
      branches: null,
      branchId: null,
      supp_bank_name: '',
      supp_bank_ifsc: '',
      supp_bank_ah_name: '',
      supp_bank_acc_no: '',
    }
  }

  componentDidMount = () => {
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
      supp_bank_name: this.state.supp_bank_name,
      supp_bank_ifsc: this.state.supp_bank_ifsc,
      supp_bank_ah_name: this.state.supp_bank_ah_name,
      supp_bank_acc_no: this.state.supp_bank_acc_no,
    }
  }

  
  sendBankDetails(values) {
    Axios.post(`supplier_bank/add/`, values)
      .then(res => {        
        this.props.popupChange(false, 'Supplier Bank Added Successfully.', 'success'); //popup close
      }).catch(error => {
        this.props.popupChange(false, 'Something Went Wrong.', 'error'); //popup close        
      });
  }


  render() {
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          validationSchema={supplierBankFormSchema}
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
                    options={this.state.branches ? this.state.branches: []}
                    getOptionLabel={option => option.supp_br_city}
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
                    name="supp_bank_name"
                    label="Bank Name"
                    value={values.supp_bank_name}
                    type="text"
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_bank_name" />
                </div>
                <div className="col-sm-6">
                  <Field
                    as={Controls.Input}
                    name="supp_bank_ifsc"
                    label="IFSC"
                    type="text"
                    value={values.supp_bank_ifsc}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_bank_ifsc" />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="supp_bank_ah_name"
                    label="Account Holder Name"
                    type="text"
                    value={values.supp_bank_ah_name}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_bank_ah_name" />
                </div>
                <div className="col-md-6">
                  <Field
                    as={Controls.Input}
                    name="supp_bank_acc_no"
                    label="Account Number"
                    type="text"
                    value={values.supp_bank_acc_no}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_bank_acc_no" />
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

export default SupplierBankAdd;