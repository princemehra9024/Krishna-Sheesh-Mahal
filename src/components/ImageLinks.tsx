import { IMAGE_LINK_ROWS } from "../data";
import { scrollToTarget } from "../hooks/useScrollEngine";
import { useNavigate } from "react-router-dom";

export default function ImageLinks() {
  const navigateRouter = useNavigate();

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
                  if (item.href.startsWith("/")) {
                    navigateRouter(item.href);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
                  } else {
                    scrollToTarget(item.href, -70);
                  }
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
