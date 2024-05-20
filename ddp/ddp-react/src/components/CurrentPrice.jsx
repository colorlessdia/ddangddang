import { formattedPrice } from '../utils/FormattedPrice';

const CurrentPrice = ({MAX_AUC_FEE}) => {
  return (
    <p className="auction-price">
      현재 입찰가 <span className="price">{formattedPrice(MAX_AUC_FEE)}</span>&nbsp;원
    </p>
  );
};

export default CurrentPrice;