const express = require('express');
const router = express.Router();
const { castVote } = require('../controllers/voteController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.post('/', verifyToken, verifyRole(['voter']), castVote);

module.exports = router;
