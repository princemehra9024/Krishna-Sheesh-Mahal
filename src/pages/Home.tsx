import FlagshipBanner from "../components/FlagshipBanner";
import ImageLinks from "../components/ImageLinks";
import ScrollingLogos from "../components/ScrollingLogos";
import ImageWithText from "../components/ImageWithText";
import Amenities from "../components/Amenities";
import QuoteSlider from "../components/QuoteSlider";
import ArticleList from "../components/ArticleList";
import { useSEO } from "../hooks/useSEO";

export default function Home() {
  useSEO("Krishna Sheesh Mahal | Best Luxury Hotel in Kota", "Experience royalty at Krishna Sheesh Mahal, the most luxurious stay in Kota. Book premium rooms, banquets, and dining.");
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
