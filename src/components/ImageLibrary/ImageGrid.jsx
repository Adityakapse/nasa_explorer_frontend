const ImageGrid = ({ items, onSelect }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.map((item) => {
      const meta = item.data[0];
      const thumb = item.links?.[0]?.href;
      return (
        <div
          key={meta.nasa_id}
          className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onSelect(item)}
        >
          {thumb && <img src={thumb} alt={meta.title} className="w-full h-48 object-cover" />}
          <div className="p-3">
            <p className="text-xs text-white font-medium truncate">{meta.title}</p>
            <p className="text-xs text-gray-500">{meta.date_created?.slice(0, 10)}</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default ImageGrid;
