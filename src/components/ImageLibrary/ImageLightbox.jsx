const ImageLightbox = ({ item, onClose }) => {
  const meta = item.data[0];
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl overflow-hidden max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.links?.[0]?.href}
          alt={meta.title}
          className="w-full max-h-[60vh] object-contain"
        />
        <div className="p-6">
          <p className="font-semibold text-lg">{meta.title}</p>
          <p className="text-gray-400 text-sm mb-3">{meta.date_created?.slice(0, 10)} · {meta.center}</p>
          <p className="text-gray-300 text-sm line-clamp-4">{meta.description}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageLightbox;
