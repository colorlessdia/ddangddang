import axios from "axios";
import { formattedPrice } from "../utils/FormattedPrice";
import { userContext } from "../context/userContext";
import { saleContext } from "../context/saleContext";
import { useRef, useEffect, useContext } from "react";
import { GrClose } from "react-icons/gr";

const FilterModal = ({
  modalToggle,
  setModalToggle,
  modalItem,
  setModalItem
}) => {
  const modalRef = useRef(null);
  const userData = useContext(userContext);
  const saleData = useContext(saleContext);

  useEffect(() => {
    modalToggle ? modalRef.current.classList.add('active') : modalRef.current.classList.remove('active');
  }, [modalToggle]);

  const updateHandler = () => {
    saleData.setIsUpdate(prev => !prev);
  };

  const alarmHandler = () => {
    userData.setAlarmMsg(`${modalItem.PRD_NAME}: ${modalItem.MAX_AUC_FEE} 입찰`);
  };

  // min fee
  const minAucHandler = (e) => {
    e.preventDefault();

    const postData = {
      PRD_NO: modalItem.PRD_NO,
      CUST_ID: localStorage.getItem('userId'),
      MAX_AUC_FEE: modalItem.MAX_AUC_FEE,
    };

    axios
      .post('http://localhost:3333/bid', postData)
      .then(res => {
        
      })
      .catch(err => console.log(err));

    setModalItem({
      ...modalItem,
      MAX_AUC_FEE: modalItem.MAX_AUC_FEE + 5000,
    });

    alarmHandler();
    updateHandler();
  };

  // max fee
  const maxAucHandler = (e) => {
    e.preventDefault();

    setModalItem({
      ...modalItem
    });
  };

  const closeHandler = (e) => {
    e.preventDefault();

    setModalToggle(false);
  };

  return (
    <div className="filter-modal" ref={modalRef}>
      <div className="filter-modal-dim">
        <div className="filter-modal-content">
          <div className="modal-button-area">
            <button
              type="button"
              className="modal-close"
              onClick={closeHandler}
            ><GrClose /></button>
          </div>
          <div className="modal-img">
            <img src={modalItem.IMG_PATH_1} alt="" />
          </div>
          <h2 className="modal-title">{modalItem.PRD_NAME}</h2>
          <p className="modal-price"><span className="price-msg">현재 최고 입찰가</span> <strong className="price">{formattedPrice(modalItem.MAX_AUC_FEE)}</strong> 원</p>
          <div className="button-group">
            <button
              type="button"
              className="modal-auction-button min_fee"
              onClick={minAucHandler}
            >입찰하기 {formattedPrice(modalItem.MAX_AUC_FEE + 5000)}</button>
            <button
              type="button"
              className="modal-auction-button max_fee"
              onClick={maxAucHandler}
            >즉시입찰 {formattedPrice(modalItem.MAX_FEE)}</button>
          </div>
          <p className="break-line">or</p>
          <div className="input-group">
            <label htmlFor="modal-input">입력하기</label>
            <input type="text" id="modal-input" placeholder="입찰할 금액을 입력하세요" className="modal-input" />
            <button type="button" className="modal-input-button">입찰</button>
          </div>
          <p className="caution-msg">입찰을 하신 후, 낙찰이되면 계약이 확정 됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;