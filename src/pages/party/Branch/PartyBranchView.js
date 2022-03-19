import React, { Component } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Icons from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Axios from '../../../axiosConfig';

class PartyBranchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            rows: '',
            columns: '',
            dataValues: [],
        }
    }

    async fetchPartiesAsync() {
        try {
            this.setState({ ...this.state, isFetching: true });
            const response = await Axios.get(`party/`);
            this.setState({ dataValues: response.data, isFetching: false, open: false });
        } catch (e) {
            console.log(e);
            this.setState({ ...this.state, isFetching: false });
        }
    }

    componentDidMount = () => {
        this.fetchPartiesAsync();
    }

    // add branch popup
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
    // end branch pop
    render() {
        const columns = [
            { field: 'party_br_add1', headerName: 'Address1', flex: 1 },
            { field: 'party_br_add2', headerName: 'Address2', flex: 1 },
            { field: 'party_br_add3', headerName: 'Address3', flex: 1 },
            { field: 'party_br_city', headerName: 'City', flex: 1 },
            { field: 'party_br_state', headerName: 'State', flex: 1 },
            { field: 'party_br_pin_code', headerName: 'Pin Code', flex: 1 },
            {
                field: 'action',
                headerName: 'Action',
                flex: 1,
                renderCell: (params) => (
                    <ButtonGroup variant="outlined" size="small">
                    </ButtonGroup>
                ),
            },
        ];
        const rows = this.state.dataValues;
        return (
            <div className="content">
                <div className="row">
                    <div className="col-6">
                        <Typography variant="h5" sx={{ color: '#3f51b5' }} component="div" gutterBottom>
                            Party Branch
                        </Typography>
                    </div>
                    <div className="col-6 text-right">
                        <Button variant="contained" size="samll" startIcon={<Icons.Add />} onClick={this.handleClickOpen}>
                            Add Branch
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
            </div>
        );
    }
}

export default PartyBranchView;