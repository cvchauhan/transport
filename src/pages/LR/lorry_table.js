import * as React from 'react';
import { DataGrid, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Popup from '../../components/popup/Popup';
// import DataGrid from '../../components/Tables/DataGrid';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Axios from '../../axiosConfig';
import {withRouter, Link} from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Delete from '@mui/icons-material/Delete';
class LorryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      openEdit: false,
      dataShow: false,
      columns: '',
      dataValues: [],
      isFetching: false,
      anchorEl: false,
      id : null,
    }
    console.log(this.state.openEdit);
    console.log(this.state.id);
  }

  ///////////////////////////// For action button ///////////////////////////
  
  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  };
  handleClose = () => {
    this.setState({anchorEl: false});
  };
  hundleView = (id) => {
    console.log(id);
  }
  hundleEdit = (id) => {
    console.log(id);
  }
  hundleDelete = (id) => {
    console.log(id);
  }

  async fetchDriversAsync() {
    try {
      this.setState({...this.state, isFetching: true});
      const response = await Axios.get(`receipt/`);
      console.log(response.data)
      this.setState({dataValues: response.data, isFetching: false, open: false});
    } catch (e) {
        console.log(e);
        this.setState({...this.state, isFetching: false});
    }
  }

  componentDidMount = (e) => {
    this.timer = setTimeout(() => this.fetchDriversAsync(), 5000);
  }
  /////////////////// Open Add Driver Popup /////////////////////////////
  handleClickOpen = (e) => {
    this.setState({
      open: true
    });
  }
  handleClickClose = (e) => {
    console.log("lg gyi");
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
    console.log("open", this.state);

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
        marginTop: theme.spacing(1),
        minWidth: 180,
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
    const open2 = Boolean(this.state.anchorEl);
    const columns = [
      { field: 'lr_no', headerName: 'LR No.', flex: 1 },
      { field: 'ewaybill_number', headerName: 'EwayBill No.', flex: 1 },
      { field: 'ewaybill_validity', headerName: 'EwayBill Validity', flex: 1 },
      { field: 'from', headerName: 'From', flex: 1 },
      { field: 'to', headerName: 'To', flex: 1 },
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
              <Button
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
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open2}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Button  variant="text" onClick = {() => { this.handleEditOpen(params.id)}}>
                    <EditIcon />Edit
                  </Button>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Button  variant="text" onClick = {() => { this.handleDelete(params.id)}}>
                    <Delete />
                    Delete
                  </Button>
                </MenuItem>
              </StyledMenu>
            </div>
          </strong>
        )

      },
    ];
    const rows = this.state.dataValues;
    return (
      <div className="content">
        <div className="row">
          <div className="col-6">
            <Typography variant="h5" sx={{ color: '#3f51b5' }} component="div" gutterBottom>
              Lorry Receipt
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
       
      </div>
    );
  }
}
export default withRouter(LorryTable);