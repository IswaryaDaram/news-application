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
    <header className="fixed w-full top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-center py-4">
        <div className="text-3xl tracking-wide text-gray-900 logo-newspaper">
          News Aggregator
        </div>
      </div>

      <div className="w-full border-t border-b bg-white">
        <nav className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 text-gray-800 font-medium overflow-x-auto py-2">
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
                <ul className="absolute bg-white shadow rounded mt-2 text-sm w-44 z-50">
                  {categories.map((cat) => (
                    <li key={cat} className="px-4 py-2 hover:bg-gray-100">
                      <Link
                        to={`/top-headlines/${cat}`}
                        onClick={() => setShowCategory(false)}
                      >
                        {cat}
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
                <ul className="absolute bg-white shadow rounded mt-2 text-sm max-h-64 overflow-auto w-52 z-50">
                  {countries.map((c) => (
                    <li
                      key={c.iso_2_alpha}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
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
                  setTheme(
                    theme === "light-theme" ? "dark-theme" : "light-theme"
                  )
                }
              >
                {theme === "light-theme" ? "🌙" : "☀️"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
