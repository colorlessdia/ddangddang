import React, { useState } from 'react';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

const AddrApi = ({ onSelectAddress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addressData, setAddressData] = useState(null);

    const handle = {
        // 주소 선택 이벤트
        selectAddress: (data) => {
            setAddressData(data);
            closeModal();
            onSelectAddress(data); // UserJoin에서 제공된 함수 호출
        },
    };

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    

    return (
        <div>
            <button onClick={openModal}>주소검색</button>
            {/*  width : 모달의 너비를 조절 maxHeight : 모달의 최대 높이를 조절 */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Address Modal" 
                    style={{ content: {width: '500px', maxHeight: '85%', margin: 'auto',}}}>
                <DaumPostcode onComplete={handle.selectAddress} autoClose={false} defaultQuery=""/><hr/>
                <button onClick={closeModal}>닫기</button>
            </Modal>
            {/* {addressData && (<div><p>주소: {addressData.address}<br/>
                                     우편번호: {addressData.zonecode}</p></div>)} */}

        </div>
    );
};

export default AddrApi;
