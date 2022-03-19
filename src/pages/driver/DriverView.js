import React from 'react';
import Axios from '../../axiosConfig';

class DriverView extends React.Component {
    constructor(props) {
        super(props);
        this.dialogBox = React.createRef();
        this.state = {
            dataValues: {},
            isFetching: false,
        }
    }

    // fetching driver details by id
    async fetchDriverDetailAsync() {
        try {
            this.setState({...this.state, isFetching: true});
            const response = await Axios.get(`driver/${this.props.id}`);
            // single driver details storing in dataValues
            this.setState({dataValues: response.data, isFetching: false});            
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    }
    componentDidMount = () => {        
        this.fetchDriverDetailAsync();
    } 

    render() {
        const { } = this.state;
        
        return (
            <div ref={this.dialogBox} className="content">
             <h1>Ram</h1>
            </div>
        )
    }
}

export default DriverView; 