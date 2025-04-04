const Pagination: React.FC<{ 
  currentPage: number; 
  setCurrentPage: (page: number) => void; 
  totalPages: number;
}> = ({ currentPage, setCurrentPage, totalPages }) => {

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(2);

      if (currentPage > 4) pages.push("...");

      for (
        let i = Math.max(3, currentPage - 1);
        i <= Math.min(totalPages - 2, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
      <button
        className="px-3 py-1 rounded-md border border-gray-400 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {generatePageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">...</span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page as number)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-1 rounded-md border border-gray-400 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
