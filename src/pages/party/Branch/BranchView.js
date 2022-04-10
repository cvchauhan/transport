import React, { Component } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';

class PartyBranchView extends Component {      
    render() {      
        return (
            <>           
                <tr></tr>
                <tr className="table-primary">
                  <td colSpan="10" className="font-weight-bold text-dark text-center">Branch Details</td>
                </tr>     
                <tr>
                <th><label>Address Line-1:</label></th>
                <th><label>Address Line-2:</label></th>
                <th><label>Address Line-3:</label></th>
                <th><label>City:</label></th>
                <th><label>State:</label></th>
                <th><label>Pincode:</label></th>
                <th><label>Actions</label></th>
                </tr>
                {this.props.branches ? (
              this.props.branches.map((branch, index) => (
                <tr key={index}>
                  <td><p className="text-wrap">{branch.party_br_add1}</p></td>
                  <td><p className="text-wrap">{branch.party_br_add2}</p></td>
                  <td><p className="text-wrap">{branch.party_br_add3}</p></td>
                  <td><p>{branch.party_br_city}</p></td>
                  <td><p>{branch.party_br_state}</p></td>
                  <td><p>{branch.party_br_pin_code ? branch.party_br_pin_code : ''}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.props.edit(branch.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.props.delete(branch.id,'branch') }}>
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
                  <td colSpan="9">No Branch Found</td>
                </tr>
              )
            }
            </>
        );
    }
}

export default PartyBranchView;