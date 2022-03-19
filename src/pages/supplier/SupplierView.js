import React from 'react';
import Axios from '../../axiosConfig';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';
import Popup from '../../components/popup/Popup';
import SupplierBranchEdit from './Branch/BranchEdit';
import SupplierEmployeeEdit from './Employee/EmployeeEdit';
import SupplierBankEdit from './Bank/BankEdit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

class SupplierView extends React.Component {
  constructor(props) {
    super(props);
    this.dialogBox = React.createRef();
    this.state = {
      dataValues: {},
      isFetching: false,
      openAlert: false,
      openBankEdit: false,
      openBranchEdit: false,
      openEmployeeEdit: false,
      message: null,
      severity: null,
    }
  }

  // fetching supplier details by id
  async fetchSupplierDetailAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await Axios.get(`supplier/${this.props.match.params.id}`);
      // single supplier details storing in dataValues
      this.setState({ dataValues: response.data, isFetching: false });

      console.log(this.state.dataValues);
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }

  componentDidMount = () => {
    this.fetchSupplierDetailAsync();
  }

  handleRefreshTable = (e) => {
    this.fetchSupplierDetailAsync();
  }

  // branch edit pop-up open or close 
  handleBranchEditOpen = (id) => {
    console.log(id);
    // set state id of branch
    this.setState({
      openBranchEdit: true,
      supplierId: this.props.match.params.id,
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

  // employee edit pop-up
  handleEmployeeEditOpen = (id) => {
    console.log(id);
    // set state id of employee
    this.setState({
      openEmployeeEdit: true,
      supplierId: this.props.match.params.id,
      id: id
    });
  }

  setCloseEmployeePopup = () => {
    this.setState(prevState => ({
      openEmployeeEdit: {
        ...prevState.openEmployeeEdit,
      }
    }));
    this.setState({ openEmployeeEdit: false });
  }

  // bank edit pop-up
  handleBankEditOpen = (id) => {
    console.log(id);
    // set state id of bank
    this.setState({
      openBankEdit: true,
      supplierId: this.props.match.params.id,
      id: id
    });
  }

  setCloseBankPopup = () => {
    this.setState(prevState => ({
      openBankEdit: {
        ...prevState.openBankEdit,
      }
    }));
    this.setState({ openBankEdit: false });
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
      openBankEdit: false,
      openBranchEdit: false,
      openEmployeeEdit: false,
      openAlert: true,
      message: message,
      severity: severity,
      supplierId: null
    });
  }

  // delete branch
  handleBranchDelete = (id) => {
    Axios.delete(`supplier_branch/${id}/`)
      .then(res => {
        console.log(res);
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

  // employee delete
  handleEmployeeDelete = (id) => {
    Axios.delete(`supplier_employee/${id}`)
    .then(res => {
      console.log(res);
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

  // delete bank
  handleBankDelete = (id) => {
    Axios.delete(`supplier_bank/${id}/`)
      .then(res => {
        console.log(res);
        this.handleRefreshTable();
        this.setState({
          openAlert: true,
          message: 'Bank Deleted Succesfully',
          severity: 'info',
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const data = this.state.dataValues;
    const branches = this.state.dataValues.supplier_branches;
    const employees = this.state.dataValues.supplier_employees;
    const banks = this.state.dataValues.supplier_bank_details;

    return (
      <div ref={this.dialogBox} className="content">
        <table className="table table-bordered">
          <tbody>
            <tr className="table-info">
              <td colSpan="10" className="font-weight-bold text-dark text-center">Basic Details</td>
            </tr>
            <tr>
              <td colSpan="3"><label>Name: </label> {this.state.dataValues.supp_name}</td>
              <td colSpan="3"><label>Mobile: </label> {this.state.dataValues.supp_contact_no}</td>
              <td colSpan="4"><label>E-mail: </label> {this.state.dataValues.supp_email}</td>
            </tr>
            <tr className="table-primary">
              <td colSpan="10" className="font-weight-bold text-dark text-center">Branch Details</td>
            </tr>
            <tr>
              <th colSpan="6"><label>Address</label></th>
              <th><label>City</label></th>
              <th><label>State</label></th>
              <th><label>Pincode</label></th>
              <th><label>Action</label></th>
            </tr>
            {branches ? (
              branches.map((branch, index) => (
                <tr key={index}>
                  <td colSpan="6">
                    <p className="text-wrap">
                      {branch.supp_br_add1}, {branch.supp_br_add2}, {branch.supp_br_add3}
                    </p>
                  </td>
                  <td><p>{branch.supp_br_city}</p></td>
                  <td><p>{branch.supp_br_state}</p></td>
                  <td><p>{branch.supp_br_pin_code}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.handleBranchEditOpen(branch.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.handleBranchDelete(branch.id) }}>
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
                  <td colSpan="10">No Branch Found</td>
                </tr>
              )
            }
            <tr className="table-warning">
              <td colSpan="10" className="font-weight-bold text-dark text-center">Employees Details</td>
            </tr>
            <tr>
              <th colSpan="3"><label>Name</label></th>
              <th colSpan="2"><label>Designation</label></th>
              <th><label>Mobile</label></th>
              <th colSpan="3"><label>E-mail</label></th>
              <th><label>Action</label></th>
            </tr>
            {employees ? (
              employees.map((employee, index) => (
                <tr key={index}>
                  <td colSpan="3"><p>{employee.supp_emp_name}</p></td>
                  <td colSpan="2"><p>{employee.supp_emp_designation}</p></td>
                  <td><p>{employee.supp_emp_contact_no}</p></td>
                  <td colSpan="3"><p>{employee.supp_emp_email}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.handleEmployeeEditOpen(employee.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.handleEmployeeDelete(employee.id) }}>
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
                  <td colSpan="10">No Employee Found</td>
                </tr>
              )
            }
            <tr className="table-danger">
              <td colSpan="10" className="font-weight-bold text-dark text-center">Bank Details</td>
            </tr>
            <tr>
              <th colSpan="2"><label>Bank Name</label></th>
              <th colSpan="3"><label>Account Holder Name</label></th>
              <th><label>IFSC Code</label></th>
              <th colSpan="3"><label>Account Number</label></th>
              <th><label>Action</label></th>
            </tr>
            {banks ? (
              banks.map((bank, index) => (
                <tr key={index}>
                  <td colSpan="2"><p>{bank.supp_bank_name}</p></td>
                  <td colSpan="3"><p>{bank.supp_bank_ah_name}</p></td>
                  <td><p>{bank.supp_bank_ifsc}</p></td>
                  <td colSpan="3"><p>{bank.supp_bank_acc_no}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.handleBankEditOpen(bank.id, 'bank') }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.handleBankDelete(bank.id, 'bank') }}>
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
                  <td colSpan="10">No Employee Found</td>
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

        <Popup title="Edit Supplier Branch" openPopup={this.state.openBranchEdit} setOpenPopup={this.setCloseBranchPopup}>
          <SupplierBranchEdit supplierId={this.state.supplierId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} />
        </Popup>
        <Popup title="Edit Supplier Employee" openPopup={this.state.openEmployeeEdit} setOpenPopup={this.setCloseEmployeePopup}>
          <SupplierEmployeeEdit supplierId={this.state.supplierId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} />
        </Popup>
        <Popup title="Edit Supplier Bank" openPopup={this.state.openBankEdit} setOpenPopup={this.setCloseBankPopup}>
          <SupplierBankEdit supplierId={this.state.supplierId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} />
        </Popup>
      </div>
    )
  }
}

export default SupplierView;