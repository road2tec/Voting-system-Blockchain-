const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Explicitly load env
const envPath = path.join(__dirname, '../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

console.log('MONGO_URI:', process.env.MONGO_URI);

const User = require('../models/User');

const seedUsers = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected.');

        console.log('Clearing Users...');
        await User.deleteMany({});
        console.log('Users Cleared.');

        console.log('Creating Super Admin...');
        const superAdmin = await User.create({
            name: 'Super Admin',
            email: 'super@vote.com',
            password: 'password123',
            role: 'superadmin',
            isVerified: true
        });
        console.log('Super Admin Created:', superAdmin.email);

        console.log('Creating Admin...');
        const admin = await User.create({
            name: 'Election Admin',
            email: 'admin@vote.com',
            password: 'password123',
            role: 'admin',
            isVerified: true
        });
        console.log('Admin Created:', admin.email);

        console.log('Creating Voter...');
        const voter = await User.create({
            name: 'John Voter',
            email: 'voter@vote.com',
            password: 'password123',
            role: 'voter',
            isVerified: true,
            department: 'CS',
            year: '3rd'
        });
        console.log('Voter Created:', voter.email);

        console.log('SEEDING COMPLETE.');
        process.exit();
    } catch (error) {
        console.error('SEEDING FAILED!');
        console.error(error);
        process.exit(1);
    }
};

seedUsers();
