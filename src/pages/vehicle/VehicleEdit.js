import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Formik, Form, Field } from 'formik';
import vehicleFormSchema from '../../validations/vehicleFormValidation';


class VehicleFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.updateVehicleDetails = this.updateVehicleDetails.bind(this);
    this.state = {
      veh_no: '',
      veh_type: '',
      veh_reg_valid_date: new Date().toISOString().split('T')[0],
      veh_unladen_wght: 0,
      veh_laden_wght: 0,
      veh_capacity: 0,
      veh_owner_name: '',
      veh_owner_contact: '',
      veh_owner_pan: '',
    }
  }
  initialValues() {
    return {
      veh_no: this.state.veh_no,
      veh_type: this.state.veh_type,
      veh_reg_valid_date: this.state.veh_reg_valid_date,
      veh_unladen_wght: this.state.veh_unladen_wght,
      veh_laden_wght: this.state.veh_laden_wght,
      veh_capacity: this.state.veh_capacity,
      veh_owner_name: this.state.veh_owner_name,
      veh_owner_contact: this.state.veh_owner_contact,
      veh_owner_pan: this.state.veh_owner_pan,
    }
  }
  componentDidMount = () => {
    Axios.get(`vehicle/${this.props.id}`).then(res => {
      console.log(res.data);
      const data = res.data;
      this.setState({
        veh_no: data.veh_no ? data.veh_no : '',
        veh_type: data.veh_type ? data.veh_type : '',
        veh_reg_valid_date: data.veh_reg_valid_date ? data.veh_reg_valid_date : new Date().toISOString().split('T')[0],
        veh_unladen_wght: data.veh_unladen_wght ? data.veh_unladen_wght : 0,
        veh_laden_wght: data.veh_laden_wght ? data.veh_laden_wght : 0,
        veh_capacity: data.veh_capacity ? data.veh_capacity : 0,
        veh_owner_name: data.veh_owner_name ? data.veh_owner_name : '',
        veh_owner_contact: data.veh_owner_contact ? data.veh_owner_contact : '',
        veh_owner_pan: data.veh_owner_pan ? data.veh_owner_pan : '',
      })
    }).catch(err => {
      console.log(err);
    });
  }

  changeHandler = (e) => {
    if (e.target.name === "veh_unladen_wght") {
      this.setState({ veh_capacity: parseInt(this.state.veh_laden_wght) - (e.target.value) });
    } else if (e.target.name === "veh_laden_wght") {
      this.setState({ veh_capacity: (e.target.value) - parseInt(this.state.veh_unladen_wght) });
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  updateVehicleDetails(values) {
    console.log("hi", values)
    Axios.patch(`vehicle/${this.props.id}`, values)
      .then(res => {
        console.log(res);
        this.props.popupChange(false, 'Vehicle Updated Successfully.', 'success'); //popup close
        this.props.refreshTable();
        console.log("sita");
      }).catch(err => {
        console.log("ram");
        this.props.popupChange(false, 'Something Went Wrong.', 'error'); //popup close
        console.log(err);
      });
  }


  render() {
    const filter = createFilterOptions();
    const multiValues = [
      { id: 1, value: "Open Truck", label: "Open Truck" },
      { id: 2, value: "Mini Truck", label: "Mini Truck" },
      { id: 3, value: "Truck", label: "Truck" },
      { id: 4, value: "Closed Container", label: "Closed Container" },
      { id: 5, value: "Trailer", label: "Trailer" },
      { id: 6, value: "Tanker", label: "Tanker" },
      { id: 7, value: "Tipper", label: "Tipper" },
    ]
    var veh_type = this.state.veh_type;
    multiValues.forEach(function myFunction(item) {
      if (veh_type === item.id) {
        veh_type = item.value;
      }
    });
    return (
      <div className="content">
        <Formik
          initialValues={this.initialValues()}
          enableReinitialize
          validationSchema={vehicleFormSchema}
          onSubmit={values => {
            this.updateVehicleDetails(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <div className="row">
                <div className="col-sm-4">
                  <Field
                    as={Controls.Input}
                    name="veh_no"
                    label="Vehicle Number"
                    value={values.veh_no}
                    type="text"
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_no" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.AutoComplete}
                    label="Vehicle Type"
                    name="veh_type"
                    options={multiValues}
                    onChange={(event, newValue) => {
                      if (newValue != null) {
                        if (typeof newValue === 'string') {
                          let value = newValue.value;
                          values.veh_type = value;
                          this.setState({ veh_type: value });
                        } else if (newValue && newValue.inputValue) {
                          let value = newValue.inputValue;
                          values.veh_type = value;
                          this.setState({ veh_type: value });
                        } else {
                          let value = newValue.label;
                          values.veh_type = value;
                          this.setState({ veh_type: value });
                        }
                      }
                    }}
                    filterOptions={(multiValues, params) => {
                      const filtered = filter(multiValues, params);
                      const { inputValue } = params;
                      const isExisting = multiValues.some((option) => inputValue === option.label);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          label: `Add "${inputValue}"`,
                        });
                      }
                      return filtered;
                    }}
                    isOptionEqualToValue={(options, value) => options.id === value.id}
                  />
                  <Controls.Error name="veh_type" />
                </div>
                <div className="col-sm-4">
                  <Field
                    as={Controls.DatePicker}
                    label="Vehicle Registration Validity"
                    name="veh_reg_valid_date"
                    value={values.veh_reg_valid_date}
                    size="small"
                    onChange={(newValue) => {
                      if (newValue != null) {
                        newValue = newValue.toISOString().split('T')[0];
                        values.veh_reg_valid_date = newValue;
                        this.setState({ veh_reg_valid_date: newValue });
                      }
                    }}
                  />
                  <Controls.Error name="veh_reg_valid_date" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="veh_laden_wght"
                    label="Laden weight (in KG)"
                    type="number"
                    value={values.veh_laden_wght}
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_laden_wght" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="veh_unladen_wght"
                    label="Unladen weight (in KG)"
                    type="number"
                    value={values.veh_unladen_wght}
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_unladen_wght" />
                </div>

                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="veh_capacity"
                    label="Capacity"
                    type="number"
                    value={values.veh_capacity}
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_capacity" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="veh_owner_name"
                    label="Owner Name"
                    type="text"
                    value={values.veh_owner_name}
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_owner_name" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="veh_owner_contact"
                    label="Owner Contact"
                    type="text"
                    value={values.veh_owner_contact}
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_owner_contact" />
                </div>
                <div className="col-md-4">
                  <Field
                    as={Controls.Input}
                    name="veh_owner_pan"
                    label="Owner PAN"
                    type="text"
                    value={values.veh_owner_pan}
                    onChange={handleChange}
                  />
                  <Controls.Error name="veh_owner_pan" />
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

export default VehicleFormEdit;