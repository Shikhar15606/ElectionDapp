import metamask1 from '../img/metamask1.PNG';
import metamask2 from '../img/metamask2.PNG';

const ConnectWallet = () => {
  return (
    <>
      <div className='relative bg-white overflow-hidden bg-transparent'>
        <div className=''>
          <div className='relative z-10 pb-8  sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32'>
            <main className='px-4 sm:px-6 lg:px-8 xl:mt-10'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl'>
                  <span className='block xl:inline'>
                    Sorry! You're not connected to your wallet. <br /> Please
                    follow the steps to connect:
                  </span>
                </h1>
                <div className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  <ul>
                    <li>
                      1. Open Metamask Chrome extension. You'll see a similar
                      page.
                    </li>
                    <div>
                      <img src={metamask1} alt='' />
                    </div>
                    <li>2. Click on Add to Chrome</li>
                    <li>
                      3. It will start downloading. Click on Get Started once
                      downloaded.
                    </li>
                    <div>
                      <img src={metamask2} alt='' />
                    </div>
                    <li>4. Choose the option whether you've a wallet.</li>
                    <li>
                      5. Make sure to keep your private key safe and secure.
                    </li>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;
