const express = require('express');
const router = express.Router();
const Voters = require('../models/voters');
// const Provider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const { fetchVoter } = require('../middlewares/auth');

// const privateKey = process.env.PRIVATEKEY;
// const url = process.env.BLOCKCHAINURL;
// const address = process.env.ADDRESS;
const client = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
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

router.get('/', (req, res, next) => res.json({ msg: 'Application Running' }));

router.get('/test/wer', async (req, res, next) => {
  // try {
  //   const provider = new Provider(privateKey, url);
  //   const web3 = new Web3(provider);
  //   const networkId = await web3.eth.net.getId();
  //   const myContract = new web3.eth.Contract(
  //     MyContract.abi,
  //     MyContract.networks[networkId].address
  //   );

  //   console.log(await myContract.methods.get().call());
  //   console.log(`Old data value: ${await myContract.methods.get().call()}`);
  //   const receipt = await myContract.methods.set(3).send({ from: address });
  //   console.log(`Transaction hash: ${receipt.transactionHash}`);
  //   console.log(`New data value: ${await myContract.methods.get().call()}`);
  // } catch (err) {
  //   console.log(err);
  // }
  res.send('Hi');
});

// Register Voter in Blockchain
// Send OTP to Voter
router.get('/regVoter/sendOTP', fetchVoter, async (req, res, next) => {
  console.log(req.phone);
  console.log(req.district);
  console.log(req.hasRegistered);
  if (req.hasRegistered === true) {
    return res.status(200).send({
      msg: 'Voter already registered',
    });
  }

  //   console.log(req.phone);
  //   console.log(req.pinCode);
  //   console.log(req.hasRegistered);

  if (req.phone) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+${req.phone}`,
        channel: 'sms',
      })
      .then(data => {
        console.log(data);

        res.status(200).send({
          msg: 'OTP is sent!',
          phonenumber: req.phone,
          district: req.district,
        });
      });
  } else {
    res.status(400).send({
      msg: 'Wrong phone number :(',
      phonenumber: req.phone,
      data,
    });
  }
});

// Verify OTP
router.post('/regVoter/verifyOTP', async (req, res, next) => {
  // if (req.body.phone && req.body.code.length === 4) {
  //   client.verify
  //     .services(process.env.SERVICE_ID)
  //     .verificationChecks.create({
  //       to: `+${req.body.phone}`,
  //       code: req.body.code,
  //     })
  //     .then(data => {
  //       if (data.status === 'approved') {
  //         console.log('OTP is approved');

  // Calling AddVoter Function from smart Contract here
  try {
    console.log('init');
    if (!web3) await init();
    const adminAccount = accounts[0];
    // const voterAccount = req.body.VoterEthID;
    const voterAccount = accounts[1];
    console.log(voterAccount);
    const receipt = await electionContract.methods
      .addVoter(voterAccount, req.body.district)
      .send({ from: adminAccount });
    console.log('inside addVoter in verifyOTP route');
    console.log(receipt);

    // update mongodb
    await Voter.update(
      { voterID: req.body.voterID },
      { $set: { hasRegistered: true } }
    );

    res.json(receipt);
  } catch (err) {
    console.log(err);
    res.json(err);
  }

  // res.status(200).send({
  //   msg: 'Voter is Verified!',
  // });
  next();
  //   }
  // })
  // .catch(err => {
  //   res.json(err);
  //   next();
  // });
  // } else {
  //   res.status(400).send({
  //     msg: 'Wrong phone number or code :(',
  //     phonenumber: req.body.phone,
  //   });
  // }
});

module.exports = router;
