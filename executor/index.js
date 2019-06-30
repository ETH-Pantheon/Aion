const Web3 = require('web3');
const fs = require('fs');

//var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/fa5101e35d174cebab241564f5b7c6ce'));
var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/fa5101e35d174cebab241564f5b7c6ce'));


// Some variables
const ABI = JSON.parse(fs.readFileSync('Aion_ABI.json'));
const eventOptions = { 
    'address': '0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E',
    'topics':[null, null, null, null]
};

var topics = {
    'ExecutedCall': web3.utils.keccak256('ExecutedCallEvent(address,uint256,bool,bool,bool)'),
    'ScheduleCall': web3.utils.keccak256('ScheduleCallEvent(uint256,address,address,uint256,uint256,uint256,uint256,bytes,uint256,bool)'),
    'CancellScheduledTx': web3.utils.keccak256('CancellScheduledTxEvent(address,uint256,bool,uint256)'),
    'feeChanged': web3.utils.keccak256('feeChanged(uint256, uint256)')
};
    
console.log(topics);


const blockSubsc = web3.eth.subscribe('newBlockHeaders',(error, result) => {
    if (error) { console.error(error); }})
    .on('data', function(blockHeader){ console.log(`New block received, Number: ${blockHeader.number}`);
    });



const eventsSubsc = web3.eth.subscribe('logs',eventOptions, (error,result) => {
        if (error) { console.error(error); }
    })
    .on('data', (log) => { processEvents(log) })
    .on('error', (error) => { console.log(log)});
    

    function processEvents(logs){
        switch(logs.topics[0]){
            case topics.ScheduleCall:
                console.log('New Tx scheduled')
                break;

            case topics.CancellScheduledTx:
                console.log('Tx cancelled')
                break;

            case topics.ExecutedCall:
                console.log('Tx executed')
                break;

            default:
                console.log('Unknown event');
                break;
        }
    }

