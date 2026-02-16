const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clear existing users
        await User.deleteMany({});

        // 1. Create Super Admin
        const superAdmin = await User.create({
            name: 'Super Admin',
            email: 'super@vote.com',
            password: 'password123', // Will be hashed by pre-save hook
            role: 'superadmin',
            isVerified: true
        });
        console.log('Super Admin created: super@vote.com / password123');

        // 2. Create Admin
        const admin = await User.create({
            name: 'Election Admin',
            email: 'admin@vote.com',
            password: 'password123',
            role: 'admin',
            isVerified: true
        });
        console.log('Admin created: admin@vote.com / password123');

        // 3. Create Voter
        const voter = await User.create({
            name: 'John Voter',
            email: 'voter@vote.com',
            password: 'password123',
            role: 'voter',
            isVerified: true, // Auto-verify for testing
            department: 'CS',
            year: '3rd'
        });
        console.log('Voter created: voter@vote.com / password123');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers();
