import { Link } from 'react-router-dom';
import landing from '../img/vote.jpg';

const Hero = () => {
  return (
    <>
      <div className='relative bg-white overflow-hidden bg-transparent'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8  sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <main className='my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>Empowering India</span>{' '}
                  <span className='block text-indigo-600 xl:inline'>
                    Through Blockchain
                  </span>
                </h1>
                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  We conduct secure and fair elections all over India by
                  leveraging the power of the ethereum blockchain. We handle all
                  the election work, from verifying your voter identity to
                  ensuring that your vote contributes to the election results.
                </p>
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                  <div className='rounded-md shadow'>
                    <Link
                      to='/voter'
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
                    >
                      Voter's Cafe
                    </Link>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:ml-3'>
                    <Link
                      to='/admin'
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'
                    >
                      Admin's Den
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-4'>
        <img
          className='h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-white'
          src={landing}
          alt=''
        />
      </div>
    </>
  );
};

export default Hero;
