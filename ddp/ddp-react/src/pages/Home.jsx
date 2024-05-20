import HomeVisual from "../components/HomeVisual";
import HomeRealTime from "../components/HomeRealTime";
import HomeBannerAd from "../components/HomeBannerAd";
import HomePopularity from "../components/HomePopularity";
import HomeBannerPromotion from "../components/HomeBannerPromotion";
import HomeAppIntroduce from "../components/HomeAppIntroduce";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <main className="home">
        <HomeVisual />
        <HomeRealTime />
        <HomeBannerAd />
        <HomePopularity />
        <HomeBannerPromotion />
        <HomeAppIntroduce />
      </main>
      <Footer />
    </>
  )
};

export default Home;