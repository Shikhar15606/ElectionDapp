import Vote from '../components/Vote';
import VoterRegistration from '../components/VoterRegistration';
const VoterCafe = () => {
  return (
    <div className='py-12 bg-white h-screen'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-indigo-50 h-4/5 rounded-3xl shadow-xl flex flex-col justify-center items-center'>
        <Vote />
        <VoterRegistration />
      </div>
    </div>
  );
};

export default VoterCafe;
