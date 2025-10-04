import React from "react";

function EverythingCard({
  title,
  description,
  urlToImage,
  publishedAt,
  url,
  author,
  source,
}) {
  return (
    <div className="card border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200 flex flex-col">
      {urlToImage ? (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-[var(--text-color)] mb-2 line-clamp-2">
          {title || "No Title"}
        </h2>
        <p className="text-gray-700 flex-1 line-clamp-3">
          {description || "No description available."}
        </p>

        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
          <span>{author ? `By ${author}` : "Unknown Author"}</span>
          <span>
            {publishedAt ? new Date(publishedAt).toLocaleDateString() : ""}
          </span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-redHighlight font-medium hover:underline"
        >
          Read More
        </a>

        <span className="mt-2 text-xs text-gray-400">
          {source?.name || "Unknown Source"}
        </span>
      </div>
    </div>
  );
}

export default EverythingCard;
