import { useState } from 'react';
import Step1 from './vote/Step1';
import Step2 from './vote/Step2';
const Voter = props => {
  const [ethereumId, setEthereumId] = useState('');
  const [step, setStep] = useState(1);
  const [candidates, setCandidates] = useState([
    {
      name: 'Alice',
      party: 'BJP',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Alice',
      party: 'BJP',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Alice',
      party: 'BJP',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Alice',
      party: 'BJP',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Alice',
      party: 'BJP',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]);
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
      return <Step2 candidates={candidates} />;
    default:
      return <> </>;
  }
};

export default Voter;
