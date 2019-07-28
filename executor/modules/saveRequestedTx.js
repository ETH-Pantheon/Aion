const {Requests} = require('../models/Requests');

async function saveRequestedTxs(event,web3){
    data = event.returnValues;
    if(event.removed){
        await Requests.remove({AionID: web3.utils.toHex(data.AionID)});        
    } else {
        const request = new Requests({
            'receivedAt': web3.utils.toHex(event.blockNumber),
            'blocknumber': web3.utils.toHex(data.blocknumber),
            'from': data.from,
            'to': data.to,
            'value': web3.utils.toHex(data.value),
            'gaslimit': web3.utils.toHex(data.gaslimit),
            'gasprice': web3.utils.toHex(data.gasprice),
            'fee': web3.utils.toHex(data.fee),
            'data': web3.utils.toHex(data.data),
            'AionID': web3.utils.toHex(data.AionID),
            'schedType': data.schedType,
            'status': 'Pending',
            'txHash': ''
        });
        await request.save()
        .catch((error) => {console.log('error saving request')});
    }
}

exports.saveRequestedTxs = saveRequestedTxs;