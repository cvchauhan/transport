import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';

class DriverForm extends React.Component {
	constructor(props) {
		super(props);
		this.dialogBox = React.createRef();
		this.sendDriverDetails = this.sendDriverDetails.bind(this);
		this.state = {
			// driverFormValues: {
			// 	drvr_name: '',
			// 	drvr_contact_no: '',
			// 	drvr_licns_no: '',
			// 	drvr_licns_exp_date: '',
			// },
			drvr_name: '',
			drvr_contact_no: '',
			drvr_licns_no: '',
			drvr_licns_exp_date: new Date().toISOString().split('T')[0],
		}
	}

	changeHandler = (e) => {

		this.setState({ [e.target.name]: e.target.value })
		// this.setState(prevState => {
		// 	// using object.assign
		// 	// let driverFormValues = Object.assign({}, prevState.driverFormValues);
		// 	// using spread operator
		// 	let driverFormValues = { ...prevState.driverFormValues };
		// 	driverFormValues[e.target.name] = e.target.value;
		// 	console.log(driverFormValues)
		// 	return { driverFormValues };
		// });
		// this.setState(prevState => ({
		// 	driverFormValues: {
		// 		...prevState.driverFormValues,
		// 		[e.target.name]: e.target.value
		// 	}
		// }));
	}
	sendDriverDetails(e) {
		e.preventDefault();
		console.log(this.state);
		Axios.post(`driver/add/`, this.state)
			.then(res => {
				console.log(res);
				// alert(res.data.message);
				this.props.popupChange(false, 'Driver Added Successfully.', 'success'); //close popup
				this.props.refreshTable();
			}).catch(err => {
				this.props.popupChange(false, 'Something Went Wrong.', 'error'); //close popup
				console.log(err);
			});
	}
	handleDateChange(e){
		console.log(e);
	}

	render() {
		const { 
			drvr_name, 
			drvr_contact_no, 
			drvr_licns_no, onSubmit, validate,
			drvr_licns_exp_date
			 
		} = this.state;
		
		return (
			<div ref={this.dialogBox} className="content">
			 
				<form action="" autoComplete="off">
					<div className="row">
						<div className="col-sm-6">
							<Controls.Input
								name="drvr_name"
								label="Name"
								size="medium"
								type="text"
								placeholder="Enter Driver Name"
								value={drvr_name}
								onChange={this.changeHandler}
							/>
						</div>
						<div className="col-sm-6">
							<Controls.Input
								name="drvr_contact_no"
								label="Contact No."
								type="text"
								size="medium"
								placeholder="Enter Contact No."
								// value={drvr_contact_no}
								onChange={this.changeHandler}
							/>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-sm-6">
							<Controls.Input
								name="drvr_licns_no"
								label="License No."
								type="text"
								size="medium"
								placeholder="Enter your license no."
								// value={drvr_licns_no}
								onChange={this.changeHandler}
							/>
						</div>
						<div className="col-sm-6" mt={2}>
							<Controls.DatePicker
								label="License Expiry Date"
								value={drvr_licns_exp_date}
								name="drvr_licns_exp_date"
								size="small"
        						onChange={(newValue) => {
		                            newValue = newValue.toISOString().split('T')[0];
		                            this.setState({drvr_licns_exp_date:newValue});
		                          }}
							/>
						</div>
					</div>
					<div className="row mt-4 float-right">
						<Controls.Button text="Save" size="medium" color="info" mr={3} type="submit" onClick={this.sendDriverDetails} />
					</div>
				</form>
			</div>
		)
	}
}

export default DriverForm; 