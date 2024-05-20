import { useContext, useEffect, useState } from 'react';
import { formattedDate } from '../utils/FormattedDate';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiBars2 } from "react-icons/hi2";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { saleContext } from '../context/saleContext';
import FilterMap from './FilterMap';
import axios from 'axios';
import CurrentPrice from './CurrentPrice';
import IntervalTime from './IntervalTime';

const FilterItem = ({
  containerRef, 
  setModalToggle,
  setModalItem,
  IMG_PATH_1,
  IMG_PATH_2,
  IMG_PATH_3,
  IMG_PATH_4,
  PRD_NO,
  CUST_ID,
  PRD_NAME,
  PRD_INTRO,
  PRD_TYPE,
  PRD_LOCA,
  PRD_FLOOR,
  REG_DATE,
  END_DATE,
  MIN_FEE,
  MAX_FEE,
  MAX_AUC_FEE,
}) => {
  const saleData = useContext(saleContext);
  const [time, setTime] = useState([0, 0, 0]);
  const [isChecked, setIsChecked] = useState(false);

  const toggleHandler = (e) => {
    e.preventDefault();

    containerRef.current.classList.toggle('active');
  };

  // modal open
  const modalHandler = (e) => {
    e.preventDefault();

    setModalToggle(true);
    setModalItem({
      PRD_NO,
      CUST_ID,
      IMG_PATH_1,
      PRD_NAME,
      PRD_INTRO,
      PRD_TYPE,
      PRD_LOCA,
      PRD_FLOOR,
      REG_DATE,
      MIN_FEE,
      MAX_FEE,
      MAX_AUC_FEE,
    });
  };

  // wish
  const favoriteChkHandler = (e) => {
    e.preventDefault();

    setIsChecked(prev => !prev);

    axios
      .get('http://localhost:3333/Wish', { params: { PRD_NO, isChecked: !isChecked } })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
      <>
        <div className="inner">
          <div className="filter-content-img">
            <Swiper
              slidesPerView={1}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="filter-content-swiper"
            >
              <SwiperSlide>
                <img src={IMG_PATH_1} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={IMG_PATH_2} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={IMG_PATH_3} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={IMG_PATH_4} alt="" />
              </SwiperSlide>
            </Swiper>
            <label
              htmlFor="favorite-item"
              className='favorite-chk-button'
              onClick={favoriteChkHandler}
            >
              {isChecked ? <AiFillHeart /> : <AiOutlineHeart />}
            </label>
            <input type="checkbox" id="favorite-item" />
            <div className="filter-auction-info">
              <CurrentPrice MAX_AUC_FEE={MAX_AUC_FEE} />
              <button
                type="button"
                className="auction-button"
                onClick={modalHandler}
              >입찰하기
                <IntervalTime
                  END_DATE={END_DATE}
                  time={time}
                  setTime={setTime}
                />
              </button>
            </div>
          </div>
          <button 
            type="button"
            className="filter-info-toggle"
            onClick={toggleHandler}
          >
            <span><HiBars2 /></span>
          </button>
          <div className="filter-content-info">
            <div className="filter-content-map">
              <FilterMap
                lat_1={35.1466}
                lng_1={126.9215}
                PRD_LOCA={PRD_LOCA}
              />
            </div>
            <div className="filter-content-detail">
              <ul className="desc-list">
                <li>
                  <h3 className="item-title">{PRD_NAME} ({PRD_TYPE})</h3>
                </li>
                <li>{PRD_INTRO}</li>
                <li>주소 {PRD_LOCA}</li>
                <li>층수 {PRD_FLOOR}</li>
                <li>등록일 {formattedDate(REG_DATE)}</li>
              </ul>
            </div>
          </div>
        </div>
      </>
  );
};

export default FilterItem;