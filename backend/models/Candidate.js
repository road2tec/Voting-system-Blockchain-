const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    party: { type: String, required: true },
    manifesto: { type: String },
    age: { type: Number },
    qualification: { type: String },
    blockchainId: { type: Number, required: true, unique: true }, // ID from Smart Contract
    photoUrl: { type: String } // URL to image (optional)
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
