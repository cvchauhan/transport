import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import driverFormSchema from '../../validations/driverFormValidation';

class DriverForm extends React.Component {
	constructor(props) {
		super(props);
		this.dialogBox = React.createRef();
		this.sendDriverDetails = this.sendDriverDetails.bind(this);
		this.state = {
			drvr_name: '',
			drvr_contact_no: '',
			drvr_licns_no: '',
			drvr_licns_exp_date: null,
		}
	}

	initialValues() {
		return {
			drvr_name: this.state.drvr_name,
			drvr_contact_no: this.state.drvr_contact_no,
			drvr_licns_no: this.state.drvr_licns_no,
			drvr_licns_exp_date: this.state.drvr_licns_exp_date ? this.state.drvr_licns_exp_date:null,
		}
	}

	sendDriverDetails(values) {		
		Axios.post(`driver/add/`, values)
			.then(() => {				
				this.props.popupChange(false, 'Driver Added Successfully.', 'success'); //close popup
				this.props.refreshTable();
			}).catch(err => {
				this.props.popupChange(false, 'Something Went Wrong.', 'error'); //close popup
				console.log(err);
			});
	}

	render() {		
		return (
			<div ref={this.dialogBox} className="content">
				<Formik 
					initialValues={this.initialValues()}
					validationSchema={driverFormSchema}
					onSubmit={values => {
						this.sendDriverDetails(values)
					}}
				>
					{({ values, errors, touched, handleChange }) => (
						<Form>
							<div className="driver_pop_up_form">
								<div className="row">
									<div className="col-sm-6">										
										<Field 
											as={Controls.Input} 
											name="drvr_name" 
											label="Name"
											size="medium"
											type="text"
											placeholder="Enter driver name"
											required
											error={touched.drvr_name && Boolean(errors.drvr_name)}
											onChange={handleChange}
										/>
										<Controls.Error name="drvr_name" />
									</div>
									<div className="col-sm-6">
										<Field 
											as={Controls.Input} 
											name="drvr_contact_no"
											label="Contact No."
											type="text"
											size="medium"
											placeholder="Enter Contact No."
											required
											error={touched.drvr_contact_no && Boolean(errors.drvr_contact_no)}
											onChange={handleChange}
										/>
										<Controls.Error name="drvr_contact_no" />
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-6">
										<Field 
											as={Controls.Input}
											name="drvr_licns_no"
											label="License No."
											type="text"
											size="medium"
											placeholder="Enter your license no."
											onChange={handleChange}
										/>
										<Controls.Error name="drvr_licns_no" />
									</div>
									<div className="col-sm-6" mt={2}>
										<Field
											as={Controls.DatePicker}
											label="License Expiry Date"
											name="drvr_licns_exp_date"
											size="small"
											onChange={(newValue) => {
												if (newValue != null) {
													newValue = newValue.toISOString().split('T')[0];
													values.drvr_licns_exp_date = newValue;
													this.setState({drvr_licns_exp_date:newValue});
												}
											}}
										/>
									</div>
								</div>
								<div className="row mt-4 float-right">
									<Controls.Button text="Save" size="medium" color="info" mr={3} type="submit" />
								</div>
							</div>
							{/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}

export default DriverForm; 