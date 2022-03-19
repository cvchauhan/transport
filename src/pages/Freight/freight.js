import React from 'react';
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';

class DriverForm extends React.Component {
	constructor(props) {
		super(props);
		this.sendDriverDetails = this.sendDriverDetails.bind(this);
		this.state = {
			supplierFields: [{
	        supplier_bill_to: '',
	        supplier_bill_type: '',
	        supplier_chargeable_unit: '',
	        supplier_actual_unit: '',
	        supplier_challan_fee: '',
	        supplier_freight: '',
	        supplier_freight_unit: '',
	        supplier_freight_total: '',
	        supplier_invoice_type: '',
	        supplier_loding_charge: '',
	        supplier_shortage_unit: '',
	        supplier_shortage_limit: '',
	        supplier_detention_unit: '',
	        supplier_detention_amount: '',
	        supplier_comment: '',
	      }],
		}
	}

	changeHandler = (e) => {
		// this.setState({ [e.target.name]: e.target.value })
		// this.setState(prevState => {
		// 	// using object.assign
		// 	// let driverFormValues = Object.assign({}, prevState.driverFormValues);
		// 	// using spread operator
		// 	let driverFormValues = { ...prevState.driverFormValues };
		// 	driverFormValues[e.target.name] = e.target.value;
		// 	console.log(driverFormValues)
		// 	return { driverFormValues };
		// });
		this.setState(prevState => ({
			driverFormValues: {
				...prevState.driverFormValues,
				[e.target.name]: e.target.value
			}
		}));
	}
	sendDriverDetails(e) {
		e.preventDefault();
		console.log(this.state)
		Axios.post(`driver/add/`, this.state.driverFormValues)
			.then(res => {
				console.log(res);
				alert(res.data.message)
				// this.setState({
				// 	driverFormValues[drvr_name]: ""
				// });
				// e.target.reset();
			}).catch(err => {
				console.log(err);
			});
	}
	 // ===============  Supply  ==============================
    handleChangeSupplier = (index, event) => {
      const list = [...this.state.supplierFields];
      list[index][event.target.name] = event.target.value;
      this.setState({ supplierFields: list });
      console.log(this.state.supplierFields);
    }
    // ===============  Remove Supply  =========================
    RemoveSupplier = index => {
      const list = [...this.state.supplierFields];
      list.splice(index, 1);
      this.setState({ supplierFields: list });
    };
    // ===============  Add Supply  =========================
    AddSupplier = () => {
      this.setState({ supplierFields: [...this.state.supplierFields, 
          { 
            supplier_bill_to: '',
            supplier_bill_type: '',
            supplier_chargeable_unit: '',
            supplier_actual_unit: '',
            supplier_challan_fee: '',
            supplier_freight: '',
            supplier_freight_unit: '',
            supplier_freight_total: '',
            supplier_invoice_type: '',
            supplier_loding_charge: '',
            supplier_shortage_unit: '',
            supplier_shortage_limit: '',
            supplier_detention_unit: '',
            supplier_detention_amount: '',
            supplier_comment: ''
          }]
        });
    };

	render() {
		const { 
			supplierFields,
		} = this.state;
		
		return (
			<div className="content">
			 
				<form action="">
					<div className="row">
						<div className="col-12 mt-3"> 
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title m-0">Supplier Billing</h6>
                </div>
                <div className="card-body">
                    { this.state.supplierFields.map((supplier, index) => (
                      <>
                      <div className="row">
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_bill_to">
                            <Controls.AutoComplete
                              label="Bill To"
                              name="supplier_bill_to"
                              options={partyOptions}
                              onChange={(event, newValue) => { 
                                  supplier.supplier_bill_to = newValue.value; 
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_bill_type">
                            <Controls.AutoComplete
                              label="Bill Type"
                              name="supplier_bill_type"
                              options={bill_type}
                              onChange={(event, newValue) => { 
                                  supplier.supplier_bill_type = newValue.value; 
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_chargeable_unit">
                            <Controls.Input name="supplier_chargeable_unit" 
                              label="Chargeable WT/Unit"
                              type="number"
                              value={supplier.supplier_chargeable_unit}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_actual_unit">
                            <Controls.Input name="supplier_actual_unit" 
                              label="Actual WT/Unit" 
                              type="number"
                              value={supplier.supplier_actual_unit}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_freight">
                            <Controls.Input name="supplier_freight"
                              label="Fright"
                              type="text"
                              value={supplier.supplier_freight}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_freight_unit">
                            <Controls.Input name="supplier_freight_unit"
                              label="Fright Unit"
                              type="number"
                              value={supplier.supplier_freight_unit}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_freight_total">
                            <Controls.Input name="supplier_freight_total"
                              label="Fright Total"
                              type="text"
                              value={supplier.supplier_freight_total}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_invoice_type">
                            <Controls.AutoComplete 
                              label="Invoice Type" 
                              name="supplier_invoice_type" 
                              options={invoiceType}
                              onChange={(event, newValue) => { 
                                  supplier.supplier_invoice_type = newValue.value; 
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_challan_fee">
                            <Controls.Input name="supplier_challan_fee"
                              label="Challan Fee"
                              type="text"
                              value={supplier.supplier_challan_fee}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_loding_charge">
                            <Controls.Input name="supplier_loding_charge"
                              label="Loding Charges"
                              type="text"
                              value={supplier.supplier_loding_charge}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_shortage_limit">
                            <Controls.Input name="supplier_shortage_limit"
                              label="Shortage Tolerance Limit"
                              type="number"
                              value={supplier.supplier_shortage_limit}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_shortage_unit">
                            <Controls.Input name="supplier_shortage_unit"
                              label="Shortage Tolerance Unit"
                              type="number"
                              value={supplier.supplier_shortage_unit}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_detention_amount">
                            <Controls.Input name="supplier_detention_amount"
                              label="Detention Amount"
                              type="text"
                              value={supplier.supplier_detention_amount}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_detention_unit">
                            <Controls.AutoComplete 
                              label="Detention Unit" 
                              name="supplier_detention_unit" 
                              options={detentionType}
                              onChange={(event, newValue) => { 
                                  supplier.supplier_detention_unit = newValue.value; 
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                          <div className="form-group" controlId="supplier_comment">
                            <Controls.Input 
                              name="supplier_comment"
                              label="Comment"
                              type="text"
                              value={supplier.supplier_comment}
                              onChange={event => this.handleChangeSupplier(index, event)}
                            />
                          </div>
                        </div>
                      </div>
                      <hr/>
                      </>
                    ))}
                  <div className="row float-right">
                    <ButtonGroup variant="outlined" size="small" className="mr-2">
                      <Controls.Button text="Add More" onClick={this.AddSupplier}/>
                      <Controls.Button color="error" text="Remove" onClick={this.RemoveSupplier}/>
                    </ButtonGroup>
                  </div>
                </div>
              </div> 
            </div>
					</div>
				</form>
				
			</div>
		)
	}
}

export default DriverForm;