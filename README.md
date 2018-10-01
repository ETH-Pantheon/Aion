# Aion
A system for Scheduling transactions with arbitrary bytecode on the Ethereum Network. 
  
Given the structure of Ethereum, it is not possible to schedule calls to contracts at a point in the future. This is because smart contracts cannot subscribe to events and therefore all the actions need to be triggered by an entity external to the contract. In many applications, one may be interested in scheduling an operation (transaction, execution of a particular function) in the future. 

Aion is a smart contract-based system that solves this problem. With Aion, transactions of any type (ether transactions, tokens transfers, contract's function executions, contracts deployments, and in general any bytecode instruction) can be scheduled to be executed at a particular time or block in the future. 

For further information about how Aion works go to [Aion's Home Page](https://www.aion.ethpantheon.com/index.html#howitworks)<br>
For scheduling transactions through Aion's graphical interface go to [Aion's App](https://www.aion.ethpantheon.com/aionapp.html) 
<br>
<br>
## Features:
+ Scheduling execution of functions with arbitrary bytecode.
+ Efficient code that reduces the amount of gas needed to schedule transactions.
+ Trustless. Execution parameters can't be modified by third parties, and all the operations are defined by the smart contract code.
+ Cancelling scheduled transactions is possible without paying any fees to the system.
+ The gas estimation of unused gas is returned to the users.
+ In case that the execution fails (insufficient gas, recipient contract reverts, etc.) the remaining gas and the value of the transaction are automatically returned to the original sender.
<br>
<br>

## Contract Address:
Aion smart contract is deployed at:

|**Network** | **Address**
|------------|------------
|MainNet     | 0xCBe7AB529A147149b1CF982C3a169f728bC0C3CA
|Ropsten     | 0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E

<br>
<br>



## Integration with smart contracts:
Aion can be easily integrated into any smart contract. Users can interact with Aion thorugh two functions:
#### ScheduleCall:
```solidity
function ScheduleCall(uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes data, bool schedType) public payable returns (uint,address);
```
| **Parameter** | **Description**|
|---------------|----------------|
|blocknumber (uint256)| Block or timestamp at which the transaction should be executed (see *schedType* parameter)|
|to (address) | recipient of the transaction|
|value (uint256)| Amount of Wei to transfer|
|gaslimit (uint256)| Maximum gas to spend on the transaction|
|gasprice (uint256)| gas price to be used in the transaction|
|data (bytes) | transaction data|
|schedType (bool)| true: schedule using timestamp, false: schedule using blocknumber|

<br>
This function returns the id of the scheduled transaction and the address of the user account created exclusively for the user. This account will store all the data or/and ether related to the transaction and can be used only by the user through Aion smart contract. In case that is necessary, the user can cancel the transaction at any time without the involvement of a third party and receive all the funds without having to pay any fees to Aion. 

<br>
<br>

#### cancellScheduledTx:
```solidity
function cancellScheduledTx(uint256 blocknumber, address from, address to, uint256 value, uint256 gaslimit, uint256 gasprice,
                         uint256 fee, bytes data, uint256 aionId, bool schedType) external returns(bool);
```
| **Parameter** | **Description**|
|---------------|----------------|
|aionId (uint256)| id of the transaction to be cancelled

<br>

## Examples: 

### 1. Scheduling an ether transaction:
The example below schedules an ether transaction to a third party at a particular blocknumber. At block/time of execution, if the transaction fails, the ether is returned to the contract that scheduled the transaction. Also, and importantly, the estimated unused gas is returned to the contract.
<br>
<br>
```solidity
pragma solidity ^0.4.24; 

// interface Aion
contract Aion {
    uint256 public serviceFee;
    function ScheduleCall(uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes data, bool schedType) public payable returns (uint);
    

}

// Main contract
contract MyContract{
    Aion aion;
    address aionAccount;

    function scheduleTransaction(uint256 value, uint256 gaslimit, uint256 gasprice, bool time_or_block) public {
        aion = Aion(0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E);
        uint256 callCost = value + gaslimit*gasprice + aion.serviceFee();
        uint256 txId;
        (txId,aionAccount) = aion.ScheduleCall.value(callCost)( block.number+15, address(this), value, gaslimit, gasprice, hex"00", time_or_block);
    }
      
    function () public payable {}
    
}
```
<br>
<br>

### 2. Scheduling the execution of a function:
The example below schedules the execution of a function in the same contract for a particular block/time in the future. Note that the function can be in another contract as long as the correct bytecode (data) is provided. The estimated unused gas is returned to the contract.

```solidity
pragma solidity ^0.4.24; 

// interface Aion
contract Aion {
    uint256 public serviceFee;
    function ScheduleCall(uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes data, bool schedType) public payable returns (uint,address);
    
}

// Main contract
contract MyContract{
    uint256 public sqrtValue;
    Aion aion;
    address aionAccount;
    
    function schedule_rqsr(uint256 number) public {
        aion = Aion(0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E);
        bytes memory data = abi.encodeWithSelector(bytes4(keccak256('sqrt(uint256)')),number); 
        uint callCost = 200000*1e9 + aion.serviceFee();
        uint256 txId;
        (txId, aionAccount) = aion.ScheduleCall.value(callCost)( block.number+15, address(this), 0, 200000, 1e9, data, false);
    }
    
    function sqrt(uint256 number) public {
        sqrtValue = number**2;
    } 
    
    function () public payable {}
    
}
```
<br>
<br>

## Fees:

Aion charges a fee of about 0.0005 ETH per transaction (~ 0.10 USD). The fee at the moment of scheduling is maintained until the execution of the transaction. 
<br>
<br>
