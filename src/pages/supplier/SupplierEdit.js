import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import supplierFormSchema from '../../validations/supplierFormValidation';

class SupplierEdit extends React.Component {
	constructor(props) {
		super(props);
		this.updateSupplierDetails = this.updateSupplierDetails.bind(this);
		this.state = {
			supp_name: '',
			supp_contact_no: '',
			supp_email: '',
			supp_pan: '',
		}
	}

	componentDidMount = () => {
		Axios.get(`supplier/${this.props.supplierId}`).then(res => {			
			const data = res.data.result;
			this.setState({
				supp_name: data.supp_name ? data.supp_name : '',
				supp_contact_no: data.supp_contact_no ? data.supp_contact_no : '',
				supp_email: data.supp_email ? data.supp_email : '',
				supp_pan: data.supp_pan ? data.supp_pan : ''
			})
		}).catch(err => {
			console.log(err);
		});
	}

	initialValues() {
		return {
			supp_name: this.state.supp_name,
			supp_contact_no: this.state.supp_contact_no,
			supp_email: this.state.supp_email,
			supp_pan: this.state.supp_pan
		}
	}

	updateSupplierDetails(values) {		
		Axios.patch(`supplier/${this.props.supplierId}/`, values)
			.then(() => {				
				this.props.popupChange(false, 'Supplier Updated Successfully.', 'success'); //popup close
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
					validationSchema={supplierFormSchema}
					onSubmit={values => {
						this.updateSupplierDetails(values)
					}}
				>
					{({ values, errors, touched, handleChange }) => (
						<Form>
							<div className="row">
								<div className="col-12">
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
							</div>
							<div className="row mt-2">
								<div className="col-12">
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
								<div className="col-12">
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
							</div>
							<div className="row mt-2">
								<div className="col-12">
									<Field
										as={Controls.Input}
										name="supp_pan"
										label="Supplier PAN"
										type="text"
										value={values.supp_pan}
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

export default SupplierEdit;