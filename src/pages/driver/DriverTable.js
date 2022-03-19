import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Popup from '../../components/popup/Popup';
// import DataGrid from '../../components/Tables/DataGrid';
import DriverForm from './DriverForm';
import DriverEdit from './DriverEdit';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import {withRouter} from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Icons from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


class DriverTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEdit: false,
      dataShow: false,
      columns: '',
      dataValues: [],
      isFetching: false,
      id : null,
      openAlert: false, //open alert 
      message : null,  // message for alert
      severity : null, // color for alert
    }
  }

  async fetchDriversAsync() {
    try {
      this.setState({...this.state, isFetching: true});
      const response = await Axios.get(`driver/`);
      this.setState({dataValues: response.data, isFetching: false, open: false});
    } catch (e) {
        console.log(e);
        this.setState({...this.state, isFetching: false});
    }
  }

  componentDidMount = () => {
    // this.timer = setTimeout(() => this.fetchDriversAsync(), 5000);
    this.fetchDriversAsync();
  }

  handleRefreshTable = (e) => {
    this.fetchDriversAsync();
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
  /////////////////// Open Add Driver Popup /////////////////////////////
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

  /////////////////// Open Edit Driver Popup /////////////////////////////
  handleEditOpen = (id) => {
    this.setState({
        openEdit: true,
        id: id
    });
    console.log("open", this.state);
  }
  handleEditClose = (e, message, severity) => {
    this.setState({
        openEdit: false,
        openAlert: true,
        message: message,
        severity: severity,
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
      id: null, 
    })
  };

  // Delete Record 
  handleDelete = (id) => {
    // delete record from database and refresh table from here
    Axios.delete(`driver/${id}`).then(res => {
      this.fetchDriversAsync();
      this.setState({
        openAlert: true,
        message: 'Driver Deleted Succesfully',
        severity: 'info',
      });      
    }).catch(err => {
      console.log(err);
    });

  }

  render() {
    const columns = [
      { field: 'drvr_name', headerName: 'Name', flex: 1 },
      { field: 'drvr_contact_no', headerName: 'Contact', flex: 1 },
      { field: 'drvr_licns_no', headerName: 'License No', flex: 1 },
      { field: 'drvr_licns_exp_date', headerName: 'License Expiry', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => (
          <ButtonGroup variant="outlined" size="small">
              <Button variant="text" color="primary" onClick = {() => { this.handleEditOpen(params.id)}}>
                <Icons.Edit />
              </Button>
              <Button  variant="text" color="error" onClick = {() => { this.handleDelete(params.id)}}>
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
              Driver
            </Typography>
          </div>
          <div className="col-6 text-right">
            <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={this.handleClickOpen}>Add
            </Button>
          </div>
        </div>
        <div className="row ml-1 mt-2 mr-1">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{
                Toolbar: GridToolbar,
              }}
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
        <Popup title="Add Driver" openPopup={this.state.open} setOpenPopup={this.setOpenPopup}>
          <DriverForm  popup={this.state.open} popupChange={this.handleClickClose} refreshTable={this.handleRefreshTable}/>
        </Popup>
        <Popup title="Edit Driver" openPopup={this.state.openEdit} setOpenPopup={this.setEditPopup}>
          <DriverEdit  popup={this.state.openEdit} id={this.state.id} popupChange={this.handleEditClose} refreshTable={this.handleRefreshTable}/>
        </Popup>
      </div>
    );
  }
}
export default withRouter(DriverTable);