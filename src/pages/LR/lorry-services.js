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
        vehicleDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return vehicleDetails;
}

const allSupplierDetails = async () => {
    let supplierDetails = [];
    await Axios.get('supplier/').then(res=> {        
        supplierDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return supplierDetails;
}

const allPartiesDetails = async () => {
    let partiesDetails = [];
    await Axios.get('party/').then(res=> {        
        partiesDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return partiesDetails;
}

const allLorryReceipts = async () => {
    let lorryDetails = [];
    await Axios.get('receipt/').then(res=> {       
        lorryDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return lorryDetails;
}
const allLorryReceiptsById = async (id) => {
    let lorryEditDetails = [];
    await Axios.get(`receipt/${id}`).then(res=> {       
        lorryEditDetails = res.data;
    }).catch(error => {
        console.log(error)
    });
    return lorryEditDetails;
}

const allCityList = async () => {
    let cityList = [];
    await Axios.get('city').then(res=> {       
        cityList = res.data;
    }).catch(error => {
        console.log(error)
    });
    return cityList;
}
const allStateList = async () => {
    let stateList = [];
    await Axios.get('state').then(res=> {       
        stateList = res.data;
    }).catch(error => {
        console.log(error)
    });
    return stateList;
}

export default { allStateList, allDriverDetails, allVehicleDetails, allSupplierDetails, allPartiesDetails, allLorryReceipts, allCityList, allLorryReceiptsById };