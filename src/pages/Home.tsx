import FlagshipBanner from "../components/FlagshipBanner";
import ImageLinks from "../components/ImageLinks";
import ScrollingLogos from "../components/ScrollingLogos";
import ImageWithText from "../components/ImageWithText";
import QuoteSlider from "../components/QuoteSlider";
import ArticleList from "../components/ArticleList";

export default function Home() {
  return (
    <>
      <FlagshipBanner />
      <ImageLinks />
      <ScrollingLogos />
      <ImageWithText />
      <QuoteSlider />
      <ArticleList />
    </>
  );
}
