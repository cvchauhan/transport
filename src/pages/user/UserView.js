import React from 'react';
import Axios from '../../axiosConfig';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.dialogBox = React.createRef();
        this.state = {
            dataValues: {},
            isFetching: false,
            showPassword: false
        }
    }

    // fetching user details by id
    async fetchUserDetailAsync() {
        try {
            this.setState({...this.state, isFetching: true});
            const response = await Axios.get(`admin/get/${this.props.id}`);
            // single user details storing in dataValues            
            this.setState({dataValues: response.data.result, isFetching: false});            
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    }
    componentDidMount = () => {        
        this.fetchUserDetailAsync();
    } 
    handleClickShowPassword = () => {
      this.setState({showPassword:!this.state.showPassword})
    };
    handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
    render() {
        const data = this.state.dataValues;
        
        return (
          <div ref={this.dialogBox} className="content" style={{width:600}}>
            <table ref={this.dialogBox} className="table table-bordered">
              <tbody>
                <tr>
                  <th><label>Username.:</label></th>
                  <th><label>Email:</label></th>
                  <th><label>Password:</label></th>
                </tr>
                <tr>
                  <td><p>{data.username}</p></td>
                  <td><p>{data.email}</p></td>
                  <td><p>{ this.state.showPassword ? data.tmp_pass : '********'}
                  { this.state.showPassword ? <VisibilityIcon onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}></VisibilityIcon> : <VisibilityOffIcon
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}>              
                    </VisibilityOffIcon>}
                  </p></td>
                </tr>
                <tr>
                  <th><label>State:</label></th>
                  <th><label>City:</label></th>
                  <th><label>Pincode:</label></th>
                </tr>
                <tr>
                  <td><p>{data.state}</p></td>
                  <td><p>{data.city}</p></td>
                  <td><p>{data.pin_code}</p></td>
                </tr>               
                <tr>
                  <th><label>PAN No.:</label></th>
                  <th><label>Role:</label></th>
                  <th><label>Phone No.:</label></th>
                </tr>
                <tr>
                  <td><p>{data.user_pan}</p></td>
                  <td><p>{data.user_role == 1 ? 'Admin': 'user'}</p></td>
                  <td><p>{data.user_contact_no}</p></td>
                </tr>
                <tr>
                  <th><label>Address Line-1:</label></th>
                  <th><label>Address Line-2:</label></th>
                  <th><label>Address Line-3:</label></th>
                </tr>
                <tr>
                  <td><p>{data.add_line1}</p></td>
                  <td><p>{data.add_line2}</p></td>
                  <td><p>{data.add_line3}</p></td>
                </tr>
                </tbody>
            </table>
          </div>
        )
    }
}

export default UserView; 