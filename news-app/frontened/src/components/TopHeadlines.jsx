import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function TopHeadlines() {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6;

  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `http://localhost:3000/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject("Network error")))
      .then((json) => {
        if (json.success && json.data.articles) {
          setData(json.data.articles);
          setTotalResults(json.data.totalResults);
        } else {
          setError(json.message || "Error fetching headlines");
        }
      })
      .catch(() => setError("Failed to fetch news"))
      .finally(() => setIsLoading(false));
  }, [category, page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
          {data.length > 0 ? (
            data.map((el, i) => <EverythingCard key={i} {...el} />)
          ) : (
            <p className="text-center">No articles found.</p>
          )}
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            onClick={handlePrev}
            className="pagination-btn"
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;
