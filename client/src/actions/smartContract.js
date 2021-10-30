let web3, accounts, contract;
const setInFile = (_web3, _accounts, _contract) => {
  web3 = _web3;
  accounts = _accounts;
  contract = _contract;
  console.log('accounts ', accounts);
};
const startVoting = async () => {
  try {
    const res = await contract.methods
      .startVoting()
      .send({ from: accounts[0] });
    console.log(res);
    const phase = await contract.methods.phase().call();
    console.log(phase);
    if (phase == 2) return 'Success';
    else return 'Some Error Occured :(';
  } catch (err) {
    return 'Some Error Occured :(';
  }
};

const declareResult = () => {};

export { setInFile, startVoting, declareResult };
