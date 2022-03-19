import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from '../../axiosConfig';
import Controls from '../../components/form-controls/Controls';
import { Formik, Form, Field } from 'formik';
import profileFormSchema from '../../validations/profileFormValidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserBranchAdd from './Branch/BranchAdd';
import UserBranchEdit from './Branch/BranchEdit';
import Popup from '../../components/popup/Popup';
import Button from '@mui/material/Button';
import * as Icons from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import UserBankEdit from './Bank/BankEdit';
import UserBank from './Bank/BankAdd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

class Profile extends React.Component {
    constructor(props) {
        super(props);        
        this.update = this.update.bind(this);
        this.updateCompany = this.updateCompany.bind(this);        
        this.state = {
            baseUrl: Axios.baseUrl,
            company_profile:'',
            file_name:'',
            company_data:[],
            userId:null,
            openBranch: false,
            openBankEdit: false,
            openBranchEdit: false,
            dataValues:[],
            email: '',
            password: '',
            username: '',
            user_contact_no:'',
            user_pan:'',
            openAlert: false,
            message: null,
            severity: null,
            id:null,
            openBank: false,
            name: '',
            company_code: '',
            company_pan_no:'',
            company_city:'',
            company_state:'',
            company_address:'',
            company_pin:'',
            trans_licns_no:'',
            company_gst:'',
            company_contact_no:'',
            comp_email:'',
            eway_bill_username:'',
            eway_bill_pass:'',
            lr_format:'LR-001',
            invoice_format:'INV-001',
            eway_bill_pass_show:'password'
        };
    }
    submit = (id,name) => {
      confirmAlert({
        title: 'Confirm',
        message: `Are you sure you want to delete ${name}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => name == 'branch' ? this.handleBranchDelete(id) : this.handleBankDelete(id)
          },
          {
            label: 'No'
          }
        ]
      });
    };
    initialValues() {
        return {
            email: this.state.email,
            username: this.state.username,       
            user_contact_no: this.state.user_contact_no,       
            user_pan: this.state.user_pan                 
        }
    }
    initialValuesComp() {
        return {
            name: this.state.name,
            company_profile: this.state.company_profile,
            company_code: this.state.company_code,
            company_pan_no:this.state.company_pan_no,
            company_city:this.state.company_city,
            company_state:this.state.company_state,
            company_address:this.state.company_address,
            company_pin:this.state.company_pin,
            trans_licns_no:this.state.trans_licns_no,
            company_gst:this.state.company_gst,
            company_contact_no:this.state.company_contact_no,
            comp_email:this.state.comp_email,
            eway_bill_username:this.state.eway_bill_username,
            eway_bill_pass:this.state.eway_bill_pass,
            lr_format:this.state.lr_format ? this.state.lr_format: 'LR-001',
            invoice_format:this.state.invoice_format ? this.state.invoice_format : 'INV-001',
            eway_bill_pass_show:this.state.eway_bill_pass_show
        }
    }
    async fetchUserDetailAsync() {
      let id = JSON.parse(localStorage.getItem('user')).id;
      Axios.get(`admin/get/${id}`).then(res => {      
        const data = res.data.result;       
        this.setState({
          dataValues: data,
          email: data.email ? data.email : '',
          username: data.username ? data.username : '',              
          user_contact_no: data.user_contact_no ? data.user_contact_no : '',
          user_pan: data.user_pan ? data.user_pan : '',    
          name: data.companies[0] ? data.companies[0].name : '',
          company_profile: data.companies[0] ? data.companies[0].company_profile : '',
          company_code: data.companies[0] ? data.companies[0].company_code : '',
          company_pan_no: data.companies[0] ? data.companies[0].company_pan_no : '',
          company_city: data.companies[0] ? data.companies[0].company_city : '',
          company_state: data.companies[0] ? data.companies[0].company_state : '',
          company_address: data.companies[0] ? data.companies[0].company_address : '',
          company_pin: data.companies[0] ? data.companies[0].company_pin : '',
          trans_licns_no: data.companies[0] ? data.companies[0].trans_licns_no : '',                              
          company_gst: data.companies[0] ? data.companies[0].company_gst : '',                               
          company_contact_no: data.companies[0] ? data.companies[0].company_contact_no : '',                               
          comp_email: data.companies[0] ? data.companies[0].comp_email : '',
          eway_bill_username: data.companies[0] ? data.companies[0].eway_bill_username : '',                  
          eway_bill_pass: data.companies[0] ? data.companies[0].eway_bill_pass : '',                   
          lr_format: data.companies[0] ? data.companies[0].lr_format : 'LR-001',                   
          invoice_format: data.companies[0] ? data.companies[0].invoice_format : 'INV-001'                   
        })
      }).catch(err => {
        console.log(err);
      });
    }
     // alert toaster
    handleAlertOpen = () => {
      this.setState({
        openAlert: true
      });
    }
    componentDidMount = () => {
      this.fetchUserDetailAsync();
    }    
    handleRefreshTable = (e) => {
      this.fetchUserDetailAsync();
    }
    handleBranchClose = (e, message, severity) => {
      this.setState({
        openBranch: false,
        openAlert: true,
        message: message,
        severity: severity,
        userId: null,
      });
      this.handleRefreshTable();
    }
    handleBranchOpen = (userId) => {
      this.setState({
        openBranch: true,
        userId: userId,
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
    calculate = () => {    
      this.setState({        
        ['eway_bill_pass_show']: this.state.eway_bill_pass_show == 'password' ? 'text' : 'password'
      });
    }
    update(values) {        
      let id = JSON.parse(localStorage.getItem('user')).id;
        Axios.put(`admin/update/${id}`, values)
        .then(res => {    
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });                  
      })
    }
    updateCompany(values) {
      let formdata = new FormData();
      formdata.append('image',this.state.company_profile);
      formdata.append('image_name',this.state.file_name);
      formdata.append('data',JSON.stringify(values));
      let id = JSON.parse(localStorage.getItem('user')).id;
      Axios.put(`admin/company/${id}`, formdata)
        .then(res => {    
          this.handleRefreshTable();
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });                  
      })
    }
  // edit pop-up open or close 
  handleBranchEditOpen = (id) => {  
    this.setState({
      openBranchEdit: true,
      userId: this.props.match.params.id,
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
  handleAlertMsg = (status, message, severity) => {
    this.setState({
      openBranchEdit: false,      
      openAlert: true,
      message: message,
      severity: severity,
      userId: null
    });
  }
  ////////////////// Open Add Bank Popup ///////////////////////////////////
handleBankOpen = (id) => {
  this.setState({
    openBank: true,
    userId: id,
  });
}
handleBankClose = (e, message, severity) => {
  this.setState({
    openBank: false,
    openAlert: true,
    message: message,
    severity: severity,
    userId: null
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
    userId: null
  });
};
// delete branch
handleBranchDelete = (id) => {
  Axios.delete(`user_branch/${id}/`)
    .then(res => {        
      this.handleRefreshTable();
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }); 
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
// delete bank
handleBankDelete = (id) => {
  Axios.delete(`user_bank/${id}/`)
    .then(res => { 
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });        
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
    saveFile = (e) => {
      this.setState({
        company_profile:e.target.files[0],
        file_name:e.target.files[0].name
      })
    }
  // bank edit pop-up
  handleBankEditOpen = (id) => {    
    // set state id of bank
    this.setState({
      openBankEdit: true,
      userId: this.props.match.params.id,
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
  render() {           
    const branches = this.state.dataValues ? this.state.dataValues.user_branches : [];
    const banks = this.state.dataValues ? this.state.dataValues.user_bank_details : [];              
    return (
      <div className="content">          
        <Tooltip title="Add Branch" placement="top">
          <Button  variant="text" color="success" onClick = {() => { this.handleBranchOpen(this.props.match.params.id)}}>
            <Icons.LocationCity />
          </Button>
        </Tooltip>
        <Tooltip title="Add Bank" placement="top">
          <Button  variant="text" color="info" onClick = {() => { this.handleBankOpen(this.props.match.params.id)}}>
            <Icons.AccountBalance />
          </Button>
        </Tooltip>
      <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>    
      <Formik
          initialValues={this.initialValues()}
          enableReinitialize
          validationSchema={profileFormSchema}
          onSubmit={values => {
            this.update(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
          <Form>
            <div className="col-12 mt-3">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-6">
                          <h6 className="card-title m-0">PERSONAL DETAILS</h6>
                        </div>                      
                      </div>
                    </div>
                    <div className="card-body">                    
                        <div className="row">
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                            <Controls.Input 
                                label="Email" 
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                              />
                              <Controls.Error name="email" />                           
                            </div>
                          </div>                       
                          <div className="col-xs-2 col-lg-2 col-md-2 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="User Name" 
                                name="username"
                                 value={values.username}
                                onChange={handleChange}
                              />
                               <Controls.Error name="username" />
                            </div>
                          </div>                       
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Contact No." 
                                name="user_contact_no"
                                 value={values.user_contact_no}
                                onChange={handleChange}
                              />
                              <Controls.Error name="user_contact_no" />
                            </div>
                          </div>                       
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Pan No." 
                                name="user_pan"
                                 value={values.user_pan}
                                onChange={handleChange}
                              />
                              <Controls.Error name="user_pan" />
                            </div>
                          </div>                                                 
                        <div className="col-xs-1 col-lg-1 col-md-1 col-sm-1">
                          <Controls.Button text="Save" size="medium" color="info" mr={3} type="submit" />
                        </div>                 
                        </div>   
                    </div>
                  </div> 
            </div>  
          </Form>
          )}      
      </Formik>
      <Formik
          initialValues={this.initialValuesComp()}
          enableReinitialize
          // validationSchema={profileFormSchema}
          onSubmit={values => {
            this.updateCompany(values)
          }}
        >
          {({ values, errors, touched, handleChange }) => (
          <Form>
            <div className="col-12 mt-3">
                  <div className="card">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-6">
                          <h6 className="card-title m-0">COMPANY DETAILS</h6>
                        </div>                      
                      </div>
                    </div>
                    <div className="card-body">                    
                        <div className="row">
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                            <input
                                accept="image/*"                                
                                name="company_profile"
                                id="icon-button-photo"                                
                                onChange={this.saveFile}
                                type="file"
                            />
                            {/* <label htmlFor="icon-button-photo"> */}
                            { values.company_profile && <img src={`http://15.206.91.188:3000/public/company/${values.company_profile}`} height={50} width={75}/> }
                            {/* </label> */}
                            </div>
                          </div>                       
                          <div className="col-xs-3 col-lg-3 col-md-3 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Company Name" 
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                              />
                               <Controls.Error name="name" />
                            </div>
                          </div>                       
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Conpany Code" 
                                name="company_code"
                                 value={values.company_code}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_code" />
                            </div>
                          </div>                       
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Pan No." 
                                name="company_pan_no"
                                value={values.company_pan_no}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_pan_no" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="City" 
                                name="company_city"
                                 value={values.company_city}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_city" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="State" 
                                name="company_state"
                                 value={values.company_state}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_state" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Address" 
                                name="company_address"
                                 value={values.company_address}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_address" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Pin" 
                                name="company_pin"
                                 value={values.company_pin}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_pin" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Transport License Number" 
                                name="trans_licns_no"
                                 value={values.trans_licns_no}
                                onChange={handleChange}
                              />
                              <Controls.Error name="trans_licns_no" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="GST No." 
                                name="company_gst"
                                 value={values.company_gst}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_gst" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Contact No." 
                                name="company_contact_no"
                                 value={values.company_contact_no}
                                onChange={handleChange}
                              />
                              <Controls.Error name="company_contact_no" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Email" 
                                name="comp_email"
                                 value={values.comp_email}
                                onChange={handleChange}
                              />
                              <Controls.Error name="comp_email" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Eway bill username" 
                                name="eway_bill_username"
                                value={values.eway_bill_username}
                                onChange={handleChange}
                              />
                              <Controls.Error name="eway_bill_username" />
                            </div>
                          </div>                                                 
                          <div className="col-xs-2 col-lg-2 col-md-2 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Eway bill username" 
                                name="eway_bill_pass"
                                type={values.eway_bill_pass_show}
                                value={values.eway_bill_pass}
                                onChange={handleChange}                                
                              />
                              <Controls.Error name="eway_bill_pass" />
                            </div>
                          </div>                                                 
                            <div className="col-xs-1 col-lg-1 col-md-1 col-sm-12">
                            { this.state.eway_bill_pass_show == 'text' ? <VisibilityIcon onClick={this.calculate}></VisibilityIcon> : <VisibilityOffIcon
                              onClick={this.calculate}>              
                              </VisibilityOffIcon>}                          
                            </div>
                            <div className="col-xs-2 col-lg-2 col-md-2 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Lr Format" 
                                name="lr_format"
                                type="text"
                                value={values.lr_format}
                                onChange={handleChange}                                
                              />
                              <Controls.Error name="lr_format" />
                            </div>
                          </div> 
                          <div className="col-xs-2 col-lg-2 col-md-2 col-sm-12">
                            <div className="form-group">
                              <Controls.Input 
                                label="Invoice Format" 
                                name="invoice_format"
                                type="text"
                                value={values.invoice_format}
                                onChange={handleChange}                                
                              />
                              <Controls.Error name="invoice_format" />
                            </div>
                          </div> 
                            <div className="col-xs-1 col-lg-1 col-md-1 col-sm-12">
                            <Controls.Button text="Save" size="medium" color="info" mr={3} type="submit" />
                            </div>         
                        </div>   
                    </div>
                  </div> 
            </div>  
          </Form>
          )}      
      </Formik>
      <div className="content" style={{marginLeft:17,marginRight:16,marginTop:16}}>
        <table className="table table-bordered">
          <tbody>
          <tr className="table-primary">
              <td colSpan="7" className="font-weight-bold text-dark text-center">Branch Details</td>
            </tr>
            <tr>
              <th><label>Address Line-1:</label></th>
              <th><label>Address Line-2:</label></th>
              <th><label>Address Line-3:</label></th>
              <th><label>City:</label></th>
              <th><label>State:</label></th>
              <th><label>Pincode:</label></th>
              <th><label>Actions</label></th>
            </tr>
            {branches ? (
              branches.map((branch, index) => (
                <tr key={index}>
                  <td><p className="text-wrap">{branch.user_br_add1}</p></td>
                  <td><p className="text-wrap">{branch.user_br_add2}</p></td>
                  <td><p className="text-wrap">{branch.user_br_add3}</p></td>
                  <td><p>{branch.user_br_city}</p></td>
                  <td><p>{branch.user_br_state}</p></td>
                  <td><p>{branch.user_br_pin_code ? branch.user_br_pin_code : ''}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.handleBranchEditOpen(branch.id) }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.submit(branch.id,'branch') }}>
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
                  <td colSpan="9">No Branch Found</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className="content" style={{marginLeft:17,marginRight:16,marginTop:16}}>
      <table className="table table-bordered">
          <tbody>
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
                  <td colSpan="2"><p>{bank.user_bank_name}</p></td>
                  <td colSpan="3"><p>{bank.user_bank_ah_name}</p></td>
                  <td><p>{bank.user_bank_ifsc}</p></td>
                  <td colSpan="3"><p>{bank.user_bank_acc_no}</p></td>
                  <td>
                    <ButtonGroup variant="outlined" size="small">
                      <Tooltip title="Edit" placement="top">
                        <Button variant="text" color="primary" onClick={() => { this.handleBankEditOpen(bank.id, 'bank') }}>
                          <Icons.Edit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button variant="text" color="error" onClick={() => { this.submit(bank.id, 'bank') }}>
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
      </div>
        <Popup title="Add Branch" openPopup={this.state.openBranch} setOpenPopup={this.setBranchPopup}>
          <UserBranchAdd popup={this.state.openBranch} userId={this.state.userId} popupChange={this.handleBranchClose} refreshTable={this.handleRefreshTable}/>
        </Popup>
        <Popup title="Edit User Branch" openPopup={this.state.openBranchEdit} setOpenPopup={this.setCloseBranchPopup}>
          <UserBranchEdit userId={this.state.userId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} />
        </Popup>
        <Popup title="Add Bank" openPopup={this.state.openBank} setOpenPopup={this.setBankPopup}>
          <UserBank  popup={this.state.openBank} userId={this.state.userId}  popupChange={this.handleBankClose}/>
        </Popup>
        <Popup title="Edit User Bank" openPopup={this.state.openBankEdit} setOpenPopup={this.setCloseBankPopup}>
          <UserBankEdit userId={this.state.userId} id={this.state.id} showAlertMsg={this.handleAlertMsg} refreshTable={this.handleRefreshTable} branches={branches}/>
        </Popup>
      </div>
    );
  }
}
  
export default Profile;