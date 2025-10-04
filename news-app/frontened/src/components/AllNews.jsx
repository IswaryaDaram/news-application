import React, { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 12;

  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `https://news-aggregator-dusky.vercel.app/all-news?page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok");
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.totalResults);
          setData(json.data.articles);
        } else {
          setError(json.message || "An error occurred");
        }
      })
      .catch((err) => setError("Failed to fetch news."))
      .finally(() => setIsLoading(false));
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4 sm:px-6 lg:px-8">
      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid gap-8 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
          {data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                urlToImage={element.urlToImage} // <-- corrected prop
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source} // <-- pass entire source object
              />
            ))
          ) : (
            <p className="text-center text-gray-700 col-span-full">
              No news articles available.
            </p>
          )}
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-10 my-12 items-center">
          <button
            disabled={page <= 1}
            onClick={handlePrev}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 hover:bg-gray-400"
          >
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
            className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 hover:bg-gray-400"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default AllNews;
