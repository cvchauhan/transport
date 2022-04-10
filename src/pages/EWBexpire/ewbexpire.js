import React, { Component } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';

class EWBexpire extends Component {      
    render() {      
        return (
            <>           
            <div className="row">
                <table className="table table-bordered">
                    <tbody>
                        <tr className="table-info">
                            <td colSpan="10" className="font-weight-bold text-dark text-center">EWB About to expire</td>
                        </tr>
                        <tr>
                            <th><label>EWB No.:</label></th>
                            <th><label>Validity Date:</label></th>
                            <th><label>Date:</label></th>
                            <th><label>Generator ID:</label></th>
                            <th><label>Actual distance:</label></th>
                            <th><label>Doc No.:</label></th>
                            <th><label>Doc Date:</label></th>
                            <th><label>From GSTIN:</label></th>
                            <th><label>To GSTIN:</label></th>
                            <th><label>Action</label></th>
                        </tr>
                        {this.props.EWBexpire ? (
                            this.props.EWBexpire.map((expire, index) => (
                        <tr key={index}>
                            <td><p>{expire.ewaybill_number}</p></td>
                            <td><p>{expire.ewaybill_validity}</p></td>
                            <td><p>{expire.lr_date}</p></td>
                            <td><p>{expire.lr_no}</p></td>
                            <td><p>{expire.actualDist}</p></td>
                            <td><p>{expire.party_doc_no}</p></td>
                            <td><p>{expire.party_doc_date}</p></td>
                            <td><p>{expire.from_gst ? expire.from_gst : ''}</p></td>
                            <td><p>{expire.to_gst ? expire.to_gst : ''}</p></td>                  
                            <td>                            
                                <ButtonGroup variant="outlined" size="small">
                                <Tooltip title="Extend Validity" placement="top">
                                    <Button variant="contained" color="success">Extend Validity</Button>
                                </Tooltip>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )))
                    :
                    (
                        <tr className="text-center">
                        <td colSpan="10">No Record Found</td>
                        </tr>
                    )
                    }                                    
                    </tbody>
                </table>
            </div> 
            </>
        );
    }
}

export default EWBexpire;