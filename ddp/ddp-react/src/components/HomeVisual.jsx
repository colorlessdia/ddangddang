import { Link } from 'react-router-dom';

const HomeVisual = () => {
  return (
    <section className="s home-visual">
      <div className="inner">
        <video src="/videos/home-video-01.mp4" className="home-video" autoPlay loop muted></video>
        <div className="overlay"></div>
        <div className="inner">
          <h2 className="visual-title">Welcome to <br />the Auction Realm</h2>
          <p className="visual-sub-title">경매의 세계로 오신 것을 환영합니다</p>
            <Link to="/filter" className="visual-start">
              시작하기
            </Link>
            <div className="mouse"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeVisual;