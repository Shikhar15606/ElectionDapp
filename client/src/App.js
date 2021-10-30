import React, { useEffect, useState, useCallback } from 'react';
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from './getWeb3';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import SignIn from './components/SignIn';
import VoterCafe from './pages/VoterCafe';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './auth';
import { isAdmin } from './actions/backend';
import Loading from './components/Loading';

// import "./App.css";
// import getWeb3 from "./getWeb3";
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const App = () => {
  const [isLogin, setisLogin] = useState('Loading');

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
    console.log('Check called');
    check();
  }, [check]);

  return (
    <Router>
      <Navbar isLogin={isLogin} setisLogin={setisLogin} />
      <Switch>
        <Route
          exact
          path='/admin'
          component={Auth(AdminDashboard, isLogin, setisLogin, true)}
        />
        <Route
          exact
          path='/login'
          component={Auth(SignIn, isLogin, setisLogin, false)}
        />
        <Route exact path='/voter'>
          <VoterCafe />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

// state = { storageValue: 0, web3: null, accounts: null, contract: null };

// componentDidMount = async () => {
//   try {
//     // Get network provider and web3 instance.
//     const web3 = await getWeb3();

//     // Use web3 to get the user's accounts.
//     const accounts = await web3.eth.getAccounts();

//     // Get the contract instance.
//     const networkId = await web3.eth.net.getId();
//     const deployedNetwork = SimpleStorageContract.networks[networkId];
//     const instance = new web3.eth.Contract(
//       SimpleStorageContract.abi,
//       deployedNetwork && deployedNetwork.address,
//     );

//     // Set web3, accounts, and contract to the state, and then proceed with an
//     // example of interacting with the contract's methods.
//     this.setState({ web3, accounts, contract: instance }, this.runExample);
//   } catch (error) {
//     // Catch any errors for any of the above operations.
//     alert(
//       `Failed to load web3, accounts, or contract. Check console for details.`,
//     );
//     console.error(error);
//   }
// };

// runExample = async () => {
//   const { accounts, contract } = this.state;

//   // Stores a given value, 5 by default.
//   await contract.methods.set(5).send({ from: accounts[0] });

//   // Get the value from the contract to prove it worked.
//   const response = await contract.methods.get().call();

//   render() {
//     // if (!this.state.web3) {
//     //   return <div>Loading Web3, accounts, and contract...</div>;
//     // }
//     return (
//       <div>
//         <div className="App">
//           <Navbar />
//           {/* <h1>Good to Go!</h1>
//           <p>Your Truffle Box is installed and ready.</p>
//           <h2>Smart Contract Example</h2>
//           <p>
//             If your contracts compiled and migrated successfully, below will show
//             a stored value of 5 (by default).
//           </p>
//           <p>
//             Try changing the value stored on <strong>line 42</strong> of App.js.
//           </p> */}
//           {/* <div>The stored value is: {this.state.storageValue}</div> */}
//         </div>
//         <div class="p-8 ...">
//             <Leaderboard />
//         </div>
//       </div>
//     );
//   }
// }
//   // Update state with the result.
//   this.setState({ storageValue: response });
// };

// if (!this.state.web3) {
//   return <div>Loading Web3, accounts, and contract...</div>;
// }
