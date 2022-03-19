import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import driverFormSchema from '../../validations/driverFormValidation';

class DriverEdit extends React.Component {
	constructor(props) {
		super(props);
		this.dialogBox = React.createRef();
		this.updateDriverDetails = this.updateDriverDetails.bind(this);
		this.state = {
			drvr_name: '',
			drvr_contact_no: '',
			drvr_licns_no: '',
			drvr_licns_exp_date: new Date().toISOString().split('T')[0],
		}
	}
	componentDidMount = () => {
		Axios.get(`driver/${this.props.id}`).then(res => {
			console.log(res.data);
			const data = res.data;
			this.setState({
				drvr_name: data.drvr_name ? data.drvr_name : '',
				drvr_contact_no: data.drvr_contact_no ? data.drvr_contact_no : '',
				drvr_licns_no: data.drvr_licns_no ? data.drvr_licns_no : '',
				drvr_licns_exp_date: data.drvr_licns_exp_date ? data.drvr_licns_exp_date : '',
			});
		}).catch(err => {
			console.log(err);
		});
	}
	///////// Use this.props.id  to get data from database ////////////////////

	initialValues() {
		return {
			drvr_name: this.state.drvr_name,
			drvr_contact_no: this.state.drvr_contact_no,
			drvr_licns_no: this.state.drvr_licns_no,
			drvr_licns_exp_date: this.state.drvr_licns_exp_date,
		}
	}

	updateDriverDetails(values) {
		console.log(values);
		Axios.patch(`driver/${this.props.id}`, values)
			.then(res => {
				console.log(res);
				this.props.popupChange(false, 'Driver Updated Successfully.', 'success'); //close popup
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
					enableReinitialize
					validationSchema={driverFormSchema}
					onSubmit={values => {
						this.updateDriverDetails(values)
					}}
				>
					{({ values, errors, touched, handleChange }) => (
						<Form>
							<div className="row">
								<div className="col-sm-6">
									<Field
										as={Controls.Input}
										name="drvr_name"
										label="Name"
										size="medium"
										type="text"
										placeholder="Enter Driver Name"
										value={values.drvr_name}
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
										value={values.drvr_contact_no}
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
										value={values.drvr_licns_no}
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
											newValue = newValue.toISOString().split('T')[0];
											values.drvr_licns_exp_date = newValue;
											this.setState({drvr_licns_exp_date:newValue});
										}}
									/>
									<Controls.Error name="drvr_licns_exp_date" />
								</div>
							</div>
							<div className="row mt-4 float-right">
								<Controls.Button text="Update" size="medium" color="info" mr={3} type="submit" />
							</div>
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}

export default DriverEdit;