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
    console.log('_contract => ' + _contract);
    console.log('contract is set');
    const phase = await _contract.methods.phase().call();
    console.log(phase);
    return phase;
  } catch (err) {
    console.log(err);
  }
};

export { setInFile, getPhase, startVoting, declareResult };
