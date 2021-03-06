import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import {withRouter, Link} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import * as Icon from '@mui/icons-material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';

class LorryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      open3: false,
      openEdit: false,
      dataShow: false,
      columns: '',
      dataValues: [],
      isFetching: false,
      anchorEl: false,
      anchorEl1: false,
      id : null,
    }   
  }
  submit = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete receipts?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteRecord(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  ///////////////////////////// For action button ///////////////////////////
  
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  };
  handleClick1 = (event) => {
    this.setState({anchorEl1:event.currentTarget});
  };
  handleClose = () => {
    this.setState({anchorEl: false});
  };
  handleClose1 = () => {
    this.setState({anchorEl1: false});
  };
 
  async fetchDriversAsync() {
    try {
      this.setState({...this.state, isFetching: true});
      const response = await Axios.get(`receipt/`);     
      this.setState({dataValues: response.data.result, isFetching: false, open: false});
    } catch (e) {
        console.log(e);
        this.setState({...this.state, isFetching: false});
    }
  }

  async deleteRecord(id) {
    try {      
      const res = await Axios.delete(`receipt/${id}`);  
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });  
      this.fetchDriversAsync();         
    } catch (e) {
        console.log(e);        
    }
  }

  componentDidMount = (e) => {
    this.timer = setTimeout(() => this.fetchDriversAsync(), 1000);
  }
  /////////////////// Open Add Driver Popup /////////////////////////////
  handleClickOpen = (e) => {
    this.setState({
      open: true
    });
  }
  handleClickClose = (e) => {    
    this.setState({
      open: false
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
    this.state.openEdit = true;
    this.state.id = id;    
  }
   //// When popup close
  setEditPopup = () => {
    this.setState(prevState => ({
      openEdit: {
        ...prevState.openEdit,
      }
    }));
    this.setState({ openEdit: false })
    this.state.id =  null;
  };

  /// Delete Record 
  handleDelete = (id) => {
    /// delete record form data bse and refresh table from here
    ///// id is id for table
    console.log(id);

  }

  render() {
    const StyledMenu = styled((props) => (
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        {...props}
      />
      ))(({ theme }) => ({
      '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(0),
        minWidth: 185,
        color:
          theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
          },
          '&:active': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    }));
    const anchorEl = this.state.anchorEl;
    const anchorEl1 = this.state.anchorEl1;
    const open2 = Boolean(this.state.anchorEl);
    const open3 = Boolean(this.state.anchorEl1);
    const columns = [
      { field: 'lr_no', headerName: 'LR No.', flex: 1 },
      { field: 'ewaybill_number', headerName: 'EwayBill No.', flex: 1 },
      { field: 'ewaybill_validity', headerName: 'EwayBill Validity', flex: 1 },
      { field: 'from_city', headerName: 'From', flex: 1 },
      { field: 'to_city', headerName: 'To', flex: 1 },
      { field: 'party_doc_date', headerName: 'party doc date', flex: 1 },
      { field: 'party_doc_no', headerName: 'party doc no', flex: 1 },
      { field: 'party_doc_type', headerName: 'Party doc type', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => (
          <strong>
            <div>
            <ButtonGroup variant="outlined" size="small">
            <Link to={`/lorry/${params.id}`} style={{ textDecoration: 'none' }}>
            <Tooltip title="Edit" placement="top">
              <Button variant="text" color="primary">
                <Icon.Edit />
              </Button>
            </Tooltip>
            </Link>
            <Tooltip title="Delete" placement="top">
              <Button  variant="text" color="error" onClick = {() => { this.submit(params.id)}}>
                <Icon.Delete />
              </Button>
            </Tooltip>
          </ButtonGroup>
              {/* <Button
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open2 ? 'true' : 'false'}
                variant="contained"
                color="info"
                size="small"
                onClick={this.handleClick}
              >
                Action
              </Button>
              <StyledMenu
                id="demo-customized-button"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-menu',
                }}
                anchorEl={anchorEl}
                open={open2}
                onClose={this.handleClose}
              >
                <Link to={`/lorry/${params.id}`} style={{ textDecoration: 'none' }}>
                <MenuItem>
                  <Button  variant="text">
                    <EditIcon />Edit
                  </Button>
                </MenuItem>
                </Link>
                <MenuItem onClick={this.handleClose}>
                  <Button  variant="text" onClick = {() => { this.submit(params.id)}}>
                    <Delete />
                    Delete
                  </Button>
                </MenuItem>
              </StyledMenu> */}
            </div>
          </strong>
        )

      },
    ];
    const rows = this.state.dataValues;
    return (
      <div className="content">
          <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
        <div className="row">
          <div className="col-6">
            <Typography variant="h5" sx={{ color: '#3f51b5' }} component="div" gutterBottom>
              Lorry Receipt
            </Typography>
          </div>
          <div className="col-6 text-right">
            {/* <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={this.handleClickOpen}>Add
            </Button> */}
            <Button
                id="demo-customized-button1"
                aria-controls="demo-customized-menu1"
                aria-haspopup="true"
                aria-expanded={open3 ? 'true' : 'false'}
                variant="contained"
                color="info"
                size="small"
                onClick={this.handleClick1}
              >
                Add
              </Button>
              <StyledMenu
                id="demo-customized-menu1"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button1',
                }}
                anchorEl1={anchorEl1}
                open={open3}
                onClose={this.handleClose1}
              >
                <MenuItem onClick={this.handleClose1}>
                <Link to='/lorry-json' style={{ textDecoration: 'none' }}>
                  <Button  variant="text" onClick = {() => { this.handleEditOpen()}}>
                  <Icon.Receipt />
                   Json
                  </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose1}>
                <Link to='/lorry-form' style={{ textDecoration: 'none' }}>
                  <Button  variant="text" onClick = {() => { this.handleDelete()}}>                    
                    <EditIcon />
                    Manually
                  </Button>
                </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                <Link to='/lorry-form' style={{ textDecoration: 'none' }}>
                  <Button  variant="text" onClick = {() => { this.handleDelete()}}>                    
                    <EditIcon />
                    PDF upload
                  </Button>
                </Link>
                </MenuItem>
              </StyledMenu>
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
       
      </div>
    );
  }
}
export default withRouter(LorryTable);