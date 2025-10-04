import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";

function Header() {
  const [theme, setTheme] = useState("light-theme");
  const [showCategory, setShowCategory] = useState(false);
  const [showCountry, setShowCountry] = useState(false);

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">
        <h1 className="logo-newspaper">News Aggregator</h1>

        <ul className="flex items-center gap-6 font-medium">
          <li>
            <Link to="/" className="hover:text-red-600">
              All News
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => {
                setShowCategory(!showCategory);
                setShowCountry(false);
              }}
              className="hover:text-red-600"
            >
              Top Headlines ▼
            </button>
            {showCategory && (
              <ul className="absolute bg-white dark:bg-gray-800 shadow-lg rounded mt-2 overflow-auto max-h-64 z-50">
                {categories.map((c) => (
                  <li
                    key={c}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Link
                      to={`/top-headlines/${c}`}
                      onClick={() => setShowCategory(false)}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => {
                setShowCountry(!showCountry);
                setShowCategory(false);
              }}
              className="hover:text-red-600"
            >
              Country ▼
            </button>
            {showCountry && (
              <ul className="absolute bg-white dark:bg-gray-800 shadow-lg rounded mt-2 overflow-auto max-h-64 z-50">
                {countries.map((c) => (
                  <li
                    key={c.iso_2_alpha}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Link
                      to={`/country/${c.iso_2_alpha}`}
                      onClick={() => setShowCountry(false)}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={c.png}
                        alt={c.countryName}
                        className="w-5 h-4"
                      />
                      {c.countryName}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() =>
                setTheme(theme === "light-theme" ? "dark-theme" : "light-theme")
              }
            >
              {theme === "light-theme" ? "🌙" : "☀️"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
