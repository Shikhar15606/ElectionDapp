import React, { useCallback, useEffect, useState } from 'react';
import {
  fetchPoliticalParties,
  createParty,
  createCandidate,
} from '../actions/smartContract';

export default function AdminForms(props) {
  const [parties, setParties] = useState([]);
  // ============ party data ===============
  const [logoLink, setlogoLink] = useState();
  const [partyName, setPartyName] = useState();
  const [imageSelected, setImageSelected] = useState();
  // ============ candidate data ===============
  const [candidatefName, setCandidatefName] = useState();
  const [candidatelName, setCandidatelName] = useState();
  const [candidatePin, setCandidatePin] = useState();
  const [candidateParty, setCandidateParty] = useState(-1);
  const [candidateLogoLink, setCandidateLogoLink] = useState();
  const [imageSelected2, setImageSelected2] = useState();

  const createPartyHandler = async e => {
    e.preventDefault();
    props.setIsLoading(true);
    const msg = await createParty(partyName, logoLink);
    await fetchHandler();
    props.setMessage(msg);
    props.setIsLoading(false);
    // clear all the input
    setlogoLink('');
    setPartyName('');
    setImageSelected('');
  };

  const createCandidateHandler = async e => {
    e.preventDefault();
    props.setIsLoading(true);
    const msg = await createCandidate(
      candidatefName + ' ' + candidatelName,
      candidateLogoLink,
      candidatePin,
      candidateParty
    );
    await fetchHandler();
    props.setMessage(msg);
    props.setIsLoading(false);
    // clear all input
    setCandidatefName('');
    setCandidatelName('');
    setCandidatePin('');
    setCandidateParty(-1);
    setCandidateLogoLink('');
    setImageSelected2('');
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'wsxwpnhz');
    formData.append('cloud_name', 'hardik-election');
    fetch('https://api.cloudinary.com/v1_1/hardik-election/image/upload', {
      method: 'post',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        setlogoLink(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadImage2 = () => {
    const formData = new FormData();
    formData.append('file', imageSelected2);
    formData.append('upload_preset', 'wsxwpnhz');
    formData.append('cloud_name', 'hardik-election');
    fetch('https://api.cloudinary.com/v1_1/hardik-election/image/upload', {
      method: 'post',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        setCandidateLogoLink(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchHandler = useCallback(async () => {
    const res = await fetchPoliticalParties(props.contract);
    setParties(res);
  }, [props.contract]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <>
      <div>
        <div className='pt-4 md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-xl font-bold leading-6 text-indigo-600'>
                Party Registration
              </h3>
              <p className='mt-1 text-sm text-gray-600 font-semibold'>
                Enter the Party name alongwith the Electoral symbol
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Party name
                      </label>
                      <input
                        type='text'
                        name='first-name'
                        id='first-name'
                        autoComplete='given-name'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        value={partyName}
                        onChange={e => {
                          setPartyName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Electoral Symbol
                    </label>
                    <div className='mt-1 flex items-center'>
                      <span className='inline-block bg-cover h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                        {logoLink ? (
                          <img src={logoLink} alt='xyz' />
                        ) : (
                          <svg
                            className='h-full w-full text-gray-300'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                          </svg>
                        )}
                      </span>
                      <button
                        type='button'
                        className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={uploadImage}
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Electoral Symbol
                    </label>
                    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                          >
                            <span>Choose a File</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                              onChange={event => {
                                setImageSelected(event.target.files[0]);
                              }}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, etc up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={createPartyHandler}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block bg-gray-50' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6 bg-gray-50'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-xl font-bold leading-6 text-indigo-600'>
                Candidate Registration
              </h3>
              <p className='mt-1 text-sm text-gray-600 font-semibold'>
                Enter the Details of the candidate
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form action='#' method='POST'>
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        First name
                      </label>
                      <input
                        type='text'
                        name='first-name'
                        id='first-name'
                        autoComplete='given-name'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        value={candidatefName}
                        onChange={e => {
                          setCandidatefName(e.target.value);
                        }}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='last-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <input
                        type='text'
                        name='last-name'
                        id='last-name'
                        autoComplete='family-name'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        value={candidatelName}
                        onChange={e => {
                          setCandidatelName(e.target.value);
                        }}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Registered Political Party
                      </label>
                      <select
                        id='country'
                        name='country'
                        autoComplete='country-name'
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={candidateParty}
                        onChange={e => {
                          setCandidateParty(e.target.value);
                        }}
                      >
                        {parties.map((party, id) => (
                          <option key={id} value={party.val}>
                            {party.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium text-gray-700'
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        autoComplete='postal-code'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        value={candidatePin}
                        onChange={e => setCandidatePin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {candidateParty == -1 ? (
                  <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Electoral Symbol
                      </label>
                      <div className='mt-1 flex items-center'>
                        <span className='inline-block bg-cover h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                          {candidateLogoLink ? (
                            <img src={candidateLogoLink} alt='xyz' />
                          ) : (
                            <svg
                              className='h-full w-full text-gray-300'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                            </svg>
                          )}
                        </span>
                        <button
                          type='button'
                          className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          onClick={uploadImage2}
                        >
                          Upload
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Electoral Symbol
                      </label>
                      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                        <div className='space-y-1 text-center'>
                          <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                          >
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className='flex text-sm text-gray-600'>
                            <label
                              htmlFor='file-upload2'
                              className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                            >
                              <span>Choose a File</span>
                              <input
                                id='file-upload2'
                                name='file-upload2'
                                type='file'
                                className='sr-only'
                                onChange={event => {
                                  setImageSelected2(event.target.files[0]);
                                }}
                              />
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs text-gray-500'>
                            PNG, JPG, etc up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={createCandidateHandler}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
