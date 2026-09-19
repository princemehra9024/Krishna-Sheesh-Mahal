import { useCallback, useState } from "react";
import { QUOTES } from "../data";

const pad = (n: number) => String(n).padStart(2, "0");

export default function QuoteSlider() {
  const [index, setIndex] = useState(0);
  const total = QUOTES.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  return (
    <section id="section-4-1" className="section-quote-slider pv-large section-colorway-green">
      <div className="hide-overflow">
        <div className="section section--large">
          <div className="flickity flickity--quote flickity-enabled" data-scroll data-scroll-css-progress>
            <div className="flickity__viewport">
              {QUOTES.map((q, i) => (
                <div className={`flickity__item${i === index ? " is-selected" : ""}`} key={q.source} aria-hidden={i !== index}>
                  <div className="flickity__item-img parallax-opacity">
                    <picture>
                      <img loading={i === 0 ? "eager" : "lazy"} className="img-full" width={790} height={790} src={q.img} alt="" />
                    </picture>
                  </div>
                  <div className="flickity__item-quote" data-scroll data-scroll-speed="0.05">
                    <blockquote className="quote">
                      <div className="quote__logo quote__logo--recolor">
                        <img loading="lazy" className="img-full" width={q.logoW} height={q.logoH} src={q.logo} alt={q.source} />
                      </div>
                      <p>{q.text}</p>
                      <footer>
                        <cite>
                          <strong>{q.source}</strong>
                        </cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>

            <div className="flickity__controls">
              <button className="flickity-button previous" type="button" aria-label="Previous" onClick={prev} />
              <button className="flickity-button next" type="button" aria-label="Next" onClick={next} />
            </div>
            <div className="flickity-page-dots" aria-live="polite">
              {pad(index + 1)} / {pad(total)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
