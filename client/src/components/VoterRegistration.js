import { useState } from 'react';
import Step1 from './voterRegistration/Step1';
import Step2 from './voterRegistration/Step2';
const VoterRegistration = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState('');
  const [ethereumId, setEthereumId] = useState('');
  const [otp, setotp] = useState();
  const [phone, setphone] = useState();
  const [district, setDistrict] = useState();

  const handleSendOTP = (_district, _phone) => {
    setStep(2);
    setDistrict(_district);
    setphone(_phone);
    console.log('Inside handleSendOTP and district is => ' + district);
    console.log('Inside handleSendOTP and phone is => ' + phone);
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
        <Step2 phone={phone} district={district} otp={otp} setotp={setotp} />
      );
    default:
      return <> </>;
  }
};

export default VoterRegistration;
