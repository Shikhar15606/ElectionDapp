// only for development & testing
const Web3 = require('web3');
const ElectionContract = require('../../client/src/contracts/Election.json');

let web3, networkId, electionContract, accounts;

const init = async () => {
  web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.BLOCKCHAIN_URL)
  );
  networkId = await web3.eth.net.getId();
  electionContract = new web3.eth.Contract(
    ElectionContract.abi,
    ElectionContract.networks[networkId].address
  );
  accounts = await web3.eth.getAccounts();
};

exports.registerVoter = async (req, res) => {
  try {
    if (!web3) await init();
    const adminAccount = accounts[0];
    const voterAccount = accounts[1];
    console.log(voterAccount);
    const receipt = await electionContract.methods
      .addVoter(voterAccount, 486661)
      .send({ from: adminAccount });
    res.json(receipt);
  } catch (err) {
    res.json(err);
  }
};

exports.vote = async (req, res) => {
  try {
    if (!web3) await init();
    const adminAccount = accounts[0];
    const voterAccount = accounts[1];
    // start
    await electionContract.methods
      .addCandidate('Ramu', 'abcd.com', -1, 486661)
      .send({ from: adminAccount, gas: 3000000 });
    await electionContract.methods
      .addVoter(voterAccount, 486661)
      .send({ from: adminAccount });
    await electionContract.methods.startVoting().send({ from: adminAccount });
    const receipt = await electionContract.methods
      .vote(0)
      .send({ from: voterAccount });
    res.json(receipt);
  } catch (err) {
    res.json(err);
  }
};
