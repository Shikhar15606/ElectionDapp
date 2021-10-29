import { useState } from 'react';
import Step1 from './voterRegistration/Step1';
import Step2 from './voterRegistration/Step2';
import Step3 from './voterRegistration/Step3';
import Step4 from './voterRegistration/Step4';
const VoterRegistration = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState('');
  switch (step) {
    case 1:
      return <Step1 voterId={voterId} setVoterId={setVoterId} />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Step4 />;
    default:
      return <> </>;
  }
};

export default VoterRegistration;
