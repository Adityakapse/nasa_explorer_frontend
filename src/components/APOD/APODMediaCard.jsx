const APODMediaCard = ({ data }) => (
  <div className="bg-gray-800 rounded-2xl overflow-hidden">
    {data.media_type === 'video' ? (
      data.url.includes('youtube') || data.url.includes('vimeo') ? (
        <iframe
          src={data.url}
          title={data.title}
          className="w-full h-96"
          allowFullScreen
        />
      ) : (
        <video controls className="w-full max-h-96">
          <source src={data.url} />
        </video>
      )
    ) : (
      <img src={data.url} alt={data.title} className="w-full object-cover max-h-[600px]" />
    )}
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <span className="text-gray-400 text-sm">{data.date}</span>
      </div>
      {data.copyright && (
        <p className="text-gray-500 text-sm mb-3">© {data.copyright}</p>
      )}
      <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
    </div>
  </div>
);

export default APODMediaCard;
