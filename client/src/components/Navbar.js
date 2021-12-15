import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { logout } from '../actions/backend';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = props => {
  const location = useLocation();

  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: false },
    { name: "Voters's Cafe", href: '/voter', current: false },
    { name: "Admin's Den", href: '/admin', current: false },
  ]);

  useEffect(() => {
    if (location.pathname === '/') {
      setNavigation(navigation => {
        let newNavigation = [...navigation];
        newNavigation[0].current = true;
        newNavigation[1].current = false;
        newNavigation[2].current = false;
        return newNavigation;
      });
    } else if (location.pathname === '/voter') {
      setNavigation(navigation => {
        let newNavigation = [...navigation];
        newNavigation[0].current = false;
        newNavigation[1].current = true;
        newNavigation[2].current = false;
        return newNavigation;
      });
    } else if (
      location.pathname === '/admin' ||
      location.pathname === '/login'
    ) {
      setNavigation(navigation => {
        let newNavigation = [...navigation];
        newNavigation[0].current = false;
        newNavigation[1].current = false;
        newNavigation[2].current = true;
        return newNavigation;
      });
    } else {
      setNavigation(navigation => {
        let newNavigation = [...navigation];
        newNavigation[0].current = false;
        newNavigation[1].current = false;
        newNavigation[2].current = false;
        return newNavigation;
      });
    }
  }, [location, setNavigation]);

  const logoutHandler = async e => {
    e.preventDefault();
    const res = await logout();
    if (res.msg !== 'Logout Success') {
      console.log('Some Error Occured');
    } else {
      props.setisLogin(false);
    }
  };

  return (
    <Disclosure as='nav' className='bg-wh mb-16'>
      {({ open }) => (
        <>
          <div className='mx-auto bg-white px-2 sm:px-6 lg:px-8 shadow-md fixed top-0 w-screen z-50'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                    alt='Workflow'
                  />
                  <img
                    className='hidden lg:block h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                    alt='Workflow'
                  />
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-indigo-600'
                            : 'text-gray-900 hover:bg-indigo-600 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {props.isLogin && (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <button
                    className='justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden fixed bg-white top-16 w-screen z-50'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-600 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
