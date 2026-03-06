const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');
const User = require('../models/User');
require('dotenv').config();

const clearData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear candidates
        await Candidate.deleteMany({});
        console.log('All candidates cleared from database.');

        // Reset all users 'hasVoted' status since contract is new
        await User.updateMany({}, { hasVoted: false });
        console.log('User voting status reset.');

        console.log('Database is now in sync with the new Smart Contract.');
        process.exit();
    } catch (error) {
        console.error('Error clearing data:', error);
        process.exit(1);
    }
};

clearData();
