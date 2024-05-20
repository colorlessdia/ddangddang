import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyPageBar = () => {

  const [selectedMenu, setSelectedMenu] = useState('내정보');
  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  
  return (

    <div className="mypage-bar">
      <ul className="menu-list">
        <li className={selectedMenu === '내정보' ? 'selected' : ''}> 
          <Link to="/mypage" onClick={() => handleMenuClick('내정보')}>내정보</Link>
        </li>

        <li className={selectedMenu === '찜목록' ? 'selected' : ''}>
          <Link to="/mypage/favorite" onClick={() => handleMenuClick('찜목록')}>찜목록</Link>
        </li>

        <li className={selectedMenu === '포인트' ? 'selected' : ''}>
          <Link to="/mypage/point" onClick={() => handleMenuClick('포인트')}>포인트</Link>
        </li>

        <li className={selectedMenu === '진행중인 경매' ? 'selected' : ''}>
          <Link to="/mypage/auction" onClick={() => handleMenuClick('진행중인 경매')}>진행중인 경매</Link>
        </li>

        <li className={selectedMenu === '매물 올리기' ? 'selected' : ''}>
          <Link to="/mypage/productupload" onClick={() => handleMenuClick('매물 올리기')}>매물 올리기</Link>
        </li>

        <li className={selectedMenu === '내 매물' ? 'selected' : ''}>
          <Link to="/mypage/myproduct" onClick={() => handleMenuClick('내 매물')}>내 매물</Link>
        </li>

      </ul>
    </div>
  );
};

export default MyPageBar;