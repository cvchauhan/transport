import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierFormSchema from '../../validations/supplierFormValidation';

class SupplierForm extends React.Component {
	constructor(props) {
		super(props);
		this.sendSupplierDetails = this.sendSupplierDetails.bind(this);
		this.state = {
			supp_name: '',
			supp_contact_no: '',
			supp_email: '',
			supp_pan: '',
		}
	}

	initialValues() {
		return {
			supp_name: this.state.supp_name,
			supp_contact_no: this.state.supp_contact_no,
			supp_email: this.state.supp_email,
			supp_pan: this.state.supp_pan,
		}
	}

	sendSupplierDetails(values) {		
		Axios.post(`supplier/add/`, values)
			.then(() => {				
				this.props.popupChange(false, 'Supplier Added Successfully.', 'success'); //popup close
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
					validationSchema={supplierFormSchema}
					onSubmit={values => {
						this.sendSupplierDetails(values)
					}}
				>
					{({ values, errors, touched, handleChange }) => (
						<Form>
							<div className="row">
								<div className="col-6">
									<Field
										as={Controls.Input}
										name="supp_name"
										label="Name"
										type="text"
										value={values.supp_name}
										onChange={handleChange}
									/>
									<Controls.Error name="supp_name" />
								</div>														
								<div className="col-6">
									<Field
										as={Controls.Input}
										name="supp_contact_no"
										label="Contact No."
										type="number"
										value={values.supp_contact_no}
										onChange={handleChange}
									/>
									<Controls.Error name="supp_contact_no" />
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-6">
									<Field
										as={Controls.Input}
										name="supp_email"
										label="Email Address"
										type="email"
										value={values.supp_email}
										onChange={handleChange}
									/>
									<Controls.Error name="supp_email" />
								</div>
								<div className="col-6">
								<Field
									as={Controls.Input}
									name="supp_pan"
									label="Supplier PAN"
									value={values.supp_pan}
									type="text"
									onChange={handleChange}
								/>
								<Controls.Error name="supp_pan" />
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

export default SupplierForm;