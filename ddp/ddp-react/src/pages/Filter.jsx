import { useRef, useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { saleContext } from "../context/saleContext";
import FilterBar from "../components/FilterBar";
import FilterItem from '../components/FilterItem';
import FilterModal from '../components/FilterModal';

const Filter = () => {
  const saleData = useContext(saleContext);
  const sliceData = saleData.saleItem.slice(0, 4);

  const [modalItem, setModalItem] = useState({});
  const [modalToggle, setModalToggle] = useState(false);
  const containerRef = useRef(null);

  return (
    <main className="filter">
      <div className="inner">
        <FilterBar />
        <div className="filter-content">
          <Swiper
            ref={containerRef}
            direction='vertical'
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            mousewheel={true}
            modules={[Mousewheel]}
            className="filter-swiper"
          >
            {saleData.selectItem &&
              <SwiperSlide>
                <FilterItem
                  containerRef={containerRef}
                  setModalToggle={setModalToggle}
                  modalItem={modalItem}
                  setModalItem={setModalItem}
                  {...saleData.selectItem}
                />
              </SwiperSlide>}
            {sliceData.map((item, index) => (
              <SwiperSlide key={index}>
                <FilterItem
                  containerRef={containerRef}
                  setModalToggle={setModalToggle}
                  modalItem={modalItem}
                  setModalItem={setModalItem}
                  {...item}
                />
              </SwiperSlide>))}
          </Swiper>
          <FilterModal
            modalToggle={modalToggle}
            setModalToggle={setModalToggle}
            modalItem={modalItem}
            setModalItem={setModalItem}
          />
        </div>
      </div>
    </main>
  );
};

export default Filter;