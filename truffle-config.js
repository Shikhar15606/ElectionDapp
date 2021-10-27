const path = require('path');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.MNEMONIC;
const url = process.env.BLOCKCHAINURL;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      port: 7545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, url);
      },
      network_id: 4,
    },
  },
};
