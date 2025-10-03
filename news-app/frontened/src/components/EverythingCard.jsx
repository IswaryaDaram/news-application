import React from "react";

function EverythingCard({
  title,
  description,
  imgUrl,
  publishedAt,
  url,
  author,
  source,
}) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200 bg-white flex flex-col">
      {imgUrl && (
        <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-700 flex-1">
          {description || "No description available."}
        </p>
        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
          <span>{author ? `By ${author}` : "Unknown Author"}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-red-600 font-medium hover:underline"
        >
          Read More
        </a>
        <span className="mt-2 text-xs text-gray-400">{source}</span>
      </div>
    </div>
  );
}

export default EverythingCard;
