// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint votedCandidateId;
    }

    address public owner;
    bool public electionActive;
    
    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    event VoteCast(address indexed voter, uint candidateId);
    event ElectionStateChanged(bool isActive);
    event CandidateAdded(uint id, string name);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyActive() {
        require(electionActive, "Election is not active");
        _;
    }

    constructor() {
        owner = msg.sender;
        electionActive = false; // Election starts as inactive
    }

    function addCandidate(string memory _name) public onlyOwner {
        require(!electionActive, "Cannot add candidates while election is active");
        uint id = candidates.length;
        candidates.push(Candidate(id, _name, 0));
        emit CandidateAdded(id, _name);
    }

    function setElectionState(bool _state) public onlyOwner {
        electionActive = _state;
        emit ElectionStateChanged(_state);
    }

    function vote(uint _candidateId) public onlyActive {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotes(uint _candidateId) public view returns (uint) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }

    function getCandidate(uint _candidateId) public view returns (Candidate memory) {
         require(_candidateId < candidates.length, "Invalid candidate ID");
         return candidates[_candidateId];
    }
}
