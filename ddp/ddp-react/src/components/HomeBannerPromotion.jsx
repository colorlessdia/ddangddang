import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HomeBannerPromotion = () => {
  return (
    <section className="s home-banner-promotion">
      <div className="inner">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
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
          className="home-banner-promotion-swiper"
        >
          <SwiperSlide>
            <div className="inner">
              <img src="/images/home-banner-promotion-01.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="inner">
              <img src="/images/home-banner-promotion-02.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="inner">
              <img src="/images/home-banner-promotion-01.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="inner">
              <img src="/images/home-banner-promotion-02.jpg" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HomeBannerPromotion;