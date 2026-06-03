export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
      <button
        className="btn btn-outline-dark btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {pages.map(p => (
        <button
          key={p}
          className={`btn btn-sm ${p === currentPage ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="btn btn-outline-dark btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}
