import React, {useState, useEffect} from 'react';
import styles from './Pagination.css';


export default function Pagination({ data, title, StatisticsType, StatisticsNumber, pageLimit, dataLimit }) {
    
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    function goToNextPage() {
        if(currentPage < pages)
            setCurrentPage((page) => page + 1);
    }
  
    function goToPreviousPage() {
        if(currentPage > 1)
            setCurrentPage((page) => page - 1);
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
        return new Array(pageLimit<=pages?pageLimit:pages).fill().map((_, idx) => start + idx + 1);
      };
  
      return (
        <div>

         <div>




         <div class="container flex flex-col mx-auto items-center justify-center">
                <div class="flex sm:-mx-6 lg:-mx-8 flex-col lg:flex-shrink md:flex-shrink-0">
                    <div class="py-2 align-middle inline-block sm:px-6 lg:px-8 w-full">
                        <div class="border-b border-gray-200 shadow overflow-hidden sm:rounded-lg">
                            <table className="divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-20 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th class="px-15 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Logo
                                        </th>
                                        <th class="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {title}
                                        </th>
                                        <th class="px-20 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {StatisticsType}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    {getPaginatedData().map((d, idx) => (
                                        <tr key={d.email} class="whitespace-nowrap transition duration-800 ease-in-out hover:bg-indigo-500 transform hover:-translate-y-1 hover:scale-110">
                                        <td class="px-20 py-4 text-sm">
                                            {idx+1+(currentPage-1)*10}.
                                        </td>                                        
                                        <td class="px-15 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={d.image} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-8 py-4">
                                            {d.name}.
                                        </td>              
                                        <td class="px-20 py-4">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {StatisticsNumber}
                                            </span>
                                        </td>
                                        </tr>
                                    ))}                              

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

    
    
          <div>
            <div class=" py-5 flex items-center justify-center">
    
                <div class="text-gray-800 flex items-center space-x-2 select-none">
                    <button class="h-8 w-8 p-1 hover:bg-gray-200 rounded page-control" data-action="minus" onClick={goToPreviousPage}><svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        class={"hover:bg-gray-200  px-2 rounded page-item " + (currentPage === item ? 'bg-gray-300' : '')}
                    >
                        <span>{item}</span>
                    </button>
                    ))}
                    <button class="h-8 w-8 p-1 hover:bg-gray-200 rounded page-control" data-action="plus" onClick={goToNextPage}><svg fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                    </button>
                </div>
            </div>        
          </div>
        </div>           

          
        </div>
      );
}