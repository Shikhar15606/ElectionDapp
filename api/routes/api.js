const express = require('express');
const router = express.Router();
// const Provider = require('@truffle/hdwallet-provider');

// const privateKey = process.env.PRIVATEKEY;
// const url = process.env.BLOCKCHAINURL;
// const address = process.env.ADDRESS;

router.get('/', (req, res, next) => res.json({ msg: 'Application Running' }));

router.get('/test/', async (req, res, next) => {
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

module.exports = router;
