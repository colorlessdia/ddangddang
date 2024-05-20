import { useContext } from 'react';
import { formattedPrice } from '../utils/FormattedPrice';
import { saleContext } from '../context/saleContext';
import { Link } from 'react-router-dom';
import { MdOpenInNew } from "react-icons/md";

const GalleryItem = ({ ...item }) => {
  const saleData = useContext(saleContext);

  const clickHandler = (item) => {
    saleData.setSelectItem(item);
  };

  return (
    <div className="gallery-item"
      onClick={() => clickHandler(item)}
    >
      <Link to="/filter">
        <div className="gallery-img">
          <img src={item.IMG_PATH_1} alt="" draggable="false" />
          <div className="overlay">
            <span className="icon">
              <MdOpenInNew />
            </span>
          </div>
        </div>
        <ul className="gallery-item-info">
          <li className="gallery-item-title">
            <h3>{item.PRD_NAME}</h3>
          </li>
          <li className="gallery-item-desc">{item.PRD_INTRO}</li>
          <li className="gallery-item-price">{formattedPrice(item.MAX_AUC_FEE)}원</li>
        </ul>
      </Link>
    </div>
  );
};

export default GalleryItem;