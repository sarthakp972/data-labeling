function Pagination({ totalItems, itemsPerPage, currentPage, setPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="d-flex justify-content-between mt-3">

      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        Previous
      </button>

      <span className="align-self-center">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        save & Next
      </button>

    </div>
  );
}

export default Pagination;