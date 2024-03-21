import React, { FC } from "react";

const Pagination= ({
  page,
  totalPages,
  onPageChangeHandler,
  }) => {
  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChangeHandler(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChangeHandler(page + 1);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 0; i <= totalPages-1; i++) {
      const ButtonClass = i === page ? "active" : "";
      if(i<= 5){
        buttons.push(
          <button
            key={i}
            className={ButtonClass}
            onClick={() => onPageChangeHandler(i+1)}
          >
            {i+1}
          </button>
        );
      }else if (totalPages-5 <= i){
        buttons.push(
          <button
            key={i}
            className={ButtonClass}
            onClick={() => onPageChangeHandler(i+1)}
          >
            {i+1}
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="pagination" style={{ textAlign: "center", marginBottom: "10px" }}>
      <span>{`Page ${page} of ${totalPages}:`}</span>
      <>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          prev
        </button>
        {renderPageButtons()}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          next
        </button>
      </>
    </div>
  );
};
export default Pagination;