const User = require('../models/User');
const Candidate = require('../models/Candidate');
const AuditLog = require('../models/AuditLog');

// @desc    Get all candidates
// @route   GET /api/voter/candidates
// @access  Voter
const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find({});

        // Enhance candidates with actual vote counts from User model
        const candidatesWithVotes = await Promise.all(candidates.map(async (cand) => {
            const count = await User.countDocuments({
                role: 'voter',
                hasVoted: true,
                votedCandidateId: cand.blockchainId
            });
            return {
                ...cand._doc,
                voteCount: count // Overriding with live calculated count
            };
        }));

        res.json(candidatesWithVotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark user as voted (called after blockchain tx)
// @route   POST /api/voter/vote
// @access  Voter
const castVote = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.hasVoted) {
            return res.status(400).json({ message: 'User has already voted' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'User is not verified' });
        }

        const { candidateId } = req.body;
        user.hasVoted = true;
        user.votedCandidateId = candidateId;
        await user.save();

        await AuditLog.create({
            action: 'VOTE_CAST',
            performedBy: req.user._id,
            details: 'Vote cast on blockchain'
        });

        res.json({ message: 'Vote recorded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCandidates, castVote };
