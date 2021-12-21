let web3, accounts, contract;
const setInFile = (_web3, _accounts, _contract) => {
  web3 = _web3;
  accounts = _accounts;
  contract = _contract;
};

const startVoting = async () => {
  try {
    let phase = await contract.methods.phase().call();
    if (phase != 1) return 'Invalid Phase';

    const res = await contract.methods
      .startVoting()
      .send({ from: accounts[0] });
    console.log(res);

    phase = await contract.methods.phase().call();
    console.log(phase);

    if (phase == 2) return 'Success';
    else return 'Some Error Occured :(';
  } catch (err) {
    return 'Some Error Occured :(';
  }
};

const declareResult = async () => {
  try {
    let phase = await contract.methods.phase().call();
    if (phase != 2) return 'Invalid Phase';

    let endTime = await contract.methods.votingPeriod().call();
    endTime = endTime * 1000;

    if (endTime > new Date().getTime()) {
      return 'Voting is Ongoing. :(';
    }

    const res = await contract.methods
      .computeResult()
      .send({ from: accounts[0] });
    console.log(res);

    phase = await contract.methods.phase().call();
    console.log(phase);

    if (phase == 3) return 'Success';
    else return 'Some Error Occured :(';
  } catch (err) {
    console.log(err);
    return 'Some Error Occured :(';
  }
};

const getPhase = async _contract => {
  try {
    if (!_contract) {
      console.log('contract is not set');
      return;
    }
    let phase = await _contract.methods.phase().call();
    if (parseInt(phase) === 2) {
      let endTime = await _contract.methods.votingPeriod().call();
      if (endTime * 1000 <= new Date().getTime()) {
        phase = 3;
      }
    } else if (parseInt(phase) === 3) {
      phase = 4;
    }
    return phase;
  } catch (err) {
    console.log(err);
  }
};

const fetchPoliticalParties = async _contract => {
  try {
    let partiesLen = await _contract.methods.getParties().call();
    let individualSeats = await _contract.methods.getDistrictCount().call();
    let parties = [];
    for (let i = 0; i < parseInt(partiesLen); i++) {
      let res = await _contract.methods.parties(i).call();
      individualSeats -= res.seats;
      parties.push({ ...res, val: i });
    }
    const individual = { name: 'Individual', val: -1, seats: individualSeats };
    parties.push(individual);
    console.log('parties', parties);
    return parties;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchCandidatesResult = async _pinCode => {
  try {
    let len = await contract.methods.getCandidateCount(_pinCode).call();
    let candidates = [];
    for (let i = 0; i < parseInt(len); i++) {
      let res = await contract.methods.districtToCandidates(_pinCode, i).call();
      candidates.push({ ...res, val: i });
    }
    console.log('candidates', candidates);
    return candidates;
  } catch (err) {
    console.log(err);
    return 'Some Error Occured';
  }
};

const createParty = async (_name, _logoLink) => {
  if (_logoLink == null) _logoLink = 'https://img.icons8.com/color/2x/user.png';
  try {
    let phase = await contract.methods.phase().call();
    if (phase != 1) return 'Invalid Phase';
    const res = await contract.methods
      .createPoliticalParty(_name, _logoLink)
      .send({ from: accounts[0] });
    console.log('Political Party Created', res);

    return 'Success';
    // else return 'Some Error Occured :(';
  } catch (err) {
    console.log(err);
    return 'Some Error Occured :(';
  }
};

const createCandidate = async (_name, _logoLink, _pinCode, _partyId) => {
  if (!_logoLink) {
    _logoLink = 'it wont be stored anyways';
  }
  try {
    let phase = await contract.methods.phase().call();
    if (phase != 1) return 'Invalid Phase';
    const res = await contract.methods
      .addCandidate(_name, _logoLink, _partyId, _pinCode)
      .send({ from: accounts[0] });
    console.log('Candidate Created', res);

    return 'Success';
    // else return 'Some Error Occured :(';
  } catch (err) {
    console.log(err);
    return 'Some Error Occured :(';
  }
};
const getCandidates = async _id => {
  try {
    let voter = await contract.methods.voters(_id).call();
    if (voter.pinCode === '0') return 'Oops! You are not registered';
    if (voter.canVote === false) return 'You have already voted :)';
    let candidates = await fetchCandidatesResult(voter.pinCode);
    console.log('candidates', candidates);
    return candidates;
  } catch (err) {
    console.log(err);
    return 'Some Error Occured';
  }
};

const vote = async _candidateId => {
  try {
    const res = await contract.methods
      .vote(_candidateId)
      .send({ from: accounts[0] });
    console.log(res);
    return 'Wohoo! Your Vote has been recorded';
  } catch (err) {
    console.log(err);
    return 'Voting has stopped :( or Some other error';
  }
};

export {
  setInFile,
  startVoting,
  declareResult,
  fetchPoliticalParties,
  createParty,
  createCandidate,
  getPhase,
  getCandidates,
  vote,
  fetchCandidatesResult,
};
