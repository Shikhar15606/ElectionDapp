import { useState } from 'react';
import Vote from '../components/Vote';
import VoterRegistration from '../components/VoterRegistration';
const VoterCafe = () => {
  // check for phase info from blockchain

  const [phase, setPhase] = useState(1);
  return <>{phase === 1 ? <Vote /> : <VoterRegistration />}</>;
};

export default VoterCafe;
