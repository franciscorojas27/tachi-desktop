import { useState, useEffect, useRef } from "react";
import { GetManhwaView } from "../../wailsjs/go/main/App";
import { Link, useParams } from "react-router-dom";
import { models } from "../../wailsjs/go/models";
import "../css/ManhwaView.css";
import { ArrowLeft } from "lucide-react";

export default function ManhwaView() {
  const [manhwaChapter, setManhwaChapter] = useState<
    models.ManhwaView | undefined
  >();
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  if (!id) return null;

  const getChapter = async () => {
    const result = await GetManhwaView(id);
    setManhwaChapter(result);
  };

  useEffect(() => {
    getChapter();
    setScrollProgress(0);
  }, [id]);

  useEffect(() => {
    // Buscamos el elemento que tiene el scroll.
    // En Wails suele ser un ID como "root", "app" o el body directamente.
    const scrollContainer =
      document.querySelector(".view-cotainer")?.parentElement || window;

    const handleScroll = () => {
      const target =
        scrollContainer === window
          ? document.documentElement
          : (scrollContainer as HTMLElement);

      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight - target.clientHeight;

      if (scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(progress);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [manhwaChapter]);
  if (!manhwaChapter) {
    return (
      <div className="view-cotainer">
        <div className="progress-container">
          <div className="progress-bar skeleton-line" style={{ width: `0%` }} />
        </div>
        <header>
          <div className="skeleton-back" />
          <h1 className="skeleton-title short">&nbsp;</h1>
          <div className="skeleton-chapter-number small" />
        </header>
        <div className="images">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-image" />
          ))}
        </div>
        <footer>
          <div className="skeleton-link" />
          <div className="skeleton-link" />
        </footer>
      </div>
    );
  }
  return (
    <div className="view-cotainer" ref={containerRef}>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <header>
        <Link to={`/details/manhwa/${manhwaChapter?.id}`} className="back-link">
          <ArrowLeft size={24} />
        </Link>
        <h1 id="title">{manhwaChapter?.name || "Loading..."}</h1>
        <span className="chapter">{manhwaChapter?.chapter}</span>
      </header>
      <div className="images">
        {manhwaChapter?.images.map((page, index) => (
          <img key={index} src={page} alt="Page" className="manhwa-image" />
        ))}
      </div>
      <footer>
        <Link
          to={
            manhwaChapter?.navigation.PreviousChapter.id === "no_hay"
              ? "#"
              : `/chapter/manhwa/${manhwaChapter?.navigation.PreviousChapter.id}`
          }
          className={`nav-link ${manhwaChapter?.navigation.PreviousChapter.id === "no_hay" ? "disabled" : ""}`}
        >
          Previous Chapter
          <span>
            {manhwaChapter?.navigation.PreviousChapter.id === "no_hay"
              ? "First Chapter"
              : manhwaChapter?.navigation.PreviousChapter.chapter}
          </span>
        </Link>
        <Link
          to={
            manhwaChapter?.navigation.NextChapter.id === "no_hay"
              ? "#"
              : `/chapter/manhwa/${manhwaChapter?.navigation.NextChapter.id}`
          }
          className={`nav-link ${manhwaChapter?.navigation.NextChapter.id === "no_hay" ? "disabled" : ""}`}
        >
          Next Chapter
          <span>
            {manhwaChapter?.navigation.NextChapter.id === "no_hay"
              ? "See Later"
              : manhwaChapter?.navigation.NextChapter.chapter}
          </span>
        </Link>
      </footer>
    </div>
  );
}
