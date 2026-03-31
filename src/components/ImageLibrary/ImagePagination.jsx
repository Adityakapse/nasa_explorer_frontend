const ImagePagination = ({ page, onPageChange }) => (
  <div className="flex gap-3 justify-center mt-8">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page <= 1}
      className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 px-4 py-2 rounded-lg transition-colors"
    >
      Previous
    </button>
    <span className="px-4 py-2 text-gray-300">Page {page}</span>
    <button
      onClick={() => onPageChange(page + 1)}
      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
    >
      Next
    </button>
  </div>
);

export default ImagePagination;
