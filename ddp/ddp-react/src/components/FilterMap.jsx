import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

const { kakao } = window;
let Lat_1 = 35.1466; // 초기 좌표값
let Lng_1 = 126.9215; // 초기 좌표값
let AddressName_1 = ''; // 초기 주소값

const FilterMap = (props) => {
  const { PRD_LOCA: address_name_2 } = props; // 부모 컴포넌트로부터 주소를 전달받음
  const [result1, setResult1] = useState(''); // 지오코딩 결과를 담을 상태 변수

  useEffect(() => {
    let geocoder = new kakao.maps.services.Geocoder(); // 지오코더 인스턴스 생성

    // 검색 버튼 클릭 시 실행되는 함수
    geocoder.addressSearch(address_name_2, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setResult1(result); // 지오코딩 결과를 상태 변수에 저장

        Lat_1 = result[0].y; // 전역 변수  위도 값 저장
        Lng_1 = result[0].x; // 전역 변수  경도 값 저장
        AddressName_1 = result[0].address_name; // 전역 변수 initialAddressName에 주소 값 저장

        console.log(result[0]);
      }
    });
  }, [address_name_2]); // address_name_2가 변경될 때마다 useEffect 내부의 함수가 실행됨

  return (
    <>
      <Map
        center={{ lat: Lat_1, lng: Lng_1 }} // 초기 중심 좌표 설정
        style={{ width: "100%", height: "350px" }}
        level={3} // 지도의 확대 레벨 설정
      >
        {/* 커스텀 오버레이를 포함한 지도 표시 */}
        <CustomOverlayMap position={{ lat: Lat_1, lng: Lng_1 }}>
          {/* <div className="label" style={{ color: "#000000", backgroundColor: "#FFFFFF", overflow: 'hidden', whiteSpace: "nowrap", textAlign: 'center' }}>
            <span className="center">{initialAddressName}</span>
          </div> */}
          <MapMarker position={{ lat: Lat_1, lng: Lng_1 }}>
          </MapMarker>
        </CustomOverlayMap>
      </Map>

      <div>
        {/* 지오코딩 결과 표시 - 성능확인용 */}
        {/* {result1 && (
          <p>
            Geocoder Result: {result1[0].address_name} (Lat: {result1[0].y}, Lng: {result1[0].x})
          </p>
        )} */}
      </div>
    </>
  );
};

export default FilterMap;