import React, { Component } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';

class BankView extends Component {      
    render() {      
        return (
            <>           
           <tr className="table-primary">
              <td colSpan="11" className="font-weight-bold text-dark text-center">Bank Details</td>
            </tr>
            <tr>
              <th colSpan="2"><label>Bank Name</label></th>
              <th colSpan="3"><label>Account Holder Name</label></th>
              <th><label>IFSC Code</label></th>
              <th colSpan="3"><label>Account Number</label></th>
              <th colSpan={2}><label>Action</label></th>
            </tr>
            {this.props.banks ? (
              this.props.banks.map((bank, index) => (
                <tr key={index}>
                  <td colSpan="2"><p>{bank.supp_bank_name}</p></td>
                  <td colSpan="3"><p>{bank.supp_bank_ah_name}</p></td>
                  <td><p>{bank.supp_bank_ifsc}</p></td>
                  <td colSpan="3"><p>{bank.supp_bank_acc_no}</p></td>
                  <td colSpan={2}>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.edit(bank.id, 'bank') }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.delete(bank.id) }}>
                          <Icons.Delete />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </td>
                </tr>
              )))
              :
              (
                <tr>
                  <td colSpan="11">No Bank Found</td>
                </tr>
              )
            }
            </>
        );
    }
}

export default BankView;