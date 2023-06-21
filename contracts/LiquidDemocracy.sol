// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidDemocracy is Ownable {
    struct Voting {
        uint id;
        string[] options;
        string title;
        string description;
    }

    struct UserVote {
        address user;
        uint votes;
    }

    struct OptionVote {
        uint option;
        uint votes;
    }

    mapping (address => bool) admin;
    mapping (uint => mapping(address => uint)) votingPower;
    mapping (uint => mapping(uint => uint)) numberOfOptionVotes;
    mapping (uint => mapping(address => UserVote)) votedForUser;
    mapping (uint => mapping(address => OptionVote)) votedForOption;
    mapping (uint => mapping(address => bool)) isVoted;

    constructor() {
        admin[owner()] = true;
    }

    event errorEvent(string message);
    event successEvent(string message);
    event votedForUserEvent(address indexed _address, uint votes);
    event votedForOptionEvent(uint option, uint votes);
    event revokedFromUserEvent(address indexed _address, uint votes);
    event revokedFromOptionEvent(uint option, uint votes);

    modifier isAdmin(address _address) {
        require(admin[_address] == true);
        _;
    }

    function giveAdmin(address _for) external isAdmin(msg.sender) {
        admin[_for] = true;
    }

    Voting[] private votings;

    function getVoting(uint _votingId) external view returns(uint, string[] memory, string memory, string memory) {
        return(votings[_votingId].id, votings[_votingId].options, votings[_votingId].title, votings[_votingId].description);
    }

    function getVotingLength() public view returns(uint) {
        return votings.length;
    }

    function checkIfVoted(uint _votingId) external view returns(bool) {
        return isVoted[_votingId][msg.sender];
    }

    function createVoting(string memory _title, string memory _description, string[] calldata _options) external isAdmin(msg.sender) {
        uint id = votings.length + 1;
        votings.push(Voting(id, _options, _title, _description));
        emit successEvent("Successfully created voting!");
    }

    function ifSenderAdmin() external view returns(bool) {
        return admin[msg.sender];
    }

    function getOptionVotes(uint _votingId, uint _optionId) external view returns(uint) {
        return numberOfOptionVotes[_votingId][_optionId];
    }

    function getUserVotingPower(uint _votingId, address _address) external view returns(uint) {
        if(isVoted[_votingId][_address] == true) return 0;
        else return votingPower[_votingId][_address] + 1;
    }

    function voteForUser(address _for, uint _votingId) external {
        if(isVoted[_votingId][_for] == true) {
            emit errorEvent("This user already voted.");
        }
        require(isVoted[_votingId][msg.sender] == false && _for != msg.sender && isVoted[_votingId][_for] == false);
        votingPower[_votingId][_for] = votingPower[_votingId][_for] + 1 + votingPower[_votingId][msg.sender];
        UserVote memory uv;
        uv.user = _for;
        uv.votes = votingPower[_votingId][msg.sender] + 1;
        votedForUser[_votingId][msg.sender] = uv;
        votingPower[_votingId][msg.sender] = 0;
        isVoted[_votingId][msg.sender] = true;
        emit votedForUserEvent(_for, votingPower[_votingId][msg.sender] + 1);
    }

    function voteForOption(uint _for, uint _votingId) external {
        require(isVoted[_votingId][msg.sender] == false);
        numberOfOptionVotes[_votingId][_for] = numberOfOptionVotes[_votingId][_for] + 1 + votingPower[_votingId][msg.sender];
        OptionVote memory ov;
        ov.option = _for;
        ov.votes = votingPower[_votingId][msg.sender] + 1;
        votedForOption[_votingId][msg.sender] = ov;
        votingPower[_votingId][msg.sender] = 0;
        isVoted[_votingId][msg.sender] = true;
        emit votedForOptionEvent(_for, votingPower[_votingId][msg.sender] + 1);
    }

    function revoke(uint _votingId) external {
        require(isVoted[_votingId][msg.sender] == true);
        if(votedForOption[_votingId][msg.sender].votes != 0) {
            votingPower[_votingId][msg.sender] = votedForOption[_votingId][msg.sender].votes - 1;
            numberOfOptionVotes[_votingId][votedForOption[_votingId][msg.sender].option] = numberOfOptionVotes[_votingId][votedForOption[_votingId][msg.sender].option] - votedForOption[_votingId][msg.sender].votes;
            isVoted[_votingId][msg.sender] = false;
            emit revokedFromOptionEvent(votedForOption[_votingId][msg.sender].option, votedForOption[_votingId][msg.sender].votes);
        }
        else if(votedForUser[_votingId][msg.sender].votes != 0) {
            votingPower[_votingId][msg.sender] = votedForUser[_votingId][msg.sender].votes - 1;
            votingPower[_votingId][votedForUser[_votingId][msg.sender].user] = votingPower[_votingId][votedForUser[_votingId][msg.sender].user] - votedForUser[_votingId][msg.sender].votes;
            isVoted[_votingId][msg.sender] = false;
            emit revokedFromUserEvent(votedForUser[_votingId][msg.sender].user, votedForUser[_votingId][msg.sender].votes);
        }
    }
}