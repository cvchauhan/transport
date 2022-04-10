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
import { Link } from 'react-router-dom';
import SupplierBranchAdd from './Branch/BranchAdd';
import SupplierEmployeeAdd from './Employee/EmployeeAdd';
import SupplierBank from './Bank/BankAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BranchView from './Branch/BranchView';
import EmployeeView from './Employee/EmployeeView';
import BankView from './Bank/BankView';

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
      openBranch: false, // for open Add Branch popup
      openEmployee: false, // for open Add Employee popup      
      openBank: false, // for open Add Bank popup
      message: null,
      severity: null     
    }
  }

  // fetching supplier details by id
  async fetchSupplierDetailAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const response = await Axios.get(`supplier/${this.props.match.params.id}`);
      // single supplier details storing in dataValues
      this.setState({ dataValues: response.data.result, isFetching: false });      
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
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
  submitbank = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: `Are you sure you want to delete bank?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleBankDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  componentDidMount = () => {
    this.fetchSupplierDetailAsync();
  }

  handleRefreshTable = (e) => {
    this.fetchSupplierDetailAsync();
  }

  // branch edit pop-up open or close 
  handleBranchEditOpen = (id) => {    
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
////////////////// Open Add Branch Popup ///////////////////////////////////
handleBranchOpen = (id) => {
  this.setState({
    openBranch: true,
    supplierId: id,
  });
}
handleBranchClose = (e, message, severity) => {
  this.setState({
    openBranch: false,
    openAlert: true,
    message: message,
    severity: severity,
    supplierId: null,
  });
  this.handleRefreshTable();
}
setBranchPopup = () => {
  this.setState(prevState => ({
    openBranch: {
      ...prevState.openBranch,
    }
  }));
  this.setState({ 
    openBranch: false,
    supplierId: null,
  });
};
  // delete branch
  handleBranchDelete = (id) => {
    Axios.delete(`supplier_branch/${id}/`)
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
 ////////////////// Open Add Employee Popup ///////////////////////////////////
 handleEmployeeOpen = (id) => {
  this.setState({
    openEmployee: true,
    supplierId: id,
  });
}
handleEmployeeClose = (e, message, severity) => {
  this.setState({
    openEmployee: false,
    openAlert: true,
    message: message,
    severity: severity,
    supplierId: null,
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
    supplierId: null,
  });
};

////////////////// Open Add Bank Popup ///////////////////////////////////
handleBankOpen = (id) => {
  this.setState({
    openBank: true,
    supplierId: id,
  });
}
handleBankClose = (e, message, severity) => {
  this.setState({
    openBank: false,
    openAlert: true,
    message: message,
    severity: severity,
    supplierId: null
  });
  this.handleRefreshTable();
}
setBankPopup = () => {
  this.setState(prevState => ({
    openBank: {
      ...prevState.openBank,
    }
  }));
  this.setState({ 
    openBank: false,
    supplierId: null
  });
};

  // employee delete
  handleEmployeeDelete = (id) => {
    Axios.delete(`supplier_employee/${id}`)
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

  // delete bank
  handleBankDelete = (id) => {
    Axios.delete(`supplier_bank/${id}/`)
      .then(res => {        
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

  /////////////////// Open Edit Popups for branch and employee and bank/////////////////
  handleEditPopup = (id, type) => {
    if(type === 'employee') {
      this.setState({ 
        openEditEmployee: true,
        supplierId: id
      });
    }
    if(type === 'branch'){
      this.setState({ 
        openEditBranch: true,
        supplierId: id
      });
    }
    if(type === 'bank') {
      this.setState({ 
        openEditBank: true,
        supplierId: id
      });
    }
  }
  render() {
    const branches = this.state.dataValues.supplier_branches;
    const employees = this.state.dataValues.supplier_employees;
    const banks = this.state.dataValues.supplier_bank_details;
    if (employees) {
      employees.map((value)=>{        
        let branchname = branches.find(x=> x.id == value.supplier_branch_id).supp_br_city;
        value['supp_branch_name'] = branchname;
      })
    }
    return (
      <div ref={this.dialogBox} className="content">
         <Link to='/supplier'><Button><ArrowBackIcon/>Go Back</Button></Link> 
         <Tooltip title="Add Bank" placement="top">
            <Button  variant="text" color="info" onClick = {() => { this.handleBankOpen(this.props.match.params.id)}}>
              <Icons.AccountBalance />
            </Button>
          </Tooltip>
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
              <td colSpan="11" className="font-weight-bold text-dark text-center">Basic Details</td>
            </tr>
            <tr>
              <td colSpan="3"><label>Name: </label> {this.state.dataValues.supp_name}</td>
              <td colSpan="3"><label>Mobile: </label> {this.state.dataValues.supp_contact_no}</td>
              <td colSpan="3"><label>E-mail: </label> {this.state.dataValues.supp_email}</td>
              <td colSpan="3"><label>Pan No.: </label> {this.state.dataValues.supp_pan}</td>
            </tr>
            <BranchView branches={branches} edit={this.handleBranchEditOpen} delete={this.submit}/>  
            <EmployeeView employees={employees} edit={this.handleEmployeeEditOpen} delete={this.submit}/>
            <BankView banks={banks} edit={this.handleBankEditOpen} delete={this.submitbank}/>           
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
          <SupplierEmployeeEdit supplierId={this.state.supplierId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} branches={branches} />
        </Popup>
        <Popup title="Edit Supplier Bank" openPopup={this.state.openBankEdit} setOpenPopup={this.setCloseBankPopup}>
          <SupplierBankEdit supplierId={this.state.supplierId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} branches={branches}/>
        </Popup>
        <Popup title="Add Branch" openPopup={this.state.openBranch} setOpenPopup={this.setBranchPopup}>
          <SupplierBranchAdd  popup={this.state.openBranch} supplierId={this.state.supplierId} popupChange={this.handleBranchClose}/>
        </Popup>
        <Popup title="Add Employee" openPopup={this.state.openEmployee} setOpenPopup={this.setEmployeePopup}>
          <SupplierEmployeeAdd  popup={this.state.openEmployee} supplierId={this.state.supplierId} popupChange={this.handleEmployeeClose}/>
        </Popup>
        <Popup title="Add Bank" openPopup={this.state.openBank} setOpenPopup={this.setBankPopup}>
          <SupplierBank  popup={this.state.openBank} supplierId={this.state.supplierId} popupChange={this.handleBankClose}/>
        </Popup>
      </div>
    )
  }
}

export default SupplierView;