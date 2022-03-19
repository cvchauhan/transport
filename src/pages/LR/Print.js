import React, { Component } from 'react';

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='print-source' style={{margin: '2rem'}}>
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td colSpan="10" className="text-center">
                  <h1 className="font-weight-bold">BAJRANGBALI ROADWAYS</h1>
                  <h5>VEDVYAS RURKELA - 769041 (ODISHA)</h5>
                  <h6>E-mail:  bajrangbaliroadways@gmail.com</h6>
                  <h6>Mob. No. 987654321</h6>
                </td>
              </tr>
              <tr>
                <td colSpan="2">LR/Bilty NO.: {this.props.data.lr_no}</td>
                <td>LR/Bilty Date: {this.props.data.lr_date}</td>
                <td colSpan="2">Ewaybill NO.: {this.props.data.ewaybill_number}</td>
                <td>Ewaybill Vailidity: {this.props.data.ewaybill_validity}</td>
                <td colSpan="2">From: {this.props.data.from}</td>
                <td colSpan="2">To: {this.props.data.to}</td>
              </tr>
              <tr>
                <td colSpan="3">Document No.: {this.props.data.party_doc_no}</td>
                <td colSpan="2">Document Date: {this.props.data.party_doc_date}</td>
                <td colSpan="2">Document Type: {this.props.data.party_doc_type}</td>
                <td colSpan="3">Invoice Value.: {this.props.data.party_invoice_value}</td>
              </tr>
              <tr>
                <td colSpan="5">CONSIGNOR: {this.props.data.consignor}</td>
                <td colSpan="5">CONSIGNEE: {this.props.data.consignee}</td>
              </tr>
              <tr><td colSpan="10" className="text-center font-weight-bold">Vehicle Details</td></tr>
              <tr>
                <th colSpan="2">Vehicle No</th>
                <th>Supplier</th>
                <th colSpan="2">Driver Name</th>
                <th>Driver No.</th>
                <th>Place</th>
                <th>Date</th>
                <th colSpan="2">Reason</th>
              </tr>
              { this.props.data.vehicleFields.map((vehicle, index) => (
                  
                  <tr key={index}>
                    <td colSpan="2">{vehicle.vehicle_no}</td>
                    <td>{vehicle.supplier}</td>
                    <td  colSpan="2">{vehicle.driver_name}</td>
                    <td>{vehicle.driver_no}</td>
                    <td>{vehicle.change_place}</td>
                    <td>{vehicle.change_date}</td>
                    <td colSpan="2">{vehicle.change_reason}</td>
                  </tr>
              ))}
              <tr><td colSpan="10" className="text-center font-weight-bold">Item Details</td></tr>
              <tr>
                <td colSpan="3">Product Name:</td>
                <td colSpan="2">Unit</td>
                <td colSpan="3">Dimension</td>
                <td colSpan="2">Weight</td>
              </tr>
              { this.props.data.itemFields.map((item, index) => (
                
                  <tr key={index}>
                    <td colSpan="3">{item.product_name}</td>
                    <td colSpan="2">{item.product_unit}</td>
                    <td colSpan="3">{item.product_dimension}</td>
                    <td colSpan="2">{item.product_weight}</td>
                  </tr>
                
              ))}
              <tr><td colSpan="10" className="text-center font-weight-bold">Party Details</td></tr>
              <tr>
                <td>Bill To: {this.props.data.party_bill_to}</td>
                <td>Bill Type: {this.props.data.party_bill_type}</td>
                <td colSpan="2">Chargeable WT/Unit: {this.props.data.party_chargeable_unit}</td>
                <td colSpan="2">Actual WT/Unit: {this.props.data.party_actual_unit}</td>
                <td>Freight: {this.props.data.party_freight}</td>
                <td>Freight Unit: {this.props.data.party_freight_unit}</td>
                <td colSpan="2">Freight Total: {this.props.data.party_freight_total}</td>
              </tr>
              <tr>
                <td>Invoice Type: {this.props.data.party_invoice_type}</td>
                <td colSpan="2">Shortage Tolerance limit: {this.props.data.party_shortage_limit}</td>
                <td colSpan="2">Shortage Tolerance Unit: {this.props.data.party_shortage_unt}</td>
                <td>Detantion Unit: {this.props.data.party_detention_unit}</td>
                <td colSpan="2">Detantion Amount: {this.props.data.party_detention_amount}</td>
                <td colSpan="2">Comment {this.props.data.party_comment}</td>
              </tr>
              <tr><td colSpan="10" className="text-center font-weight-bold">Advance Details</td></tr>
              <tr>
                <th>DATE</th>
                <th>MODE</th>
                <th>AMOUNT</th>
                <th>PUMP NAME</th>
                <th>PUMP AMOUNT</th>
                <th>BANK NAME</th>
                <th>HOLDER NAME</th>
                <th>ACCOUNT NUMBER</th>
                <th>IFSC CODE</th>
                <th>REMARKS</th>
              </tr>
              { this.props.data.advanceFields.map((advance, index) => (
                
                  <tr key={index}>
                    <td>{advance.advance_payment_date}</td>
                    <td>{advance.advance_mode}</td>
                    <td>{advance.advance_paid}</td>
                    <td>{advance.pump_name}</td>
                    <td>{advance.pump_amount}</td>
                    <td>{advance.bank_name}</td>
                    <td>{advance.holder_name}</td>
                    <td>{advance.account_number}</td>
                    <td>{advance.ifsc_code}</td>
                    <td>{advance.advance_other}</td>
                  </tr>
               
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}



export default ComponentToPrint;
