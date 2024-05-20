import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HomeBannerAd = () => {
  return (
    <section className="s home-banner-ad">
      <div className="inner">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="home-banner-ad-swiper"
        >
          <SwiperSlide>
            <div className="inner">
              <a href="https://gj-aischool.or.kr/" target="_blank"><img src="/images/home-banner-01.jpg" alt="" /></a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="inner">
              <a href="http://www.aica-gj.kr/main.php" target="_blank"><img src="/images/home-banner-02.jpg" alt="" /></a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="inner">
              <a href="https://mycampus.kr/" target="_blank"><img src="/images/home-banner-03.jpg" alt="" /></a>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="inner">
              <a href="https://honamict.kr/front/M0000000/index.do;jsessionid=373FB46F20227CBB2FB9705E642030DE" target="_blank"><img src="/images/home-banner-04.jpg" alt="" /></a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HomeBannerAd;