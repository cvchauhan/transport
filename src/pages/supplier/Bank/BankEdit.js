import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierBankFormSchema from '../../../validations/supplierBankFormValidation';
import * as Mat from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

class SupplierBankEdit extends React.Component {
  constructor(props) {
    super(props);
    this.sendBankDetails = this.sendBankDetails.bind(this);
    this.state = {
      type: 'Supplier',
      branches: null,
      supp_bank_branch_name: null,
      branchId: null,
      supp_bank_name: '',
      supp_bank_ifsc: '',
      supp_bank_ah_name: '',
      supp_bank_acc_no: '',
    }
  }

  componentDidMount = () => {    
    Axios.get(`supplier_bank/${this.props.id}/`)
      .then(res => {        
        const data = res.data;        
        const branchname = this.props.branches.find(x=> x.id == data.supplier_branch_id).supp_br_city; 
        this.setState({
          supp_bank_branch_name: branchname ? branchname : '',
          supp_bank_name: data.supp_bank_name ? data.supp_bank_name : '',
          supp_bank_ifsc: data.supp_bank_ifsc ? data.supp_bank_ifsc : '',
          supp_bank_ah_name: data.supp_bank_ah_name ? data.supp_bank_ah_name : '',
          supp_bank_acc_no: data.supp_bank_acc_no ? data.supp_bank_acc_no : '',
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
      supp_bank_branch_name: this.state.supp_bank_branch_name,
      supp_bank_name: this.state.supp_bank_name,
      supp_bank_ifsc: this.state.supp_bank_ifsc,
      supp_bank_ah_name: this.state.supp_bank_ah_name,
      supp_bank_acc_no: this.state.supp_bank_acc_no,
    }
  }

  
  sendBankDetails(values) {
    Axios.patch(`supplier_bank/${this.props.id}/`, values)
      .then(() => {        
        this.props.showAlertMsg(false, 'Supplier Bank Added Successfully.', 'success'); //popup close
        this.props.refreshTable();
      }).catch(error => {
        this.props.showAlertMsg(false, 'Something Went Wrong.', 'error'); //popup close        
        console.log(error);
      });
  }


  render() {
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          enableReinitialize
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
                    value={values.supp_bank_branch_name}                    
                    options={this.state.branches ? this.state.branches: []}
                    // getOptionLabel={option => option.supp_br_city}
                    onChange={(e, value) => {                      
                      setFieldValue("branchId", value !== null ? value.id : values.branchId);
                    }}
                    renderInput={params => (
                      <Mat.TextField
                        {...params}
                        name="branchId"
                        value={values.branchId}
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

export default SupplierBankEdit;