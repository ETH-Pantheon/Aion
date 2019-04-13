	//window.addEventListener('load', function() {
	//INITIALIZE THE dAPP
	// Check if Web3 has been injected by the browser:
	
	
    if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
		//web3.eth.defaultAccount = web3.eth.accounts[0];
	} else {
		alert('Aion requires metamask to function. Please install Metamask extension and try again.');
		// set the provider you want from Web3.providers
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}


    
    // Get block number and make a counter
    var blocknumber;
    web3.eth.getBlockNumber(function(err,res){blocknumber=res});
	var account = web3.eth.accounts[0];		
	var ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "blocknumber",
				"type": "uint256"
			},
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "gaslimit",
				"type": "uint256"
			},
			{
				"name": "gasprice",
				"type": "uint256"
			},
			{
				"name": "fee",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "bytes"
			},
			{
				"name": "aionId",
				"type": "uint256"
			},
			{
				"name": "schedType",
				"type": "bool"
			}
		],
		"name": "cancellScheduledTx",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "blocknumber",
				"type": "uint256"
			},
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "gaslimit",
				"type": "uint256"
			},
			{
				"name": "gasprice",
				"type": "uint256"
			},
			{
				"name": "fee",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "bytes"
			},
			{
				"name": "aionId",
				"type": "uint256"
			},
			{
				"name": "schedType",
				"type": "bool"
			}
		],
		"name": "executeCall",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Total",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "Status",
				"type": "bool"
			},
			{
				"indexed": true,
				"name": "AionID",
				"type": "uint256"
			}
		],
		"name": "CancellScheduledTxEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "blocknumber",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "gaslimit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "gasprice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "data",
				"type": "bytes"
			},
			{
				"indexed": true,
				"name": "AionID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "schedType",
				"type": "bool"
			}
		],
		"name": "ScheduleCallEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "AionID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "TxStatus",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "TxStatus_cancel",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "reimbStatus",
				"type": "bool"
			}
		],
		"name": "ExecutedCallEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "newfee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "oldfee",
				"type": "uint256"
			}
		],
		"name": "feeChanged",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "blocknumber",
				"type": "uint256"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "gaslimit",
				"type": "uint256"
			},
			{
				"name": "gasprice",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "bytes"
			},
			{
				"name": "schedType",
				"type": "bool"
			}
		],
		"name": "ScheduleCall",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "updatefee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "AionID",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "clientAccount",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "feeInterval",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "scheduledCalls",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "serviceFee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
	var ERC20_ABI = [
		{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "spender",
					"type": "address"
				},
				{
					"name": "tokens",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"name": "success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "from",
					"type": "address"
				},
				{
					"name": "to",
					"type": "address"
				},
				{
					"name": "tokens",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"name": "success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"name": "",
					"type": "uint8"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "tokenOwner",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"name": "balance",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "to",
					"type": "address"
				},
				{
					"name": "tokens",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"name": "success",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "tokenOwner",
					"type": "address"
				},
				{
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"name": "remaining",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "tokens",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "tokenOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "tokens",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		}
		];
	var networks = ['main-net', 'Morden: Not Supported', 'Ropsten', 'Rinkeby: Not Supported', 'Kovan: Not Supported'];
	var currentNetwork = web3.version.network; 
	if(currentNetwork==1){
	    var minBlock = 6300000;
	    var aion = web3.eth.contract(ABI);
		var aionInstance = aion.at('0xCBe7AB529A147149b1CF982C3a169f728bC0C3CA');
	} else if(currentNetwork == 3){
	    var minBlock = 4000000;
	    var aion = web3.eth.contract(ABI);
		var aionInstance = aion.at('0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E');
	} else{
	    alert('Aion is supported on Mainnet and Ropsten only.');
	}
	
	updateAccountDetails();
	startupAion();
	getBlockUpdates();

	
	

	// check for changes in the account or network
	var accountInterval = setInterval(function() {
	if (web3.version.network !== currentNetwork | web3.eth.accounts[0]!=account) {
		account = web3.eth.accounts[0];
		web3.eth.defaultAccount = account;
		currentNetwork = web3.version.network;
		if(currentNetwork==1){
			aion = web3.eth.contract(ABI);
			aionInstance = aion.at('0xCBe7AB529A147149b1CF982C3a169f728bC0C3CA');
		} else if(currentNetwork==3){
			aion = web3.eth.contract(ABI);
			aionInstance = aion.at('0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E');
		} else {
			alert('Currently Aion is supported on Mainnet and Ropsten only.');
		}
		updateAccountDetails();
		startupAion();
		getBlockUpdates();

		}
	}, 10);
		
	function setBlockTime(){
		var r = $('[id=timemode]');
		if(r[0].checked){
			$('[id=eth_TimeBlockField]')[0].innerHTML = '<div class="ui calendar">' +
			'<div class="ui labeled input"><div style=width:30% class="ui label"> Time </div>'+
			'<input type="text" name="eth_block" placeholder="Date-Time"></div></div>';
			$(function() {$('[id=eth_TimeBlockField]').calendar()});	
		
			$('[id=erc20_TimeBlockField]')[0].innerHTML = '<div class="ui calendar">' +
			'<div class="ui labeled input"><div style=width:30% class="ui label"> Time </div>'+
			'<input type="text" name="erc20_block" placeholder="Date-Time"></div></div>';
			$(function() {$('[id=erc20_TimeBlockField]').calendar()});	

			$('[id=adv_TimeBlockField]')[0].innerHTML = '<div class="ui calendar">' +
			'<div class="ui labeled input"><div style=width:30%  class="ui label"> Time </div>'+
			'<input type="text" name="adv_block" placeholder="Date-Time"></div></div>';
			$(function() {$('[id=adv_TimeBlockField]').calendar()});

		} else{
			$('[id=eth_TimeBlockField]')[0].innerHTML = '<div class="ui labeled input"><div style=width:30%  class="ui label"> Blocks </div>'+
			'<input type="number" name="eth_block" placeholder="Blocks from current" min=10 step=1>';

			$('[id=erc20_TimeBlockField]')[0].innerHTML = '<div class="ui labeled input"><div style=width:30%  class="ui label"> Blocks </div>'+
			'<input type="number" name="erc20_block" placeholder="Blocks from current" min=10 step=1>';
	
			$('[id=adv_TimeBlockField]')[0].innerHTML = '<div class="ui labeled input"><div style=width:30%  class="ui label"> Blocks </div>'+
			'<input type="number" name="adv_block" placeholder="Blocks from current" min=10 step=1>';
		}
		updateAccountDetails();
	}
	
	function getBlockUpdates(){
		web3.eth.filter('latest', function(error, blockhash){
			if (!error){
				
				/* get gas price*/
				web3.eth.getGasPrice(function(err, gasprice){
				    if(!err){
        				gasprice = gasprice.div(Math.pow(10,9));
        				if(gasprice<1){gasprice = 1}
        				if(gasprice<1){gasprice = 1}
        				if($("[name=eth_gasprice]").val() < gasprice ){ $("[name=eth_gasprice]").val(gasprice);}
        				if($("[name=erc20_gasprice]").val() < gasprice ){ $("[name=erc20_gasprice]").val(gasprice);}
        				if($("[name=adv_gasprice]").val() < gasprice ){ $("[name=adv_gasprice]").val(gasprice);}
				    }
				});
				
				
				/* ger service fee*/
				aionInstance.serviceFee(function(err,res){
				    if(!err){
				        if(res>0){
            				$("[name=eth_fee]").text('Execution Fee ' + res.div(Math.pow(10,18)) + ' ETH');
            				$("[name=erc20_fee]").text('Execution Fee ' + res.div(Math.pow(10,18)) + ' ETH');
            				$("[name=adv_fee]").text('Execution Fee ' + res.div(Math.pow(10,18)) + ' ETH');
				        }
				    }
				});
				
				
				
				/*get current block*/
				web3.eth.getBlock('latest',function(err,block){
				    if(!err){
    				    /*check for new logs*/
				        getScheduleCallEvents(block.number);
    				    getExecutedCallEvents(block.number);
    				    getCancellScheduledTxEvents(block.number);
				        blocknumber = block.number; 
				        
				        // update block number
				        var r = document.getElementById("accountdetails").rows;
				        if($('[id=timemode]')[0].checked){
            				r[0].cells[3].innerHTML = 'TimeStamp';
            				r[1].cells[3].innerHTML = block.timestamp;
            			} else {
            				r[0].cells[3].innerHTML = 'Block Number';
            				r[1].cells[3].innerHTML = block.number;
            			}
				    }
				});
				
				
				
				
				
			}
		});
	}





	function updateAccountDetails(){
		var r = document.getElementById("accountdetails").rows;
		
		aionInstance.clientAccount.call(account,function(err,res){
			if(!err){
    			if(res === '0x0000000000000000000000000000000000000000'){
    				r[1].cells[0].innerHTML = 'Account unexistent';
    				r[1].cells[1].innerHTML = '-';
    				r[1].cells[2].innerHTML = web3.version.network;
    				$('[id=erc20transfer]')[0].disabled = true;
    			} else {
    				if(res.length==42){
        				$('[id=erc20transfer]')[0].disabled = false;
        				web3.eth.getBalance(web3.toChecksumAddress(res),function(err,value){
            				if(!err){	
            					r[1].cells[0].innerHTML = res;
            					r[1].cells[1].innerHTML = value.div(Math.pow(10,18));
            					r[1].cells[2].innerHTML = web3.version.network;
            				}
    				    });
    				}
    			}
			}
			
		});
		
		web3.eth.getBlock('latest',function(err,block){		
			if(!err){
    			if($('[id=timemode]')[0].checked){
    				r[0].cells[3].innerHTML = 'TimeStamp';
    				r[1].cells[3].innerHTML = block['timestamp'];
    			} else {
    				r[0].cells[3].innerHTML = 'Block Number';
    				r[1].cells[3].innerHTML = block['number'];
    			}
			}
				
				
		});

				
			
	}


	
	function filterTable(b){
		var r = $('td').filter(function(){return $(this).text()===b.name}).closest('tr');
		for(var i=0;i<r.length;i++){
			r[i].hidden = !b.checked
		}

	}
	
	function getScheduleCallEvents(number){
		aionInstance.ScheduleCallEvent({'from': account}, { fromBlock: number-5, toBlock: number }).get(function(err, data){
			if(!err && data.length>0){
    			for(var i = 0;i<data.length;i++){
        			
        			var r = $('[id='+data[i].args.AionID+']');
        			if(r.length>0){return}
        			
        			var table = document.getElementById("activeTxs");
        			var row = table.insertRow(1);
        			row.setAttribute('id',data[i].args.AionID);
        			row.innerHTML = '<td>' + data[i].args.to + '</td>' + '<td>' + data[i].args.value.div(Math.pow(10,18)) + '</td>' + '<td>' + data[i].args.blocknumber + '</td>' +
        							'<td>Scheduled</td>' + '<td><button' +' class="ui compact mini red button" type="submit" onclick="cancelTx(' +
        							data[i].args.AionID + ',this)">Cancel</button></td>';
        			$('[id='+data[i].transactionHash+']').remove();
    			}
    		if(data.length>0){updateAccountDetails();}	
			}	
		})
		
	}

	function getExecutedCallEvents(number){
		aionInstance.ExecutedCallEvent({'from':account}, { fromBlock: number-5, toBlock: number }).get(function(err, data){
			if(!err){
			    for(var i = 0;i<data.length;i++){
			        
    			    var r = $('[id=activeTxs]').find('[id=' + data[i].args.AionID + ']')
    			    c = document.getElementById(data[i].args.AionID).cells;
    			    c[3].innerHTML = "Executed";
    			    c[4].innerHTML = '<td><button class="ui compact mini grey button" type="submit" onclick="cancelTx(' +
    								data[i].args.AionID + ',this)" disabled>Cancel</button></td>';
			    }
			 if(data.length>0){updateAccountDetails();}
			}
		})
	}

	function getCancellScheduledTxEvents(number){
		aionInstance.CancellScheduledTxEvent({'from':account}, { fromBlock: number-5, toBlock: number }).get(function(err, data){
			if(!err){
			    
			    for(var i = 0;i<data.length;i++){
        			var r = $('[id=activeTxs]').find('[id=' + data[i].args.AionID + ']')
        			c = document.getElementById(data[i].args.AionID).cells;
        			c[3].innerHTML = "Cancelled";
        			c[4].innerHTML = '<td><button class="ui compact mini grey button" type="submit" onclick="cancelTx(' +
        								data[i].args.AionID + ',this)" disabled>Cancel</button></td>';
        			var b = $('[name=Cancelled]');
        			var r = $('td').filter(function(){return $(this).text()==='Cancelled'}).closest('tr');
        			for(var i=0;i<r.length;i++){
        				r[i].hidden = !b.checked;
        			}
			    }
			if(data.length>0){updateAccountDetails();}
			}
		})
		
	}

	function startupAion(){
		
		/* get gas price*/
		web3.eth.getGasPrice(function(err, gasprice){
		    if(!err){
				gasprice = gasprice.div(Math.pow(10,9));
				if(gasprice<1){gasprice = 1}
				if(gasprice<1){gasprice = 1}
				if($("[name=eth_gasprice]").val() < gasprice ){ $("[name=eth_gasprice]").val(gasprice);}
				if($("[name=erc20_gasprice]").val() < gasprice ){ $("[name=erc20_gasprice]").val(gasprice);}
				if($("[name=adv_gasprice]").val() < gasprice ){ $("[name=adv_gasprice]").val(gasprice);}
		    }
		});

		
		aionInstance.serviceFee(function(err,res){
			if(!err){
    			if(res>0){
    			    $("[name=eth_fee]").val(res);
    			    $("[name=erc20_fee]").val(res);
    			    $("[name=adv_fee]").val(res);
    			}
			}
		})
		
		var table = document.getElementById("activeTxs");
    	table.innerHTML = '<thead><tr><th>To</th><th>Value (ETH)</th><th>Block-TimeStamp</th><th>Status</th><th>Action</th></tr></thead><tbody></tbody>'
		var row = table.insertRow(1);
		var cell1 = row.insertCell(0);
    	cell1.innerHTML = '<div class="ui inline active loader"></div> Pending'
		row.innerHTML = '<div class="ui inline active loader"></div>   Loading Blockchain Data';
		aionInstance.ScheduleCallEvent({'from':web3.eth.accounts[0]}, { fromBlock: minBlock}).get(
			function(err, dataScheduled){
			    if(!err){
    				aionInstance.ExecutedCallEvent({'from':web3.eth.accounts[0]}, { fromBlock: minBlock }).get(
    				function(err, dataExecuted){
    					if(!err){
    					    aionInstance.CancellScheduledTxEvent({'from':web3.eth.accounts[0]}, { fromBlock: minBlock }).get(
					        function(err, dataCancelled){
						        if(!err){
    					            var table = document.getElementById("activeTxs");
    	                            table.innerHTML = '<thead><tr><th>To</th><th>Value (ETH)</th><th>Block-TimeStamp</th><th>Status</th><th>Action</th></tr></thead><tbody></tbody>'
    				                
    				                
    				                // scheduled
                    				for(var i=0;i<dataScheduled.length;i++){
                    					var row = table.insertRow(1);
                    					row.setAttribute('id',dataScheduled[i].args.AionID)
                    					row.innerHTML = '<td>' + dataScheduled[i].args.to + '</td>' + '<td>' + dataScheduled[i].args.value.div(Math.pow(10,18)) + '</td>' + '<td>' + dataScheduled[i].args.blocknumber + '</td>' +
                    									'<td>Scheduled</td>' + '<td><button' +' class="ui compact mini red button" type="submit" onclick="cancelTx(' +
                    									dataScheduled[i].args.AionID + ',this)">Cancel</button></td>';
                    				}
                    			    var b = $('[name=Schedulled]');
                        			filterTable(b[0])
			    
			        
			                        // Executed
                                    for(var i=0;i<dataExecuted.length;i++){
    							    c = document.getElementById(dataExecuted[i].args.AionID.toString()).cells;
    							    c[3].innerHTML = "Executed"
    							    c[4].innerHTML = '<td><button' +' class="ui compact mini grey button" type="submit" onclick="cancelTx(' +
    											     dataExecuted[i].args.AionID + ',this)" disabled>Cancel</button></td>'
    						        }
    						        var b = $('[name=Executed]');
    					            filterTable(b[0])
    					            
    					            
    					            //Cancelled
    					            for(var i=0;i<dataCancelled.length;i++){
    							        c = document.getElementById(dataCancelled[i].args.AionID.toString()).cells;
    							        c[3].innerHTML = "Cancelled"
    							        c[4].innerHTML = '<td><button' +' class="ui compact mini grey button" type="submit" onclick="cancelTx(' +
    											         dataCancelled[i].args.AionID + ',this)" disabled>Cancel</button></td>'
    						        }
    						        var b = $('[name=Cancelled]');
	    					        filterTable(b[0]);
			        
			                    }

					        })
    				    }
				    })
			    }
			})
		}
		
	

	function eth_scheduleTransaction(){
		var schedType = $('[id=timemode]')[0].checked;
		if(!schedType){
			var r = document.getElementById("accountdetails").rows;
			var blocknumber = web3.toBigNumber(r[1].cells[3].innerHTML).plus(web3.toBigNumber($("[name=eth_block]").val()));
			if(web3.toBigNumber($("[name=eth_block]").val())<10){
				alert('The minimun number of blocks should be greater than ten (10)')
				return
			}
		} else{
			var blocktimestamp = document.getElementById("accountdetails").rows[1].cells[3].innerHTML;
			var selectedTime = $('[id=eth_TimeBlockField]').calendar('get date')
			var localTime = new Date();
			var scheduleTime =  selectedTime.getTime() - localTime.getTime();
			if(scheduleTime<1000*60*5){
				alert('Minimun time for execution should be greater than 5 minutes')
				return
			}
			scheduleTime = Math.round(Number(scheduleTime)/1000) + Number(blocktimestamp);
			var blocknumber = scheduleTime;
		}				


		var to = $("[name=eth_to]").val();
		var value = web3.toBigNumber($("[name=eth_value]").val()).times(Math.pow(10,18));
		var gaslimit = web3.toBigNumber(100000);
		var gasprice = web3.toBigNumber($("[name=eth_gasprice]").val()).times(Math.pow(10,9));
		var data = "0x00";
		aionInstance.serviceFee(function(err,fee){
			if(!err){
    			var etherAmount = (gaslimit.times(gasprice)).plus(fee).plus(value);
    			aionInstance.ScheduleCall(blocknumber, to, value, gaslimit, gasprice, data, schedType,{'value':etherAmount, 'gasPrice':gasprice},
    				function(err,res){
    					if(err){
    						alert('Error schediling transaction. Operation was cancelled')
    					}else{
    						var table = document.getElementById("submitedTxs");
    						var row = table.insertRow(1);
    						var cell1 = row.insertCell(0);
    						var cell2 = row.insertCell(1);
    						row.setAttribute('id',res)
    						cell1.innerHTML = '<a href=https://ropsten.etherscan.io/tx/' + res + '>' + res + '</a>'
    						cell2.innerHTML = '<div class="ui inline active loader"></div> Pending'
    					}
    				})
			} else{
			    alert('Error schediling transaction. Operation was cancelled')
			}
		})
	}

	function erc20_scheduleTransaction(){
		var schedType = $('[id=timemode]')[0].checked;
		if(!schedType){
			var r = document.getElementById("accountdetails").rows;
			var blocknumber = web3.toBigNumber(r[1].cells[3].innerHTML).plus(web3.toBigNumber($("[name=erc20_block]").val()));
			if(web3.toBigNumber($("[name=erc20_block]").val())<10){
				alert('The minimun number of blocks should be greater than ten (10)')
				return
			}
		} else{
			var blocktimestamp = document.getElementById("accountdetails").rows[1].cells[3].innerHTML;
			var selectedTime = $('[id=erc20_TimeBlockField]').calendar('get date')
			var localTime = new Date();
			var scheduleTime =  selectedTime.getTime() - localTime.getTime();
			if(scheduleTime<1000*60*5){
				alert('Minimun time for execution should be greater than 5 minutes')
				return
			}
			scheduleTime = Math.round(Number(scheduleTime)/1000) + Number(blocktimestamp);
			var blocknumber = scheduleTime;
		}				
		
		var erc20 = web3.eth.contract(ERC20_ABI);
		var erc20Instance = erc20.at($("[name=erc20_address]").val())
		erc20Instance.decimals.call(function(err,decimals){
			
			var amount = web3.toBigNumber($('[name=erc20_value]').val()).times(Math.pow(10,decimals))
			amount =  web3.toHex(amount)
			amount = "0".repeat(64-(amount.length-2)) + amount.substr(2,amount.length)
			
			var to = $("[name=erc20_to]").val();
			var address = "0".repeat(64-(to.length-2)) + to.substr(2,to.length)
			var selector = web3.sha3('transfer(address,uint256)').substr(0,10)
			var data = selector + address + amount;								

			var to = $("[name=erc20_address]").val();
			var value = 0;
			var gaslimit = web3.toBigNumber(200000);
			var gasprice = web3.toBigNumber($("[name=erc20_gasprice]").val()).times(Math.pow(10,9));
		
			aionInstance.serviceFee(function(err,fee){
				var etherAmount = (gaslimit.times(gasprice)).plus(fee);
				aionInstance.ScheduleCall(blocknumber, to, value, gaslimit, gasprice, data, schedType,{'value':etherAmount, 'gasPrice':gasprice},
					function(err,res){
						if(err){
							alert('Error schediling transaction. Operation was cancelled')
						}else{
							var table = document.getElementById("submitedTxs");
							var row = table.insertRow(1);
							var cell1 = row.insertCell(0);
							var cell2 = row.insertCell(1);
							row.setAttribute('id',res)
							cell1.innerHTML = '<a href=https://ropsten.etherscan.io/tx/' + res + '>' + res + '</a>'
							cell2.innerHTML = '<div class="ui inline active loader"></div> Pending'
						}
					})
				
			})
			
		})

					
		

	}


	function erc20_transfer(){
		var erc20 = web3.eth.contract(ERC20_ABI);
		var erc20Instance = erc20.at($("[name=erc20_address]").val())
		aionInstance.clientAccount(web3.eth.accounts[0],function(err,clientAccount){
			erc20Instance.decimals.call(function(err,decimals){
				var amount = web3.toBigNumber($('[name=erc20_token_amount]').val()).times(Math.pow(10,decimals))
				erc20Instance.transfer(clientAccount,amount,function(err,res){
					if(err){
						alert('Error schediling transaction. Operation was cancelled')
					}	
				})
			})
			
			
		})

	}

	function adv_scheduleTransaction(){
		var schedType = $('[id=timemode]')[0].checked;
		if(!schedType){
			var r = document.getElementById("accountdetails").rows;
			var blocknumber = web3.toBigNumber(r[1].cells[3].innerHTML).plus(web3.toBigNumber($("[name=adv_block]").val()));
			if(web3.toBigNumber($("[name=adv_block]").val())<10){
				alert('The minimun number of blocks should be greater than ten (10)')
				return
			}
		} else{
			var blocktimestamp = document.getElementById("accountdetails").rows[1].cells[3].innerHTML;
			var selectedTime = $('[id=adv_TimeBlockField]').calendar('get date')
			var localTime = new Date();
			var scheduleTime =  selectedTime.getTime() - localTime.getTime();
			if(scheduleTime<1000*60*5){
				alert('Minimun time for execution should be greater than 5 minutes')
				return
			}
			scheduleTime = Math.round(Number(scheduleTime)/1000) + Number(blocktimestamp);
			var blocknumber = scheduleTime;
		}				

		var to = $("[name=adv_to]").val();
		var value = web3.toBigNumber($("[name=adv_value]").val()).times(Math.pow(10,18));
		var gaslimit = web3.toBigNumber($("[name=adv_gaslimit]").val());
		var gasprice = web3.toBigNumber($("[name=adv_gasprice]").val()).times(Math.pow(10,9));
		var data = $('[name=adv_data]').val();
		aionInstance.serviceFee(function(err,fee){
			var etherAmount = (gaslimit.times(gasprice)).plus(fee).plus(value);
			aionInstance.ScheduleCall(blocknumber, to, value, gaslimit, gasprice, data, schedType,{'value':etherAmount, 'gasPrice':gasprice},
				function(err,res){
					if(err){
						alert('Error schediling transaction. Operation was cancelled')
					}else{
						var table = document.getElementById("submitedTxs");
						var row = table.insertRow(1);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						row.setAttribute('id',res)
						cell1.innerHTML = '<a href=https://ropsten.etherscan.io/tx/' + res + '>' + res + '</a>'
						cell2.innerHTML = '<div class="ui inline active loader"></div> Pending'
					}
				})
		})
	}

	function cancelTx(AionID,row){			
		var blocknumber = $('[id='+AionID+']')[0].cells[2]
		aionInstance.ExecutedCallEvent({'AionID':AionID}, { fromBlock: minBlock }).get(
		function(err, data){
			if(data.length==0){
				aionInstance.ScheduleCallEvent({'AionID':AionID}, { fromBlock: minBlock }).get(
				function(err, data){
					if(err){
						alert('Error reading events')
						return
					}
					
					data = data[0].args
					web3.eth.getBlock('latest',function(err,block){

						if(!data.schedType){
							if(!(data.blocknumber >= block.number + 10 || data.blocknumber <= block.number - 20)){
								alert('Transactions Should be cancelled at least 10 block before the target block')
								return
							}
						} else {
							if(!(data.blocknumber >= block.timesatmp + 3*60 || data.blocknumber <= block.timestamp - 5*60)){
								alert('Transactions Should be cancelled at least 3 minutes before the target time')
								return
							}
						}
						aionInstance.cancellScheduledTx(data.blocknumber, web3.toChecksumAddress(data.from),
						web3.toChecksumAddress(data.to), data.value, data.gaslimit, data.gasprice,data.fee, 
						data.data, data.AionID,data.schedType,
						function(err,res){
							if(err){
								alert('Error executing function: cancellScheduleTx')
								return
							}
						})
					})

				})
			}
		})
	}

	function calcellAll(){
		aionInstance.cancellAllTx(function(err,res){
			if(err){
				alert('Error cancelling the account')
			}
		})
	}

   
	$(function() {$('[id=eth_TimeBlockField]').calendar()});
	$(function() {$('[id=erc20_TimeBlockField]').calendar()});
	$(function() {$('[id=adv_TimeBlockField]').calendar()});
	
	$(function() {$('.menu .item').tab();});
