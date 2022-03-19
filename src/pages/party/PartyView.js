import React, { Component } from 'react';
import Axios from '../../axiosConfig';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';
import Popup from '../../components/popup/Popup';
import PartyBranchEdit from './Branch/BranchEdit';
import PartyEmployeeEdit from './Employee/EmployeeEdit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import PartyBranchAdd from './Branch/BranchAdd';
import PartyEmployeeAdd from './Employee/EmployeeAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class PartyView extends Component {
  constructor(props) {
    super(props);
    this.dialogBox = React.createRef();
    this.state = {
      dataValues: [],
      isFetching: false,
      openBranchEdit: false,
      openEmployeeEdit: false,
      openAlert: false,
      message: null,
      severity: null,
      openBranch: false,
      openEmployee: false,
      partyId:null
    }
  }
  submit = (id,name) => {
    confirmAlert({
      title: 'Confirm',
      message: `Are you sure you want to delete ${name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => name == 'branch' ? this.handleBranchDelete(id) : this.handleEmployeeDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  // fetching party details by id
  async fetchPartyDetailAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await Axios.get(`party/${this.props.match.params.id}`);
      // single party details storing in dataValues
      this.setState({ dataValues: response.data.result, isFetching: false });      
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }
  componentDidMount = () => {
    this.fetchPartyDetailAsync();
  }

  handleRefreshTable = (e) => {
    this.fetchPartyDetailAsync();
  }

  // edit pop-up open or close 
  handleBranchEditOpen = (id) => {    
    // set state id of branch and employee
    this.setState({
      openBranchEdit: true,
      partyId: this.props.match.params.id,
      id: id
    });
  }

  setCloseBranchPopup = () => {
    this.setState(prevState => ({
      openBranchEdit: {
        ...prevState.openBranchEdit,
      }
    }));
    this.setState({ openBranchEdit: false });    
  }
  handleEmployeeOpen = (partyId) => {
    this.setState({
      openEmployee: true,
      partyId: partyId,
    });
  }
  handleEmployeeClose = (e, message, severity) => {
    this.setState({
      openEmployee: false,
      openAlert: true,
      message: message,
      severity: severity,
      partyId: null,
    });
    this.handleRefreshTable();
  }
  setEmployeePopup = () => {
    this.setState(prevState => ({
      openEmployee: {
        ...prevState.openEmployee,
      }
    }));
    this.setState({ 
      openEmployee: false,
      partyId: null
    })
  };
  // delete branch
  handleBranchDelete = (id) => {
    Axios.delete(`party_branch/${id}/`)
      .then(res => {        
        this.handleRefreshTable();
        this.setState({
          openAlert: true,
          message: 'Branch Deleted Succesfully',
          severity: 'info',
        });
      })
      .catch(err => {
        console.log(err)
      });
  } 

  // alert toaster
  handleAlertOpen = () => {
    this.setState({
      openAlert: true
    });
  }

  handleAlertClose = () => {
    this.setState({
      openAlert: false
    });
  }

  handleAlertMsg = (status, message, severity) => {
    this.setState({
      openBranchEdit: false,
      openEmployeeEdit: false,
      openAlert: true,
      message: message,
      severity: severity,
      partyId: null
    });
  }

  // employee edit open
  handleEmployeeEditOpen = (id) => {    
    // set state id of branch and employee
    this.setState({
      openEmployeeEdit: true,
      partyId: this.props.match.params.id,
      id: id
    });
  }
  // employee edit close
  setCloseEmployeePopup = () => {
    this.setState(prevState => ({
      openEmployeeEdit: {
        ...prevState.openEmployeeEdit,
      }
    }));
    this.setState({ openEmployeeEdit: false });
  }
  handleBranchClose = (e, message, severity) => {
    this.setState({
      openBranch: false,
      openAlert: true,
      message: message,
      severity: severity,
      partyId: null,
    });
    this.handleRefreshTable();
  }
  // employee delete
  handleEmployeeDelete = (id) => {
    Axios.delete(`party_employee/${id}`)
    .then(res => {      
      this.handleRefreshTable();
      this.setState({
        openAlert: true,
        message: 'Employee Deleted Succesfully',
        severity: 'info',
      });
    })
    .catch(err => {
      console.log(err)
    });
  }
  handleBranchOpen = (partyId) => {
    this.setState({
      openBranch: true,
      partyId: partyId,
    });
  }
  setBranchPopup = () => {
    this.setState(prevState => ({
      openBranch: {
        ...prevState.openBranch,
      }
    }));
    this.setState({ 
      openBranch: false,
    });
  };
  render() {
    const branches = this.state.dataValues ? this.state.dataValues.party_branches : [];
    const employees = this.state.dataValues ? this.state.dataValues.party_employees : [];    
    if (employees) {
      employees.map((value)=>{        
        let branchname = branches.find(x=> x.id == value.party_branch_id).party_br_city
        value['party_branch_name'] = branchname;
      })
    }    
    return (
      <div ref={this.dialogBox} className="content">
        <Link to='/party'><Button><ArrowBackIcon/>Go Back</Button></Link>
        <Tooltip title="Add Branch" placement="top">
            <Button  variant="text" color="success" onClick = {() => { this.handleBranchOpen(this.props.match.params.id)}}>
              <Icons.LocationCity />
            </Button>
        </Tooltip>
        <Tooltip title="Add Employee" placement="top">
            <Button  variant="text" color="warning" onClick = {() => { this.handleEmployeeOpen(this.props.match.params.id)}}>
              <Icons.PersonAddAlt1 />
            </Button>
        </Tooltip>
        <table className="table table-bordered">
          <tbody>
            <tr className="table-info">
              <td colSpan="9" className="font-weight-bold text-dark text-center">Basic Details</td>
            </tr>
            <tr>
              <th colSpan="2"><label>Company Name:</label></th>
              <th colSpan="2"><label>GST No.:</label></th>
              <th colSpan="2"><label>Tan No.:</label></th>
              <th colSpan="3"><label>E-mail:</label></th>
            </tr>
            <tr>
              <td colSpan="2"><p>{this.state.dataValues.party_name}</p></td>
              <td colSpan="2"><p>{this.state.dataValues.party_gst}</p></td>
              <td colSpan="2"><p>{this.state.dataValues.party_tan}</p></td>
              <td colSpan="3"><p>{this.state.dataValues.party_email}</p></td>
            </tr>
            <tr></tr>
            <tr className="table-primary">
              <td colSpan="7" className="font-weight-bold text-dark text-center">Branch Details</td>
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
            {branches ? (
              branches.map((branch, index) => (
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
                        <Button variant="text" color="primary" onClick={() => { this.handleBranchEditOpen(branch.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.submit(branch.id,'branch') }}>
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
            <tr className="table-warning">
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
            {employees ? (
              employees.map((employee, index) => (
                <tr key={index}>
                  <td colSpan="2"><p>{employee.party_emp_name}</p></td>
                  <td><p>{employee.party_emp_designation}</p></td>
                  <td><p>{employee.party_emp_contact_no}</p></td>
                  <td colSpan="1"><p>{employee.party_emp_email}</p></td>
                  <td colSpan="1"><p>{employee.party_branch_name}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.handleEmployeeEditOpen(employee.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.submit(employee.id,'employee') }}>
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
          </tbody>
        </table>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.openAlert} autoHideDuration={4000} onClose={this.handleAlertClose}>
          <MuiAlert
            onClose={this.handleAlertClose}
            severity={this.state.severity}
            elevation={6}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {this.state.message}
          </MuiAlert>
        </Snackbar>

        <Popup title="Edit Party Branch" openPopup={this.state.openBranchEdit} setOpenPopup={this.setCloseBranchPopup}>
          <PartyBranchEdit partyId={this.state.partyId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} />
        </Popup>
        <Popup title="Edit Party Employee" openPopup={this.state.openEmployeeEdit} setOpenPopup={this.setCloseEmployeePopup}>
          <PartyEmployeeEdit partyId={this.state.partyId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} branches={branches}/>
        </Popup>
        <Popup title="Add Branch" openPopup={this.state.openBranch} setOpenPopup={this.setBranchPopup}>
          <PartyBranchAdd popup={this.state.openBranch} partyId={this.state.partyId} popupChange={this.handleBranchClose} refreshTable={this.handleRefreshTable}/>
        </Popup>
        <Popup title="Add Employee" openPopup={this.state.openEmployee} setOpenPopup={this.setEmployeePopup}>
          <PartyEmployeeAdd popup={this.state.openEmployee} partyId={this.state.partyId} popupChange={this.handleEmployeeClose}/>
        </Popup>
      </div>
    )
  }
}

export default PartyView;