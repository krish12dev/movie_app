import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ page, totalPages, totalMovies, setPage }) => {
  console.log({ page, setPage });
  const handleClick = (event, num) => {
    debugger;
    event.preventDefault(); // Prevents the default action of the link
    setPage(() => num);
    // You can now use the value of `num` as needed
  };
  const handlePreviousPage = (e) => {
    e.preventDefault();

    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">1</span>
            to
            <span class="font-medium">10</span>
            of
            <span class="font-medium">{totalMovies}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              onClick={(e) => handlePreviousPage(e)}
              href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
            {Array.from({ length: totalPages }, (_, index) => index + 1)?.map(
              (num) => {
                console.log({ check: page === num, page, num });
                return page === num ? (
                  <Link
                    onClick={(e) => handleClick(e, num)}
                    href="#"
                    aria-current="page"
                    class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {num}
                  </Link>
                ) : (
                  <Link
                    href="#"
                    onClick={(e) => handleClick(e, num)}
                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    {num}
                  </Link>
                );
              }
            )}

            <Link
              to="#"
              onClick={(e) => handleNextPage(e)}
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
