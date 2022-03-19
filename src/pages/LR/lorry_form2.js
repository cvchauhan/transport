import React, { useState, Component } from 'react';
import * as icons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Mat from '@mui/material';
import { IconContext } from 'react-icons';
import Controls from '../../components/form-controls/Controls';

import { Dropdown,Row, Col, Button, Form, Card, InputGroup } from 'react-bootstrap';

class LoryForm extends Component {
  constructor(props) {
    super(props);
    this.addSupply = this.addSupply.bind(this);
    this.state = {
      cnn_no: '',
      date: '',
      options: '',
      ewaybill_number: '',
      drvr_licns_exp_date: '',
      chargeable_unit: '',
      supplyFields: [{
        supply_freight: "",
        supply_freight_unit: "",
        supply_freight_total: "",
      }],
    }
    
  }
  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setValidated(true);
  }
  // const [supplyFields, setsupplyFields] = useState([
  //   { supply_freight: '', supply_freight_unit: '', supply_freight_total: '',},
  // ]);

  addSupply(){
    this.setState([ ...this.state.supplyFields, {suppList: { supply_freight: '', supply_freight_unit: '', supply_freight_total: '',}}])
  }
  handleChangeSuppInput = (index, event) => {    
    const list = [...this.state.supplyFields];
    list[index][event.target.name] = event.target.value;
    this.setState({ supplyFields: list });    
  }
  handleRemoveClick = index => {
    const list = [...this.state.supplyFields];
    list.splice(index, 1);
    this.setState({ supplyFields: list });
  };

  handleAddClick = () => {
    this.setState({ supplyFields: [...this.state.supplyFields, 
        { 
          supply_freight: "",
          supply_freight_unit: "",
          supply_freight_total: "", 
        }]
      });
  };
  render () {
    const options = [
      { title: 'The Shawshank Redemption', id: 1994 },
      { title: 'The Godfather', id: 1972 },
      ];
    const { cnn_no, date, ewaybill_number,chargeable_unit, supplyFields, drvr_licns_exp_date, no_of_pc } = this.state;
    return (
      <div className="content">
        <Form noValidate validated={this.validated} onSubmit={this.handleSubmit}>
          <Mat.Grid container columnSpacing={2}>
            <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
              <Mat.Card>
                <Mat.CardHeader m={0} sx={{backgroundColor: "#5c6bc0", color:"white" }} subheader="Receipt Details" />
                <Mat.CardContent>
                  <Mat.Grid container columnSpacing={1}>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                      <Mat.FormControl controlId="cnn_no">
                        <Controls.Input name="cnn_no" label="CNN No." type="number" size="small" placeholder="Enter CNN No." value={cnn_no} onChange={this.changeHandler}/>
                      </Mat.FormControl>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                      <Mat.FormControl controlId="date">
                        <Controls.DatePicker label="License Expiry Date"
                          value={date} name="date" size="small"/>
                      </Mat.FormControl>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={2}>
                      <Mat.FormControl controlId="ewaybill_number">
                        <Controls.Input name="ewaybill_number" label="Ewaybill No." type="number"size="small" placeholder="Enter ewaybill No." value={ewaybill_number} onChange={this.changeHandler}/>
                      </Mat.FormControl>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={2}>
                      <Mat.FormControl controlId="ewaybill_validity">
                        <Controls.Input name="ewaybill_validity" label="Ewaybill Validity." type="number" size="small" placeholder="Enter ewaybill validity." value={ewaybill_number} onChange={this.changeHandler}/>
                      </Mat.FormControl>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={2}>
                        <Controls.Select label="From" name="from" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={2}>
                      <Controls.Select label="To" name="to" options={options}/>
                    </Mat.Grid>
                  </Mat.Grid>
                </Mat.CardContent>
              </Mat.Card>
            </Mat.Grid>
            <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
              <Mat.Card>
                <Mat.CardHeader m={0} sx={{backgroundColor: "#5c6bc0", color:"white"}} subheader="ADD CONSIGNOR/NEE" />
                <Mat.CardContent>
                  <Mat.Grid container columnSpacing={1}>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                      <Controls.Select label="Consignor" name="consignor" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                      <Controls.Select label="Consigne" name="consigne" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
                      <div className="form-group" controlId="pickup_address">
                        <Form.Check label="Pickup address same as consignor address" name="pickup_address" type="checkbox" id="pickup_address"
                        />
                      </div>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
                      <div className="form-group" controlId="delivery_address">
                        <Form.Check label="Delivery address same as consignee address." name="delivery_address" type="checkbox" id="delivery_address"
                        />
                      </div>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
                      <Controls.Select label="Dispatch From" name="dispatch_from" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
                      <Controls.Select label="Ship To" name="shio_to" options={options}/>
                    </Mat.Grid>
                  </Mat.Grid>
                </Mat.CardContent>
              </Mat.Card>
            </Mat.Grid>
          </Mat.Grid>
          <Mat.Grid container columnSpacing={2}>
            <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={3}> 
              <Mat.Card>
                <Mat.CardHeader m={0} sx={{backgroundColor: "#5c6bc0", color:"white" }} subheader="Vehicle Details" />
                <Mat.CardContent>
                  <Mat.Grid container columnSpacing={1}>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                      <Controls.Select label="Vehicle No." name="vehicle_no" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                      <div className="form-group" controlId="supplier_info">
                        <Controls.Select label="Suppiler" name="supplier" options={options}/>
                      </div>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
                        <Controls.Select label="Vehicle Type" name="vehicle_type" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={1}>
                        <Controls.Select label="Driver" name="driver_id" options={options}/>
                    </Mat.Grid>
                  </Mat.Grid>
                </Mat.CardContent>
              </Mat.Card> 
            </Mat.Grid>
            <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={3}>
              <Mat.Card>
                <Mat.CardHeader m={0}  sx={{backgroundColor: "#5c6bc0", color:"white"}} subheader="Item Details" />
                <Mat.CardContent>
                  <Mat.Grid container columnSpacing={1}>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                        <Controls.Select label="Product Name" name="product_name" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12}>
                        <Controls.Select label="Supplier Info" name="supplier_info" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={3}>
                      <Controls.Select label="Vehicle Type" name="vehicle_type" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={6} lg={6} md={6} sm={12} mt={3}>
                      <Controls.Select label="Driver ID" name="driver_id" options={options}/>
                    </Mat.Grid>
                  </Mat.Grid>
                </Mat.CardContent>
              </Mat.Card> 
            </Mat.Grid>
          </Mat.Grid>
          <Mat.Grid container>
            <Mat.Grid item xs={12} lg={12} md={12} sm={12} mt={2}> 
              <Mat.Card>
                <Mat.CardHeader m={0} sx={{backgroundColor: "#5c6bc0", color:"white" }} subheader="TXN Details" />
                <Mat.CardContent>
                  <Mat.Grid container columnSpacing={2}>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                      <Controls.Select label="Bill Type" name="bill_type" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                      <Controls.Select label="Invoice Type" name="invoice_type" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                      <Controls.Select label="Bill To" name="bill_to" options={options}/>
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                      <Controls.Input name="chargeable_unit" 
                        label="Chargeable WT/Unit"
                        type="number"
                        placeholder="Enter chargeable WT/Unit."
                        value={chargeable_unit}
                        onChange={this.changeHandler}
                      />
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                        <Controls.Input name="actual_unit" 
                          label="Actual WT/Unit" 
                          type="number"
                          placeholder="Enter actual WT/Unit."
                          value={cnn_no}
                          onChange={this.changeHandler}
                        />
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                        <Controls.Input name="no_of_pc"
                          label="No. of Pieces"
                          type="number"
                          placeholder="Enter no. of pieces."
                          value={no_of_pc}
                          onChange={this.changeHandler}
                        />
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                        <Controls.Input name="party_freight"
                          label="Party Fright"
                          type="text"
                          placeholder="Enter party fright."
                          value={no_of_pc}
                          onChange={this.changeHandler}
                        />
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                        <Controls.Input name="party_freight_unit"
                          label="Party Fright Unit"
                          type="number"
                          placeholder="Enter party fright unit."
                          value={no_of_pc}
                          onChange={this.changeHandler}
                        />
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12} mt={2}>
                        <Controls.Input name="party_freight_total"
                          label="Party Fright Total"
                          type="text"
                          placeholder="Enter party fright total."
                          value={no_of_pc}
                          onChange={this.changeHandler}
                        />
                    </Mat.Grid>
                  </Mat.Grid>
                    <hr/>
                  <Mat.Grid container columnSpacing={1}>
                    { this.state.supplyFields.map((supplyField, index) => (
                      <>
                      <Mat.Grid item xs={4} lg={4} md={4} sm={12} mt={2}>
                        <Controls.Input name="supply_freight"
                          label="Supply Freight"
                          type="number"
                          placeholder="Enter supply fright."
                          value={supplyField.supply_freight}
                          onChange={event => this.handleChangeSuppInput(index, event)}
                        />
                      </Mat.Grid>
                      <Mat.Grid item xs={4} lg={4} md={4} sm={12} mt={2}>
                        <Controls.Input name="supply_freight_unit"
                          label="Supply Freight Unit"
                          type="number"
                          placeholder="Enter supply fright unit."
                          value={supplyField.supply_freight_unit}
                          onChange={event => this.handleChangeSuppInput(index, event)}
                        />
                      </Mat.Grid>
                      <Mat.Grid item xs={4} lg={4} md={4} sm={12} mt={2}>
                        <Controls.Input name="supply_freight_total"
                          label="Supply Freight Total"
                          type="number"
                          placeholder="Enter supply fright total."
                          value={supplyField.supply_freight_total}
                          onChange={event => this.handleChangeSuppInput(index, event)}
                        />
                      </Mat.Grid>
                      </>
                    )) }
                  </Mat.Grid>
                  <Mat.Grid container >
                    <Controls.Button color="primary" text="Add More" onClick={this.handleAddClick}/>
                  </Mat.Grid>
                </Mat.CardContent>
              </Mat.Card> 
            </Mat.Grid>
            <Mat.Grid item xs={12} lg={12} md={12} sm={12} mt={1}>
              <Mat.Card>
                <Mat.CardHeader m={0} sx={{backgroundColor: "#5c6bc0", color:"white" }} subheader="Account Details" />
                <Mat.CardContent>
                  <Mat.Grid container>
                    <Mat.Grid item xs={3} lg={3} md={3} sm={12}>
                      <div className="form-group" controlId="advanced_paid">
                        <label>Advanced Paid</label>
                        <input className="form-control" required type="text" placeholder="Enter advances paid amount." defaultValue="20"/>
                      </div>
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3}sm={12}>
                      <div className="form-group" controlId="advanced_mode">
                        <label>Advanced Mode</label>
                        <Form.Select className="form-control">
                          <option disabled>Select Advanced Mode</option>
                          <option value="1">Cash</option>
                          <option value="2">IMPS</option>
                          <option value="3">Fuel</option>
                        </Form.Select>  
                      </div>
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                      <div className="form-group" controlId="advanced_payment_date">
                        <label>Advanced Payment Date</label>
                        <input className="form-control" required type="date"/>
                      </div>
                    </Mat.Grid>
                    <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                      <div className="form-group" controlId="advanced_paid_by">
                        <label>Advanced Paid By</label>
                        <input className="form-control" required type="text" placeholder="Advanced paid by..." defaultValue="Ram"/>
                      </div>
                    </Mat.Grid>
                    <div className="fuel col-12">
                      <Mat.Grid container>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="pump_name">
                            <label>Pump Name</label>
                            <input className="form-control" required type="text" placeholder="Pump Name" defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="service_charges">
                            <label>Service Charges</label>
                            <input className="form-control" required type="text" placeholder="Enter service charges" defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="shortage_tolerance_limit">
                            <label>Shortage Tolerance Limit</label>
                            <input className="form-control" required type="text" placeholder="Enter shortage tolerance limit." defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="shortage_tolerance_unit">
                            <label>Shortage Tolerance Unit</label>
                            <input className="form-control" required type="text" placeholder="Enter shortage tolerance limit." defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="detention_amount">
                            <label>Detention Amount</label>
                            <input className="form-control" required type="text" placeholder="Enter detention amount." defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="detention_unit">
                            <label>Detention Unit</label>
                            <input className="form-control" required type="text" placeholder="Enter detention unit." defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                        <Mat.Grid item xs={3} lg={3} md={3}sm={12} mt={3}>
                          <div className="form-group" controlId="comment">
                            <label>Comment</label>
                            <input className="form-control" required type="text" placeholder="Enter shortage tolerance limit." defaultValue="20"/>
                          </div>
                        </Mat.Grid>
                      </Mat.Grid>
                    </div>
                  </Mat.Grid>
                  <Mat.Grid container mt={4} ml={1}>
                    <div type="button" className="btn btn-primary">Save as Draft</div>
                    <div type="submit" className="btn btn-success ml-1">Save</div>
                    <div type="button" className="btn btn-danger ml-1">Discard</div>
                  </Mat.Grid>
                </Mat.CardContent>
              </Mat.Card> 
            </Mat.Grid>
          </Mat.Grid>
        </Form>
      </div>
    )
  }
}

export default LoryForm;
