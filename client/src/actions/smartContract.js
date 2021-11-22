let web3, accounts, contract;
const setInFile = (_web3, _accounts, _contract) => {
  web3 = _web3;
  accounts = _accounts;
  contract = _contract;
  console.log('accounts ', accounts);
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
  console.log('inside getPhase => ');
  try {
    if (!_contract) {
      console.log('contract is not set');
      return;
    }
    console.log('contract is set');
    let phase = await _contract.methods.phase().call();
    console.log(phase);
    console.log(typeof phase);
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
    console.log('_contract', _contract);
    let partiesLen = await _contract.methods.getParties().call();
    console.log('partiesLen', partiesLen);
    let parties = [{ name: 'Individual', val: -1 }];
    for (let i = 0; i < parseInt(partiesLen); i++) {
      let res = await _contract.methods.parties(i).call();
      parties.push({ ...res, val: i });
    }
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
    console.log('candidates Len', len);
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
  console.log('In Crete Party', _name, _logoLink);
  if (_logoLink == null) _logoLink = 'https://img.icons8.com/color/2x/user.png';
  try {
    let phase = await contract.methods.phase().call();
    if (phase != 1) return 'Invalid Phase';
    console.log('-------------------- going to call');
    const res = await contract.methods
      .createPoliticalParty(_name, _logoLink)
      .send({ from: accounts[0] });
    console.log('Political Party Created', res);

    return 'Success';
    // else return 'Some Error Occured :(';
  } catch (err) {
    console.log('----------------see here', err);
    return 'Some Error Occured :(';
  }
};

const createCandidate = async (_name, _logoLink, _pinCode, _partyId) => {
  console.log('In Crete Candidate', _name, _logoLink, _partyId, _pinCode);
  if (!_logoLink) {
    _logoLink = 'it wont be stored anyways';
  }
  try {
    let phase = await contract.methods.phase().call();
    if (phase != 1) return 'Invalid Phase';
    console.log('-------------------- going to call');
    const res = await contract.methods
      .addCandidate(_name, _logoLink, _partyId, _pinCode)
      .send({ from: accounts[0] });
    console.log('Candidate Created', res);

    return 'Success';
    // else return 'Some Error Occured :(';
  } catch (err) {
    console.log('----------------see here', err);
    return 'Some Error Occured :(';
  }
};
const getCandidates = async _id => {
  try {
    console.log('contract', contract);
    let voter = await contract.methods.voters(_id).call();
    if (voter.canVote == false) return 'You have already voted or unregistered';
    console.log("voter's district", voter.pinCode);
    let len = await contract.methods.getCandidateCount(voter.pinCode).call();
    console.log('candidates Len', len);
    let candidates = [];
    for (let i = 0; i < parseInt(len); i++) {
      let res = await contract.methods
        .districtToCandidates(voter.pinCode, i)
        .call();
      candidates.push({ ...res, val: i });
    }
    console.log('candidates', candidates);
    return candidates;
  } catch (err) {
    console.log(err);
    return 'You are not authorized to vote';
  }
};

const vote = async _candidateId => {
  try {
    const res = await contract.methods
      .vote(_candidateId)
      .send({ from: accounts[0] });
    console.log(res);
    return 'Success';
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
