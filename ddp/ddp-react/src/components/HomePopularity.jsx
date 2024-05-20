import { useContext } from 'react';
import GalleryItem from "./GalleryItem";
import { saleContext } from "../context/saleContext";

const HomePopularity = () => {
  const saleData =  useContext(saleContext);
  const sliceData = saleData.saleItem.slice(0, 8);

  return (
    <section className="s home-popularity">
      <div className="inner">
        <h2 className="section-title">인기 매물</h2>
        <div className="gallery">
          {sliceData.map((item, idx) => (
            <GalleryItem
              key={idx}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePopularity;