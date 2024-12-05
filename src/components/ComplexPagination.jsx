import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const ComplexPagination = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
       
    console.log('page: ' + page);
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`join-item btn btn-xs sm:btn-md border-none ${activeClass ? 'btn-active' : ''}`}
        onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = [];
    //első gomb
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }))
    //pontok 1
    if (page > 2) {
      pageButtons.push(<button className='joint-item btn btn-xs sm:btn-md' key='dots-1'>...</button>)
    }
    // aktív gomb
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }))
    }
    //pontok 2
    if (page < pageCount - 1 ) {
      pageButtons.push(<button className='joint-item btn btn-xs sm:btn-md' key='dots-2'>...</button>)
    }
    //utolsó gomb
    if (1 && pageCount >1) {      
      pageButtons.push(addPageButton({ pageNumber: pageCount, activeClass: page === pageCount }))
    }

    return pageButtons;
  }

  // if (pageCount < 2) { return null }

  return (
    <div className='mt-16 flex justify-end'>
      <div className="join">
        <button
          className="join-item btn btn-xs sm:btn-md"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) { prevPage = pageCount }
            handlePageChange(prevPage)
          }}
        >
          <b>⏴</b>
        </button>

        {renderPageButtons()}

        <button
          className="join-item btn btn-xs sm:btn-md"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) { nextPage = 1 }
            handlePageChange(nextPage)
          }}
        >
          <b>⏵</b>
        </button>
      </div>
    </div>
  )
}

export default ComplexPagination;