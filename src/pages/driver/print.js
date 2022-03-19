import React, { useState, Component } from 'react';
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='print-source'>
        <table>
          <thead>
            <tr>
              <th>{this.props.data.drvr_name}</th>
              <th>{this.props.data.drvr_licns_exp_date}</th>
              <th>{this.props.data.drvr_licns_no}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// class Example extends Component {
//   render() {
//     return (
//       <div>
//         <ReactToPrint
//           trigger={() => <a href="#">Print this out!</a>}
//           content={() => this.componentRef}
//         />
//         <ComponentToPrint ref={el => (this.componentRef = el)} />
//       </div>
//     );
//   }
// }

export default ComponentToPrint;
