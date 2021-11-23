import React, { useState } from 'react';

export default function Pagination({
  data,
  pageLimit,
  dataLimit,
  voteHandler,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    if (currentPage < pages) setCurrentPage(page => page + 1);
  }

  function goToPreviousPage() {
    if (currentPage > 1) setCurrentPage(page => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit <= pages ? pageLimit : pages)
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  return (
    <div className='flex-1 mt-6'>
      <div className='flex flex-1 border-b border-gray-200 shadow-md overflow-hidden rounded-lg'>
        <table className='flext w-full flex-1'>
          <thead className='bg-indigo-200  w-full flex-1 h-16'>
            <tr className='w-full flex-1 justify-around items-center text-center text-sm text-black'>
              <th>Symbol</th>
              <th>Name</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody class='bg-white'>
            {getPaginatedData().map((d, idx) => (
              <tr
                key={toString(d.val)}
                class='group flex-1 justify-around items-center border-gray-400 text-center whitespace-nowrap h-20 md:h-24 transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white transform hover:scale-y-110 shadow-md hover:font-bold'
              >
                <td>
                  <div className='flex flex-1 items-center justify-center'>
                    <img
                      className='h-12 w-12 md:h-16 md:w-16 rounded-full transform group-hover:scale-x-110 ease-in-out duration-300'
                      src={d.logoLink}
                      alt=''
                    />
                  </div>
                </td>
                <td>{d.name}.</td>
                <td>
                  <button
                    className='justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={e => voteHandler(e, d)}
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class=' py-5 flex items-center justify-center'>
        <div class='text-gray-800 flex items-center space-x-2 select-none'>
          <button
            class='h-8 w-8 p-1 hover:bg-gray-200 rounded page-control'
            data-action='minus'
            onClick={goToPreviousPage}
          >
            <svg fill='currentColor' viewBox='0 0 20 20'>
              <path
                fill-rule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              class={
                'hover:bg-gray-200  px-2 rounded page-item ' +
                (currentPage === item ? 'bg-gray-300' : '')
              }
            >
              <span>{item}</span>
            </button>
          ))}
          <button
            class='h-8 w-8 p-1 hover:bg-gray-200 rounded page-control'
            data-action='plus'
            onClick={goToNextPage}
          >
            <svg fill='currentColor' viewBox='0 0 20 20'>
              <path
                fill-rule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
