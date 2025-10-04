import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function CountryNews() {
  const { iso } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 12;
  const API_KEY = "8b89f26f798b43dbbccee3e1abd8e73f"; // <-- Replace with your API key

  // Reset page when country changes
  useEffect(() => {
    setPage(1);
  }, [iso]);

  useEffect(() => {
    if (!iso) return;

    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const countryCode = iso.toLowerCase(); // NewsAPI expects lowercase

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${countryCode}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const json = await response.json();

        if (json.status === "ok" && json.articles?.length > 0) {
          setData(json.articles);
          setTotalResults(json.totalResults);
        } else {
          setData([]);
          setTotalResults(0);
          setError("No articles found for this country.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [iso, page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, Math.ceil(totalResults / pageSize)));

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4 sm:px-6 lg:px-8">
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      {isLoading ? (
        <Loader />
      ) : data.length > 0 ? (
        <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
          {data.map((article, index) => (
            <EverythingCard
              key={index}
              title={article.title}
              description={article.description}
              urlToImage={article.urlToImage}
              publishedAt={article.publishedAt}
              url={article.url}
              author={article.author}
              source={article.source}
            />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-700">
            No articles found for this country.
          </p>
        )
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
            Page {page} of {Math.ceil(totalResults / pageSize)}
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

export default CountryNews;
