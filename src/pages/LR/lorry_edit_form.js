/* eslint-disable */
import React, { Component } from 'react';
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
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FormLabel from '@mui/material/FormLabel';
import PartyBranchAdd from '../party/Branch/BranchAdd';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import Checkbox from "@mui/material/Checkbox";

class LoryEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ownvehical: false,
      setIndex: '',
      openVehicle: false,
      openSuppiler: false,
      openBranch: false,
      openBranchconsignee: false,
      openDriver: false,
      openParty: false,      
      partyOptions: [],
      driverOptions: [],
      vehicleOptions: [],
      supplierOptions: [],
      cityListOptions:[],
      stateListOptions:[],
      party_branches:[],
      branch_option_ship:[],
      branch_option_disp:[],
      lorryJsonData: {
        is_branch_dispatch: false,
        is_branch_ship: false,
        dispatch_insert_branch: false,
        ship_insert_branch: false,
        consignor:'',
        lr_no: '',
        lr_date: new Date().toISOString().split('T')[0],
        ewaybill_validity: new Date().toISOString().split('T')[0],
        from: '',
        from_city: '',        
        to_city: '',        
        from_state: '',
        to_state: '',
        to: '',      
        consignor_id: '',  
        consignee: '',
        consignee_id: '',
        consignee_gst: '',     
        consignor_gst: '', 
        dispatch_from: '',
        dispatch_state_from_id: '',
        ship_state_to_id: '',
        dispatch_from_id: '',
        ship_to_id: '',        
        dispatch_city_from_id:'',	
        ship_city_to_id:'',	
        ship_to: '',
        ewaybill_number: '',
        drvr_licns_exp_date: new Date().toISOString().split('T')[0],
        chargeable_unit: '',      
        service_charges: '',
        shortage_tolerance_limit: '',
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
        party_bill_to: '',
        party_id: '',
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
          vehicle_no: '',
          transMode: '',
          is_disabled_no: '',
          vehicle_name: '',
          vehicle_type: '',
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
  }
  dataChange = (e) => {    
    this.setState({
      open: false
    });
  }
  fetchLorryReceipts = async () => {
    const lorry = await LorryServices.default.allLorryReceiptsById(this.props.match.params.id);
    const data = lorry.result; 
    if (data) {
      if (data.vehicle_details) {        
        data.vehicle_details.map((value,index)=>{
          if (value.vehicle_type == 'Own Vehicle') {
            data.vehicle_details[index]['is_disabled_no'] = true
          } else {
            data.vehicle_details[index]['is_disabled_no'] = false
          }        
          if (this.state.driverOptions) {
            const driverdetail = this.state.driverOptions.find(x=>x.id=value.driver_id);            
            if (driverdetail) {
              data.vehicle_details[index]['driver_name'] = driverdetail.drvr_name+`(${driverdetail.drvr_contact_no})`;              
              data.vehicle_details[index]['driver_no'] = driverdetail.drvr_contact_no;              
              data.vehicle_details[index]['driver_name_tmp'] = driverdetail.drvr_name;
            }           
          }
          if (this.state.supplierOptions) {
            const supplierdetail = this.state.supplierOptions.find(x=>x.id=value.supplier_id);
            if (supplierdetail) {
              data.vehicle_details[index]['supplier_name'] = supplierdetail.supp_name;              
              data.vehicle_details[index]['supplier'] = supplierdetail.supp_name;              
            }           
          }
          if (this.state.vehicleOptions) {
            const vehicledetail = this.state.vehicleOptions.find(x=>x.id=value.vehicle_id);
            if (vehicledetail) {
              data.vehicle_details[index]['vehicle_name'] = vehicledetail.veh_no;                                        
            }           
          }
        })
      }              
      this.getBranchData(data.consignor_id,0,data.dispatch_from_id)
      this.getBranchData(data.consignee_id,1,data.ship_to_id);             
      this.setState(prevState => ({
        lorryJsonData : {
          ...prevState.lorryJsonData,
          ['consignee_id']: data.consignee_id,                   
          ['ewaybill_number']: data.ewaybill_number,     
          ['consignor_id']: data.consignor_id,     
          ['lr_date']: data.lr_date,     
          ['dispatch_address_line_1']: data.from_address_line_1,     
          ['dispatch_address_line_2']: data.from_address_line_2,     
          ['dispatch_address_line_3']: data.from_address_line_3,     
          ['ewaybill_validity']: data.ewaybill_validity,     
          // ['from_city']: data.from_city,    
          ['from_pincode']: data.from_pincode,     
          ['lr_no']: data.lr_no,                 
          ['from_state']: data.from_state,     
          ['party_doc_date']: data.party_doc_date,     
          ['party_doc_no']: data.party_doc_no,     
          ['party_invoice_value']: data.party_invoice_value,     
          ['party_doc_type']: data.party_doc_type,     
          ['party_doc_value']: data.party_doc_value,    
          // ['ship_to']: data.ship_to,     
          ['ship_address_line_1']: data.to_address_line_1,    
          ['ship_address_line_2']: data.to_address_line_2,     
          ['ship_address_line_3']: data.to_address_line_3,     
          // ['to_city']: data.to_city,     
          ['to_pincode']: data.to_pincode,     
          ['to_state']: data.to_state,     
          // ['dispatch_from']: data.dispatch_from,     
          ['dispatch_from_id']: data.dispatch_from_id,     
          ['ship_to_id']: data.ship_to_id,     
          ['ship_city_to_id']: data.ship_city_to_id,     
          ['dispatch_city_from_id']: data.dispatch_city_from_id	,     
          ['dispatch_state_from_id']: data.dispatch_state_from_id,     
          ['ship_state_to_id']: data.ship_state_to_id,                
          // ['ship_city']: data.to_city,        
          // ['dispatch_state']: data.from_state,    
          // ['ship_state']: data.to_state,        
          ['dispatch_pincode']: data.from_pincode,    
          ['ship_pincode']: data.to_pincode,
          ['vehicleFields']: data.vehicle_details,     
          ['itemFields']: data.item_details,       
          ['advanceFields']: data.advance_details,        
          ['party_bill_type']: data.party_billing_details.party_bill_type,        
          ['party_bill_to']: data.party_billing_details.party_name,              
          ['party_chargeable_unit']: data.party_billing_details.party_chargeable_unit,        
          ['party_actual_unit']: data.party_billing_details.party_actual_unit,      
          ['party_actual_wt']: data.party_billing_details.party_actual_wt,        
          ['party_chargeable_wt']: data.party_billing_details.party_chargeable_wt,      
          ['party_comment']: data.party_billing_details.party_comment,        
          ['party_detention_amount']: data.party_billing_details.party_detention_amount,      
          ['party_detention_unit']: data.party_billing_details.party_detention_unit,        
          ['party_freight']: data.party_billing_details.party_freight,      
          ['party_freight_total']: data.party_billing_details.party_freight_total,      
          ['party_freight_unit']: data.party_billing_details.party_freight_unit,      
          ['party_invoice_type']: data.party_billing_details.party_invoice_type,      
          ['party_shortage_limit']: data.party_billing_details.party_shortage_limit,      
          ['party_shortage_unit']: data.party_billing_details.party_shortage_unit,      
          ['supp_bill_type']: data.supp_billing_details.supp_bill_type,        
          ['supp_bill_to']: data.supp_billing_details.supp_bill_to,              
          ['supp_chargeable_unit']: data.supp_billing_details.supp_chargeable_unit,        
          ['supp_actual_unit']: data.supp_billing_details.supp_actual_unit,      
          ['supp_actual_wt']: data.supp_billing_details.supp_actual_wt,        
          ['supp_chargeable_wt']: data.supp_billing_details.supp_chargeable_wt,      
          ['supp_comment']: data.supp_billing_details.supp_comment,        
          ['supp_detention_amount']: data.supp_billing_details.supp_detention_amount,      
          ['supp_detention_unit']: data.supp_billing_details.supp_detention_unit,        
          ['supp_freight']: data.supp_billing_details.supp_freight,      
          ['supp_freight_total']: data.supp_billing_details.supp_freight_total,      
          ['supp_freight_unit']: data.supp_billing_details.supp_freight_unit,      
          ['supp_invoice_type']: data.supp_billing_details.supp_invoice_type,      
          ['supp_shortage_limit']: data.supp_billing_details.supp_shortage_limit,      
          ['supp_shortage_unit']: data.supp_billing_details.supp_shortage_unit,      
          ['is_branch_dispatch']: data.is_branch_dispatch == 1 ? true : false,      
          ['is_branch_ship']: data.is_branch_ship == 1 ? true : false,      
  
          // ['itemFields']: data.party_billing_details        
        }
      }));      
      data.advance_details.map((value,index)=> {      
        value['label'] = value.advance_mode
        this.handleChangeMode('', value, index)
      });        
      if (this.state.stateListOptions) {
        const statedispObj = this.state.stateListOptions.find((x)=>x.id == data.dispatch_state_from_id);
        const stateshipObj = this.state.stateListOptions.find((x)=>x.id == data.ship_state_to_id);
        this.setState(prevState => ({
          lorryJsonData : {
            ...prevState.lorryJsonData,
            ['dispatch_state']: statedispObj ? statedispObj.label: '',
            ['ship_state']: stateshipObj ? stateshipObj.label: ''
          }
        }));
      }
      if (this.state.cityListOptions) {
        const citydispObj = this.state.cityListOptions.find((x)=>x.id == data.dispatch_city_from_id);
        const cityshipObj = this.state.cityListOptions.find((x)=>x.id == data.ship_city_to_id);
        this.setState(prevState => ({
          lorryJsonData : {
            ...prevState.lorryJsonData,
            ['dispatch_city']: citydispObj ? citydispObj.label: '',
            ['ship_city']: cityshipObj ? cityshipObj.label: ''
          }
        }));
      }
      if (this.state.partyOptions) {
        const consignor = this.state.partyOptions.find((x) => x.id == data.consignor_id); 
        const consignee = this.state.partyOptions.find((x) => x.id == data.consignee_id);         
        this.setState(prevState => ({
          lorryJsonData : {
            ...prevState.lorryJsonData,                
            ['consignor']: consignor ? consignor.label: '',
            ['consignor_gst']: consignor ? consignor.party_gst: '',
            ['consignee']: consignee ? consignee.label: '',
            ['consignee_gst']: consignee ? consignee.party_gst: ''
          } 
        }))          
      }
    }     
    this.setState({ loading: false})
  }
  fetchDrivers = async () => {
    const drivers = await LorryServices.default.allDriverDetails();
    drivers.result.map((value)=> {
      value.driver_id = value.id;
      value.label = value.drvr_name + `(${value.drvr_contact_no})`;
      value.name = value.drvr_name;
    });    
    this.setState({driverOptions: drivers.result}); 
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
    // this.setState({party_branches: parties.result.party_branches});
    this.setState({partyOptions: parties.result});
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
    this.setState({supplierOptions: suppliers.result});
  }
  getBranchData(id,flag, disip) {
    let partylist = this.state.partyOptions;      
    const party_branches = partylist.map(value=> value.party_branches);         
    let branchOption = []
    for (let i=0; i<party_branches.length;i++) {
      branchOption = party_branches[i].filter(item => item.party_id == id);
      if (branchOption.length > 0) break;
    }     
    if (disip) {      
      if (flag ==0) {
        if (partylist && branchOption) {           
          const consignor = partylist.find((x) => x.id == id);          
          if (consignor) {
            this.setState(prevState => ({
              lorryJsonData : {
                ...prevState.lorryJsonData,                
                ['consignor']: consignor.label
              } 
            }))  
          }
          const dispathObj = branchOption.find((x) => x.id == disip);    
          if (dispathObj) {
            this.setState(prevState => ({
              lorryJsonData : {
                ...prevState.lorryJsonData,
                ['dispatch_from']: dispathObj.party_br_city,
                ['dispatch_city']: dispathObj.party_br_city,                
              } 
            }))   
          }    
        }
      } else {   
        if (partylist && branchOption) {
          const consignee = partylist.find((x) => x.id == id);     
          const shipto = branchOption.find((x) => x.id == disip);                
            this.setState(prevState => ({
              lorryJsonData : {
                ...prevState.lorryJsonData,
                ['ship_to']: shipto ? shipto.party_br_city : '',
                ['consignee']: consignee ? consignee.label : '',
                ['ship_city']: shipto ? shipto.party_br_city : ''
              } 
            }))                       
        }
      }
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
  reset(flag) {
    if (flag == 0) {
      return this.setState(prevState => ({
        lorryJsonData : {
          ...prevState.lorryJsonData,
          ['dispatch_insert_branch']: false,
          ['is_branch_dispatch']: false,
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
          ['ship_insert_branch']: false,  
          ['is_branch_ship']: false,
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
  changebranch = (flag, id) => {  
    if (flag == 0 && id) {
      this.setBranchData(id,flag)
    }
    if (flag == 1 && id) {
      this.setBranchData(id,flag)
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
            ['dispatch_insert_branch'] : false,
            ['dispatch_from_id']: filter_dispath_branch_list.id,
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
            ['ship_insert_branch'] : false,
            ['ship_to_id']: ship_dispath_branch_list.id,
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
  async getAllData() {
    this.setState({ loading: true})
    await this.fetchCity();
    await this.fetchState();
    await this.fetchDrivers();
    await this.fetchVehicles();
    await this.fetchParties();
    await this.fetchSuppliers();
    await this.fetchLorryReceipts();
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
  handleRefreshVehicles = () => {
    this.fetchVehicles();
  }
  handleRefreshSuppliers = () => {
    this.fetchSuppliers();
  }

  changeHandler = (e) => {
    // this.setState({[e.target.name]: e.target.value})
    this.setState(prevState => ({
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
          ['party_freight_total']: prevState.lorryJsonData.party_freight != '' ? (prevState.lorryJsonData.party_freight * prevState.lorryJsonData.party_chargeable_wt) : prevState.lorryJsonData.party_chargeable_wt,
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
          ['supp_freight_total']: prevState.lorryJsonData.supp_freight != '' ? prevState.lorryJsonData.supp_freight * prevState.lorryJsonData.supp_chargeable_wt : prevState.lorryJsonData.supp_chargeable_wt
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
    const id = this.props.match.params.id;
    event.preventDefault();
    Axios.put(`receipt/${id}`, this.state.lorryJsonData)
			.then(res => {
				this.getAllData();
        // this.fetchLorryReceipts();
				toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      }); 
			}).catch(err => {
				console.log(err);
        this.setState({loading: false})
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
    this.setState(prevState => ({
      ...prevState,
      lorryJsonData: {
        ...prevState.lorryJsonData,
        vehicleFields: [
          ...this.state.lorryJsonData.vehicleFields, 
          { vehicle_no: "", supplier: "", driver_name: "", driver_no: "", 
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
      const vehicalefield = this.state.lorryJsonData.vehicleFields;
      if (value == 'Own Vehicle') {
        vehicalefield[index]['is_disabled_no'] = true;                    
        vehicalefield[index]['supplier'] = null;        
        vehicalefield[index]['supplier_name'] = null;        
      } else {
        vehicalefield[index]['is_disabled_no'] = false;     
      }            
      this.setState(prevState => ({
        ...prevState,
        lorryJsonData: {
          ...prevState.lorryJsonData,
          vehicleFields: vehicalefield
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
    if (mode.toLowerCase() === 'fuel') {
      ReactDOM.findDOMNode(fuel).classList.remove("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.add("d-none");
      ReactDOM.findDOMNode(advance_other).classList.add("d-none");
      ReactDOM.findDOMNode(bank).classList.add("d-none");
    } else if (mode.toLowerCase() === 'cash') {
      ReactDOM.findDOMNode(fuel).classList.add("d-none");
      ReactDOM.findDOMNode(advance_other).classList.add("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.remove("d-none");
      ReactDOM.findDOMNode(bank).classList.add("d-none");
    } else if (mode.toLowerCase() === 'bank transfer') {
      ReactDOM.findDOMNode(fuel).classList.add("d-none");
      ReactDOM.findDOMNode(advance_paid_by).classList.add("d-none");
      ReactDOM.findDOMNode(advance_other).classList.add("d-none");
      ReactDOM.findDOMNode(bank).classList.remove("d-none");
    } else if (mode.toLowerCase() === 'other') {
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
    // const options = this.state.partyOptions;
   
    const partyOptions = this.state.partyOptions;
    const driverOptions = this.state.driverOptions;
    const vehicleOptions = this.state.vehicleOptions;
    const supplierOptions = this.state.supplierOptions;
    const vehicletypeOptions = [
      { label: 'Own Vehicle', value: 'Own Vehicle' },
      { label: 'Market Vehicle', value: 'Market Vehicle' },
    ];
    const detentionType = [
      { label: 'Per Day', value: 'per day' },
      { label: 'Per Hour', value: 'per hour' },
    ];
    const cities = this.state.cityListOptions;
    const stateslist = this.state.stateListOptions;    
    const { lr_no, lr_date,  ewaybill_validity, from_city,from_state, to_city, to_state, consignor, consignee, dispatch_from, dispatch_from_id, ship_to_id, ship_city_to_id, dispatch_city_from_id, dispatch_state_from_id, ship_state_to_id, ship_to, dispatch_city, dispatch_state, ship_city, ship_state, ewaybill_number, advance_paid_by, chargeable_unit, advance_payment_date,
      advance_paid, pump_name, party_doc_type, party_doc_no, party_doc_date, party_shortage_unit, party_shortage_limit, party_detention_unit, party_detention_amount, party_comment, party_invoice_value, dispatch_address_line_1, dispatch_address_line_2, dispatch_address_line_3, ship_address_line_1, ship_address_line_2, ship_address_line_3, dispatch_pincode, ship_pincode, vehicleFields, service_charges, shortage_tolerance_limit,  drvr_licns_exp_date,
      party_bill_to, supp_bill_to, party_bill_type, supp_bill_type, advance_other, party_chargeable_unit, supp_chargeable_unit,party_chargeable_wt, supp_chargeable_wt, party_actual_unit, supp_actual_unit, party_actual_wt, party_challan_fee,_pc,supp_actual_wt, supp_freight, supp_freight_unit, supp_freight_total, supp_invoice_type, supp_shortage_unit, supp_shortage_limit, supp_detention_unit, supp_detention_amount, supp_comment,
      party_freight, is_branch_dispatch, is_branch_ship, party_freight_unit, advance_mode, pump_amount, party_freight_total, party_invoice_type, } = this.state.lorryJsonData;               
    return (
      <div className="content">        
        <Link to='/lorry'><Button><ArrowBackIcon/>Go Back</Button></Link> {this.state.loading && <div className="loading">Loading&#8230;</div>} 
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
          <div className="row">
            <div className="col-xs-12 col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title m-0">RECEIPT DETAILS</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.Input 
                          name="lr_no" 
                          label="LR/Bilty No." 
                          type="text" 
                          size="small"
                          disabled={true} 
                          value={lr_no} 
                          onChange={this.changeHandler}/>
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-3 col-sm-12">
                      <div className="form-group">
                        <Controls.DatePicker 
                          label="LR/Bilty Date" 
                          name="lr_date"
                          value={lr_date}
                          onChange={(newValue) => {
                            newValue = newValue.toISOString().split('T')[0];
                            // this.setState({lr_date:newValue});
                            this.setState(prevState => ({
                              ...prevState,
                              lorryJsonData: {
                                ...prevState.lorryJsonData,
                                lr_date: newValue
                              }
                            }));
                          }}
                          size="small"/>
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.Input name="ewaybill_number" label="Ewaybill No." type="number"size="small" placeholder="Enter ewaybill No." value={ewaybill_number} onChange={this.changeHandler}/>
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12">
                      <div className="form-group">
                        <Controls.DatePicker 
                          label="Ewaybill Validity." 
                          name="ewaybill_validity"
                          value={ewaybill_validity}
                          onChange={(newValue) => {
                            newValue = newValue.toISOString().split('T')[0];
                            // this.setState({ewaybill_validity:newValue});
                            this.setState(prevState => ({
                              ...prevState,
                              lorryJsonData: {
                                ...prevState.lorryJsonData,
                                ewaybill_validity: newValue
                              }
                            }));
                          }}
                          size="small"/>
                      </div>
                    </div>
                    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input 
                          name="party_doc_no" 
                          label="Party Document No."
                          type="text" 
                          value={party_doc_no}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.DatePicker 
                          label="Party Document Date"
                          value={party_doc_date}
                          name="party_doc_date"
                          onChange={(newValue) => {
                            newValue = newValue.toISOString().split('T')[0];
                            // this.setState({party_doc_date:newValue});
                            this.setState(prevState => ({
                              ...prevState,
                              lorryJsonData: {
                                ...prevState.lorryJsonData,
                                party_doc_date: newValue
                              }
                            }));
                          }}
                          size="small"
                        />
                      </div>
                    </div>
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="party_doc_type" 
                          label="Party Document Type."
                          type="text" 
                          value={party_doc_type}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    
                    <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.Input name="party_invoice_value" 
                          label="Party Invoice Value."
                          type="text" 
                          value={party_invoice_value}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    {/* <div className="col-xs-3 col-lg-3 col-md-4 col-sm-12 mt-1">
                      <div className="form-group">
                        <Controls.AutoComplete 
                          label="From City"
                          name="from_city"
                          value={from_city}
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
                                    from_city: value
                                  }
                                }));
                              } else if (newValue && newValue.inputValue) {
                                let value = newValue.inputValue;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    from_city: value
                                  }
                                }));
                              } else {
                                let value = newValue.label;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    from_city: value
                                  }
                                }));
                              }
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  from_city: ''
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
                          label="From State"
                          name="from_state"
                          value={from_state}
                          options={stateslist}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({from_state:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  from_state: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  from_state: ''
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
                          label="To City"
                          value={to_city}
                          name="to_city"
                          options={cities} 
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              if (typeof newValue === 'string') {
                                let value = newValue.value;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    to_city: value
                                  }
                                }));
                              } else if (newValue && newValue.inputValue) {
                                let value = newValue.inputValue;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    to_city: value
                                  }
                                }));
                              } else {
                                let value = newValue.label;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    to_city: value
                                  }
                                }));
                              }
                            } else {                                                            
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  to_city: ''
                                }
                              }));
                            }
                          }}
                          isOptionEqualToValue={(option, value)=> option.id === value.id}
                          filterOptions={(cities, params) => {
                            const filtered = filter(cities, params);
                            const { inputValue } = params;
                            const isExisting = cities.some((option) => inputValue === option.label);
                            if (inputValue !== '' && !isExisting) {
                              filtered.push({
                                inputValue,
                                label: `Add "${inputValue}"`,
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
                          label="To State"
                          name="to_state"
                          value={to_state}
                          options={stateslist}
                          onChange={(event, newValue) => {
                            if(newValue != null){
                              let value = newValue.label;
                              // this.setState({to_state:value});
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  to_state: value
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  to_state: ''
                                }
                              }));
                            }
                          }}
                        />                        
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                          // PaperComponent={Link}                 
                          onChange={(event, newValue) => {
                            this.reset(0);
                            if(newValue != null){                              
                              let value = newValue.name;                              
                              this.getBranchData(newValue.id,0,'')                              
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  consignor: value,
                                  consignor_id: newValue.id,
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
                          options={options_disp}
                          // disabled={!is_branch_dispatch}                           
                          PaperComponent={this.state.lorryJsonData.consignor_id ? AddBranch: ''}  
                          onChange={(event, newValue) => {
                            this.reset(0);
                            if(newValue != null){
                              let value = newValue.label;    
                              // this.changebranch(0,newValue.id)                                                    
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  dispatch_from: value,
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
                            this.setState(prevState => ({
                              ...prevState,
                              lorryJsonData: {
                                ...prevState.lorryJsonData,
                                is_branch_dispatch: e.target.checked                                  
                              }
                            }));                         
                            if (e.target.checked && this.state.lorryJsonData.dispatch_from_id) {                              
                              this.changebranch(0,this.state.lorryJsonData.dispatch_from_id)
                            } else {
                              this.reset(0)
                            }                           
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
                                    dispatch_city: value,
                                    dispatch_city_from_id	:newValue.id
                                  }
                                }));
                              } else if (newValue && newValue.inputValue) {
                                let value = newValue.inputValue;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    dispatch_city: value,
                                    dispatch_city_from_id	:newValue.id
                                  }
                                }));
                              } else {
                                let value = newValue.label;                                
                                this.setState(prevState => ({
                                  ...prevState,
                                  lorryJsonData: {
                                    ...prevState.lorryJsonData,
                                    dispatch_city: value,
                                    dispatch_city_from_id	:newValue.id
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
                          onChange={(event, newValue) => {
                            this.reset(1);                            
                            if(newValue != null){
                              let value = newValue.label;  
                              this.getBranchData(newValue.id,1,'')
                              this.setState(prevState => ({
                                ...prevState,
                                lorryJsonData: {
                                  ...prevState.lorryJsonData,
                                  consignee: value,
                                  consignee_id: newValue.id
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
                          // disabled={!is_branch_ship} 
                          value={ship_to}
                          options={options_ship}
                          PaperComponent={this.state.lorryJsonData.consignee_id ? AddBranchc: ''}  
                          onChange={(event, newValue) => {
                            this.reset(1);
                            if(newValue != null){
                              let value = newValue.label;                              
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
                            if (e.target.checked && this.state.lorryJsonData.ship_to_id) {
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
                  { vehicleFields.map((vehicle, index) => (
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
                              if(newValue != null){
                                vehicle.vehicle_type = newValue.label; 
                                this.setVehicalestate('vehicle_type', newValue.label, index);
                                this.getVehicaletype(newValue.value,index)                             
                              } else {
                                vehicle.vehicle_type = ''; 
                                this.setVehicalestate('vehicle_type', '', index);
                                this.getVehicaletype('',index)                             
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
                            key={index}                            
                            value={vehicle.vehicle_name}
                            options={vehicleOptions}
                            PaperComponent={AddVehicle}
                            onChange={(event, newValue) => {
                              if(newValue != null){
                                vehicle.vehicle_name = newValue.label; 
                                vehicle.vehicle_no = newValue.id; 
                                this.setVehicalestate('vehicle_no', newValue.id, index);
                                this.setVehicalestate('vehicle_name', newValue.label, index);
                              } else {
                                vehicle.vehicle_name = ''; 
                                vehicle.vehicle_no = ''; 
                                this.setVehicalestate('vehicle_no', '', index);
                                this.setVehicalestate('vehicle_name', '', index);
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
                            key={index}
                            disabled={vehicle.is_disabled_no}
                            value={vehicle.is_disabled_no ? '' : vehicle.supplier}
                            options={supplierOptions}
                            PaperComponent={AddSupplier}
                            onChange={(event, newValue) => { 
                              if(newValue != null) {
                                vehicle.supplier_name = newValue.label; 
                                vehicle.supplier = newValue.label; 
                                vehicle.supplier_id = newValue.id; 
                                this.setVehicalestate('supplier_name', newValue.label, index)
                                this.setVehicalestate('supplier', newValue.label, index)
                                this.setVehicalestate('supplier_id', newValue.id, index)
                              } else {
                                vehicle.supplier_name = ''; 
                                vehicle.supplier = ''; 
                                vehicle.supplier_id = ''; 
                                this.setVehicalestate('supplier_name', '', index)
                                this.setVehicalestate('supplier', '', index)
                                this.setVehicalestate('supplier_id', '', index)
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
                            key={index}                            
                            value={vehicle.driver_name}
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
                      </div>      
                      {/* <div className="col-12 mt-0">
                        <Controls.Button color="error" onClick={() => { this.RemoveItem(index)}} text="Remove"/>
                      </div> */}
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
                              // this.setState({supp_bill_to:value});
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
                              // this.setState({supp_invoice_type:value});
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
                              options={advancedMode}
                              value={advance.advance_mode}
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
                        {/* <div className="col-xs-12 col-lg-12 col-md-12 col-sm-12 mt-0">
                          <Controls.Button color="error" onClick={() => { this.RemoveAdvance(index)}} text="Remove"/>
                        </div> */}
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
                      {this.state.lorryJsonData.supp_invoice_type =='To pay' && <ComponentToPrint  ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                        
                      {this.state.lorryJsonData.supp_invoice_type !='To pay' && <ComponentToPrintbilled  ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                        
                      </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </form>
         {/* {this.state.lorryJsonData.party_invoice_type =='To pay' && <ComponentToPrint ref={el => (this.componentRef = el)} data={this.state.lorryJsonData}/>}                        
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
    </div>
    )
  }
}

export default LoryEditForm;