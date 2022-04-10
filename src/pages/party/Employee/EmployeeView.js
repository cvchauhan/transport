import React, { Component } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';

class EmployeeView extends Component {  
    render() {      
        return (
          <>               
            <tr className="table-primary">
              <td colSpan="7" className="font-weight-bold text-dark text-center">Employees Details</td>
            </tr>
            <tr>
              <th colSpan="2"><label>Name:</label></th>
              <th><label>Designation:</label></th>
              <th><label>Mobile:</label></th>
              <th colSpan="1"><label>E-mail:</label></th>
              <th colSpan="1"><label>Branch:</label></th>
              <th><label>Actions</label></th>
            </tr>
            {this.props.employees ? (
              this.props.employees.map((employee, index) => (
                <tr key={index}>
                  <td colSpan="2"><p>{employee.party_emp_name}</p></td>
                  <td><p>{employee.party_emp_designation}</p></td>
                  <td><p>{employee.party_emp_contact_no}</p></td>
                  <td colSpan="1"><p>{employee.party_emp_email}</p></td>
                  <td colSpan="1"><p>{employee.party_branch_name}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.props.edit(employee.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.props.delete(employee.id,'employee') }}>
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
                  <td colSpan="9">No Employee Found</td>
                </tr>
              )
            }
          </>
        );
    }
}

export default EmployeeView;