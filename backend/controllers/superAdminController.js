const User = require('../models/User');
const Candidate = require('../models/Candidate');
const AuditLog = require('../models/AuditLog');

// @desc    Create a new Admin
// @route   POST /api/superadmin/create-admin
// @access  Super Admin
const createAdmin = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            department,
            role: 'admin',
            isVerified: true
        });

        await AuditLog.create({
            action: 'ADMIN_CREATED',
            performedBy: req.user._id,
            details: `Created admin ${user.email}`
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get System Analytics
// @route   GET /api/superadmin/analytics
// @access  Super Admin
const getAnalytics = async (req, res) => {
    try {
        const totalVoters = await User.countDocuments({ role: 'voter' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const verifiedVoters = await User.countDocuments({ role: 'voter', isVerified: true });
        const votesCast = await User.countDocuments({ hasVoted: true });

        // Department-wise breakdown
        const departmentStats = await User.aggregate([
            { $match: { role: 'voter' } },
            {
                $group: {
                    _id: "$department",
                    count: { $sum: 1 },
                    verified: { $sum: { $cond: ["$isVerified", 1, 0] } },
                    voted: { $sum: { $cond: ["$hasVoted", 1, 0] } }
                }
            },
            { $project: { department: "$_id", count: 1, verified: 1, voted: 1, _id: 0 } }
        ]);

        // Candidate-wise breakdown (Live Results)
        const candidates = await Candidate.find({});
        const candidateStats = await Promise.all(candidates.map(async (c) => {
            const count = await User.countDocuments({ role: 'voter', hasVoted: true, votedCandidateId: c.blockchainId });
            return {
                name: c.name,
                party: c.party,
                voteCount: count,
                blockchainId: c.blockchainId
            };
        }));

        res.json({
            totalVoters,
            totalAdmins,
            verifiedVoters,
            votesCast,
            departmentStats,
            candidateStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Audit Logs
// @route   GET /api/superadmin/logs
// @access  Super Admin
const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate('performedBy', 'name email role')
            .sort({ timestamp: -1 })
            .limit(50);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all admins
// @route   GET /api/superadmin/admins
// @access  Super Admin
const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all voters
// @route   GET /api/superadmin/voters
// @access  Super Admin
const getVoters = async (req, res) => {
    try {
        const voters = await User.find({ role: 'voter' }).select('-password');
        res.json(voters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createAdmin, getAnalytics, getAuditLogs, getAdmins, getVoters };
