import Axios from '../../axiosConfig';

const allDriverDetails = async () => {
    let driverDetails = [];
    await Axios.get('driver/').then(res=> {
        driverDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return driverDetails;
}

const allVehicleDetails = async () => {
    let vehicleDetails = [];
    await Axios.get('vehicle/').then(res=> {
        console.log(res.data)
        vehicleDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return vehicleDetails;
}

const allSupplierDetails = async () => {
    let supplierDetails = [];
    await Axios.get('supplier/').then(res=> {
        console.log(res.data)
        supplierDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return supplierDetails;
}

const allPartiesDetails = async () => {
    let partiesDetails = [];
    await Axios.get('party/').then(res=> {
        console.log(res.data)
        partiesDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return partiesDetails;
}

export default { allDriverDetails, allVehicleDetails, allSupplierDetails, allPartiesDetails };