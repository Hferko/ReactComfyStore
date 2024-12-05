import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {  
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  
  const oldalak = Array.from({ length: pageCount }, (value, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);

    console.log(searchParams);
    console.log(pathname);
    console.log(pageNumber);
    console.log('page: ' + page);
  }

  if (pageCount < 2) { return null }

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
          <b>«</b>
        </button>

        {oldalak.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-xs sm:btn-md ${pageNumber === page ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          )
        })}

        <button
          className="join-item btn btn-xs sm:btn-md"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) { nextPage = 1 }
            handlePageChange(nextPage)
          }}
        >
          <b>»</b>
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer;