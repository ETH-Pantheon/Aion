require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const mongoose = require('mongoose');



mongoose.connect(process.env.aionExecutor_dbHost, {useNewUrlParser: true })
    .then( ()=> console.log('Connected to aion executor database'))
    .catch( err => console.error('Could not connect to database', error));


const Requests = new mongoose.model('Requests', new mongoose.Schema({
    blocknumber: String,
    from: String,
    to: String,
    value: String,
    gaslimit: String,
    gasprice: String,
    fee: String,
    data: String,
    AionID: String,
    schedType: Boolean,
    status: String,
    txHash: String
}))


//var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/fa5101e35d174cebab241564f5b7c6ce'));
var web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.aionExecutor_websocketProvider),null,{
    defaultBlock: 'latest',
    defaultGas: 20000,
    defaultGasPrice: 1,
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 12,
    transactionPollingTimeout: 480,
});




// Some variables
const ABI = JSON.parse(fs.readFileSync('Aion_ABI.json'));
const aionContract = new web3.eth.Contract(ABI, process.env.aionExecutor_aionContractAddress)
const account = web3.eth.accounts.privateKeyToAccount(process.env.aionExecutor_privateKey);

const scheduleEvent = aionContract.events.ScheduleCallEvent()
    .on('data', (event) => {
        saveRequestedTxs(event)
        console.log('Registering new request to the database...');       
    })
    .on('error', console.error);


const blockSubsc = web3.eth.subscribe('newBlockHeaders')
    .on('data', (blockHeader) => { 
        console.log(`New block received, Number: ${blockHeader.number}`);
        executeRequestedTxs(blockHeader.number,false);
        executeRequestedTxs(blockHeader.timestamp,true);
    })
    .on('error',console.error);



/*
const executedEvent = aionContract.events.ExecutedCallEvent()
    .on('data', (event) => {
        //registerExecutedRequest(event.returnValues)
        console.log('Registering executed request to the database...')
    })
    .on('error', console.error);

*/


async function saveRequestedTxs(event){
    data = event.returnValues;
    if(event.removed){
        const r = await Requests.remove({AionID: web3.utils.toHex(data.AionID)});        
    } else {
        const request = new Requests({
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

async function executeRequestedTxs(blockNumber,txType){    
    nonce = await web3.eth.getTransactionCount(account.address,'pending');
    blocknumber = web3.utils.toBN(blockNumber.toString());
    const r = await Requests.find({status:"Pending", 
                                   schedType: txType
                                });

    for(var i = 0; i<r.length;i++){
        if (web3.utils.toBN(r[i].blocknumber).lte(blocknumber)) {            
            var block = r[i].blocknumber;
            var from = r[i].from;
            var to = r[i].to; 
            var value = r[i].value;
            var gaslimit = r[i].gaslimit;
            var gasprice = r[i].gasprice;
            var fee = r[i].fee;
            var data = r[i].data;
            var AionID = r[i].AionID;
            var schedType = r[i].schedType;

            await aionContract.methods.executeCall(block,from,to,value,gaslimit,gasprice,fee,data,AionID,schedType).estimateGas({
                from: account.address,
                gas: web3.utils.hexToNumber(gaslimit)
            })
            .catch(async function(error){
                r[i].status = 'Gas Error';
                await r[i].save(function(err){
                    console.log('Error saving Gas error');
                });
            });

            if (r[i].status == 'Gas Error'){ continue;}

            var byteCode = aionContract.methods.executeCall(block,from,to,value,gaslimit,gasprice,fee,data,AionID,schedType).encodeABI()
            console.log('Generating new transaction')
            nonce = Math.max(await web3.eth.getTransactionCount(account.address,'pending'),nonce);
            var tx = {
                to: aionContract.address,
                gas: gaslimit,
                gasPrice: gasprice,
                data: byteCode,
                nonce: nonce,
                chainId: 3
            }
            var signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
            r[i].status = 'Submitted';
            r[i].txHash = signedTx.transactionHash;
            var result = await r[i].save();
            if(result!=r[i]){
                console.log('TxHash not saved properly')
            }


            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            .on('error',(error) => {
                console.log('Error sending transaction')
                console.log(error)
                console.log(nonce)
            })
            .on('receipt',async function(receipt){
                if(receipt.status){
                    var req = await Requests.find({txHash: receipt.transactionHash});
                    if (req.length!=0){
                        req[0].status = 'Executed';
                        var result = await req[0].save();
                        console.log('transaction Executed');
                    } else {
                        console.log('received tx-receipt hash not found in the aiondb')
                    }
                }
            });

            nonce = nonce + 1;

        }
    };
}