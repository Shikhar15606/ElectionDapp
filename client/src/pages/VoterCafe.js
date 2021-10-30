import { useState } from 'react';
import Vote from '../components/Vote';
import VoterRegistration from '../components/VoterRegistration';
import Leaderboard from '../components/Leaderboard';
import MessageComponent from '../components/Message';

const VoterCafe = () => {
  // check for phase info from blockchain @Abhishek
  const [phase, setPhase] = useState(1);
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
