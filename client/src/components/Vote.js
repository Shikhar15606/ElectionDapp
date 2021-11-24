import { useState } from 'react';
import Step1 from './vote/Step1';
import Step2 from './vote/Step2';

const Voter = props => {
  const [ethereumId, setEthereumId] = useState('');
  const [step, setStep] = useState(1);
  const [candidates, setCandidates] = useState([]);

  switch (step) {
    case 1:
      return (
        <Step1
          ethereumId={ethereumId}
          setEthereumId={setEthereumId}
          step={step}
          setStep={setStep}
          candidates={candidates}
          setCandidates={setCandidates}
        />
      );
    case 2:
      return <Step2 candidates={candidates} setStep={setStep} />;
    default:
      return <></>;
  }
};

export default Voter;
