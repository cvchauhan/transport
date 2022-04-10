import React from 'react';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import ewaybillFormSchema from '../../validations/ewaybillFormValidation';

class EwayBillForm extends React.Component {
	constructor(props) {
		super(props);
		this.dialogBox = React.createRef();		
		this.state = {
			ewaybill_number_form: '',			
		}
	}

	initialValues() {
		return {
			ewaybill_number_form: this.state.ewaybill_number_form.length > 0 ? this.state.ewaybill_number_form.trim() : this.state.ewaybill_number_form,			
		}
	}	
	render() {		
		return (
			<div ref={this.dialogBox} className="content" style={{width:400}}>
				<Formik 
					initialValues={this.initialValues()}
					validationSchema={ewaybillFormSchema}
					onSubmit={values => {
						this.props.submit(values)
					}}
				>
					{({ values, errors, touched, handleChange }) => (
						<Form>
							<div className="driver_pop_up_form">
								<div className="row">
									<div className="col-12">										
										<Field 
											as={Controls.Input} 
											name="ewaybill_number_form" 
											label="Ewaybill number"
											size="large"
											type="text"											
											placeholder="Enter ewaybill number"
											required
											error={touched.ewaybill_number_form && Boolean(errors.ewaybill_number_form)}
											onChange={handleChange}
										/>
										<Controls.Error name="ewaybill_number_form" />
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

export default EwayBillForm; 