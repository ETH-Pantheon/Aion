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
|MainNet     | [0xCBe7AB529A147149b1CF982C3a169f728bC0C3CA](https://etherscan.io/address/0xCBe7AB529A147149b1CF982C3a169f728bC0C3CA)
|Ropsten     | [0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E](https://ropsten.etherscan.io/address/0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E)

<!---
|Rinkeby     | [0xeFc1d6479e529D9e7C359fbD16B31D405778CE6e](https://rinkeby.etherscan.io/address/0xeFc1d6479e529D9e7C359fbD16B31D405778CE6e)
|Kovan       | [0x2fC197cD7897f41957F72e8E390d5a7cF2858CBF](https://kovan.etherscan.io/address/0x2fC197cD7897f41957F72e8E390d5a7cF2858CBF)
--->

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
|blocknumber (uint256)| Block or timestamp at which the transaction should be executed (see *schedType* parameter)|
| from (address) | sender of the transaction|
|to (address) | recipient of the transaction|
|value (uint256)| Amount of Wei to have been transferred|
|gaslimit (uint256)| Maximum gas specified for the transaction|
|gasprice (uint256)| gas price specified for the transaction|
|fee (uint256) | the service fee for the transaction|
|data (bytes) | transaction data|
|aionId (uint256)| id of the transaction to be cancelled|
|schedType (bool)| true: scheduled using timestamp, false: scheduled using blocknumber|

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

    function scheduleTransaction(uint256 value, uint256 gaslimit, uint256 gasprice, bool time_or_block) public {
        aion = Aion(0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E);
        uint256 callCost = value + gaslimit*gasprice + aion.serviceFee();
        aion.ScheduleCall.value(callCost)( block.number+15, address(this), value, gaslimit, gasprice, hex"00", time_or_block);
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

    function schedule_rqsr(uint256 number) public {
        aion = Aion(0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E);
        bytes memory data = abi.encodeWithSelector(bytes4(keccak256('sqrt(uint256)')),number);
        uint callCost = 200000*1e9 + aion.serviceFee();
        aion.ScheduleCall.value(callCost)( block.number+15, address(this), 0, 200000, 1e9, data, false);
    }

    function sqrt(uint256 number) public {
        sqrtValue = number**2;
    }

    function () public payable {}

}
```
<br>
<br>


### 3. Recurrent calls:

This examples show how to schedule a recurrent call. (every one day in this example).
```Solidity
pragma solidity ^0.4.24;

// interface Aion
contract Aion {
    uint256 public serviceFee;
    function ScheduleCall(uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes data, bool schedType) public payable returns (uint,address);

}

// Main contract
contract MyContract{
    Aion aion;

    constructor() public payable {
        scheduleMyfucntion();
    }

    function scheduleMyfucntion() public {
        aion = Aion(0xFcFB45679539667f7ed55FA59A15c8Cad73d9a4E);
        bytes memory data = abi.encodeWithSelector(bytes4(keccak256('myfucntion()')));
        uint callCost = 200000*1e9 + aion.serviceFee();
        aion.ScheduleCall.value(callCost)( block.timestamp + 1 days, address(this), 0, 200000, 1e9, data, true);
    }

    function myfucntion() public {
        // do your task here and call again the function to schedule
        scheduleMyfucntion();
    }

    function () public payable {}

}

```

## Fees:

Aion charges a fee of 120Gwei (about 2 cents) per transaction. The fee at the moment of scheduling is maintained until the execution of the transaction. 
<br>
<br>
