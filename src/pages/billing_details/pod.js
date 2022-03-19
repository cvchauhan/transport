// import React from 'react';
import Controls from '../../components/form-controls/Controls';
// class POD extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		// this.sendDriverDetails = this.sendDriverDetails.bind(this);
// 		this.state = {
// 			lr_no: '',
// 			unloading_date: '',
// 			received_wt: '',
// 			no_of_pc_received: '',
// 			shortage_weight: '',
// 			detained_for: '',
// 			delivery_date: '',
// 			pod_received_date: '',
// 			unit: '',
// 		}
// 	}

// 	changeHandler = (e) => {
// 		this.setState({ [e.target.name]: e.target.value })
// 	}
// 	// sendDriverDetails(e) {
// 	// 	e.preventDefault();
// 	// 	console.log(this.state)
// 	// 	Axios.post(`driver/add/`, this.state)
// 	// 		.then(res => {
// 	// 			console.log(res);
// 	// 			console.log(res.data);
// 	// 		}).catch(err => {
// 	// 			console.log(err);
// 	// 		});
// 	// }


// 	render() {
// 		const { lr_no, unloading_date, received_wt, no_of_pc_received, detained_for, shortage_weight, unit, pod_received_date, delivery_date, } = this.state;
// 		return (
// 			<div className="content">
// 				<div className="row">
//           <div className="col-12 mt-3"> 
//             <div className="card">
//               <div className="card-header">
//                 <h6 className="card-title m-0">Add POD Details</h6>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
//                     <Controls.Input 
// 											labelTitle="LR No."
// 											inputType="text"
// 											inputClass="form-control"
// 											inputName="lr_no"
// 											placeholder="Enter LR number."
// 											value={lr_no}
// 											changeHandler={this.changeHandler}
// 										/>   
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
//                     <Controls.Input 
// 											labelTitle="Delivery Date"
// 											inputType="Date"
// 											inputClass="form-control"
// 											inputName="lr_no"
// 											placeholder="Enter delivery date."
// 											value={delivery_date}
// 											changeHandler={this.changeHandler}
// 										/>   
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12">
//                     <Controls.Input 
// 											labelTitle="Unloading Date"
// 											inputType="Date"
// 											inputClass="form-control"
// 											inputName="unloading_date"
// 											placeholder="Enter unloading date"
// 											value={unloading_date}
// 											changeHandler={this.changeHandler}
// 										/> 
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 mt-2">
//                     <Controls.Input 
// 											labelTitle="Received WT"
// 											inputType="text"
// 											inputClass="form-control"
// 											inputName="received_wt"
// 											placeholder="Enter received WT"
// 											value={received_wt}
// 											changeHandler={this.changeHandler}
// 										/> 
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 mt-2">
//                     <Controls.Input 
// 											labelTitle="No. of Pieces Received."
// 											inputType="number"
// 											inputClass="form-control"
// 											inputName="no_of_pc_received"
// 											placeholder=""
// 											value={no_of_pc_received}
// 											changeHandler={this.changeHandler}
// 										/>
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 mt-2">
//                     <Controls.Input 
// 											labelTitle="Shortage Weight"
// 											inputType="number"
// 											inputClass="form-control"
// 											inputName="shortage_weight"
// 											placeholder=""
// 											value={shortage_weight}
// 											changeHandler={this.changeHandler}
// 										/>
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 mt-2">
//                     <Controls.Input 
// 											labelTitle="Detained For"
// 											inputType="text"
// 											inputClass="form-control"
// 											inputName="detained_for"
// 											placeholder=""
// 											value={detained_for}
// 											changeHandler={this.changeHandler}
// 										/>
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 mt-2">
//                     <Controls.Input 
// 											labelTitle="POD Received Date"
// 											inputType="date"
// 											inputClass="form-control"
// 											inputName="pod_received_date"
// 											placeholder=""
// 											value={pod_received_date}
// 											changeHandler={this.changeHandler}
// 										/>
//                   </div>
//                   <div className="col-xs-6 col-lg-6 col-md-6 col-sm-12 mt-2">
//                     <Controls.Input 
// 											labelTitle="Unit"
// 											inputType="number"
// 											inputClass="form-control"
// 											inputName="unit"
// 											placeholder=""
// 											value={unit}
// 											changeHandler={this.changeHandler}
// 										/>
//                   </div>
//                 </div>
//                 <div className="row mt-4 ml-1">
//                   <div type="button" className="btn btn-primary ml-1">Save as Draft</div>
//                   <div type="submit" className="btn btn-success ml-1" onClick={this.sendDriverDetails}>Save and Submit</div>
//                   <div type="button" className="btn btn-danger ml-1">Discard</div>
//                 </div>
//               </div>
//             </div> 
//           </div>
//         </div>
// 			</div>
// 		)
// 	}
// }

// export default POD;