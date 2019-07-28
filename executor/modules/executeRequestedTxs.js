const {Requests} = require('../models/Requests');


async function executeRequestedTxs(blockNumber,txType,web3,account,aionContract){    
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
                //console.log('Error sending transaction');
            });

            nonce = nonce + 1;

        }
    }

};

exports.executeRequestedTxs = executeRequestedTxs;
