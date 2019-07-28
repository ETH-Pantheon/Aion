const mongoose = require('mongoose');

const Requests = new mongoose.model('Requests', new mongoose.Schema({
    receivedAt: String,
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

exports.Requests = Requests;