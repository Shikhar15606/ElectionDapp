const express = require('express');
const router = express.Router();
const Voters = require('../models/voters');
const Stats = require('../models/stats');
const Provider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const { verifyVoter } = require('../middlewares/auth');

const adminPrivateKey = process.env.PRIVATE_KEY;
const url = process.env.BLOCKCHAIN_URL;
const adminAccount = process.env.ADDRESS;

const client = require('twilio')(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const Web3 = require('web3');
const ElectionContract = require('../../client/src/contracts/Election.json');

let web3, networkId, electionContract, provider;

const init = async () => {
  provider = new Provider(adminPrivateKey, url);
  web3 = new Web3(provider);
  networkId = await web3.eth.net.getId();
  electionContract = new web3.eth.Contract(
    ElectionContract.abi,
    ElectionContract.networks[networkId].address
  );
};

router.get('/', (req, res) => res.json({ msg: 'Application Running' }));

// Register Voter in Blockchain
// Send OTP to Voter
router.get('/regVoter/sendOTP', verifyVoter, (req, res) => {
  if (req.phone) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+${req.phone}`,
        channel: 'sms',
      })
      .then(data => {
        console.log(data);
        res.status(200).json({
          msg: 'OTP is sent!',
          phonenumber: req.phone,
        });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(200).json({
      msg: 'Wrong phone number :(',
    });
  }
});

// Verify OTP
router.post('/regVoter/verifyOTP', verifyVoter, (req, res) => {
  if (req.body.code && req.body.code.length === 4) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+${req.body.phone}`,
        code: req.body.code,
      })
      .then(async data => {
        if (data.status === 'approved') {
          console.log('OTP is approved');
          try {
            if (!web3) await init();
            const voterAccount = req.body.VoterEthID;
            console.log(voterAccount);
            // adding voter to blockchain
            const receipt = await electionContract.methods
              .addVoter(voterAccount, req.district)
              .send({ from: adminAccount });
            // console.log(receipt.transactionHash);
            // mark voter as registered in mongoDB
            await Voters.findByIdAndUpdate(req._id, {
              $set: { hasRegistered: true },
            });
            res.status(200).json({
              msg: 'Woohoo! Registration Successful :)',
            });
          } catch (err) {
            console.log(err);
            res.status(400).json(err);
          }
        } else {
          res.status(200).json({
            msg: 'Wrong phone number or code :(',
          });
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(200).json({
      msg: 'Wrong phone number or code :(',
    });
  }
});

// fetch stats
router.get('/fetchStats', async (req, res) => {
  console.log(process.env.STATS_DOC_ID);
  Stats.findById(process.env.STATS_DOC_ID).exec(async (error, stats) => {
    if (error) {
      return res.status(400).json(error);
    }
    if (stats) {
      return res.status(200).json(stats);
    } else {
      // no data found for given Stats ID
      return res.status(400).json({
        msg: 'Invalid Stats ID in env',
      });
    }
  });
});

module.exports = router;
