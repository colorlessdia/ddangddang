import { useContext } from "react";
import { saleContext } from "../context/saleContext";
import { AiOutlineCheck } from "react-icons/ai";
import axios from 'axios';
let test= {};

const FilterBar = () => {
  const saleData = useContext(saleContext);

  const selectHandler = (e) => {
    const { name, value } = e.target;
  
    if (test[name] === value) {
      // 클릭된 값이 이미 존재하면 제거
      delete test[name];
    } else {
      // 클릭된 값이 존재하지 않으면 추가
      test[name] = value;
    }
  };

  const filterHandler = (e) => {
    e.preventDefault();
    
    axios
      .get('http://localhost:3333/Filter', { params: { test: test } })
      .then(res => {
        console.log('filter data',res);
        saleData.setSaleItem(res.data.rows);
        saleData.setSelectItem(); // 검색시 초기화
      });
  };

  return (
    <div className="filter-bar">
      <div className="filter-form">
        <ul className="filter-list">
          <li>
            <h3 className="filter-title">지역</h3>
            <ul className="filter-item-list">
              <li>
                <input type="checkbox" id="local-gj" name="L1" value="광주" className="hide filter-chk" onChange={selectHandler} />
                <label htmlFor="local-gj" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>광주</label>
              </li>
              <li>
                <input type="checkbox" id="local-jn" name="L2" value="전남" className="hide filter-chk" onChange={selectHandler} />
                <label htmlFor="local-jn" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>전라남도</label>
              </li>
            </ul>
          </li>
          <li>
            <h3 className="filter-title">유형</h3>
            <ul className="filter-item-list">
              <li>
                <input type="checkbox" id="type-or" name="S1" value="원룸" className="hide filter-chk" onChange={selectHandler} />
                <label htmlFor="type-or" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>원룸</label>
              </li>
              <li>
                <input type="checkbox" id="type-ht" name="S2" value="호텔" className="hide filter-chk" onChange={selectHandler} />
                <label htmlFor="type-ht" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>호텔</label>
              </li>
              <li>
                <input type="checkbox" id="type-ps" name="S3" value="펜션" className="hide filter-chk" onChange={selectHandler} />
                <label htmlFor="type-ps" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>펜션</label>
              </li>
            </ul>
          </li>
          <li>
            <h3 className="filter-title">조회수</h3>
            <ul className="filter-item-list">
              <li>
                <input type="radio" id="view-desc" name="V1" value="1" className="hide filter-chk" />
                <label htmlFor="view-desc" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>높은 순서</label>
              </li>
              <li>
                <input type="radio" id="view-asc" name="V1" value="0" className="hide filter-chk" />
                <label htmlFor="view-asc" className="filter-button"><span className="custom-chk"><AiOutlineCheck /></span>낮은 순서</label>
              </li>
            </ul>
          </li>
          <li>
            <input type="submit" value="매물 검색하기" className="filter-search-button" onClick={filterHandler} />
          </li>
          <li>
            <input type="reset" value="필터 초기화" className="filter-reset-button" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterBar;