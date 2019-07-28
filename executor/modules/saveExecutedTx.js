const {Requests} = require('../models/Requests');

async function saveExecutedTxs(event,web3){
    data = event.returnValues;
    var req = await Requests.find({AionID: web3.utils.toHex(data.AionID)});
    req[0].status = 'Executed';
    var result = await req[0].save()
    if(result!=req[0]){
        console.log('Error saving executed Tx')
    }else{
        console.log(`Requested Tx with ID ${data.AionID} Executed`);               
    }
}

exports.saveExecutedTxs = saveExecutedTxs;