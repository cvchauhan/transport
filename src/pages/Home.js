import React,{ Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Axios from '../axiosConfig';
import EWBexpire from './EWBexpire/ewbexpire';
import DashboardCount from './dashboardcount/dashboardcount';

class Home extends Component {
  constructor(props) {
    super(props);
    this.dialogBox = React.createRef();
    this.state = {
      partyCount: 0,
      driverCount: 0,
      vehicalCount: 0,
      suppliersCount: 0,
      EWBexpire: [],
    }
  }
  async fetchPartyDetailAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const totalCount = await Axios.get(`dashboard`);  
      let partyList = [];    
      if (totalCount.data.result) {               
        // single party details storing in partyCount
        this.setState({ partyCount: totalCount.data.result.partycount.length});
        this.setState({ driverCount: totalCount.data.result.drivercount});
        this.setState({ vehicalCount: totalCount.data.result.vehiclecount});
        this.setState({ suppliersCount: totalCount.data.result.suppliercount});      
        partyList = totalCount.data.result.partycount
      }
      let expiredata = await Axios.get(`dashboard/expired`);            
      if (expiredata.data.result.length > 0) {                       
        expiredata = expiredata.data.result;
        if (partyList.length > 0) {
          expiredata.map((value)=>{
              const from_gst = partyList.find((x)=> x.id == value.consignor_id)
              value['from_gst'] = from_gst ? from_gst.party_gst : ''; 
              const to_gst = partyList.find((x)=> x.id == value.consignee_id)
              value['to_gst'] = to_gst ? to_gst.party_gst : '';
          })
        }        
        this.setState({ EWBexpire: expiredata});              
      }
    } catch (e) {      
      this.setState({ ...this.state, isFetching: false });
    }
  }
  componentDidMount = () => {        
    this.fetchPartyDetailAsync();
  }
  handleRefreshTable = (e) => {
    this.fetchPartyDetailAsync();
  }
  render() {   
    const partyCount = this.state.partyCount ? this.state.partyCount : 0;
    const suppliersCount = this.state.suppliersCount ? this.state.suppliersCount : 0;
    const vehicalCount = this.state.vehicalCount ? this.state.vehicalCount : 0;
    const driverCount = this.state.driverCount ? this.state.driverCount : 0;
    return (
          <div className="content">
            <DashboardCount partyCount={partyCount} suppliersCount={suppliersCount} vehicalCount={vehicalCount} driverCount={driverCount}/>           
            {/* <EWBexpire EWBexpire={this.state.EWBexpire}/>            */}
          </div>
    );
  }
}
export default Home;
