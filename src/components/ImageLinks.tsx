import { IMAGE_LINK_ROWS } from "../data";
import { scrollToTarget } from "../hooks/useScrollEngine";

export default function ImageLinks() {
  return (
    <section id="hotels" className="section-image-links section-colorway-gray pv-inset">
      <div className="img-links img-links--large">
        {IMAGE_LINK_ROWS.map((row, r) => (
          <div className="img-links__row" key={r}>
            {row.map((item) => (
              <a
                key={item.title}
                className="img-links__row-item txt-colorway-light"
                href={item.href}
                data-cursor-txt="View"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#about", -70);
                }}
              >
                <div className="img-links__row-item-img">
                  <img loading="lazy" className="img-full" src={item.src} alt={item.alt} width={1600} height={900} />
                </div>
                <p className="img-links__row-item-title h2 txt-script" data-scroll data-scroll-speed="0.05">
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
