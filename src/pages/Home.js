import React,{ Component } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Axios from '../axiosConfig';

class Home extends Component {
  constructor(props) {
    super(props);
    this.dialogBox = React.createRef();
    this.state = {
      partyCount: 0,
      driverCount: 0,
      vehicalCount: 0,
      suppliersCount: 0,
    }
  }
  async fetchPartyDetailAsync() {
    try {
      this.setState({ ...this.state, isFetching: true });
      const partyCount = await Axios.get(`party`);
      const driverCount = await Axios.get(`driver`);
      const vehicalCount = await Axios.get(`vehicle`);      
      const suppliersCount = await Axios.get(`supplier`);      
      // single party details storing in partyCount
      this.setState({ partyCount: partyCount.data.result.length});
      this.setState({ driverCount: driverCount.data.result.length});
      this.setState({ vehicalCount: vehicalCount.data.length});
      this.setState({ suppliersCount: suppliersCount.data.result.length});      
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
            <div className='row'>
            <div className='col-3'>
            <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Number of Party: {partyCount}
              </Typography>              
            </CardContent>
          </Card>
            </div>
            <div className='col-3'>
            <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Number of Suppliers: {suppliersCount}
              </Typography>              
            </CardContent>
          </Card>
            </div>
            </div>
            &nbsp;
            <div className='row'>
            <div className='col-3'>
            <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Number of Vehicles: {vehicalCount}
              </Typography>              
            </CardContent>
          </Card>
            </div>
            <div className='col-3'>
            <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Number of Drivers: {driverCount}
              </Typography>             
            </CardContent>
          </Card>
            </div>
            </div>            
          </div>
    );
  }
}
export default Home;
