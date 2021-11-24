import Pagination from './Pagination';
import { useState } from 'react';
import { vote } from '../../actions/smartContract';
import MessageComponent from '../Message';
import LoadingComponent from '../Loading';

const Step2 = props => {
  const voteHandler = async (e, d) => {
    e.preventDefault();
    console.log('Vote for ', d.val);
    setIsLoading(true);
    try {
      const res = await vote(d.val);
      setMessage(res);
    } catch (err) {
      setMessage('Some Error Occured');
    }
    setIsLoading(false);
  };

  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (message) {
    return <MessageComponent msg={message} />;
  }

  return (
    <div>
      <div className='mx-auto max-w-5xl mt-24'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Vote Here
          </h2>
          <p className='font-medium mt-2 text-center text-sm text-indigo-600'>
            Please Select The Candidate{' '}
          </p>
        </div>
        <div className='flex flex-row flex-nowrap items-center justify-between mx-auto'>
          {props.candidates.length > 0 ? (
            <>
              <Pagination
                data={props.candidates}
                pageLimit={5}
                dataLimit={10}
                voteHandler={voteHandler}
              />
            </>
          ) : (
            <h1>No data to display</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
