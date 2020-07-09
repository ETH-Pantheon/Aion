pragma solidity ^0.6.0;


/* ----------------------------------------------------------------------------
 Interface for Aion Smart contract (by ETH-Pantheon)
----------------------------------------------------------------------------*/


abstract contract Aion {
    
    address public owner;
    uint256 public serviceFee;
    uint256 public AionID;
    uint256 public feeChangeInterval;
    mapping(address => address) public clientAccount;
    mapping(uint256 => bytes32) public scheduledCalls;


    event ExecutedCallEvent(address indexed from, uint256 indexed AionID, bool TxStatus, bool TxStatus_cancel, bool reimbStatus);
    event ScheduleCallEvent(uint256 indexed blocknumber, address indexed from, address to, uint256 value, uint256 gaslimit, uint256 gasprice, uint256 fee, bytes data, uint256 indexed AionID, bool schedType);
    event CancellScheduledTxEvent(address indexed from, uint256 Total, bool Status, uint256 indexed AionID);
    event feeChanged(uint256 newfee, uint256 oldfee);
    
    
    function ScheduleCall(uint256 blocknumber, address to, uint256 value, uint256 gaslimit, uint256 gasprice, bytes memory data, bool schedType) public payable virtual returns (uint,address);
    function cancellScheduledTx(uint256 blocknumber, address from, address to, uint256 value, uint256 gaslimit, uint256 gasprice, uint256 fee, bytes calldata data, uint256 aionId, bool schedType) external virtual returns(bool);


}

