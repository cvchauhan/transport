import React, { Component } from 'react';
import Axios from '../../axiosConfig';
import TransMode from '../../components/JsonData/transMode';

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      userDetails:[]
    }
  }
  componentDidMount = async() => {
    let id = JSON.parse(localStorage.getItem('user')).id;
    await Axios.get(`admin/get/${id}`).then(res => {      
      const data = res.data.result;  
      this.setState({userDetails:data})           
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const userDetails = this.state.userDetails;
    const company = userDetails.companies && userDetails.companies.length > 0 ? userDetails.companies[0] : []; 
    const vehicle = this.props.data.vehicleFields && this.props.data.vehicleFields.length > 0 ? this.props.data.vehicleFields[0]: []
    return (
      <div className='print-source' style={{margin: '2rem'}}>
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              { company &&               
              <>
              <tr>
                <td colSpan="10" className="text-center">
                  <h4 className="font-weight-bold">{company.name}</h4>
                  <h5>{company.company_address}</h5>                  
                  <h5>Dist.: {company.company_city}, Pin: {company.company_pin} ({company.company_state})</h5>                  
                </td>
              </tr>              
              <tr>
                <td colSpan="10" className="text-center">                 
                  <h6><strong>GSTIN:</strong> {company.company_gst}</h6>
                  <h6><strong>PAN NO. :</strong> {company.company_pan_no}</h6>
                  <h6><strong>EMAIL ID :</strong> {company.comp_email}</h6>                  
                  <h6><strong>CONTACT NO.:</strong> {company.company_contact_no}</h6>                  
                </td>
              </tr>
              </>
              } 
              <tr>
                <td colSpan="3"><strong>Ewaybill NO.:</strong> <br/><strong>EWB Validity:</strong></td>
                <td colSpan="2">{this.props.data.ewaybill_number ? this.props.data.ewaybill_number: '0000'}<br/>{this.props.data.ewaybill_validity}</td>                
                <td colSpan="3"><strong>LR/Bilty NO:</strong> <br/><strong>Date:</strong></td>
                <td colSpan="3">{this.props.data.lr_no} <br/>{this.props.data.lr_date}</td>                
              </tr>
              
              <tr>
                <td colSpan="3" rowSpan="2"><strong>Invoice Date:</strong><br/><strong>Invoice No: </strong><br/><strong>Invoice Value:</strong></td>
                <td colSpan="2" rowSpan="2">{this.props.data.party_doc_date}<br/>{this.props.data.party_doc_no}<br/>{this.props.data.party_invoice_value}</td>                
                <td colSpan="3"><strong>Vehicle No:</strong> <br/><strong>Mode:</strong></td>
                <td colSpan="2">{vehicle ? vehicle.vehicle_name: ''} <br/>{vehicle.transMode ? TransMode[Number(vehicle.transMode-1)]: ''}</td>
              </tr>
              <tr>
                <td colSpan="3"><strong>From: </strong><br/><strong>To: </strong></td>
                <td colSpan="2">{this.props.data.dispatch_from} <br/>{this.props.data.ship_to}</td>
              </tr>              
              <tr>
                <td colSpan="10"><strong>CONSIGNOR:</strong> {this.props.data.dispatch_address_line_1} {this.props.data.dispatch_address_line_2 ? ','+this.props.data.dispatch_address_line_2 :''} {this.props.data.dispatch_address_line_3 ? ','+this.props.data.dispatch_address_line_3:''} Pin : {this.props.data.dispatch_pincode} ({this.props.data.dispatch_state}) <br/>
                <br/><strong>GST:</strong> {this.props.data.consignor_gst}</td>
              </tr>
              <tr>
                <td colSpan="10"><strong>CONSIGNEE:</strong> {this.props.data.ship_address_line_1} {this.props.data.ship_address_line_2 ? ','+this.props.data.ship_address_line_2 :''} {this.props.data.ship_address_line_3 ? ','+this.props.data.ship_address_line_3:''} Pin : {this.props.data.ship_pincode} ({this.props.data.ship_state}) <br/>
                <br/><strong>GST:</strong> {this.props.data.consignee_gst}</td>
              </tr>              
              <tr className='text-center'>
                <th colSpan="3">No. Of Packages</th>
                <th colSpan="3">Product Name:</th>
                <th colSpan="2">Weight</th>
                <th colSpan="2">Rate per unit</th>
              </tr>
              { this.props.data.itemFields.map((item, index) => (                
                  <tr key={index} className='text-center'>
                    <td colSpan="3">{item.product_dimension}</td>
                    <td colSpan="3">{item.product_name}</td>
                    <td colSpan="2">{item.product_weight} {item.product_unit}</td>
                    <td colSpan="2">&#8377;{this.props.data.party_freight} {this.props.data.party_freight_unit}</td>
                  </tr>
                
              ))}
              <tr className='text-center'>
                <td colSpan="10">Remarks: To Be Billed</td>                
              </tr>
              <tr>
                <th colSpan={10}>TERMS & CONDITIONS:</th>
                </tr>
              <tr>
                <td colSpan={10}>1.</td>
                </tr>
              <tr>
                <td colSpan={10}>2.</td>
                </tr>
              <tr>
                <td colSpan={10}>3.</td>
              </tr>              
              <tr>
                <td colSpan={10}>4.</td>
              </tr>              
              <tr className='text-center'>
                <td colSpan={3}>&nbsp;</td>
                <td colSpan={3}>&nbsp;</td>
                <td colSpan={4}><strong>{company ? company.name: ''}</strong></td>
              </tr>
              <tr>
                <td colSpan={3}>&nbsp;</td>
                <td colSpan={3}>&nbsp;</td>
                <td colSpan={4}>&nbsp;</td>
              </tr>
              <tr className='text-center'>
                <td colSpan={3}><strong>Sender/Agent Signature</strong></td>
                <td colSpan={3}><strong>Driver signature</strong></td>
                <td colSpan={4}><strong>Authorised Signatory</strong></td>                
              </tr>
              {/* <tr>
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
                    <td colSpan="2">{vehicle.vehicle_name}</td>
                    <td>{vehicle.supplier}</td>
                    <td colSpan="2">{vehicle.driver_name}</td>
                    <td>{vehicle.driver_no}</td>
                    <td>{vehicle.change_place}</td>
                    <td>{vehicle.change_date}</td>
                    <td colSpan="2">{vehicle.change_reason}</td>
                  </tr>
              ))}
              <tr><td colSpan="10" className="text-center font-weight-bold">Item Details</td></tr>              
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
               
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}



export default ComponentToPrint;
