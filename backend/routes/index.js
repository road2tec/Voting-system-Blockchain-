const express = require('express');
const router = express.Router();
const { createAdmin, getAnalytics, getAuditLogs, getAdmins, getVoters: getSuperVoters } = require('../controllers/superAdminController');
const { addCandidate, verifyVoter, getUnverifiedVoters, addVoter, getAdminStats, getVoters } = require('../controllers/adminController');
const { getCandidates, castVote } = require('../controllers/voterController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Super Admin Routes
router.post('/superadmin/create-admin', protect, authorize('superadmin'), createAdmin);
router.get('/superadmin/analytics', protect, authorize('superadmin'), getAnalytics);
router.get('/superadmin/logs', protect, authorize('superadmin'), getAuditLogs);
router.get('/superadmin/admins', protect, authorize('superadmin'), getAdmins);
router.get('/superadmin/voters', protect, authorize('superadmin'), getSuperVoters);

// Admin Routes
router.post('/admin/add-candidate', protect, authorize('admin'), addCandidate);
router.post('/admin/add-voter', protect, authorize('admin'), addVoter);
router.post('/admin/verify-voter/:id', protect, authorize('admin'), verifyVoter);
router.get('/admin/unverified-voters', protect, authorize('admin'), getUnverifiedVoters);
router.get('/admin/stats', protect, authorize('admin', 'superadmin'), getAdminStats);
router.get('/admin/voters', protect, authorize('admin'), getVoters);

// Voter Routes
router.get('/voter/candidates', protect, getCandidates); // Voter can view candidates
router.post('/voter/vote', protect, authorize('voter'), castVote);

module.exports = router;
