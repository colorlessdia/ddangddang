import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { formattedPrice } from '../utils/FormattedPrice';
import { saleContext } from '../context/saleContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOpenInNew } from "react-icons/md";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HomeRealTime = () => {
  const saleData = useContext(saleContext);
  const sliceData = saleData.saleItem.slice(0, 10);

  const navigate = useNavigate();

  const clickHandler = (item) => {
    saleData.setSelectItem(item);
    navigate('/filter');
  };

  return (
    <section className="s home-real-time">
      <div className="inner">
        <h2 className="section-title">실시간 매물</h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="home-real-time-swiper"
        >
          {sliceData.map((item, index) => (
            <SwiperSlide
              key={index}
              onClick={() => clickHandler(item)}
            >
              <div className="inner">
                <img src={item.IMG_PATH_1} alt="" />
                <div className="overlay">
                  <span className="icon">
                    <MdOpenInNew />
                  </span>
                  <ul className="sale-detail">
                    <li className="title">
                      {item.PRD_NAME} ({item.PRD_TYPE})
                    </li>
                    <li className="price">
                      {formattedPrice(item.MAX_AUC_FEE)}
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeRealTime;