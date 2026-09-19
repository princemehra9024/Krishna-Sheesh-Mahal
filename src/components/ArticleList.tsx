import { PRIMARY_ARTICLE, SECONDARY_ARTICLES, type Article } from "../data";

function ArticleItem({ article, withScroll }: { article: Article; withScroll?: boolean }) {
  const scrollProps = withScroll ? { "data-scroll": "", "data-scroll-css-progress": "" } : {};
  return (
    <article className="article-item article-item--std parallax-opacity" {...scrollProps}>
      <a className="article-item__img" href={article.href} aria-label={article.title} onClick={(e) => e.preventDefault()}>
        <picture>
          <img
            loading="lazy"
            className="img-full"
            width={520}
            height={296}
            src={article.img}
            srcSet={article.img2x ? `${article.img} 1x, ${article.img2x} 2x` : undefined}
            alt=""
          />
        </picture>
      </a>
      <div className="article-item__txt">
        <p className="article-item__title">
          <a href={article.href} onClick={(e) => e.preventDefault()}>{article.title}</a>
        </p>
        <div className="article-item__meta">
          <p className="article-item__date">{article.date}</p>
          <p className="article-item__term">
            <a className="txt-roll" href={article.href} data-txt={article.term} onClick={(e) => e.preventDefault()}>
              <span>{article.term}</span>
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ArticleList() {
  return (
    <section id="news" className="section-article-list pv-large section-colorway-gray">
      <div className="intro intro--align-left mb-small">
        <div className="intro__content content">
          <h4>
            <em>News &amp;</em> Insights
          </h4>
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
              <a href="#news" className="btn--full btn btn--regular" onClick={(e) => e.preventDefault()}>
                All Insights
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
