import React, { Component } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';

class BranchView extends Component {      
    render() {      
        return (
            <>           
            <tr className="table-primary">
              <td colSpan="11" className="font-weight-bold text-dark text-center">Branch Details</td>
            </tr>
            <tr>
              <th colSpan="6"><label>Address</label></th>
              <th><label>City</label></th>
              <th><label>State</label></th>
              <th><label>Pincode</label></th>
              <th colSpan={2}><label>Action</label></th>
            </tr>
            {this.props.branches ? (
              this.props.branches.map((branch, index) => (
                <tr key={index}>
                  <td colSpan="6">
                    <p className="text-wrap">
                      {branch.supp_br_add1}, {branch.supp_br_add2}, {branch.supp_br_add3}
                    </p>
                  </td>
                  <td><p>{branch.supp_br_city}</p></td>
                  <td><p>{branch.supp_br_state}</p></td>
                  <td><p>{branch.supp_br_pin_code ? branch.supp_br_pin_code : ''}</p></td>
                  <td colSpan={2}>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.edit(branch.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.delete(branch.id,'branch') }}>
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
                  <td colSpan="11">No Branch Found</td>
                </tr>
              )
            }
            </>
        );
    }
}

export default BranchView;