/* eslint-disable */
import React, { useState, Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import * as Mat from '@mui/material';
import Controls from '../../components/form-controls/Controls';
import Popup from '../../components/popup/Popup';
import PartyForm from '../party/PartyForm';
import VehicleForm from '../vehicle/VehicleForm';
import SupplierForm from '../supplier/SupplierForm';
import DriverForm from '../driver/DriverForm';
import * as LorryServices from './lorry-services';
import * as Icon from '@mui/icons-material';
import Axios from '../../axiosConfig';
import Paper from "@material-ui/core/Paper";
import ComponentToPrint from './Print';
import ComponentToPrintbilled from './Printbilled';
import ReactToPrint from "react-to-print";
import { createFilterOptions } from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import EwayBillForm from './EwayBillForm';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from "@mui/material/Checkbox";
import PartyBranchAdd from '../party/Branch/BranchAdd';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReceiptDetails from './ReceiptDetails/ReceiptDetails';
import * as moment from 'moment';

class LoryJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      openBranch: false,
      openBranchconsignee: false,
      openVehicle: false,
      openSuppiler: false,
      openDriver: false,
      openJson: false,
      openParty: false,
      partyOptions: [],
      driverOptions: [],      
      cityListOptions: [],
      stateListOptions:[],
      cityfromOptions: [],
      vehicleOptions: [],
      supplierOptions: [],
      branch_option_ship:[],
      branch_option_disp:[],
      userDetails:[],
      lorryJsonData: {
        fromGstin:'',
        toGstin:'',
        dispatch_insert_branch: false,
        ship_insert_branch: false,
        lr_type: 'API',
        lr_no: '',
        actualDist:'',
        lr_date: new Date().toISOString().split('T')[0],
        ewaybill_validity: new Date().toISOString().split('T')[0],
        from: '',
        to: '',
        to_city: '',
        to_state: '',
        from_city: '',
        from_state: '',
        consignor: '',
        consignee_gst: '',     
        consignor_gst: '',     
        consignor_id: '',
        consignee: '',
        consignee_id: '',
        dispatch_from: '',
        ship_to: '',
        ewaybill_number: '',
        vehicle_no:'',
        vehicle_type:'',
        supplier:'',
        driver_name:'',
        drvr_licns_exp_date: new Date().toISOString().split('T')[0],
        chargeable_unit: '',      
        chargeable_wt: '',      
        service_charges: '',
        shortage_tolerance_limit: '',
        is_branch_dispatch: false,
        is_branch_ship: false,
        dispatch_state_from_id: '',
        ship_state_to_id: '',
        dispatch_from_id: '',
        ship_to_id: '',        
        dispatch_city_from_id:'',	
        ship_city_to_id:'',	

        dispatch_address_line_1: '',
        dispatch_address_line_2: '',
        dispatch_address_line_3: '',
        dispatch_city: '',
        dispatch_state: '',
        dispatch_pincode: '',
        ship_address_line_1: '',
        ship_address_line_2: '',
        ship_address_line_3: '',
        ship_city: '',
        ship_state: '',
        ship_pincode: '',
        party_doc_type: '',
        party_doc_no: '',
        party_doc_date: new Date().toISOString().split('T')[0],
        party_invoice_value: '',
        itemOptions: '',
        party_id:'',
        party_bill_to: '',
        party_bill_type: '',
        party_chargeable_unit: '',
        party_chargeable_wt: '',
        party_actual_unit: '',
        party_actual_wt: '',
        party_freight: '',
        party_freight_unit: '',
        party_freight_total: '',
        party_invoice_type: '',
        party_shortage_unit: '',
        party_shortage_limit: '',
        party_detention_unit: '',
        party_detention_amount: '',
        party_comment: '',
        supp_id:'',
        supp_bill_to: '',
        supp_bill_type: '',
        supp_chargeable_unit: '',
        supp_chargeable_wt: '',
        supp_actual_unit: '',
        supp_actual_wt: '',
        supp_freight: '',
        supp_freight_unit: '',
        supp_freight_total: '',
        supp_invoice_type: '',
        supp_shortage_unit: '',
        supp_shortage_limit: '',
        supp_detention_unit: '',
        supp_detention_amount: '',
        supp_comment: '',
        vehicleFields: [{
          transMode: '',
          vehicle_no: '',
          vehicle_type:'',
          vehicle_name: '',
          supplier: '',
          supplier_id: '',
          driver_name: '',
          driver_id: '',
          driver_no: '',
          change_place: '',
          change_reason: '',
          change_date: null,
        }],
        itemFields: [{
          product_name: "",
          product_dimension: "",
          product_unit: "",
          product_weight: "",
        }],
        advanceFields: [{
          advance_paid_by: '',
          advance_mode: '',
          advance_other: '',
          advance_payment_date: new Date().toISOString().split('T')[0],
          advance_paid: '',
          pump_name: '',
          pump_amount: '',
          bank_name: '',
          holder_name: '',
          account_number: '',
          ifsc_code: '',
        }]
      }
    }    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchLorryJson = this.fetchLorryJson.bind(this)
    this.getfetchLorryJson = this.getfetchLorryJson.bind(this)
  }
  submit = (ewaybillno) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Eway bill already exists are you sure want to generate again?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.fetchLorryJson(ewaybillno)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  async getfetchLorryJson(value) {
    let ewaybillno = value.ewaybill_number_form;  
    if (ewaybillno) {
      const isewaybillnoexit = await Axios.get(`/jsonlr/${ewaybillno}`);      
      this.closeJson();
      if (isewaybillnoexit.data.result > 0) {
        this.submit(ewaybillno)
      } else {
        this.fetchLorryJson(ewaybillno)
      }
    }
  }
  async fetchLorryJson(ewaybillno) {
    try {      
      // let ewaybillno = value.ewaybill_number_form;      
      if (ewaybillno) {
        ewaybillno = ewaybillno.replace(/ /g, "");
        this.setState({ loading: true});
        // this.closeJson();
        // const ewaybillno = 371002763384;          
        // let log_time1 = '';
        let hours = 0;
        const obj = {
          ewaybillno: ewaybillno
        }
        let serverData = await axios({url:"https://ipapi.co/json/",method: 'get'})
        let ip_address = serverData.data.ip ? serverData.data.ip : '10.10.0.41';        
        const timestamp = await Axios.post(`jsonlr/timestamp`,obj);
        console.log('timestamp',timestamp.data)
        if (timestamp.data.result) {
          var a = moment(new Date());
          var b = moment(timestamp.data.result.genrate_date)
          hours = Math.abs(a.diff(b, 'hours'))              
        }        
        if (hours >= 6 || timestamp.data.isInsert) {
          await Axios.put(`jsonlr/${timestamp.data.result.id}`,{});
          localStorage.setItem('apicalledTime',new Date());
          await axios({
            url: 'https://api.mastergst.com/ewaybillapi/v1.03/authenticate?email=neha.goyal14@gmail.com&username=05AAACH6188F1ZM&password=abc123@@',
            method: 'get',
            headers: {
                'ip_address': ip_address,
                'client_id': 'f4d44810-3be0-4d56-84d9-ba72a6a15887',
                'client_secret': '1580a436-0a25-415c-8e98-5ca1275b7006',
                'gstin': '05AAACH6188F1ZM'
            }
         })               
        }        
        await axios({
          url: `https://api.mastergst.com/ewaybillapi/v1.03/ewayapi/getewaybill?email=neha.goyal14@gmail.com&ewbNo=${ewaybillno}`,
          method: 'get',
          headers: {
              'ip_address': ip_address,
              'client_id': 'f4d44810-3be0-4d56-84d9-ba72a6a15887',
              'client_secret': '1580a436-0a25-415c-8e98-5ca1275b7006',
              'gstin': '05AAACH6188F1ZM'
          }
        }).then((responce)=>{          
          if (responce.data.data) {
            let res = responce.data.data;            
            let docDate = res.docDate ? res.docDate.split('/'): '';
              if (docDate != '') {
                docDate = docDate[2]+'-'+docDate[1]+'-'+docDate[0];                    
                docDate = docDate ? new Date(docDate).toISOString().split('T')[0]: '';        
              }
            // let ewayBillDate = res.ewayBillDate ? res.ewayBillDate.split(' '):'';
            //   if (ewayBillDate != '') {
            //     ewayBillDate = ewayBillDate[0].split('/');
            //     ewayBillDate = ewayBillDate[2]+'-'+ewayBillDate[1]+'-'+ewayBillDate[0];            
            //     ewayBillDate = ewayBillDate ? new Date(ewayBillDate).toISOString().split('T')[0]: '';                
            //   }
              let validUpto = res.validUpto ? res.validUpto.split(' ') : '';
              if (validUpto !='') {
                validUpto = validUpto[0].split('/');
                validUpto = validUpto[2]+'-'+validUpto[1]+'-'+validUpto[0];            
                validUpto = validUpto ? new Date(validUpto).toISOString().split('T')[0]: '';                                         
              }
              console.log(res.actualDist)
              this.setState(prevState => ({
              lorryJsonData: {
                ...prevState.lorryJsonData,
                lr_type: 'API',
                ewaybill_number: res.ewbNo ? res.ewbNo : '',
                fromGstin: res.fromGstin ? res.fromGstin : '',
                toGstin: res.toGstin ? res.toGstin : '',                
                // lr_date: ewayBillDate ? ewayBillDate : '',
                party_doc_type: res.docType ? res.docType : '',
                party_doc_no: res.docNo ? res.docNo : '',
                party_doc_date: docDate ? docDate : '',
                ewaybill_validity: validUpto ? validUpto : '',
                consignor: res.fromTrdName ? res.fromTrdName : '',
                dispatch_address_line_1: res.fromAddr1 ? res.fromAddr1 : '',
                dispatch_address_line_2: res.fromAddr2 ? res.fromAddr2 : '',
                dispatch_address_line_3: res.fromAddr3 ? res.fromAddr3 : '',
                dispatch_city: res.fromPlace ? res.fromPlace : '',
                dispatch_pincode: res.fromPincode ? res.fromPincode : '',
                consignee: res.toTrdName ? res.toTrdName : '',
                ship_address_line_1: res.toAddr1 ? res.toAddr1 : '',
                ship_address_line_2: res.toAddr2 ? res.toAddr2 : '',
                ship_address_line_3: res.toAddr3 ? res.toAddr3 : '',
                ship_city: res.toPlace ? res.toPlace : '',
                ship_pincode: res.toPincode ? res.toPincode : '',
                party_invoice_value: res.totInvValue ? res.totInvValue : '',
                dispatch_state_from_id: res.fromStateCode ? res.fromStateCode : '',
                ship_state_to_id: res.toStateCode ? res.toStateCode : '', 
                actualDist: res.actualDist ? res.actualDist : ''
              }
              }));
              if (this.state.stateListOptions) {
                const statedispObj = this.state.stateListOptions.find((x)=>x.id == res.fromStateCode);
                const stateshipObj = this.state.stateListOptions.find((x)=>x.id == res.toStateCode);
                this.setState(prevState => ({
                  lorryJsonData : {
                    ...prevState.lorryJsonData,
                    ['dispatch_state']: statedispObj ? statedispObj.label: '',
                    ['ship_state']: stateshipObj ? stateshipObj.label: ''
                  }
                }));
              }
              if (res.VehiclListDetails) {
                res.VehiclListDetails.map((value)=> {
                  value['vehicle_no'] = value.vehicleNo;                                      
                  value['vehicle_name'] = value.vehicleNo;                                      
                });
                this.setState(prevState => ({
                  ...prevState,
                  lorryJsonData: {
                    ...prevState.lorryJsonData,				
                    vehicleFields: res.VehiclListDetails           
                  }
                }));
              }
              if (res.itemList) {
                res.itemList.map((value)=> {
                  value['product_name'] = value.productName
                  value['quantity'] = value.quantity;            
                  value['hsnCode'] = value.hsnCode; 
                  value['product_unit'] = value.qtyUnit                
                });
                console.log(res.itemList)
                this.setState(prevState => ({
                  ...prevState,
                  lorryJsonData: {
                    ...prevState.lorryJsonData,				
                    itemFields: res.itemList           
                  }
                }));
              }      
          } else {
            toast.error('Record not found', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          }
          this.setState({ loading: false})
        }).catch(err => {
          console.log(err);
        })               
      } else {
        alert('please enter ewaybill no.')
      }
    } catch (err) {
      console.log(err);
    }
  }

  dataChange = (e) => {    
    this.setState({
      open: false
    });
  }
  fetchLorryReceipts = async () => {
    const lorry = await LorryServices.default.allLorryReceipts();       
    this.setState(prevState => ({
      ...prevState,
			lorryJsonData: {
				...prevState.lorryJsonData,				
        ['lr_no']: lorry.result.length.toString().length >= 2 ? 'LR-0'+(lorry.result.length+1) : 'LR-00'+(lorry.result.length+1)        
			}
		}));
    this.setState({ loading: false})
  }
  async fetchUserDetailAsync() {
    let id = JSON.parse(localStorage.getItem('user')).id;
    Axios.get(`admin/get/${id}`).then(res => {      
      const data = res.data.result;  
      this.setState({userDetails:data})           
    }).catch(err => {
      console.log(err);
    });
  }
  fetchDrivers = async () => {
    this.setState({ loading: true})
    const drivers = await LorryServices.default.allDriverDetails();    
    drivers.result.map((value)=> {      
      value.id = value.id;
      value.driver_id = value.id;
      value.label = value.drvr_name + `(${value.drvr_contact_no})`;
      value.name = value.drvr_name;
    });
    this.setState({driverOptions: drivers.result.length > 0 ? drivers.result : []}); 
  }
  fetchCity = async () => {
    const city = await LorryServices.default.allCityList();        
    this.setState({cityListOptions: city.result.length > 0 ? city.result : []});     
  }
  fetchState = async () => {
    const state = await LorryServices.default.allStateList();        
    this.setState({stateListOptions: state.result.length > 0 ? state.result : []});     
  }
  fetchParties = async () => {
    const parties = await LorryServices.default.allPartiesDetails();    
    parties.result.map((value)=> {
      value.id = value.id;
      value.label = value.party_name;
      value.name = value.party_name;
    }); 
    const party_branches = parties.result.map(value=> value.party_branches);     
    if (this.state.lorryJsonData.consignor_id) {
      let branchOption = []
      for (let i=0; i<party_branches.length;i++) {
        branchOption = party_branches[i].filter(item => item.party_id == this.state.lorryJsonData.consignor_id);     
        if (branchOption.length > 0) break;
      }      
      branchOption.map((value)=> {
        value.id = value.id;
        value.label = value.party_br_city;
        value.name = value.party_br_city;
      });                
      this.setState({
        branch_option_disp: branchOption
      }) 
    }
    if (this.state.lorryJsonData.consignee_id) {
      let branchOption2 = []
      for (let i=0; i<party_branches.length;i++) {      
        branchOption2 = party_branches[i].filter(item => item.party_id == this.state.lorryJsonData.consignee_id);
        if (branchOption2.length > 0) break;
      }
      branchOption2.map((value)=> {
        value.id = value.id;
        value.label = value.party_br_city;
        value.name = value.party_br_city;
      });              
      this.setState({
        branch_option_ship: branchOption2
      })     
    }    
    this.setState({partyOptions: parties.result.length > 0 ? parties.result : []});
  }
  fetchVehicles = async () => {
    const vehicles = await LorryServices.default.allVehicleDetails();
    vehicles.map((value)=> {
      value.id = value.id;
      value.label = value.veh_no;
      value.name = value.veh_no;
    });
    this.setState({vehicleOptions: vehicles});
  }
  fetchSuppliers = async () => {
    const suppliers = await LorryServices.default.allSupplierDetails();
    suppliers.result.map((value)=> {
      value.id = value.id;
      value.label = value.supp_name;
      value.name = value.supp_name;
    });
    this.setState({supplierOptions: suppliers.result.length > 0 ? suppliers.result : []});
  }
  getBranchData(id,flag) {
    this.reset(flag)
    let partylist = this.state.partyOptions;   
    const party_branches = partylist.map(value=> value.party_branches);    
    // let branchOption = party_branches[0].filter(item => item.party_id == id)
    let branchOption = []
    for (let i=0; i<party_branches.length;i++) {
      branchOption = party_branches[i].filter(item => item.party_id == id);
      if (branchOption.length > 0) break;
    }
    branchOption.map((value)=> {
      value.id = value.id;
      value.label = value.party_br_city;
      value.name = value.party_br_city;
    });  
    if (flag == 1) {
      this.setState({
        branch_option_ship: branchOption
      })    
    }  else {
      this.setState({
        branch_option_disp: branchOption
      })
    }
  }
  changebranch = (flag, id) => {  
    if (flag == 0 && id) {
      this.setBranchData(id,flag)
    }
    if (flag == 1 && id) {
      this.setBranchData(id,flag)
    }
  }
  reset(flag) {
    if (flag == 0) {
      return this.setState(prevState => ({
        lorryJsonData : {
          ...prevState.lorryJsonData,
          ['dispatch_insert_branch']: true,          
          ['dispatch_from'] : '',
          ['dispatch_from_id'] : '',  
          ['dispatch_address_line_1'] : '',
          ['dispatch_address_line_2'] : '',
          ['dispatch_address_line_3'] : '',
          ['dispatch_city'] : '',
          ['dispatch_state'] : '',
          ['dispatch_pincode'] : '',
        } 
      }))                    
    } else {
      return this.setState(prevState => ({
        lorryJsonData : {
          ...prevState.lorryJsonData,
          ['ship_insert_branch']: true,          
          ['ship_to'] : '',
          ['ship_to_id'] : '',  
          ['ship_address_line_1'] : '',
          ['ship_address_line_2'] : '',
          ['ship_address_line_3'] : '',
          ['ship_city'] : '',
          ['ship_state'] : '',
          ['ship_pincode'] : '',
        } 
      }))
    }
  }
  setBranchData(id,flag) {           
      if (flag == 0) {
        const dispath_branch_list = this.state.branch_option_disp;
        const filter_dispath_branch_list = dispath_branch_list.find(item=>item.id == id); 
        if (filter_dispath_branch_list) {
          this.setState(prevState => ({
            lorryJsonData: {
              ...prevState.lorryJsonData,
              ['dispatch_city']: filter_dispath_branch_list.party_br_city,
              ['dispatch_address_line_1']: filter_dispath_branch_list.party_br_add1,
              ['dispatch_address_line_2']: filter_dispath_branch_list.party_br_add2,
              ['dispatch_address_line_3']: filter_dispath_branch_list.party_br_add3,
              ['dispatch_pincode']: filter_dispath_branch_list.party_br_pin_code,
              ['dispatch_state']: filter_dispath_branch_list.party_br_state,
            }
          }));
        }
      } else {
        const ship_branch_list = this.state.branch_option_ship;
        const ship_dispath_branch_list = ship_branch_list.find(item=>item.id == id); 
        if (ship_dispath_branch_list) {
          this.setState(prevState => ({
            lorryJsonData: {
              ...prevState.lorryJsonData,
              ['ship_city']: ship_dispath_branch_list.party_br_city,
              ['ship_address_line_1']: ship_dispath_branch_list.party_br_add1,
              ['ship_address_line_2']: ship_dispath_branch_list.party_br_add2,
              ['ship_address_line_3']: ship_dispath_branch_list.party_br_add3,
              ['ship_pincode']: ship_dispath_branch_list.party_br_pin_code,
              ['ship_state']: ship_dispath_branch_list.party_br_state,
            }
          }));
        }
      }    
  }
  getAllData = () => {
    this.fetchUserDetailAsync();
    this.fetchCity();
    this.fetchState();
    this.fetchDrivers();
    this.fetchVehicles();
    this.fetchParties();
    this.fetchSuppliers();
    this.fetchLorryReceipts();
  }
  componentDidMount = () => {
    this.getAllData(); 
  }

  handleRefreshParties = () => {
    this.fetchParties();
  }
  handleRefreshDrivers = () => {
    this.fetchDrivers();
  }
  handleRefreshLorry = () => {
    this.fetchLorryReceipts();
  }
  handleRefreshVehicles = () => {
    this.fetchVehicles();
  }
  handleRefreshSuppliers = () => {
    this.fetchSuppliers();
  }

  changeHandler = (e) => {
    this.setState(prevState => ({
      ...prevState,
			lorryJsonData: {
				...prevState.lorryJsonData,
				[e.target.name]: e.target.value
			}
		}));
    if (e.target.name == 'party_chargeable_wt') {      
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          ['party_freight_total']: prevState.lorryJsonData.party_freight != '' ? prevState.lorryJsonData.party_freight * prevState.lorryJsonData.party_chargeable_wt : prevState.lorryJsonData.party_chargeable_wt,
          ['supp_chargeable_wt']: e.target.value
        }
      }));
    } else if (e.target.name == 'party_freight') {     
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          ['party_freight_total']: prevState.lorryJsonData.party_chargeable_wt != '' ? prevState.lorryJsonData.party_chargeable_wt * prevState.lorryJsonData.party_freight : prevState.lorryJsonData.party_freight
        }
      }));
    } else if (e.target.name == 'party_chargeable_unit') {     
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData, 
          ['supp_chargeable_unit']: e.target.value     
        }
      }));
    } else if (e.target.name == 'party_actual_wt') {     
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData, 
          ['supp_actual_wt']: e.target.value     
        }
      }));
    } else if (e.target.name == 'party_actual_unit') {     
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData, 
          ['supp_actual_unit']: e.target.value     
        }
      }));
    } 
    if (e.target.name == 'supp_chargeable_wt') {      
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          ['supp_freight_total']: prevState.lorryJsonData.supp_freight != '' ? prevState.lorryJsonData.supp_freight * prevState.lorryJsonData.supp_chargeable_wt : prevState.lorryJsonData.supp_chargeable_wt,          
        }
      }));
    } else if (e.target.name == 'supp_freight') {     
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          ['supp_freight_total']: prevState.lorryJsonData.supp_chargeable_wt != '' ? prevState.lorryJsonData.supp_chargeable_wt * prevState.lorryJsonData.supp_freight : prevState.lorryJsonData.supp_freight
        }
      }));
    }
  }
  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();    
    Axios.post(`receipt/add/`, this.state.lorryJsonData)
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
      this.getAllData();
			}).catch(err => {
				console.log(err);
			});
  }
  // ================== All Popups ===================
  // Vehicle pop
  openVehicle = (e) => {
    this.setState({ openVehicle: true });
  }
  setOpenVehiclePopup = () => {
      this.setState(prevState => ({
          openVehicle: {
              ...prevState.openVehicle,
          }
      }));
      this.setState({openVehicle: false})
  };
  closeVehicle = (e) => {
    this.setState({ openVehicle: false });
  }
  // Supplier Popup
  openSuppiler = (e) => {
    this.setState({ openSuppiler: true });
  }
  closeSuppiler = (e) => {
    this.setState({ openSuppiler: false });
  }
  setOpenSupplierPopup = () => {
      this.setState(prevState => ({
          openSuppiler: {
              ...prevState.openSuppiler,
          }
      }));
      this.setState({openSuppiler: false})
  };
  // Branch Popup
  openBranch = (e) => {
    this.setState({ openBranch: true });
  }
  closeBranch = (e) => {
    this.setState({ openBranch: false });
  }
  setOpenBranchPopup = () => {
    this.setState(prevState => ({
        openBranch: {
            ...prevState.openBranch,
        }
    }));
    this.setState({openBranch: false})
  };
  // Branch Popup
  openBranchconsignee = (e) => {
    this.setState({ openBranchconsignee: true });
  }
  closeBranchconsignee = (e) => {
    this.setState({ openBranchconsignee: false });
  }
  setopenBranchconsigneePopup = () => {
    this.setState(prevState => ({
        openBranchconsignee: {
            ...prevState.openBranchconsignee,
        }
    }));
    this.setState({openBranchconsignee: false})
  };
  // Driver Popup
  openDriver = (e) => {
    this.setState({ openDriver: true });
  }
  setOpenDriverPopup = () => {
      this.setState(prevState => ({
          openDriver: {
              ...prevState.openDriver,
          }
      }));
      this.setState({openDriver: false})
  };
  closeDriver = async (e) => {
    this.setState({ openDriver: false });
  }
  openJson = (e) => {
    this.setState({ openJson: true });
  }
  setOpenJsonPopup = () => {
      this.setState(prevState => ({
          openJson: {
              ...prevState.openJson,
          }
      }));
      this.setState({openJson: false})
  };
  closeJson = async (e) => {
    this.setState({ openJson: false });
  }
  // Party Popup
  openParty = (e) => {
    this.setState({ openParty: true });
  }
  closeParty = (e) => {
    this.setState({ openParty: false });
  }
  setOpenPartyPopup = () => {
      this.setState(prevState => ({
          openParty: {
              ...prevState.openParty,
          }
      }));
      this.setState({openParty: false})
  };
 
  // =================  Vehicle  ==============================
  handleChangeVehicle = (index, event, value) => {
    if(event === 'change_date')
    {
      const list = [...this.state.lorryJsonData.vehicleFields]; 
      list[index][event] = value;
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          vehicleFields: list
        }
      }));
      // this.setState({ vehicleFields: list });
    } else {
      const list = [...this.state.lorryJsonData.vehicleFields];
      list[index][event.target.name] = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          vehicleFields: list
        }
      }));
      // this.setState({ vehicleFields: list });
    }
  }
  setReceiptDetailstate = (field,value) => {                              
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        [field]: value
      }
    }));               
  }
  // ===============  Remove Vehicle  =========================
  RemoveVehicle = index => {
    const list = [...this.state.lorryJsonData.vehicleFields];
    list.splice(index, 1);
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        vehicleFields: list
      }
    }));
    // this.setState({ vehicleFields: list });
  };
  // ===============  Add Vehicle  =========================
  AddVehicle = () => {
    // this.setState({ vehicleFields: [...this.state.lorryJsonData.vehicleFields, 
    //     { vehicle_no: "", supplier: "", driver_name: "", driver_no: "", 
    //       change_place: "", change_reason: "",
    //       change_date: new Date().toISOString().split('T')[0]
    //     }]
    //   });
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        vehicleFields: [
          ...this.state.lorryJsonData.vehicleFields, 
          { vehicle_no: "", supplier: "", driver_name: "", driver_no: "",vehicle_type:"", 
            change_place: "", change_reason: "",
            change_date: new Date().toISOString().split('T')[0]
          }
        ]
      }
    }));
  };
  // =================  Advanced Details  ==============================
  handleChangeAdvance = (index, event, value) => {
    if(event === 'advance_payment_date')
    {
      const list = [...this.state.lorryJsonData.advanceFields]; 
      list[index][event] = value;
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          advanceFields: list
        }
      }));
      // this.setState({ advanceFields: list });
    } else {
      const list = [...this.state.lorryJsonData.advanceFields];
      // if(event.target.name != 'undefined'){
        list[index][event.target.name] = event.target.value;
      // }
      // this.setState({ advanceFields: list });
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          advanceFields: list
        }
      }));
    }
  }
  // ===============  Remove Advance  =========================
  RemoveAdvance = index => {
    const list = [...this.state.lorryJsonData.advanceFields];
    list.splice(index, 1);
    // this.setState({ advanceFields: list });
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        advanceFields: list
      }
    }));
  };
  // ===============  Add Advance  =========================
  AddAdvance = () => {
    // this.setState({ advanceFields: [...this.state.lorryJsonData.advanceFields, 
    //     { advance_payment_date: new Date().toISOString().split('T')[0],
    //     advance_paid_by: "", advance_mode: "", advance_other: "", advance_paid: "",
    //     pump_name: "", pump_amount: "",}]
    //   });
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        advanceFields: [...this.state.lorryJsonData.advanceFields, 
          { advance_payment_date: new Date().toISOString().split('T')[0],
          advance_paid_by: "", advance_mode: "", advance_other: "", advance_paid: "",
          pump_name: "", pump_amount: "",}
        ]
      }
    }));
  };
  handleClickOpen = (e) => {
    this.setState({
      openJson: true
    });
  }
  // =================  Items  ==============================
  handleChangeItem = (index, event) => {
    const list = [...this.state.lorryJsonData.itemFields];
    list[index][event.target.name] = event.target.value;
    // this.setState({ itemFields: list });
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        itemFields: list
      }
    }));
  }
  // ===============  Remove Item  =========================
  RemoveItem = index => {
    const list = [...this.state.lorryJsonData.itemFields];
    list.splice(index, 1);
    // this.setState({ itemFields: list });
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        itemFields: list
      }
    }));
  };

  setVehicalestate = (field,value,index) => {            
    if (this.state.lorryJsonData.vehicleFields.length > 0) {
      this.state.lorryJsonData.vehicleFields[index][field] = value;               
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          vehicleFields: this.state.lorryJsonData.vehicleFields
        }
      }));        
    }    
  }
  getVehicaletype = (value,index) => {            
    if (this.state.lorryJsonData.vehicleFields.length > 0) {
      if (value == 'Own Vehicle') {
        this.state.lorryJsonData.vehicleFields[index]['is_disabled_no'] = true;                                
        this.state.lorryJsonData.vehicleFields[index]['supplier_name'] = '';        
      } else {
        this.state.lorryJsonData.vehicleFields[index]['is_disabled_no'] = false;     
      }      
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          vehicleFields: this.state.lorryJsonData.vehicleFields
        }
      }));    
    }    
  }
  // ===============  Add Item  =========================
  AddItem = () => {
    // this.setState({ itemFields: [...this.state.itemFields, 
    //     { product_name: "", product_dimension: "", product_unit: "", product_weight: ""}]
    //   });
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        itemFields: [...this.state.lorryJsonData.itemFields, 
          { product_name: "", product_dimension: "", product_unit: "", product_weight: ""}
        ]
      }
    }));
  };
  //=================== Pump Details=======================
  handleChangeMode = (event, value, index) => {
    const mode= value.label;
    let fuel = document.getElementById(`fuel-${index}`);
    let advance_paid_by = document.getElementById(`advance_paid_by-${index}`);
    let advance_other = document.getElementById(`advance_other-${index}`);
    let bank = document.getElementById(`bank-${index}`);
    if(mode === 'Fuel')
    {
      ReactDOM.findDOMNode(fuel).classList.remove("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.add("d-none");
      ReactDOM.findDOMNode(advance_other).classList.add("d-none");
      ReactDOM.findDOMNode(bank).classList.add("d-none");
    }
    if(mode === 'Cash')
    {
      ReactDOM.findDOMNode(fuel).classList.add("d-none");
      ReactDOM.findDOMNode(advance_other).classList.add("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.remove("d-none");
      ReactDOM.findDOMNode(bank).classList.add("d-none");
    }
    if(mode === 'Bank Transfer')
    {
      ReactDOM.findDOMNode(fuel).classList.add("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.add("d-none");
      ReactDOM.findDOMNode(advance_other).classList.add("d-none");
      ReactDOM.findDOMNode(bank).classList.remove("d-none");
    }
    if(mode === 'Other')
    {
      ReactDOM.findDOMNode(advance_other).classList.remove("d-none");
      ReactDOM.findDOMNode(fuel).classList.add("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.add("d-none");
      ReactDOM.findDOMNode(bank).classList.add("d-none");
    }
  }
  render () {
    const filter = createFilterOptions();
    
    const options = [
      { label: 'Earth', value: 'earth' },
      { label: 'Mars', value: 'mars' },
    ];
    const options_ship = this.state.branch_option_ship;
    const options_disp = this.state.branch_option_disp;

    const bill_type = [
      { label: 'Fixed', value: 'fixed' },
      { label: 'Dispatch Weight', value: 'dispatch weight' },
    ];
    const AddVehicle = ({ children, ...other }) => (
      <Paper {...other}>
         <Mat.Button color="primary" onMouseDown={event => { event.preventDefault(); }} variant="text" size="small" onClick={this.openVehicle}
          startIcon={<Icon.LocalShipping/>} className="mt-1 ml-2">Add Vehicle</Mat.Button>
        {children}
      </Paper>
    );
    const AddDriver = ({ children, ...other }) => (
      <Paper {...other}>
         <Mat.Button color="primary" onMouseDown={event => { event.preventDefault(); }} variant="text" size="small" onClick={this.openDriver}
          startIcon={<Icon.LocalShipping/>} className="mt-1 ml-2">Add Driver</Mat.Button>
        {children}
      </Paper>
    );
    const AddSupplier = ({ children, ...other }) => (
      <Paper {...other}>
         <Mat.Button color="primary" onMouseDown={event => { event.preventDefault(); }} variant="text" size="small" onClick={this.openSuppiler}
          startIcon={<Icon.LocalShipping/>} className="mt-1 ml-2">Add Supplier</Mat.Button>
        {children}
      </Paper>
    );
    const AddBranch = ({ children, ...other }) => (
      <Paper {...other}>
         <Mat.Button color="primary" onMouseDown={event => { event.preventDefault(); }} variant="text" size="small" onClick={this.openBranch}
          startIcon={<DomainAddIcon/>} className="mt-1 ml-2">Add Branch</Mat.Button>
        {children}
      </Paper>
    );
    const AddBranchc = ({ children, ...other }) => (
      <Paper {...other}>
         <Mat.Button color="primary" onMouseDown={event => { event.preventDefault(); }} variant="text" size="small" onClick={this.openBranchconsignee}
          startIcon={<DomainAddIcon/>} className="mt-1 ml-2">Add Branch</Mat.Button>
        {children}
      </Paper>
    );
    const advancedMode = [
      { id:0, label: 'Cash', value: 'cash' },
      { id:1, label: 'Bank Transfer', value: 'bank' },
      { id:2, label: 'Fuel', value: 'fuel' },
      { id:3, label: 'Other', value: 'other' },
    ];
    const invoiceType = [
      { label: 'To be billed', value: 'billed' },
      { label: 'To pay', value: 'pay' },
      // { label: 'Paid', value: 'paid' },
    ];
    const vehicleType = [
      { label: 'Own Vehicle', value: 'own_vehicle' },
      { label: 'Market Vehicle', value: 'market_vehicle' }      
    ];
    // const options = this.state.partyOptions;
   
    const partyOptions = this.state.partyOptions;
    const driverOptions = this.state.driverOptions;       
    const vehicleOptions = this.state.vehicleOptions;
    const supplierOptions = this.state.supplierOptions;
    const itemOptions = [
      { label: 'Earth', value: 'earth' },
      { label: 'Mars', value: 'mars' },
    ];
    const detentionType = [
      { label: 'Per Day', value: 'per day' },
      { label: 'Per Hour', value: 'per hour' },
    ];
    const vehicletypeOptions = [
      { label: 'Own Vehicle', value: 'Own Vehicle' },
      { label: 'Market Vehicle', value: 'Market Vehicle' },
    ];
    const cities = this.state.cityListOptions;
    const stateslist = this.state.stateListOptions;
    const { lr_no, lr_date, ewaybill_validity, consignor, consignee, dispatch_from, ship_to, dispatch_city, dispatch_state, ship_city, ship_state, ewaybill_number, advance_paid_by, chargeable_unit, advance_payment_date,
      advance_paid, pump_name, party_doc_type, party_doc_no, party_doc_date, party_shortage_unit, party_shortage_limit, party_detention_unit, party_detention_amount, party_comment, party_invoice_value, dispatch_address_line_1, dispatch_address_line_2, dispatch_address_line_3, ship_address_line_1, ship_address_line_2, ship_address_line_3, dispatch_pincode, ship_pincode, vehicleFields, service_charges, shortage_tolerance_limit,  drvr_licns_exp_date,
      party_bill_to, supp_bill_to, party_bill_type, supp_bill_type, advance_other, party_chargeable_unit, supp_chargeable_unit, party_chargeable_wt, supp_chargeable_wt, party_actual_unit, supp_actual_unit,party_actual_wt, party_challan_fee,_pc,supp_actual_wt, supp_freight, supp_freight_unit, supp_freight_total, supp_invoice_type, supp_shortage_unit, supp_shortage_limit, supp_detention_unit, supp_detention_amount, supp_comment,
      party_freight, is_branch_dispatch, is_branch_ship, party_freight_unit, advance_mode, pump_amount, party_freight_total, party_invoice_type, driver_name, supplier, vehicle_no, vehicle_type } = this.state.lorryJsonData;
      
    return (
      <div className="content">
        {this.state.loading && <div className="loading">Loading&#8230;</div>} 
      <Link to='/lorry'><Button><ArrowBackIcon/>Go Back</Button></Link>        
       <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
        <form onSubmit={this.handleSubmit}>
          <div className="row my-4">
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <Controls.Button variant="contained" color="success" onClick={this.handleClickOpen} text="Get Lorry Data" />
            </div>
          </div>
          <ReceiptDetails onStateSet={this.setReceiptDetailstate} onChange={this.changeHandler} data={this.state.lorryJsonData}/>          
          <div className="row">
            <div className="col-xs-12 col-lg-12 col-md-12 col-sm-12 mt-2">
              <div className="card bg-gray">
                <div className="card-header">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="card-title m-0">CONSIGNOR & CONSIGNEE</h6>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="flex-auto-space"></div>
                      <Controls.Button text="Add Party" className="custom-mui-btn" onClick={this.openParty}/>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Consignor"
                          name="consignor"
                          value={consignor}
                          options={partyOptions}
                          getOptionLabel={option => option.label}  
                          // PaperComponent={Link}                 
                          onChange={(event, newValue) => {
                            this.reset(0)
                            if(newValue != null){
                              let value = newValue.label;
                              this.getBranchData(newValue.id,0)
                              // this.setState({consignor:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  consignor: value,
                                  consignor_id:newValue.id
                                }
                              }));
                            } else {
                              this.setState({
                                branch_option_disp: []
                              }) 
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  consignor: '',
                                  consignor_id:''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>                    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Branch"
                          name="dispatch_from"
                          value={dispatch_from}
                          PaperComponent={this.state.lorryJsonData.consignor_id ? AddBranch: ''} 
                          // disabled={!is_branch_dispatch} 
                          options={options_disp}
                          getOptionLabel={option => option.label}
                          onChange={(event, newValue) => {
                            this.reset(0);
                            if(newValue != null){                                                            
                              // this.changebranch(0,newValue.id)                              
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  dispatch_from: newValue.label,
                                  dispatch_from_id: newValue.id
                                }
                              }));
                            } else {                              
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  dispatch_from: '',
                                  dispatch_from_id: ''
                                }
                              }));
                            }
                          }}
                        />
                        <Controls.Typography variant="caption" sx={{color: 'green'}} text=": Choose existing address."/>
                      </div>
                    </div>   
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">                      
                      <FormLabel>Is dispatch same as branch?:&nbsp;&nbsp;</FormLabel>       
                      <Checkbox
                          checked={is_branch_dispatch}
                          disabled={!this.state.lorryJsonData.dispatch_from_id}
                          onChange={e => {                            
                            if (e.target.checked) {                              
                              this.changebranch(0,this.state.lorryJsonData.dispatch_from_id)
                            } else {
                              this.reset(0)
                            }
                            this.setState(prevState => ({
                              ...prevState,
                              lorryJsonData: {
                                ...prevState.lorryJsonData,
                                is_branch_dispatch: e.target.checked                                  
                              }
                            }));
                          }}
                        />                                                         
                    </div>                  
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="dispatch_address_line_1"
                          label="Address Line-1"
                          type="text"
                          size="small"
                          value={dispatch_address_line_1}
                          onChange={this.changeHandler}
                        />
                        <Controls.Typography variant="caption" sx={{color: 'green'}}
                          text=": Add new address."
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="dispatch_address_line_2"
                          label="Address Line-2"
                          type="text"
                          size="small"
                          value={dispatch_address_line_2}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="dispatch_address_line_3"
                          label="Address Line-3"
                          type="text"
                          size="small"
                          value={dispatch_address_line_3}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                      <Controls.AutoComplete 
                          label="City"
                          name="dispatch_city"
                          value={dispatch_city}
                          options={cities}
                          isOptionEqualToValue={(option, value)=> option.id === value.id }
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              if (typeof newValue === 'string') {
                                 let value = newValue.value;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    dispatch_city: value
                                  }
                                }));
                              } else if (newValue && newValue.inputValue) {
                                let value = newValue.inputValue;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    dispatch_city: value
                                  }
                                }));
                              } else {
                                let value = newValue.label;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    dispatch_city: value
                                  }
                                }));
                              }
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  dispatch_city: ''
                                }
                              }));
                            }
                          }}
                          filterOptions={(cities, params) => {
                            const filtered = filter(cities, params);
                            const { inputValue } = params;
                            const isExisting = cities.some((option) => inputValue === option.label);
                            if (inputValue !== '' && !isExisting) {
                              filtered.push({
                                inputValue,
                                label: `${inputValue}`,
                              });
                            }
                            return filtered;
                          }}
                        /> 
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="State"
                          name="dispatch_state"
                          value={dispatch_state}
                          options={stateslist}
                          getOptionLabel={option => option.label}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({dispatch_state:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  dispatch_state: value,
                                  dispatch_state_from_id: newValue.id
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  dispatch_state: '',
                                  dispatch_state_from_id: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="dispatch_pincode"
                          label="Pincode"
                          type="number"
                          size="small"
                          value={dispatch_pincode}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Consignee"
                          name="consignee"
                          value={consignee}
                          options={partyOptions}
                          getOptionLabel={option => option.label}
                          onChange={(event, newValue) => {
                            this.reset(1)
                            if(newValue != null){
                              let value = newValue.label;
                              this.getBranchData(newValue.id,1)
                              // this.setState({consignee:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  consignee: value,
                                  consignee_id:newValue.id
                                }
                              }));
                            } else {
                              this.setState({
                                branch_option_ship: []
                              }) 
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  consignee: '',
                                  consignee_id: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Branch"
                          name="ship_to"
                          value={ship_to}
                          options={options_ship}
                          PaperComponent={this.state.lorryJsonData.consignee_id ? AddBranchc: ''}  
                          // disabled={!is_branch_ship}
                          onChange={(event, newValue) => {
                            this.reset(1)
                            if(newValue != null){
                              let value = newValue.label;                              
                              // this.changebranch(1,newValue.id)                              
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  ship_to: value,
                                  ship_to_id: newValue.id
                                }
                              }));
                            } else {                              
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  ship_to: '',
                                  ship_to_id: ''
                                }
                              }));
                            }
                          }}
                        />
                        <Controls.Typography variant="caption" sx={{color: 'green'}} text=": Choose existing address."/>
                      </div>
                    </div>    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">                      
                      <FormLabel>Is ship same as branch?:&nbsp;&nbsp;</FormLabel>       
                      <Checkbox
                          checked={is_branch_ship}
                          disabled={!this.state.lorryJsonData.ship_to_id}
                          onChange={e => {
                            console.log(e.target.checked);
                            if (e.target.checked) {
                              this.changebranch(1,this.state.lorryJsonData.ship_to_id)
                            } else {
                              this.reset(1)
                            }
                            this.setState(prevState => ({
                              ...prevState,
                              lorryJsonData: {
                                ...prevState.lorryJsonData,
                                is_branch_ship: e.target.checked                                  
                              }
                            }));
                          }}
                        />                                                         
                    </div>               
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.Input name="ship_address_line_1"
                          label="Address Line-1"
                          type="text"
                          size="small"
                          value={ship_address_line_1}
                          onChange={this.changeHandler}
                        />
                        <Controls.Typography variant="caption" sx={{color: 'green'}} text=": Add new address."/>
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.Input name="ship_address_line_2"
                          label="Address Line-2"
                          type="text"
                          size="small"
                          value={ship_address_line_2}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="ship_address_line_3"
                          label="Address Line-3"
                          type="text"
                          size="small"
                          value={ship_address_line_3}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                      <Controls.AutoComplete 
                          label="City"
                          name="ship_city"
                          value={ship_city}
                          options={cities}
                          isOptionEqualToValue={(option, value)=> option.id === value.id }
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              if (typeof newValue === 'string') {
                                 let value = newValue.value;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    ship_city: value,
                                    ship_city_to_id: newValue.id
                                  }
                                }));
                              } else if (newValue && newValue.inputValue) {
                                let value = newValue.inputValue;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    ship_city: value,
                                    ship_city_to_id: newValue.id
                                  }
                                }));
                              } else {
                                let value = newValue.label;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    ship_city: value,
                                    ship_city_to_id: newValue.id
                                  }
                                }));
                              }
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  ship_city: '',
                                  ship_city_to_id: ''
                                }
                              }));
                            }
                          }}
                          filterOptions={(cities, params) => {
                            const filtered = filter(cities, params);
                            const { inputValue } = params;
                            const isExisting = cities.some((option) => inputValue === option.label);
                            if (inputValue !== '' && !isExisting) {
                              filtered.push({
                                inputValue,
                                label: `${inputValue}`,
                              });
                            }
                            return filtered;
                          }}
                        /> 
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="State"
                          name="ship_state"
                          value={ship_state}
                          options={stateslist}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({ship_state:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  ship_state: value,
                                  ship_state_to_id: newValue.id
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  ship_state: '',
                                  ship_state_to_id: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="ship_pincode"
                          label="Pincode"
                          type="number"
                          size="small"
                          value={ship_pincode}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3"> 
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="card-title m-0">VEHICLE DETAILS</h6>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="flex-auto-space"></div>
                      <Controls.Button text="Change Vehicle" className="custom-mui-btn" onClick={this.AddVehicle}/>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  { this.state.lorryJsonData.vehicleFields.map((vehicle, index) => (
                    <div className="row" key={index}>
                      <div className="col-xs-2 col-lg-2 col-md-2 col-sm-12">
                        <div className="form-group">
                          <Controls.AutoComplete
                            label="Vehicle Type." 
                            name="vehicle_type" 
                            key={index}
                            value={vehicle.vehicle_type}
                            options={vehicletypeOptions}
                            PaperComponent={AddVehicle}
                            onChange={(event, newValue) => {
                              if (newValue != null) {  
                                vehicle.vehicle_type = newValue.label; 
                                this.setVehicalestate('vehicle_type', newValue.label, index);
                                this.getVehicaletype(newValue.value,index);                             
                              } else {
                                vehicle.vehicle_type = ''; 
                                this.setVehicalestate('vehicle_type', '', index);                                
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                        <div className="form-group">
                          <Controls.AutoComplete
                            label="Vehicle No." 
                            name="vehicle_no"                             
                            value={vehicle.vehicle_name}                            
                            key={index}
                            options={vehicleOptions}
                            PaperComponent={AddVehicle}
                            onChange={(event, newValue) => {
                              if (newValue != null) { 
                                this.setVehicalestate('vehicle_no', newValue.id, index);
                                this.setVehicalestate('vehicle_name', newValue.label, index);
                                vehicle.vehicle_no = newValue.id; 
                                vehicle.vehicle_name = newValue.label; 
                              } else {
                                this.setVehicalestate('vehicle_no', '', index);
                                this.setVehicalestate('vehicle_name', '', index);
                                vehicle.vehicle_no = ''; 
                                vehicle.vehicle_name = ''; 
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                        <div className="form-group">
                          <Controls.AutoComplete 
                            label="Supplier" 
                            name="supplier"
                            value={vehicle.is_disabled_no ? '' : vehicle.supplier}                             
                            key={index}
                            disabled={vehicle.is_disabled_no}
                            options={supplierOptions}
                            PaperComponent={AddSupplier}
                            onChange={(event, newValue) => { 
                              if (newValue != null) { 
                                this.setVehicalestate('supplier', newValue.label, index)
                                this.setVehicalestate('supplier_id', newValue.id, index)
                                vehicle.supplier = newValue.label; 
                                vehicle.supplier_id = newValue.id; 
                              } else {
                                this.setVehicalestate('supplier', '', index)
                                this.setVehicalestate('supplier_id', '', index)
                                vehicle.supplier = ''; 
                                vehicle.supplier_id = ''; 
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                        <div className="form-group">
                          <Controls.AutoComplete
                            label="Driver Name"
                            name="driver_name"
                            value={vehicle.driver_name}                            
                            key={index}
                            options={driverOptions}
                            PaperComponent={AddDriver}
                            onChange={(event, newValue) => {
                              if (newValue != null) { 
                                this.setVehicalestate('driver_name', newValue.label, index)
                                this.setVehicalestate('driver_id', newValue.driver_id, index)
                                vehicle.driver_name = newValue.label; 
                                vehicle.driver_id = newValue.driver_id; 
                              } else {
                                this.setVehicalestate('driver_name', '', index)
                                this.setVehicalestate('driver_id', '', index)
                                vehicle.driver_name = ''; 
                                vehicle.driver_id = ''; 
                              }
                            }}
                          />
                        </div>
                      </div>                     
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12" id={`change_place-${index}`}>
                        <div className="form-group">
                          <Controls.Input
                            name="change_place" 
                            label="Place" 
                            type="text"
                            key={index}
                            value={vehicle.change_place}
                            onChange={(event, value) => { 
                                this.handleChangeVehicle(index, event, value)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12" id={`change_reason-${index}`}>
                        <div className="form-group">
                          <Controls.Input
                            name="change_reason" 
                            label="Reason" 
                            type="text"
                            key={index}
                            value={vehicle.change_reason}
                            onChange={(event, value) => { 
                                this.handleChangeVehicle(index, event, value)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12" id={`change_date-${index}`}>
                        <div className="form-group">
                          <Controls.DatePicker
                            label="Date"
                            name="change_date"
                            value={vehicle.change_date}
                            onChange={(newValue) => { 
                              newValue = newValue.toISOString().split('T')[0];
                              let event= "change_date";
                              this.handleChangeVehicle(index, event, newValue)
                            }}
                            size="small"
                          />
                        </div>
                      </div>
                      <div className="col-xs-1 col-lg-1 col-md-1 col-sm-1">
                        <Tooltip title="Delete" placement="top">
                          <Button  variant="text" color="error" onClick = {() => { this.RemoveVehicle(index)}}>
                            <Icon.Delete />
                          </Button>
                        </Tooltip>
                      </div>
                      {/* <div className="col-xs-12 col-lg-12 col-md-12 col-sm-12 mt-0">
                        <Controls.Button color="error" onClick={() => { this.RemoveVehicle(index)}} text="Remove"/>
                      </div> */}
                    </div>
                  ))}
                </div>
              </div> 
            </div>
            <div className="col-12 mt-3">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="card-title m-0">ITEM DETAILS</h6>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="flex-auto-space"></div>
                      <Controls.Button text="Add Item" className="custom-mui-btn" onClick={this.AddItem}/>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  { this.state.lorryJsonData.itemFields.map((item, index) => (
                    <div className="row" key={index}>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                        <div className="form-group">
                          <Controls.Input 
                            label="Product Name" 
                            name="product_name"
                            value={item.product_name}
                            onChange={event => this.handleChangeItem(index, event)}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                        <div className="form-group">
                          <Controls.Input
                            name="product_weight" 
                            label="Product Weight" 
                            type="text"
                            value={item.product_weight}
                            onChange={event => this.handleChangeItem(index, event)}
                          />
                        </div>
                      </div>
                      <div className="col-xs-2 col-lg-2 col-md-2 col-sm-12">
                        <div className="form-group">
                          <Controls.Input
                            name="product_unit" 
                            label="Product Unit." 
                            type="text"
                            value={item.product_unit}
                            onChange={event => this.handleChangeItem(index, event)}
                          />
                        </div>
                      </div>
                      <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                        <div className="form-group">
                          <Controls.Input
                            name="product_dimension" 
                            label="Comments" 
                            type="text"
                            value={item.product_dimension}
                            onChange={event => this.handleChangeItem(index, event)}
                          />
                        </div>
                      </div>                      
                      <div className="col-xs-1 col-lg-1 col-md-4 col-sm-12">
                      <Tooltip title="Delete" placement="top">
                        <Button  variant="text" color="error" onClick = {() => { this.RemoveItem(index)}}>
                          <Icon.Delete />
                        </Button>
                      </Tooltip>
                        {/* <Controls.Button color="error" onClick={() => { this.RemoveItem(index)}}>
                            <Icon.Delete />
                        </Controls.Button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div> 
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3"> 
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title m-0">PARTY BILLING</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Bill To"
                          name="party_bill_to"
                          options={partyOptions}
                          value={party_bill_to}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({party_bill_to:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_bill_to: value,
                                  party_id: newValue.id
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_bill_to: '',
                                  party_id: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Bill Type"
                          name="party_bill_type"
                          options={bill_type}
                          value={party_bill_type}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({party_bill_type:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_bill_type: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_bill_type: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_chargeable_wt" 
                          label="Chargeable WT"
                          type="number"
                          value={party_chargeable_wt}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_chargeable_unit" 
                          label="Chargeable Unit"
                          type="text"
                          value={party_chargeable_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_actual_wt" 
                          label="Actual WT" 
                          type="number"
                          value={party_actual_wt}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>               
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_actual_unit" 
                          label="Actual Unit" 
                          type="text"
                          value={party_actual_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>                    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_freight"
                          label="Freight"
                          type="text"
                          value={party_freight}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_freight_unit"
                          label="Freight Unit"
                          type="text"
                          value={party_freight_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_freight_total"
                          label="Freight Total"
                          type="text"
                          value={party_freight_total}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete 
                          label="Invoice Type" 
                          name="party_invoice_type" 
                          options={invoiceType}
                          value={party_invoice_type}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({party_invoice_type:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_invoice_type: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_invoice_type: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_shortage_limit"
                          label="Shortage Tolerance Limit/Unit"
                          type="text"
                          value={party_shortage_limit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    {/* <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_shortage_unit"
                          label="Shortage Tolerance Unit"
                          type="number"
                          value={party_shortage_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div> */}
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_detention_amount"
                          label="Detention Amount"
                          type="text"
                          value={party_detention_amount}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete 
                          label="Detention Unit" 
                          name="party_detention_unit" 
                          options={detentionType}
                          value={party_detention_unit}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({party_detention_unit:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_detention_unit: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  party_detention_unit: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_comment"
                          label="Comment"
                          type="text"
                          value={party_comment}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
          {/* New functionality */}
          <div className="row">
            <div className="col-12 mt-3"> 
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title m-0">SUPPLIER BILLING</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Bill To"
                          name="supp_bill_to"
                          options={supplierOptions}
                          value={supp_bill_to}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({party_bill_to:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_bill_to: value,
                                  supp_id: newValue.id
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_bill_to: '',
                                  supp_id: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete
                          label="Bill Type"
                          name="supp_bill_type"
                          options={bill_type}
                          value={supp_bill_type}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({supp_bill_type:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_bill_type: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_bill_type: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_chargeable_wt" 
                          label="Chargeable WT"
                          type="number"
                          value={supp_chargeable_wt}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_chargeable_unit" 
                          label="Chargeable Unit"
                          type="text"
                          value={supp_chargeable_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_actual_wt" 
                          label="Actual WT" 
                          type="number"
                          value={supp_actual_wt}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>               
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_actual_unit" 
                          label="Actual Unit" 
                          type="text"
                          value={supp_actual_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>                   
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_freight"
                          label="Freight"
                          type="text"
                          value={supp_freight}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_freight_unit"
                          label="Freight Unit"
                          type="text"
                          value={supp_freight_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_freight_total"
                          label="Freight Total"
                          type="text"
                          value={supp_freight_total}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete 
                          label="Invoice Type" 
                          name="supp_invoice_type" 
                          options={invoiceType}
                          value={supp_invoice_type}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({party_invoice_type:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_invoice_type: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_invoice_type: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_shortage_limit"
                          label="Shortage Tolerance Limit/Unit"
                          type="text"
                          value={supp_shortage_limit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    {/* <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="party_shortage_unit"
                          label="Shortage Tolerance Unit"
                          type="number"
                          value={party_shortage_unit}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div> */}
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_detention_amount"
                          label="Detention Amount"
                          type="text"
                          value={supp_detention_amount}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.AutoComplete 
                          label="Detention Unit" 
                          name="supp_detention_unit" 
                          options={detentionType}
                          value={supp_detention_unit}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({supp_detention_unit:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_detention_unit: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  supp_detention_unit: ''
                                }
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                      <div className="form-group">
                        <Controls.Input name="supp_comment"
                          label="Comment"
                          type="text"
                          value={supp_comment}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
          {/* New functionality */}
          <div className="row">
            <div className="col-12 mt-3">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="card-title m-0">ADVANCE DETAILS</h6>
                    </div>
                    <div className="col-6 d-flex">
                      <div className="flex-auto-space"></div>
                      <Controls.Button text="Add Advance" className="custom-mui-btn" onClick={this.AddAdvance}/>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  { this.state.lorryJsonData.advanceFields.map((advance, index) => (
                      <div className="row" key={index}>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                          <div className="form-group">
                            <Controls.DatePicker
                              label="Advance Payment Date"
                              name="advance_payment_date"
                              value={advance.advance_payment_date}
                              onChange={(newValue) => { 
                                newValue = newValue.toISOString().split('T')[0];
                                let event= "advance_payment_date";
                                this.handleChangeAdvance(index, event, newValue)
                              }}
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                          <div className="form-group">
                            <Controls.Input name="advance_paid" 
                              label="Advance Paid"
                              type="text"
                              value={advance.advance_paid}
                              onChange={(event, value) => { 
                                  this.handleChangeAdvance(index, event, value)
                              }} 
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                          <div className="form-group">
                            <Controls.AutoComplete 
                              label="Advance Mode" 
                              name="advance_mode"
                              value={advance_mode}
                              options={advancedMode}
                              renderInput=""
                              onChange={(event, newValue) => {
                                if(newValue != null){
                                  advance.advance_mode = newValue.value;
                                  this.handleChangeMode(event, newValue, index);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 d-none" id={`advance_paid_by-${index}`}>
                          <div className="form-group">
                            <Controls.Input name="advance_paid_by" 
                              label="Advance Paid By"
                              type="text"
                              value={advance.advance_paid_by}
                              onChange={(event, value) => { 
                                  this.handleChangeAdvance(index, event, value)
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 d-none" id={`advance_other-${index}`}>
                          <div className="form-group">
                            <Controls.Input name="advance_other" 
                              label="Remark"
                              type="text"
                              value={advance.advance_other}
                              onChange={(event, value) => { 
                                  this.handleChangeAdvance(index, event, value)
                              }}
                            />
                          </div>
                        </div> 
                        <div className="col-12 d-none" id={`fuel-${index}`}>
                          <div className="row">
                            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                              <div className="form-group">
                                <Controls.Input name="pump_name" 
                                  label="Pump Name"
                                  type="text"
                                  value={advance.pump_name}
                                  onChange={(event, value) => { 
                                      this.handleChangeAdvance(index, event, value)
                                  }}
                                />
                              </div>
                            </div>                          
                          </div>
                        </div>
                        <div className="col-12 d-none" id={`bank-${index}`}>
                          <div className="row">
                            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                              <div className="form-group">
                                <Controls.Input name="bank_name" 
                                  label="Bank Name"
                                  type="text"
                                  value={advance.bank_name}
                                  onChange={(event, value) => { 
                                      this.handleChangeAdvance(index, event, value)
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                              <div className="form-group">
                                <Controls.Input name="holder_name" 
                                  label="Holder Name"
                                  type="text"
                                  value={advance.holder_name}
                                  onChange={(event, value) => { 
                                    this.handleChangeAdvance(index, event, value)
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                              <div className="form-group">
                                <Controls.Input name="account_number" 
                                  label="Account Number"
                                  type="number"
                                  value={advance.account_number}
                                  onChange={(event, value) => { 
                                      this.handleChangeAdvance(index, event, value)
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-2">
                              <div className="form-group">
                                <Controls.Input name="ifsc_code" 
                                  label="IFSC Code"
                                  type="text"
                                  value={advance.ifsc_code}
                                  onChange={(event, value) => { 
                                    this.handleChangeAdvance(index, event, value)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>                      
                        <div className="col-xs-1 col-lg-1 col-md-1 col-sm-1">
                        <Tooltip title="Delete" placement="top">
                        <Button  variant="text" color="error" onClick = {() => { this.RemoveAdvance(index)}}>
                          <Icon.Delete />
                        </Button>
                      </Tooltip>                        
                        </div>
                      </div>
                  ))}
                  <div className="row mt-4 float-right">                      
                      <Controls.Button variant="contained" color="success" onClick={this.handleSubmit} text="Save"/>&nbsp;
                      <ReactToPrint 
                      trigger={() =>
                        <Controls.Button variant="contained" color="primary" text="Print"/>
                        }
                        content={() => this.componentRef}
                        documentTitle={lr_no}
                      />
                      <div className="d-none">
                      {this.state.lorryJsonData.party_invoice_type =='To pay' && <ComponentToPrint  ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                        
                      {this.state.lorryJsonData.party_invoice_type !='To pay' && <ComponentToPrintbilled  ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                        
                      </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </form>
        {/* {this.state.lorryJsonData.party_invoice_type =='To pay' && <ComponentToPrint userDetails={this.state.userDetails} ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                        
        {this.state.lorryJsonData.party_invoice_type !='To pay' && <ComponentToPrintbilled  ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                         */}
    <Popup 
      title="Add Vehicle"
      openPopup={this.state.openVehicle}
      setOpenPopup={this.setOpenVehiclePopup}
    >
      <VehicleForm popup={this.state.openVehicle} popupChange={this.closeVehicle} refreshTable={this.handleRefreshVehicles}/> 
    </Popup>
    <Popup 
      title="Add Supplier"
      openPopup={this.state.openSuppiler}
      setOpenPopup={this.setOpenSupplierPopup}
    >
      <SupplierForm popup={this.state.openSuppiler} popupChange={this.closeSuppiler} refreshTable={this.handleRefreshSuppliers}/> 
    </Popup>

    <Popup 
      title="Add Driver"
      openPopup={this.state.openDriver}
      setOpenPopup={this.setOpenDriverPopup}
    >
      <DriverForm popup={this.state.openDriver} popupChange={this.closeDriver} refreshTable={this.handleRefreshDrivers}/> 
    </Popup>
    <Popup 
      title="Add Party"
      openPopup={this.state.openParty}
      setOpenPopup={this.setOpenPartyPopup}
    >
      <PartyForm popup={this.state.openParty} popupChange={this.closeParty} refreshTable={this.handleRefreshParties}/> 
    </Popup>
    <Popup 
    
    title="Add Branch"
      openPopup={this.state.openBranch}
      setOpenPopup={this.setOpenBranchPopup}
    >
      <PartyBranchAdd popup={this.state.openBranch} partyId={this.state.lorryJsonData.consignor_id} popupChange={this.closeBranch} refreshTable={this.handleRefreshParties}/>      
    </Popup>
    <Popup 
      title="Add Branch"
      openPopup={this.state.openBranchconsignee}
      setOpenPopup={this.setOpenBranchconsigneePopup}
    >
       <PartyBranchAdd popup={this.state.openBranchconsignee} partyId={this.state.lorryJsonData.consignee_id} popupChange={this.closeBranchconsignee} refreshTable={this.handleRefreshParties}/>      
    </Popup>
    
    <Popup title="Get lorry data" openPopup={this.state.openJson} setOpenPopup={this.setOpenJsonPopup}>
        <EwayBillForm  submit={this.getfetchLorryJson} popupChange={this.closeJson} />
    </Popup>
    </div>
    )
  }
}

export default LoryJson;