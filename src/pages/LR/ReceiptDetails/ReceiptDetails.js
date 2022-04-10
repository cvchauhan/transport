import React from 'react';
import Controls from '../../../components/form-controls/Controls';

const ReceiptDetails=(props)=>
{
    const {lr_no, lr_date, ewaybill_validity, ewaybill_number, party_doc_no, party_doc_date, party_doc_type, party_invoice_value} = props.data
  return (
    <div className="row">
    <div className="col-xs-12 col-lg-12 col-md-12 col-sm-12">
      <div className="card">
        <div className="card-header">
          <h6 className="card-title m-0">RECEIPT DETAILS</h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
              <div className="form-group">
                <Controls.Input 
                  name="lr_no" 
                  label="LR/Bilty No." 
                  type="text" 
                  size="small" 
                  disabled={true}
                  value={lr_no} 
                  onChange={props.onChange}/>
              </div>
            </div>
            <div className="col-xs-3 col-lg-3 col-md-3 col-sm-12">
              <div className="form-group">
                <Controls.DatePicker 
                  label="LR/Bilty Date" 
                  name="lr_date"
                  value={lr_date}
                  onChange={(newValue) => {
                    newValue = newValue.toISOString().split('T')[0];                    
                    props.onStateSet('lr_date',newValue)                   
                  }}
                  size="small"/>
              </div>
            </div>
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
              <div className="form-group">
                <Controls.Input name="ewaybill_number" label="Ewaybill No." type="number"size="small" placeholder="Enter ewaybill No." value={ewaybill_number} onChange={props.onChange}/>
              </div>
            </div>
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
              <div className="form-group">
                <Controls.DatePicker 
                  label="Ewaybill Validity." 
                  name="ewaybill_validity"
                  value={ewaybill_validity}
                  onChange={(newValue) => {
                    newValue = newValue.toISOString().split('T')[0];                    
                    props.onStateSet('ewaybill_validity',newValue)                    
                  }}
                  size="small"/>
              </div>
            </div>
            
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
              <div className="form-group">
                <Controls.Input 
                  name="party_doc_no" 
                  label="Party Document No."
                  type="text" 
                  value={party_doc_no}
                  onChange={props.onChange}
                />
              </div>
            </div>
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
              <div className="form-group">
                <Controls.DatePicker 
                  label="Party Document Date"
                  value={party_doc_date}
                  name="party_doc_date"
                  onChange={(newValue) => {
                    newValue = newValue.toISOString().split('T')[0];
                    props.onStateSet('party_doc_date',newValue)                  
                  }}
                  size="small"
                />
              </div>
            </div>
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
              <div className="form-group">
                <Controls.Input name="party_doc_type" 
                  label="Party Document Type."
                  type="text" 
                  value={party_doc_type}
                  onChange={props.onChange}
                />
              </div>
            </div>
            
            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
              <div className="form-group">
                <Controls.Input name="party_invoice_value" 
                  label="Party Invoice Value."
                  type="text" 
                  value={party_invoice_value}
                  onChange={props.onChange}
                />
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
 
export default ReceiptDetails;