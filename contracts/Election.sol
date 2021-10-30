// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "./Ownable.sol";

contract Election is Ownable{
    
    struct PoliticalParty {
        string name;
        string logoLink;
        uint16 seats;
    }
    
    struct Candidate {
        string name;
        string logoLink;
        int16 partyId; // -1 for individual candidates
        uint32 votes;
    }
    
    struct Voter {
        bool canVote;
        uint32 pinCode;
    }
    
    uint8 public phase = 1; // 1 for registration, 2 for voting, 3 for result declared
    mapping (address => Voter) voters;
    mapping (uint32 => Candidate[]) public districtToCandidates;
    PoliticalParty[] public parties;
    uint32[] pinCodes;
    uint public votingPeriod;
    
    event PoliticalPartyCreated(string _name, string _logoLink);
    event CandidateCreated(string _name, string _logoLink, int16 _partyId, uint32 _pinCode);
    event VoterAdded(address _id);
    event Vote(address _id);

    modifier beforeEndTime() {
        require(phase == 2 && block.timestamp < votingPeriod, "Invalid Phase");
        _;
    }

    modifier afterEndTime() {
        require(phase == 2 && block.timestamp > votingPeriod, "Invalid Phase");
        _;
    }

    function getCandidateCount(uint32 district) public view returns (uint) {
        return districtToCandidates[district].length;
    }

    function changePhase(uint8 _phase) private {
        phase = _phase;
    }
    
    function startVoting() external onlyOwner {
        require(phase == 1, "Invalid Phase");
        votingPeriod = block.timestamp + 1 days;
        changePhase(2);
    }

    function createPoliticalParty(string calldata _name, string calldata _logoLink) external onlyOwner returns(uint) {
        require(phase == 1, "Registration Phase is Over");
        parties.push(PoliticalParty(_name, _logoLink, 0));
        emit PoliticalPartyCreated(_name, _logoLink);
    }
    
    function addCandidate(string calldata _name, string calldata _logoLink, int16 _partyId, uint32 _pinCode) external onlyOwner {
        require(phase == 1, "Registration Phase is Over");
        require(_partyId < int16(parties.length) && _partyId >= -1, "Invalid Political Party");
        if(districtToCandidates[_pinCode].length == 0){
            pinCodes.push(_pinCode);
        }
        districtToCandidates[_pinCode].push(Candidate(_name, _logoLink, _partyId, 0));
        emit CandidateCreated(_name, _logoLink, _partyId, _pinCode);
    }
    
    function addVoter(address _voterAccount ,uint32  _pinCode) external onlyOwner {
        require(phase == 1,"Registration Phase is Over");
        voters[_voterAccount] = Voter(true, _pinCode);
        emit VoterAdded(_voterAccount);
    }
    
    function vote(uint16 _candidateId) external beforeEndTime{
        Voter storage myVoter = voters[msg.sender];
        require(myVoter.pinCode > 0, "Voter is not Registered");
        require(myVoter.canVote, "Voter has already Voted");
        require(_candidateId >= 0 && _candidateId < districtToCandidates[myVoter.pinCode].length);
        Candidate storage myCandidate = districtToCandidates[myVoter.pinCode][_candidateId];
        myCandidate.votes++;
        myVoter.canVote = false;
        emit Vote(msg.sender);
    }
    
    function computeResult() external onlyOwner afterEndTime{
        require(phase == 2, "Invalid Phase");
        for(uint16 i=0 ; i<pinCodes.length ; i++){
            uint32 currPinCode = pinCodes[i];
            Candidate memory winner = districtToCandidates[currPinCode][0];
            for(uint16 j = 1; j<districtToCandidates[currPinCode].length; j++){
                if(winner.votes < districtToCandidates[currPinCode][j].votes){
                    winner = districtToCandidates[currPinCode][j];
                }
            }
            if(winner.partyId!=-1){
                parties[uint16(winner.partyId)].seats++;
            }
        }
        changePhase(3);
    }
}