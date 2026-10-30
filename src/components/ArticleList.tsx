import { Link } from "react-router-dom";
import { PRIMARY_ARTICLE, SECONDARY_ARTICLES, type Article } from "../data";

function ArticleItem({ article, withScroll }: { article: Article; withScroll?: boolean }) {
  const scrollProps = withScroll ? { "data-scroll": "", "data-scroll-css-progress": "" } : {};
  return (
    <article className="article-item article-item--std parallax-opacity" {...scrollProps}>
      <Link
        className="article-item__img"
        to={article.href}
        aria-label={article.title}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <picture>
          <img
            loading="lazy"
            className="img-full"
            width={520}
            height={296}
            src={article.img}
            srcSet={article.img2x ? `${article.img} 1x, ${article.img2x} 2x` : undefined}
            alt={article.title}
          />
        </picture>
      </Link>
      <div className="article-item__txt">
        <p className="article-item__title">
          <Link
            to={article.href}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {article.title}
          </Link>
        </p>
        <div className="article-item__meta">
          <p className="article-item__date">{article.date}</p>
          <p className="article-item__term">
            <Link
              className="txt-roll"
              to={article.href}
              data-txt={article.term}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>{article.term}</span>
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ArticleList() {
  return (
    <section id="news" className="section-article-list compact-frame section-colorway-gray">
      <style>{`
        .section-article-list.compact-frame {
          padding: clamp(35px, 5vh, 55px) 0 !important;
        }
        .section-article-list.compact-frame .intro {
          margin-bottom: clamp(14px, 2vh, 22px) !important;
        }
        .section-article-list.compact-frame .intro h2,
        .section-article-list.compact-frame .intro h4 {
          font-size: clamp(2rem, 3vw, 2.7rem);
          line-height: 1.1;
          margin: 0;
        }
        .section-article-list.compact-frame .article-list {
          align-items: stretch;
          gap: clamp(16px, 2.5vw, 32px);
        }
        .section-article-list.compact-frame .article-list__primary {
          width: 38%;
          position: relative;
          top: auto;
        }
        .section-article-list.compact-frame .article-list__primary .article-item {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .section-article-list.compact-frame .article-list__primary .article-item__img {
          height: clamp(260px, 36vh, 320px);
          overflow: hidden;
          position: relative;
        }
        .section-article-list.compact-frame .article-list__primary .article-item__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 85%;
          transition: transform 0.6s ease;
        }
        .section-article-list.compact-frame .article-list__primary:hover .article-item__img img {
          transform: scale(1.04);
        }
        .section-article-list.compact-frame .article-list__primary .article-item__txt {
          padding: 14px 18px !important;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .section-article-list.compact-frame .article-list__primary .article-item__title {
          font-size: clamp(1.15rem, 1.35vw, 1.35rem) !important;
          line-height: 1.25;
          margin-bottom: 6px;
        }
        .section-article-list.compact-frame .article-list__secondary {
          width: 58%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item {
          padding: 7px 0 !important;
          margin: 0 !important;
          display: flex;
          align-items: center;
          gap: 16px;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .section-article-list.compact-frame .article-list__secondary .article-item:first-child {
          border-top: none;
          padding-top: 0 !important;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item__img {
          width: clamp(100px, 10vw, 130px) !important;
          height: clamp(60px, 8vh, 74px) !important;
          max-width: none !important;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item__txt {
          flex-grow: 1;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item__title {
          font-size: clamp(0.95rem, 1.1vw, 1.12rem) !important;
          line-height: 1.2;
          margin-bottom: 2px;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item__meta {
          margin-top: 3px !important;
          gap: 10px;
        }
        .section-article-list.compact-frame .article-list__secondary .article-item__meta p {
          font-size: 0.72rem;
          opacity: 0.75;
        }
        .section-article-list.compact-frame .btn--full {
          margin-top: 8px;
          padding: 9px 20px;
          font-size: 0.85rem;
        }
        @media (max-width: 820px) {
          .section-article-list.compact-frame .article-list {
            flex-direction: column;
          }
          .section-article-list.compact-frame .article-list__primary,
          .section-article-list.compact-frame .article-list__secondary {
            width: 100%;
          }
        }
      `}</style>
      <div className="intro intro--align-left mb-small">
        <div className="intro__content content">
          <h2>
            <em>Presenting</em> Krishna Sheesh Mahal
          </h2>
        </div>
      </div>
      <div className="section section--large">
        <div className="article-list">
          <div className="article-list__primary" data-sticky="true">
            <ArticleItem article={PRIMARY_ARTICLE} />
          </div>
          <div className="article-list__secondary">
            {SECONDARY_ARTICLES.map((a) => (
              <ArticleItem key={a.title} article={a} withScroll />
            ))}
            <div className="mt-tiny parallax-opacity" data-scroll data-scroll-css-progress>
              <Link
                to="/rooms"
                className="btn--full btn btn--regular"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Explore All Offerings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
