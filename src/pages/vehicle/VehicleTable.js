import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Popup from '../../components/popup/Popup';
import VehicleForm from './VehicleForm';
import VehicleEdit from './VehicleEdit';
import VehicleView from './VehicleView';
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Icons from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class VehicleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: '',
      columns: '',
      dataValues: [],
      openView: false, // for open View popup
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
      message: 'Are you sure you want to delete vehicle?',
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
  async fetchVehiclesAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      setTimeout(async() => {        
        const response = await Axios.get(`vehicle/`);            
        if (response.data) {
          this.setState({ dataValues: response.data, isFetching: false, open: false });      
        }             
      }, 0); 
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, isFetching: false });
    }
  }

  componentDidMount() {
    this.fetchVehiclesAsync();
  }
  handleRefreshTable = (e) => {
    this.fetchVehiclesAsync();
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

  //////////////// Open Add Vehicle Popup ///////////////////////////
  handleClickOpen = (e) => {
    this.setState({
      open: true
    });
  }
  handleClickClose = (e, message, severity) => {    
    this.setState({
      open: e ? true : false,
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
  ////////////////// View Vehicle Popup /////////////////////////////
  handleViewOpen = (id) => {
    this.setState({
      openView: true,
      id: id
    });
  }
  handleEditClose = (e, message, severity) => {
    this.setState({
      openView: false,
      openEdit: e ? true : false,
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

  ////////////////// Open Edit Vehicle Popup ///////////////////////////////////
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
    Axios.delete(`vehicle/${id}`).then(res => {
      this.fetchVehiclesAsync();
      this.setState({
        openAlert: true,
        message: 'Vehicle Deleted Succesfully',
        severity: 'info',
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const columns = [
      { field: 'veh_no', headerName: 'Vehicle No', flex: 1 },
      { field: 'veh_reg_valid_date', headerName: 'Registration Valid', flex: 1 },
      { field: 'veh_owner_name', headerName: 'Owner Name', flex: 1 },
      { field: 'veh_owner_contact', headerName: 'Owner Contact', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => (
          <ButtonGroup variant="outlined" size="small">
            <Button variant="text" color="secondary" onClick={() => { this.handleViewOpen(params.id) }}>
              <Icons.Visibility />
            </Button>
            <Button variant="text" color="primary" onClick={() => { this.handleEditOpen(params.id) }}>
              <Icons.Edit />
            </Button>
            <Button variant="text" color="error" onClick={() => { this.submit(params.id) }}>
              <Icons.Delete />
            </Button>
          </ButtonGroup>
        )
      },
    ];
    const rows = this.state.dataValues;
    return (
      <div className="content">
        <div className="row">
          <div className="col-6">
            <Typography variant="h5" sx={{ color: '#3f51b5' }} component="div" gutterBottom>
              Vehicle
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
        <Popup title="Add Vehicle" openPopup={this.state.open} setOpenPopup={this.setOpenPopup}>
          <VehicleForm popup={this.state.open} popupChange={this.handleClickClose} refreshTable={this.handleRefreshTable} />
        </Popup>
        <Popup title="Edit Vehicle" openPopup={this.state.openEdit} setOpenPopup={this.setEditPopup}>
          <VehicleEdit popup={this.state.openEdit} id={this.state.id} popupChange={this.handleEditClose} refreshTable={this.handleRefreshTable} />
        </Popup>
        <Popup title="Vehicle Details" openPopup={this.state.openView} setOpenPopup={this.setViewPopup}>
          <VehicleView popup={this.state.openView} id={this.state.id} popupChange={this.handleViewClose} />
        </Popup>
      </div>
    );
  }
}
export default VehicleTable;