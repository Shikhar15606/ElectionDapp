import React, { useEffect, useState, useCallback } from 'react';
import ElectionContract from './contracts/Election.json';
import getWeb3 from './getWeb3';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import VoterCafe from './pages/VoterCafe';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './auth';
import { isAdmin } from './actions/backend';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setInFile } from './actions/smartContract';
import ConnectWallet from './components/ConnectWallet.js';
import './components/Pagination.css';
const App = () => {
  const [isLogin, setisLogin] = useState('Loading');
  // ===================== web 3 ========================
  const [web3, setweb3] = useState(null);
  const [accounts, setaccounts] = useState(null);
  const [contract, setContract] = useState(null);
  // ===================== setInfile ====================
  useEffect(() => {
    setInFile(web3, accounts, contract);
  }, [web3, accounts, contract]);

  const init = useCallback(async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.

      setweb3(web3);
      setaccounts(accounts);
      setContract(instance);

      // this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const check = useCallback(async () => {
    try {
      const res = await isAdmin();
      setisLogin(res);
    } catch (err) {
      console.log(err);
      setisLogin(false);
    }
  }, [setisLogin]);

  useEffect(() => {
    check();
  }, [check]);

  if (!web3) {
    return (
      <div className='center'>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <Router>
      <Navbar isLogin={isLogin} setisLogin={setisLogin} />
      <Switch>
        <Route
          exact
          path='/admin'
          component={Auth(AdminDashboard, isLogin, setisLogin, true, contract)}
        />
        <Route
          exact
          path='/login'
          component={Auth(SignIn, isLogin, setisLogin, false)}
        />
        <Route exact path='/voter'>
          <VoterCafe contract={contract} />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
