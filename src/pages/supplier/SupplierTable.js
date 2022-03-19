import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Popup from '../../components/popup/Popup';
import SupplierForm from './SupplierForm';
import SupplierEdit from './SupplierEdit';
import SupplierBranchAdd from './Branch/BranchAdd';
import SupplierEmployeeAdd from './Employee/EmployeeAdd';
import SupplierBank from './Bank/BankAdd';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Icons from '@mui/icons-material'
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

class SupplierTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: '',
      columns: '',
      dataValues: [],
      isFetching: false,
      openBranch: false, // for open Add Branch popup
      openEmployee: false, // for open Add Employee popup
      openBank: false, // for open Add Bank popup
      openEdit: false, // for open edit popup
      supplierId : null, // passing id for edit and delete
      openAlert: false, //open alert 
      message : null,  // message for alert
      severity : null, // color for alert
    }
  }

  async fetchSuppliersAsync() {
    try {
      this.setState({...this.state, isFetching: true});
      const response = await Axios.get(`supplier/`);
      this.setState({dataValues: response.data, isFetching: false, open: false});
    } catch (e) {
        console.log(e);
        this.setState({...this.state, isFetching: false});
    }
  }

  componentDidMount = () => {
    this.fetchSuppliersAsync();
  }

  handleRefreshTable = (e) => {
    this.fetchSuppliersAsync();
  }

  //store on localstorage
  storeSupplierId = (id) => {
    localStorage.removeItem('supplierId');
    localStorage.setItem('supplierId', id);
  }

  /////////////////// Alert Popup /////////////////////////////
  handleAlertOpen = (e) => {
    this.setState({
      openAlert: true
    });
  }
  handleAlertClose = (e) => {
    console.log("lg gyi");
    this.setState({
      openAlert: false
    });
  }
  setAlertPopup = () => {
    this.setState(prevState => ({
      openAlert: {
        ...prevState.openAlert,
      }
    }));
    this.setState({ openAlert: false })
  };
  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openAlert: false});
  };

  ////////////////// Open Add Supplier Popup /////////////////////////////
  handleClickOpen = (e) => {
      this.setState({
          open: true
      });
  }
  handleClickClose = (e, message, severity) => {
      this.setState({
        open: false,
        openAlert: true,
        message: message,
        severity: severity,
      });
  }
  setOpenPopup = () => {
      this.setState(prevState => ({
          open: {
              ...prevState.open,
          }
      }));
      this.setState({open: false})
  };

  ////////////////// Open Edit Supplier Popup ///////////////////////////////////
  handleEditOpen = (id) => {
    this.setState({
      openEdit: true,
      supplierId: id,
    });
  }
  handleEditClose = (e, message, severity) => {
    this.setState({
      openEdit: false,
      openAlert: true,
      message: message,
      severity: severity,
      supplierId: null
    });
  }
  setEditPopup = () => {
    this.setState(prevState => ({
      openEdit: {
        ...prevState.openEdit,
      }
    }));
    this.setState({ 
      openEdit: false,
      supplierId: null,
    });
  };

  ///////////////// Delete Record //////////////////////////
  handleDelete = (id) => {
    // delete record from database and refresh table from here
    console.log(id);
    Axios.delete(`supplier/${id}`).then(res => {
      this.fetchSuppliersAsync();
      this.setState({
        openAlert: true,
        message: 'Supplier Deleted Succesfully',
        severity: 'info',
      });      
    }).catch(err => {
      console.log(err);
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
    const columns = [
      { field: 'supp_name', headerName: 'Name', flex:1},
      { field: 'supp_contact_no', headerName: 'Contact No', flex:1},
      { field: 'supp_email', headerName: 'Email', flex:1},
      {
        field: 'action',
        headerName: 'Action',
        flex:1,
        renderCell: (params) => (
          <>
          <Tooltip title="View" placement="top">
            <Link onClick={() => { this.storeSupplierId(params.id )}} to={{pathname: `supplier-view/${params.id}`}} style={{ color: 'orange' }} > <Icons.Visibility /></Link>
          </Tooltip>
          <ButtonGroup variant="outlined" size="small">
            <Tooltip title="Edit" placement="top">
              <Button variant="text" color="primary" onClick = {() => { this.handleEditOpen(params.id)}}>
                <Icons.Edit />
              </Button>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <Button  variant="text" color="error" onClick = {() => { this.handleDelete(params.id)}}>
                <Icons.Delete />
              </Button>
            </Tooltip>
            <Tooltip title="Add Bank" placement="top">
              <Button  variant="text" color="info" onClick = {() => { this.handleBankOpen(params.id)}}>
                <Icons.AccountBalance />
              </Button>
            </Tooltip>
            <Tooltip title="Add Branch" placement="top">
              <Button  variant="text" color="success" onClick = {() => { this.handleBranchOpen(params.id)}}>
                <Icons.LocationCity />
              </Button>
            </Tooltip>
            <Tooltip title="Add Employee" placement="top">
              <Button  variant="text" color="warning" onClick = {() => { this.handleEmployeeOpen(params.id)}}>
                <Icons.PersonAddAlt1 />
              </Button>
            </Tooltip>
          </ButtonGroup>
          </>
        )
      },
    ];
    const rows = this.state.dataValues;
    return (
      <div className="content">
        <div className="row">
          <div className="col-6">
          <Typography variant="h5" sx={{color:'#3f51b5'}} component="div" gutterBottom>
            Supplier
          </Typography>
          </div>
          <div className="col-6 text-right">
            <Button variant="contained"  size="samll" startIcon={<Icons.Add/>} onClick={this.handleClickOpen}>Add
            </Button>
          </div>
        </div>
        <div className="row ml-1 mt-2 mr-1">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              components={{
                Toolbar: GridToolbar,
              }}
              columns={columns}
              // checkboxSelection
              // pageSize={5}
              // rowsPerPageOptions={[5]}
            >
            </DataGrid>
          </div>
        </div>
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

        <Popup title="Add Supplier" openPopup={this.state.open} setOpenPopup={this.setOpenPopup}>
          <SupplierForm popup={this.state.open} popupChange={this.handleClickClose} refreshTable={this.handleRefreshTable}/> 
        </Popup>
        <Popup title="Edit Supplier" openPopup={this.state.openEdit} setOpenPopup={this.setEditPopup}>
          <SupplierEdit  popup={this.state.openEdit} supplierId={this.state.supplierId} popupChange={this.handleEditClose} refreshTable={this.handleRefreshTable}/>
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
    );
  }
}
export default SupplierTable;