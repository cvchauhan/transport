import React from 'react';
import Axios from '../../../axiosConfig';
import Controls from '../../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import partyBranchFormSchema from '../../../validations/partyBranchFormValidation';
import * as LorryServices from '../../LR/lorry-services';

class PartyBranchEdit extends React.Component {
  constructor(props) {
    super(props);
    this.updateBranchDetails = this.updateBranchDetails.bind(this);
    this.state = {
      type: 'Party',
      party_br_add1: '',
      party_br_state_id: '',
      party_state_list: [],
      party_br_add2: '',
      party_br_add3: '',
      party_br_city: '',
      party_br_state: '',
      party_br_pin_code: '',
    }
  }

  componentDidMount = async() => {
    const statedata = await LorryServices.default.allStateList();    
    this.setState({party_state_list: statedata.result})
    await Axios.get(`party_branch/${this.props.id}/`).then((res) => {			
			const data = res.data;
			this.setState({
				party_br_state_id: data.party_br_state_id ? data.party_br_state_id : '',
				party_br_add1: data.party_br_add1 ? data.party_br_add1 : '',
				party_br_add2: data.party_br_add2 ? data.party_br_add2 : '',
				party_br_add3: data.party_br_add3 ? data.party_br_add3 : '',
				party_br_city: data.party_br_city ? data.party_br_city : '',
        party_br_state: data.party_br_state ? data.party_br_state : '',
        party_br_pin_code: data.party_br_pin_code ? data.party_br_pin_code : '',
			});      
		}).catch(err => {
			console.log(err);
		});
  }

  initialValues() {
    return {
      partyId: this.props.partyId,
      type: this.state.type,
      party_br_state_id: this.state.party_br_state_id,
      party_br_add1: this.state.party_br_add1,
      party_br_add2: this.state.party_br_add2,
      party_br_add3: this.state.party_br_add3,
      party_br_city: this.state.party_br_city,
      party_br_state: this.state.party_br_state,
      party_br_pin_code: this.state.party_br_pin_code,
    }
  }

  updateBranchDetails(values) {
    Axios.patch(`party_branch/${this.props.id}/`, values)
      .then(res => {        
        this.props.showAlertMsg(false, 'Party Branch Updated Successfully.', 'success'); //popup close
        this.props.refreshTable();
      }).catch(err => {
        this.props.showAlertMsg(false, 'Something Went Wrong.', 'error'); //popup close
        console.log(err);
      });
  }


  render() {
    const stateslist = this.state.party_state_list;
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          enableReinitialize
          validationSchema={partyBranchFormSchema}
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
                    name="party_br_add1"
                    label="Address Line 1."
                    type="text"
                    value={values.party_br_add1}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_br_add1" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="party_br_add2"
                    label="Address Line 2."
                    type="text"
                    value={values.party_br_add2}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_br_add2" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="party_br_add3"
                    label="Address Line 3."
                    type="text"
                    value={values.party_br_add3}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_br_add3" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="party_br_city"
                    label="City"
                    type="text"
                    value={values.party_br_city}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_br_city" />
                </div>
                <div className="col-md-4">
                <Field
                    as={Controls.AutoComplete}
                    label="State"
                    name="party_br_state"                    
                    value={values.party_br_state}                    
                    options={stateslist}
                    onChange={(e, newValue) => {                      
                      if (newValue != null) {
                        if (typeof newValue === 'string') {
                          let val = newValue.value;
                          values.party_br_state = val;
                          this.setState({ party_br_state: val });
                          this.setState({ party_br_state_id: newValue.id });
                        } else if (newValue && newValue.values) {
                          let value2 = newValue.values;
                          this.setState({ party_br_state: value2 });
                          this.setState({ party_br_state_id: newValue.id });
                          values.party_br_state = value2;
                        } else {           
                          let value = newValue.label;
                          values.party_br_state = value;
                          this.setState({ party_br_state: value });         
                          this.setState({ party_br_state_id: newValue.id });                               
                        }
                      }
                    }}                    
                  />
                  {/* <Field
                    as={Controls.Input}
                    name="party_br_state"
                    label="State"
                    type="text"
                    value={values.party_br_state}
                    onChange={handleChange}
                  /> */}
                  <Controls.Error name="party_br_state" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="party_br_pin_code"
                    label="Pincode"
                    type="number"
                    value={values.party_br_pin_code}
                    onChange={handleChange}
                  />
                  <Controls.Error name="party_br_pin_code" />
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

export default PartyBranchEdit;