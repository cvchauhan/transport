import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Popup from '../../components/popup/Popup';
import PartyForm from './PartyForm';
import PartyEdit from './PartyEdit';
import PartyBranchAdd from './Branch/BranchAdd';
import PartyEmployeeAdd from './Employee/EmployeeAdd';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Icons from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

class PartyTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: '',
      columns: '',
      dataValues: [],
      openBranch: false, // for open Add Branch popup
      openEmployee: false, // for open Add Employee popup
      openEdit: false, // for open edit popup
      partyId : null, // passing id for edit and delete
      openAlert: false, //open alert 
      message : null,  // message for alert
      severity : null, // color for alert
    }
  }

  async fetchPartiesAsync() {
    try {
      this.setState({...this.state, isFetching: true});
      const response = await Axios.get(`party/`);
      this.setState({dataValues: response.data, isFetching: false, open: false});
    } catch (e) {
        console.log(e);
        this.setState({...this.state, isFetching: false});
    }
  }

  componentDidMount = () => {
    this.fetchPartiesAsync();
  }

  handleRefreshTable = (e) => {
    this.fetchPartiesAsync();
  }

  //store on localstorage
  storePartyId = (id) => {
    localStorage.removeItem('partyId');
    localStorage.setItem('partyId', id);
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

  ////////////////// Open Add Party Popup ///////////////////////////////////
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

  ////////////////// Open Edit Party Popup ///////////////////////////////////
  handleEditOpen = (partyId) => {
    this.setState({
      openEdit: true,
      partyId: partyId,
    });
  }
  handleEditClose = (e, message, severity) => {
    this.setState({
      openEdit: false,
      openAlert: true,
      message: message,
      severity: severity,
      partyId: null
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
      partyId: null,
    })
  };

  ///////////////// Delete Record //////////////////////////
  handleDelete = (id) => {
    // delete record from database and refresh table from here
    console.log(id);
    Axios.delete(`party/${id}`).then(res => {
      this.fetchPartiesAsync();
      this.setState({
        openAlert: true,
        message: 'Party Deleted Succesfully',
        severity: 'info',
      });      
    }).catch(err => {
      console.log(err);
    });    
  } 

  ////////////////// Open Add Branch Popup ///////////////////////////////////
  handleBranchOpen = (partyId) => {
    this.setState({
      openBranch: true,
      partyId: partyId,
    });
  }
  handleBranchClose = (e, message, severity) => {
    this.setState({
      openBranch: false,
      openAlert: true,
      message: message,
      severity: severity,
      partyId: null,
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

  ////////////////// Open Add Employee Popup ///////////////////////////////////
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

  render() {
    const columns = [
      { field: 'party_name', headerName: 'Name', flex:1},
      { field: 'party_tan', headerName: 'TAN', flex:1},
      { field: 'party_email', headerName: 'Email', flex:1},
      { field: 'party_gst', headerName: 'GST', flex:1},
      {
        field: 'action',
        headerName: 'Action',
        flex:1,
        renderCell: (params) => (
          <>
          <Tooltip title="View" placement="top">
            <Link onClick={() => { this.storePartyId(params.id )}} to={{pathname: `party-view/${params.id}`}} style={{ color: 'orange' }} > <Icons.Visibility /></Link>
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
        ),
      },
    ];
    const rows = this.state.dataValues;
    return (
      <div className="content">
        <div className="row">
          <div className="col-6">
          <Typography variant="h5" sx={{color:'#3f51b5'}} component="div" gutterBottom>
            Party
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
        <Popup title="Add Party" openPopup={this.state.open} setOpenPopup={this.setOpenPopup}>
          <PartyForm popup={this.state.open} popupChange={this.handleClickClose} refreshTable={this.handleRefreshTable}/> 
        </Popup>
        <Popup title="Edit Party" openPopup={this.state.openEdit} setOpenPopup={this.setEditPopup}>
          <PartyEdit popup={this.state.openEdit} partyId={this.state.partyId} popupChange={this.handleEditClose} refreshTable={this.handleRefreshTable}/>
        </Popup>
        <Popup title="Add Branch" openPopup={this.state.openBranch} setOpenPopup={this.setBranchPopup}>
          <PartyBranchAdd popup={this.state.openBranch} partyId={this.state.partyId} popupChange={this.handleBranchClose}/>
        </Popup>
        <Popup title="Add Employee" openPopup={this.state.openEmployee} setOpenPopup={this.setEmployeePopup}>
          <PartyEmployeeAdd popup={this.state.openEmployee} partyId={this.state.partyId} popupChange={this.handleEmployeeClose}/>
        </Popup>
      </div>
    );
  }
}
export default PartyTable;