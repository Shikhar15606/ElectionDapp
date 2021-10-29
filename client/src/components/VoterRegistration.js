import { useState } from 'react';
import Step1 from './voterRegistration/Step1';
import Step2 from './voterRegistration/Step2';
const VoterRegistration = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState('');
  const [ethereumId, setEthereumId] = useState('');
  const [otp, setotp] = useState();
  switch (step) {
    case 1:
      return (
        <Step1
          voterId={voterId}
          setVoterId={setVoterId}
          ethereumId={ethereumId}
          setEthereumId={setEthereumId}
          step={step}
          setStep={setStep}
        />
      );
    case 2:
      return <Step2 otp={otp} setotp={setotp} />;
    default:
      return <> </>;
  }
};

export default VoterRegistration;
