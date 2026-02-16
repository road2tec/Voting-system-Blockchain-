const Election = require('../models/Election');

const createElection = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const newElection = new Election({ title, description, startDate, endDate });
        await newElection.save();
        res.status(201).json({ message: 'Election created', election: newElection });
    } catch (error) {
        res.status(500).json({ message: 'Error creating election', error: error.message });
    }
};

const getElections = async (req, res) => {
    try {
        const elections = await Election.find();
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching elections', error: error.message });
    }
};

module.exports = { createElection, getElections };
