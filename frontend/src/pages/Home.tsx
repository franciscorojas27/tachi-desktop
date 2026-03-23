import { useEffect, useState } from "react";
import { models } from "../../wailsjs/go/models";
import { GetManhwaHome } from "../../wailsjs/go/main/App";
import "../css/Home.css";
import { genreMap } from "../libs/categories";
import { useNavigate } from "react-router-dom";

type LastCreated = models.Home["lastCreated"];
type LastCreatedNsfw = models.Home["lastCreatedNsfw"];
type LastUpdated = models.Home["chapters"]["recentEsp"];
type LastUpdatedNsfw = models.Home["chapters"]["recentNsfw"];
type TopRatedWeekend = models.Home["top"]["topWeekend"];
type TopRatedTop = models.Home["top"]["topTotal"];

const genres = ["All", ...Object.values(genreMap)];

export default function Home() {
  const [lastCreated, setLastCreated] = useState<LastCreated>([]);
  const [lastCreatedNsfw, setLastCreatedNsfw] = useState<LastCreatedNsfw>([]);
  const [lastUpdated, setLastUpdated] = useState<LastUpdated>([]);
  const [lastUpdatedNsfw, setLastUpdatedNsfw] = useState<LastUpdatedNsfw>([]);
  const [topRatedWeekend, setTopRatedWeekend] = useState<TopRatedWeekend>([]);
  const [topRatedTop, setTopRatedTop] = useState<TopRatedTop>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const homeData = await GetManhwaHome();
        setLastCreated(homeData.lastCreated || []);
        setLastCreatedNsfw(homeData.lastCreatedNsfw || []);
        setLastUpdated(homeData.chapters?.recentEsp || []);
        setLastUpdatedNsfw(homeData.chapters?.recentNsfw || []);
        setTopRatedWeekend(homeData.top?.topWeekend || []);
        setTopRatedTop(homeData.top?.topTotal || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch home data", err);
        setLoading(false);
      }
    })();
  }, []);

  const navigate = useNavigate();

  function getCategoryLabels(categories?: number[]) {
    if (!categories || categories.length === 0) return "";
    return categories.map((c) => genreMap[c] || String(c)).slice(0, 3).join(" • ");
  }

  function handleNavigate(item: any) {
    if (!item) return;
    if (item.link) {
      navigate(`/chapter/manhwa/${item.link}`);
      return;
    }
    if (item.id) {
      navigate(`/details/manhwa/${item.id}`);
      return;
    }
  }

  const heroItem = lastUpdated[0];
  const gridItems = lastUpdated.slice(1, 5);
  const heroNsfwItem = lastUpdatedNsfw[0];
  const gridNsfwItems = lastUpdatedNsfw.slice(1, 5);

  return (
    <div className="home-container">
      {/* Explore Genres */}
      <section className="home-section">
        <div className="section-header">
          <h2>Explore Genres</h2>
          <button className="view-all-btn">View All ➔</button>
        </div>
        <div className="genres-list">
          {genres.map((genre, index) => (
            <button
              key={genre}
              className={`genre-pill ${index === 0 ? "active" : ""}`}
              onClick={() => {
                if (genre === "All") navigate('/search');
                else navigate(`/search?q=${encodeURIComponent(genre)}`);
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Trending This Week */}
      <section className="home-section">
        <div className="section-header">
          <h2>Trending This Week</h2>
        </div>
        <div className="trending-list">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="trending-card">
                <div className="skeleton-card" style={{ width: 180 }}>
                  <div className="skeleton-cover" style={{ width: 180, height: 260 }} />
                </div>
              </div>
            ))
          ) : (
            topRatedWeekend.map((item, i) => (
              <div key={item.id} className="trending-card" onClick={() => handleNavigate(item)}>
                <img src={item.image} alt={item.name} className="trending-image" />
                <div className="trending-overlay">
                  {i < 3 && <span className="badge">HOT</span>}
                  <h3 className="trending-title">{item.name}</h3>
                  <div className="trending-stats">
                    <span>✨ #{i + 1}</span>
                    <span>👁 {item.caps} Caps</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* New Releases */}
      <section className="home-section">
        <div className="section-header">
          <h2>New Chapters</h2>
          <div className="nav-buttons">
            <button className="nav-btn">{"<"}</button>
            <button className="nav-btn">{">"}</button>
          </div>
        </div>

        <div className="releases-container">
          {/* Hero Release */}
          {loading ? (
            <div className="hero-release">
              <div className="skeleton-cover" style={{ width: '100%', height: 320 }} />
            </div>
          ) : (
            heroItem && (
              <div className="hero-release" onClick={() => handleNavigate(heroItem)}>
                <img src={heroItem.image} alt={heroItem.title} className="hero-bg" />
                <div className="hero-overlay">
                  <span className="hero-badge">• JUST RELEASED</span>
                  <h1 className="hero-title">{heroItem.title}</h1>
                  <p className="hero-desc">
                    Enjoy the latest chapter of {heroItem.title}. Discover more about this amazing {heroItem.type} in our platform!
                  </p>
                  <div className="hero-actions">
                      <button className="hero-btn primary" onClick={(e) => { e.stopPropagation(); handleNavigate(heroItem); }}>Read Ch. {heroItem.chapter}</button>
                    <button className="hero-btn secondary">Add to List</button>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Grid Releases */}
          <div className="grid-releases">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="grid-card">
                    <div className="skeleton-cover" style={{ width: 64, height: 84, borderRadius: 6 }} />
                    <div className="grid-info">
                      <div className="skeleton-line" style={{ width: '60%' }} />
                      <div className="skeleton-line" style={{ width: '40%', marginTop: 8 }} />
                    </div>
                  </div>
                ))
              : gridItems.map((item) => (
                  <div key={item.id} className="grid-card" onClick={() => handleNavigate(item)}>
                    <img src={item.image} alt={item.title} className="grid-image" />
                    <div className="grid-info">
                      <h4 className="grid-title" title={item.title}>{item.title}</h4>
                      <p className="grid-chapter">Ch. {item.chapter} • {item.type}</p>
                      <div style={{ fontSize: '0.75rem', color: '#9aa', marginBottom: '6px' }}>{getCategoryLabels((item as any).categories)}</div>
                      <span className="grid-badge">NEW</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Recently Added Series */}
      <section className="home-section">
        <div className="section-header">
          <h2>Recently Added Series</h2>
        </div>
        <div className="trending-list">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="trending-card">
                  <div className="skeleton-card" style={{ width: 180 }}>
                    <div className="skeleton-cover" style={{ width: 180, height: 260 }} />
                  </div>
                </div>
              ))
            : lastCreated.map((item) => (
                <div key={item.id} className="trending-card" onClick={() => handleNavigate(item)}>
                  <img src={item.image} alt={item.title} className="trending-image" />
                  <div className="trending-overlay">
                    <span className="badge new-badge" style={{background: '#4CAF50'}}>NEW</span>
                    <h3 className="trending-title">{item.title}</h3>
                    <div className="trending-stats">
                      <span>{item.type.toUpperCase()}</span>
                      <span>{item.demography}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9aa', marginTop: '6px' }}>{getCategoryLabels(item.categories)}</div>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Top All Time */}
      <section className="home-section">
        <div className="section-header">
          <h2>Top All Time</h2>
        </div>
        <div className="trending-list">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="trending-card">
                  <div className="skeleton-card" style={{ width: 180 }}>
                    <div className="skeleton-cover" style={{ width: 180, height: 260 }} />
                  </div>
                </div>
              ))
            : topRatedTop.map((item, i) => (
                <div key={item.id} className="trending-card" onClick={() => handleNavigate(item)}>
                  <img src={item.image} alt={item.name} className="trending-image" />
                  <div className="trending-overlay">
                    <span className="badge" style={{background: '#F1C40F', color: '#000'}}>TOP #{i+1}</span>
                    <h3 className="trending-title">{item.name}</h3>
                    <div className="trending-stats">
                      <span>✅ {item.status}</span>
                      <span>👁 {item.caps} Caps</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* NSFW New Releases (Only if data exists) */}
      {lastUpdatedNsfw && lastUpdatedNsfw.length > 0 && (
        <section className="home-section nsfw-section">
          <div className="section-header">
            <h2>NSFW Recent Chapters</h2>
            <span style={{ color: '#ff4757', border: '1px solid #ff4757', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>18+</span>
          </div>

          <div className="releases-container">
            {/* Hero Nsfw Release */}
            {heroNsfwItem && (
              <div className="hero-release" onClick={() => handleNavigate(heroNsfwItem)}>
                <img src={heroNsfwItem.image} alt={heroNsfwItem.title} className="hero-bg" />
                <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(20, 10, 15, 0.95) 30%, rgba(20, 10, 15, 0.7) 70%, transparent)' }}>
                  <span className="hero-badge" style={{ color: '#ff4757' }}>• MATURE CONTENT</span>
                  <h1 className="hero-title">{heroNsfwItem.title}</h1>
                  <p className="hero-desc">
                    A new chapter for {heroNsfwItem.title} is now available. ({heroNsfwItem.type})
                  </p>
                  <div className="hero-actions">
                    <button className="hero-btn primary" style={{ background: '#ff4757', color: 'white' }} onClick={(e) => { e.stopPropagation(); handleNavigate(heroNsfwItem); }}>Read Ch. {heroNsfwItem.chapter}</button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Grid Nsfw Releases */}
            <div className="grid-releases">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="grid-card">
                      <div className="skeleton-cover" style={{ width: 64, height: 84, borderRadius: 6 }} />
                      <div className="grid-info">
                        <div className="skeleton-line" style={{ width: '60%' }} />
                        <div className="skeleton-line" style={{ width: '40%', marginTop: 8 }} />
                      </div>
                    </div>
                  ))
                : gridNsfwItems.map((item) => (
                    <div key={item.id} className="grid-card" onClick={() => handleNavigate(item)}>
                      <img src={item.image} alt={item.title} className="grid-image" />
                      <div className="grid-info">
                        <h4 className="grid-title" title={item.title}>{item.title}</h4>
                        <p className="grid-chapter">Ch. {item.chapter} • {item.demography}</p>
                        <span className="grid-badge" style={{ background: '#301217', color: '#ff6b81' }}>18+</span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* NSFW Recently Added */}
      {lastCreatedNsfw && lastCreatedNsfw.length > 0 && (
        <section className="home-section">
          <div className="section-header">
            <h2>NSFW Recently Added</h2>
          </div>
          <div className="trending-list">
            {lastCreatedNsfw.map((item) => (
              <div key={item.id} className="trending-card" onClick={() => handleNavigate(item)}>
                <img src={item.image} alt={item.title} className="trending-image" />
                <div className="trending-overlay">
                  <span className="badge" style={{background: '#ff4757'}}>18+</span>
                  <h3 className="trending-title">{item.title}</h3>
                  <div className="trending-stats">
                    <span>{item.type.toUpperCase()}</span>
                    <span>{item.demography}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
