import { Link, useNavigate, useParams } from "react-router-dom";
import { GetManhwaDetails } from "../../wailsjs/go/main/App";
import { models } from "../../wailsjs/go/models";
import { useEffect, useState } from "react";
import "../css/ManhwaDetails.css";
import { ChevronDown } from "lucide-react";

export default function ManhwaDetails() {
  const [manhwaDetails, setManhwaDetails] = useState<
    models.ManhwaDetails | undefined
  >();
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/", {
        replace: true,
        state: { from: window.location.pathname },
      });
    }
  }, [id, navigate]);

  const getDetails = async () => {
    if (!id) return;
    try {
      const details = await GetManhwaDetails(id);
      setManhwaDetails(details);
    } catch (e) {
      console.error("failed to load details", e);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  if (!manhwaDetails) {
    return (
      <div className="manhwa-details">
        <div className="manhwa-hero skeleton-hero">
          <div className="hero-content">
            <div className="skeleton-cover" />
            <div className="manhwa-meta">
              <div className="skeleton-tag-row">
                <div className="skeleton-tag" />
                <div className="skeleton-tag" />
                <div className="skeleton-tag" />
              </div>
              <div className="skeleton-title" />
              <div className="skeleton-subtitle" />
              <div className="skeleton-actions">
                <div className="skeleton-btn" />
                <div className="skeleton-btn small" />
              </div>
              <div className="skeleton-paragraph">
                <div className="line" />
                <div className="line" />
                <div className="line short" />
              </div>
            </div>
          </div>
        </div>

        <div className="chapters">
          <div className="chapters-header">
            <h2>Capítulos</h2>
            <div className="chapters-controls">
              <div className="skeleton-small" />
            </div>
          </div>

          <div className="chapter-list">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="chapter-card skeleton-card" key={i}>
                <div className="chapter-left">
                  <div className="skeleton-chapter-number" />
                  <div className="chapter-info">
                    <div className="skeleton-line short" />
                    <div className="skeleton-line shorter" />
                  </div>
                </div>
                <div className="chapter-actions">
                  <div className="skeleton-btn small" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const chapters = (manhwaDetails.chapters || []).slice();
  const sortedChapters = chapters
    .slice()
    .sort((a, b) =>
      sortOrder === "desc"
        ? (b.chapter || 0) - (a.chapter || 0)
        : (a.chapter || 0) - (b.chapter || 0),
    );
  const visible = sortedChapters.slice(0, visibleCount);
  const hasMore = sortedChapters.length > visible.length;

  const toggleSort = () => setSortOrder((s) => (s === "desc" ? "asc" : "desc"));

  return (
    <div className="manhwa-details">
      <div
        className="manhwa-hero"
        style={{ backgroundImage: `url(${manhwaDetails.image || ""})` }}
      >
        <div className="hero-content">
          <img
            className="manhwa-cover"
            src={manhwaDetails.image}
            alt={manhwaDetails.name}
          />
          <div className="manhwa-meta">
            <div className="manhwa-tags">
              {manhwaDetails.demography && (
                <span className="tag">{manhwaDetails.demography}</span>
              )}
              {manhwaDetails.categories?.slice(0, 5).map((c) => (
                <span key={c.id} className="tag">
                  {c.name}
                </span>
              ))}
              <span className="status-pill">
                {manhwaDetails.status || "Desconocido"}
              </span>
            </div>

            <h1 className="manhwa-title">{manhwaDetails.name}</h1>
            {manhwaDetails.the_real_name && (
              <div className="manhwa-subtitle">
                {manhwaDetails.the_real_name}
              </div>
            )}

            <div className="manhwa-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  const first = chapters[0];
                  if (first?.link) window.open(first.link, "_blank");
                }}
              >
                Leer Capítulo 1
              </button>
              <button className="btn-ghost">Seguir</button>
            </div>

            <p className="manhwa-synopsis">{manhwaDetails.synopsis}</p>
          </div>
        </div>
      </div>

      <div className="chapters">
        <div className="chapters-header">
          <h2>Capítulos</h2>
          <div className="chapters-controls">
            <button
              className="sort-btn"
              onClick={toggleSort}
              aria-pressed={sortOrder === "asc"}
            >
              {sortOrder === "desc" ? "Fin → Inicio" : "Inicio → Fin"}
            </button>
            <div className="count">{manhwaDetails.chapter_count} capítulos</div>
          </div>
        </div>

        <div className="chapter-list">
          {visible.map((ch) => (
            <div className="chapter-card" key={ch.chapter + String(ch.create)}>
              <div className="chapter-left">
                <div className="chapter-number">{ch.chapter}</div>
                <div className="chapter-info">
                  <div className="chapter-title">Capítulo {ch.chapter}</div>
                  <div className="chapter-meta">
                    Publicado: {new Date(ch.create || 0).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="chapter-actions">
                <Link className="btn-ghost" to={`/chapter/manhwa/${ch.link}`}>
                  Leer
                </Link>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            className="load-more"
            onClick={() => setVisibleCount((v) => v + 8)}
          >
            <ChevronDown size={24} />
            Cargar más capítulos
          </button>
        )}
      </div>
    </div>
  );
}
