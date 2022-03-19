import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import partyFormSchema from '../../validations/partyFormValidation';

class PartyForm extends React.Component {
	constructor(props) {
		super(props);
		this.updatePartyDetails = this.updatePartyDetails.bind(this);
		this.state = {
			party_name: '',
			party_email: '',
			party_gst: '',
			party_tan: '',
		}
	}

	componentDidMount = () => {
		Axios.get(`party/${this.props.partyId}`).then(res => {			
			const data = res.data.result;
			this.setState({
				party_name: data.party_name ? data.party_name : '',
				party_email: data.party_email ? data.party_email : '',
				party_gst: data.party_gst ? data.party_gst : '',
				party_tan: data.party_tan ? data.party_tan : '',
			})
		}).catch(err => {
			console.log(err);
		});
	}
	
	initialValues() {
		return {
			party_name: this.state.party_name,
			party_email: this.state.party_email,
			party_gst: this.state.party_gst,
			party_tan: this.state.party_tan,
		}
	}

	updatePartyDetails(values) {		
		Axios.patch(`party/${this.props.partyId}`, values)
			.then(res => {				
				this.props.popupChange(false, 'Party Updated Successfully.', 'success'); //popup close
				this.props.refreshTable();
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
					enableReinitialize
					validationSchema={partyFormSchema}
					onSubmit={values => {
						this.updatePartyDetails(values)
					}}
				>
					{({ values, errors, touched, handleChange }) => (
						<Form autoComplete="off">
							<div className="row">
								<div className="col-sm-6">
									<Field
										as={Controls.Input}
										name="party_name"
										label="Company Name"
										type="text"
										value={values.party_name}
										onChange={handleChange}
									/>
									<Controls.Error name="party_name" />
								</div>
								<div className="col-sm-6">
									<Field
										as={Controls.Input}
										name="party_gst"
										label="GST No.*"
										type="text"
										value={values.party_gst}
										onChange={handleChange}
									/>
									<Controls.Error name="party_gst" />
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-sm-6">
									<Field
										as={Controls.Input}
										name="party_tan"
										label="TAN No."
										type="text"
										value={values.party_tan}
										onChange={handleChange}
									/>
									<Controls.Error name="party_tan" />
								</div>

								<div className="col-sm-6">
									<Field
										as={Controls.Input}
										name="party_email"
										label="Company Email Address."
										type="email"
										value={values.party_email}
										onChange={handleChange}
									/>
									<Controls.Error name="party_email" />
								</div>
							</div>
							<div className="row mt-2 mr-2 float-right">
								<Controls.Button text="Save" color="primary" type="submit" />
							</div>
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}

export default PartyForm;