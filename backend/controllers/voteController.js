const User = require('../models/User');
const Election = require('../models/Election');
const AuditLog = require('../models/AuditLog');
const { ethers } = require('ethers');

// In a real production app, voting should happen directly from frontend to blockchain.
// The backend might just verify or log the vote.
// However, if we want the backend to execute the transaction (gasless for user), we need the private key here.
// For this project, as requested, ONE PERSON ONE VOTE logic is critical.

const castVote = async (req, res) => {
    try {
        const { electionId, candidateId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.hasVoted) return res.status(400).json({ message: 'You have already voted' });

        const election = await Election.findById(electionId);
        if (!election) return res.status(404).json({ message: 'Election not found' });
        if (!election.isActive) return res.status(400).json({ message: 'Election is not active' });

        // Here we would ideally verify the blockchain transaction hash sent from frontend
        // OR execute the vote on chain if backend holds a relayer wallet.
        // For now, we update the DB state to prevent double voting off-chain as well.

        user.hasVoted = true;
        await user.save();

        // Log audit
        const newLog = new AuditLog({
            action: 'VOTE_CAST',
            user: userId,
            details: `Voted for candidate ${candidateId} in election ${electionId}`,
            ipAddress: req.ip
        });
        await newLog.save();

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error casting vote', error: error.message });
    }
};

module.exports = { castVote };
