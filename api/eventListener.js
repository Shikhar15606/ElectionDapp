const Stats = require('./models/stats');
const Web3 = require('web3');
const ElectionContract = require('../client/src/contracts/Election.json');

let web3, networkId, electionContract;

exports.init = async () => {
  web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.BLOCKCHAIN_URL)
  );
  networkId = await web3.eth.net.getId();
  electionContract = new web3.eth.Contract(
    ElectionContract.abi,
    ElectionContract.networks[networkId].address
  );
};

exports.registrationListener = () => {
  electionContract.events
    .VoterAdded()
    .on('data', function (event) {
      Stats.findByIdAndUpdate(process.env.STATS_DOC_ID, {
        $inc: { registeredUsers: 1 },
      }).exec();
    })
    .on('error', console.error);
};

exports.voteListener = () => {
  electionContract.events
    .Vote()
    .on('data', function (event) {
      Stats.findByIdAndUpdate(process.env.STATS_DOC_ID, {
        $inc: { votesCasted: 1 },
      }).exec();
    })
    .on('error', console.error);
};
