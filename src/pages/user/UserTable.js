import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Popup from '../../components/popup/Popup';
import UserForm from './UserForm';
import UserEdit from './UserEdit';
import UserView from './UserView';
import UserPasswordChange from './UserPasswordChange';
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Icons from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import jwt from 'jwt-decode';
import  { Redirect } from 'react-router-dom';
import VpnKeySharpIcon from '@mui/icons-material/VpnKeySharp';

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: '',
      columns: '',
      dataValues: [],
      openView: false, // for open View popup
      openViewpass: false, // for open View popup
      openEdit: false, // for open edit popup
      id: null, // passing id for edit and delete
      openAlert: false, //open alert 
      message: null,  // message for alert
      severity: null, // color for alert
    }
  }
  submit = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  async fetchUsersAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      setTimeout(async() => {        
        const response = await Axios.get(`/admin`);            
        this.setState({ dataValues: response.data.result, isFetching: false, open: false });         
      }, 0);      
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }

  componentDidMount() {
    this.fetchUsersAsync();
  }
  handleRefreshTable = (e) => {
    this.fetchUsersAsync();
  }
  /////////////////// Alert Popup /////////////////////////////
  handleAlertOpen = (e) => {
    this.setState({
      openAlert: true
    });
  }
  handleAlertClose = (e) => {
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
    this.setState({ openAlert: false });
  };
  handleViewClose = () => {
    this.setState({
      openAlert: true,
      openViewpass: false,
      openView: false
    });
  }
  handleViewClosepass = (e, message, severity) => {
    this.setState({     
      openViewpass: false,
      openAlert: true,
      message: message,
      severity: severity,   
    });
  }
  //////////////// Open Add User Popup ///////////////////////////
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
    this.setState({ open: false })
  };
  ////////////////// View User Popup /////////////////////////////
  handleViewOpen = (id) => {
    this.setState({
      openView: true,
      id: id
    });
  }
  handleEditClose = (e, message, severity) => {    
    this.setState({
      openView: false,
      openEdit:false,
      openAlert: true,
      message: message,
      severity: severity,
    });
  }
  setViewPopup = () => {
    this.setState(prevState => ({
      openView: {
        ...prevState.openView,
      }
    }));
    this.setState({ 
      openView: false,
      id: null,
    })
  };
  ////////////////// View User Popup pass /////////////////////////////
  handleViewOpenPass = (id) => {
    this.setState({
      openViewpass: true,
      id: id
    });
  }
  handleEditClose = (e, message, severity) => {    
    this.setState({
      openViewpass: false,
      openEdit:false,
      openAlert: true,
      message: message,
      severity: severity,
    });
  }
  setViewPopuppass = () => {
    this.setState(prevState => ({
      openViewpass: {
        ...prevState.openViewpass,
      }
    }));
    this.setState({ 
      openViewpass: false,
      id: null,
    })
  };

  ////////////////// Open Edit User Popup ///////////////////////////////////
  handleEditOpen = (id) => {
    this.setState({
      openEdit: true,
      id: id,
    });
  }

  //// When popup close
  setEditPopup = () => {
    this.setState(prevState => ({
      openEdit: {
        ...prevState.openEdit,
      }
    }));
    this.setState({ 
      openEdit: false,
      id: null
    });
  };

  /////////////////////////// Delete Record 
  handleDelete = (id) => {
    /// delete record form data bse and refresh table from here
    Axios.delete(`admin/${id}`).then(res => {
      this.fetchUsersAsync();
      this.setState({
        openAlert: true,
        message: 'User Deleted Succesfully',
        severity: 'info',
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const columns = [
      { field: 'id', headerName: 'Id', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'username', headerName: 'User Name', flex: 1 },
      { field: 'city', headerName: 'City', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => (
          <ButtonGroup variant="outlined" size="small">
            <Button variant="text" title="View" color="secondary" onClick={() => { this.handleViewOpen(params.id) }}>
              <Icons.Visibility />
            </Button>
            <Button variant="text" title="Edit" color="primary" onClick={() => { this.handleEditOpen(params.id) }}>
              <Icons.Edit />
            </Button>
            <Button variant="text" title="Delete" color="error" onClick={() => { this.submit(params.id) }}>
              <Icons.Delete />
            </Button>
            <Button variant="text" title="Change Password" color="success" onClick={() => { this.handleViewOpenPass(params.id) }}>
              <VpnKeySharpIcon />
            </Button>
          </ButtonGroup>
        )
      },
    ];
    const rows = this.state.dataValues;    
    if (localStorage.getItem('authToken') && jwt(localStorage.getItem('authToken')).user_role == 1) {      
      return (
        <div className="content">
          <div className="row">
            <div className="col-6">
              <Typography variant="h5" sx={{ color: '#3f51b5' }} component="div" gutterBottom>
                User
              </Typography>
            </div>
            <div className="col-6 text-right">
              <Button variant="contained" size="samll" startIcon={<Icons.Add />} onClick={this.handleClickOpen}>Add
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
          <Popup title="Add User" openPopup={this.state.open} setOpenPopup={this.setOpenPopup}>
            <UserForm popup={this.state.open} popupChange={this.handleClickClose} refreshTable={this.handleRefreshTable} />
          </Popup>
          <Popup title="Edit User" openPopup={this.state.openEdit} setOpenPopup={this.setEditPopup}>
            <UserEdit popup={this.state.openEdit} id={this.state.id} popupChange={this.handleEditClose} refreshTable={this.handleRefreshTable} />
          </Popup>
          <Popup title="User Details" openPopup={this.state.openView} setOpenPopup={this.setViewPopup}>
            <UserView popup={this.state.openView} id={this.state.id} popupChange={this.handleViewClose} />
          </Popup>
          <Popup title="Password Change" openPopup={this.state.openViewpass} setOpenPopup={this.setViewPopuppass}>
            <UserPasswordChange popup={this.state.openViewpass} id={this.state.id} popupChange={this.handleViewClosepass} />
          </Popup>
        </div>
      );
    } else {
      return (<Redirect to='/'  />);  
    }
  }
}
export default UserTable;