import { useEffect, useState } from "react";
import { GetSearchResults } from "../../wailsjs/go/main/App";
import { models } from "../../wailsjs/go/models";
import "../css/ManhwaCard.css";
import "../css/Search.css";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { genreMap } from "../libs/categories";

function ManhwaCard({ manhwa }: { manhwa: models.SearchResult }) {
  const displayGenres = manhwa.genres?.slice(0, 2) || [];

  return (
    <Link to={`/details/manhwa/${manhwa.id}`}>
      <div className="manga-card">
        <img
          src={manhwa.cover_image}
          className="manga-cover"
          alt={manhwa.title}
        />

        <span
          className="manga-badge-hot"
          style={{ backgroundColor: "rgba(99, 102, 241, 0.8)" }}
        >
          {manhwa.format.toUpperCase()}
        </span>

        <div className="manga-info-overlay">
          <div className="genre-list">
            {displayGenres.map((g) => (
              <span key={g} className="genre-tag">
                {genreMap[g] || "Extra"}
              </span>
            ))}
          </div>

          <h3 className="manga-title">{manhwa.title}</h3>

          <div className="manga-stats">
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div
                className="status-dot"
                style={{
                  backgroundColor:
                    manhwa.status === "publicandose" ? "#4caf50" : "#ff9800",
                }}
              ></div>
              {manhwa.status}
            </span>
            <span>•</span>
            <span>{manhwa.chapters} Caps</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default function Search() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(0);
  const [validNext, setValidNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [manhwas, setManhwas] = useState<models.SearchData | null>(null);
  const location = useLocation();

  const search = async (reset = false) => {
    if (reset) {
      setPage(0);
    }
    setLoading(true);
    const results = await GetSearchResults(query, page);
    setManhwas(results);
    setValidNext(results.next);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || ((location.state as any)?.q || "");
    setQuery(q);
    // trigger search with reset to ensure page is 0
    search(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  const handleNextPage = () => {
    setPage(page + 1);
    search();
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
    search();
  };
  // When loading, render skeletons inside the page instead of a blocking full-page loader
  return (
    <div id="search-page">
      <search id="search-bar">
        <SearchIcon id="search-icon" size={24} />
        <input
          id="search-input"
          placeholder="Search for a manhwa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button id="search-btn" onClick={() => search(true)}>
          Search
        </button>
      </search>
      {loading && (
        <div className="skeleton-results">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-cover" />
              <div className="skeleton-line" style={{ width: "80%" }} />
              <div className="skeleton-line" style={{ width: "60%" }} />
            </div>
          ))}
        </div>
      )}
      {manhwas && !loading && (
        <div id="card-container">
          {manhwas.results.map((m) => (
            <ManhwaCard key={m.id} manhwa={m} />
          ))}
        </div>
      )}
      <div id="pagination-controls">
        <button className="btn-nav-search" onClick={() => handlePreviousPage()} disabled={loading}>
          Previous
        </button>
        <button
          className="btn-nav-search"
          disabled={!validNext || loading}
          onClick={() => handleNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
