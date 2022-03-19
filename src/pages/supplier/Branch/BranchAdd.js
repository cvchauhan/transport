import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierBranchFormSchema from '../../../validations/supplierBranchFormValidation';

class SupplierBranchAdd extends React.Component {
  constructor(props) {
    super(props);
    this.sendBranchDetails = this.sendBranchDetails.bind(this);
    this.state = {
      type: 'Supplier',
      supp_br_add1: '',
      supp_br_add2: '',
      supp_br_add3: '',
      supp_br_city: '',
      supp_br_state: '',
      supp_br_pin_code: '',
    }
  }

  initialValues() {
    return {
      supplierId: this.props.supplierId,
      type: this.state.type,
      supp_br_add1: this.state.supp_br_add1,
      supp_br_add2: this.state.supp_br_add2,
      supp_br_add3: this.state.supp_br_add3,
      supp_br_city: this.state.supp_br_city,
      supp_br_state: this.state.supp_br_state,
      supp_br_pin_code: this.state.supp_br_pin_code,
    }
  }

  sendBranchDetails(values) {
    console.log(values)
    Axios.post(`supplier_branch/${this.props.supplierId}/add`, values)
      .then(res => {
        console.log(res);
        this.props.popupChange(false, 'Supplier Branch Added Successfully.', 'success'); //popup close
      }).catch(err => {
        this.props.popupChange(false, 'Something Went Wrong.', 'error'); //popup close
        console.log(err);
      });
  }


  render() {
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          validationSchema={supplierBranchFormSchema}
          onSubmit={values => {
            this.sendBranchDetails(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form autoComplete="off">
              <div className="row">
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="supp_br_add1"
                    label="Address Line 1."
                    type="text"
                    value={values.supp_br_add1}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_br_add1" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="supp_br_add2"
                    label="Address Line 2."
                    type="text"
                    value={values.supp_br_add2}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_br_add2" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="supp_br_add3"
                    label="Address Line 3."
                    type="text"
                    value={values.supp_br_add3}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_br_add3" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="supp_br_city"
                    label="City"
                    type="text"
                    value={values.supp_br_city}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_br_city" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="supp_br_state"
                    label="State"
                    type="text"
                    value={values.supp_br_state}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_br_state" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="supp_br_pin_code"
                    label="Pincode"
                    type="number"
                    value={values.supp_br_pin_code}
                    onChange={handleChange}
                  />
                  <Controls.Error name="supp_br_pin_code" />
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

export default SupplierBranchAdd;