import FlagshipBanner from "../components/FlagshipBanner";
import ImageLinks from "../components/ImageLinks";
import ScrollingLogos from "../components/ScrollingLogos";
import ImageWithText from "../components/ImageWithText";
import Amenities from "../components/Amenities";
import QuoteSlider from "../components/QuoteSlider";
import ArticleList from "../components/ArticleList";
import { useSEO } from "../hooks/useSEO";
import { getHomeCompositeSchema } from "../utils/seoSchemas";

export default function Home() {
  useSEO({
    title: "Krishna Sheesh Mahal Kota | Best Luxury Hotel in Kota Rajasthan",
    description:
      "Welcome to Krishna Sheesh Mahal, premier luxury hotel in Shrinath Puram, Kota, Rajasthan. Royal deluxe rooms, Rama's Sky Lounge rooftop cafe, fine dining & wedding banquet hall.",
    canonicalPath: "/",
    keywords:
      "Krishna Sheesh Mahal Kota, Hotel in Kota Rajasthan, Best hotel in Kota, Hotel in Shrinath Puram Kota, Rooms in Kota Rajasthan, Family hotel in Kota, Comfortable hotel in Kota, Hotel near Kota attractions, Hotel accommodation in Kota, Hotel booking in Kota, Banquet hall in Kota, Rooftop cafe Kota",
    ogImage: "/images/hotel-exterior.png",
    ogImageAlt: "Krishna Sheesh Mahal - Premier Luxury Hotel in Kota Rajasthan",
    schema: getHomeCompositeSchema(),
  });

  return (
    <>
      <FlagshipBanner />
      <ImageLinks />
      <ScrollingLogos />
      <ImageWithText />
      <Amenities />
      <QuoteSlider />
      <ArticleList />
    </>
  );
}
