import { useState, useEffect } from 'react';
import Vote from '../components/Vote';
import VoterRegistration from '../components/VoterRegistration';
import Leaderboard from '../components/Leaderboard';
import MessageComponent from '../components/Message';
import { getPhase } from '../actions/smartContract';

const VoterCafe = props => {
  // check for phase info from blockchain @Abhishek
  const [phase, setPhase] = useState(1);
  console.log(phase);
  useEffect(() => {
    console.log('phase => ' + phase);

    // Effect callbacks are synchronous to prevent race conditions. Therefore Putting the async function inside:
    async function fetchData() {
      const newPhase = await getPhase(props.contract);
      console.log('typeof newPhase ' + typeof newPhase);
      setPhase(parseInt(newPhase));
      console.log('typeof newPhase ' + typeof newPhase);
    }
    fetchData();
    console.log('typeof' + typeof phase);
    console.log('cur phs' + phase);
  }, [setPhase, props.contract]);

  switch (phase) {
    case 1:
      return <VoterRegistration />;
    case 2:
      return <Vote />;
    case 3:
      return <MessageComponent msg='Results will be declared soon ...' />;
    case 4:
      return <Leaderboard />;
    default:
      return <></>;
  }
};

export default VoterCafe;
