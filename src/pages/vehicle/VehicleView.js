import React from 'react';
import Axios from '../../axiosConfig';

class VehicleView extends React.Component {
    constructor(props) {
        super(props);
        this.dialogBox = React.createRef();
        this.state = {
            dataValues: {},
            isFetching: false,
        }
    }

    // fetching vehicle details by id
    async fetchVehicleDetailAsync() {
        try {
            this.setState({...this.state, isFetching: true});
            const response = await Axios.get(`vehicle/${this.props.id}`);
            // single vehicle details storing in dataValues            
            this.setState({dataValues: response.data, isFetching: false});            
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    }
    componentDidMount = () => {        
        this.fetchVehicleDetailAsync();
    } 

    render() {
        const data = this.state.dataValues;
        // if(data.veh_type === '1') {
        //   data.veh_type = 'Truck';
        // } else if(data.veh === '2') {
        //   data.veh_type = 'Trailer';
        // } else if(data.veh === '3') {
        //   data.veh_type = 'Other';
        // } else {
        //   data.veh_type = '';
        // }

        
        return (
          <div ref={this.dialogBox} className="content">
            <table  className="table table-bordered">
              <tbody>
                <tr>
                  <th><label>Vehicle No.:</label></th>
                  <th><label>Vehicle Type:</label></th>
                  <th><label>Registration Validity:</label></th>
                </tr>
                <tr>
                  <td><p>{data.veh_no}</p></td>
                  <td><p>{data.veh_type}</p></td>
                  <td><p>{data.veh_reg_valid_date}</p></td>
                </tr>
                <tr>
                  <th><label>Laden Weight:</label></th>
                  <th><label>Unladen Weight:</label></th>
                  <th><label>Capacity:</label></th>
                </tr>
                <tr>
                  <td><p>{data.veh_laden_wght}</p></td>
                  <td><p>{data.veh_unladen_wght}</p></td>
                  <td><p>{data.veh_capacity}</p></td>
                </tr>
                <tr>
                  <th><label>Owner Name:</label></th>
                  <th><label>Owner Contact:</label></th>
                  <th><label>PAN No.:</label></th>
                </tr>
                <tr>
                  <td><p>{data.veh_owner_name}</p></td>
                  <td><p>{data.veh_owner_contact}</p></td>
                  <td><p>{data.veh_owner_pan}</p></td>
                </tr>
                </tbody>
            </table>
          </div>
        )
    }
}

export default VehicleView; 