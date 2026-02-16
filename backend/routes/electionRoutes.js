const express = require('express');
const router = express.Router();
const { createElection, getElections } = require('../controllers/electionController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, verifyRole(['admin', 'superadmin']), createElection);
router.get('/', verifyToken, getElections);

module.exports = router;
