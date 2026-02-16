const Candidate = require('../models/Candidate');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const bcrypt = require('bcryptjs');

// @desc    Add a Voter (Admin created)
// @route   POST /api/admin/add-voter
// @access  Admin
const addVoter = async (req, res) => {
    try {
        const { name, email, password, area } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            area,
            role: 'voter',
            isVerified: true // Auto-verify since Admin created it
        });

        await AuditLog.create({
            action: 'VOTER_ADDED',
            performedBy: req.user._id,
            details: `Added voter ${user.email}`
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a Candidate
// @route   POST /api/admin/add-candidate
// @access  Admin
const addCandidate = async (req, res) => {
    try {
        const { name, party, manifesto, age, qualification, blockchainId } = req.body;

        // Ensure blockchainId is unique
        const exists = await Candidate.findOne({ blockchainId });
        if (exists) {
            return res.status(400).json({ message: 'Candidate with this ID already exists' });
        }

        const candidate = await Candidate.create({
            name,
            party,
            manifesto,
            age,
            qualification,
            blockchainId
        });

        await AuditLog.create({
            action: 'CANDIDATE_ADDED',
            performedBy: req.user._id,
            details: `Added candidate ${candidate.name}`
        });

        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify a Voter
// @route   POST /api/admin/verify-voter/:id
// @access  Admin
const verifyVoter = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'voter') {
            return res.status(400).json({ message: 'User is not a voter' });
        }

        user.isVerified = true;
        await user.save();

        await AuditLog.create({
            action: 'VOTER_VERIFIED',
            performedBy: req.user._id,
            details: `Verified voter ${user.email}`
        });

        res.json({ message: 'Voter verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all unverified voters
// @route   GET /api/admin/unverified-voters
// @access  Admin
const getUnverifiedVoters = async (req, res) => {
    try {
        const voters = await User.find({ role: 'voter', isVerified: false });
        res.json(voters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminStats = async (req, res) => {
    try {
        const totalCandidates = await Candidate.countDocuments();
        const verifiedVoters = await User.countDocuments({ role: 'voter', isVerified: true });
        const unverifiedVoters = await User.countDocuments({ role: 'voter', isVerified: false });

        // Simplified election status check (can be expanded later)
        const electionStatus = "Active";

        // Total votes count from User model (voters who have already voted)
        const liveVoteCount = await User.countDocuments({ role: 'voter', hasVoted: true });

        res.json({
            totalCandidates,
            verifiedVoters,
            unverifiedVoters,
            liveVoteCount,
            electionStatus
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all voters with status
// @route   GET /api/admin/voters
// @access  Admin
const getVoters = async (req, res) => {
    try {
        const voters = await User.find({ role: 'voter' }).select('-password');
        res.json(voters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addCandidate, verifyVoter, getUnverifiedVoters, addVoter, getAdminStats, getVoters };
