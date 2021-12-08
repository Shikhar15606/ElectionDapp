import { useState } from 'react';
import Step1 from './voterRegistration/Step1';
import Step2 from './voterRegistration/Step2';
const VoterRegistration = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState('');
  const [ethereumId, setEthereumId] = useState('');
  const [otp, setotp] = useState();
  const [phone, setphone] = useState();

  const handleSendOTP = _phone => {
    setStep(2);
    setphone(_phone);
  };

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
          onSendOTP={handleSendOTP}
        />
      );
    case 2:
      return (
        <Step2
          phone={phone}
          VoterEthID={ethereumId}
          otp={otp}
          setotp={setotp}
        />
      );
    default:
      return <> </>;
  }
};

export default VoterRegistration;
