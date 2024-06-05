# 땅땅
    주거 / 숙박시설 경매 중개 플랫폼

## 기간
    2023-08-02 ~ 2023-08-17

## 참여 인원
    Team. 코딩해도되나요 (5명)

    - Front-End: 3
    - Back-End: 1
    - Database: 1

## 담당
    Front-End

    - 메인 페이지
    - 매물 페이지
    - 로딩 페이지

## 사용 기술 스택
### Front-End
    - HTML, CSS, JS, React JS
### Back-End
    - Node JS
### Database
    - My SQL

## ToDo
### 공통
    - UI 구성
      - 헤더
        - 왼쪽 로고, 오른쪽 사용자 관련 영역
        - 입찰 알림
      - 푸터
        - 업체 정보
    - 공통 적용 요소
      - radius 사용, 둥근 느낌
      - 텍스트 강약(사이즈/색상)
      - 텍스트 대비
      - 선택 영역 인터렉션


### 메인 페이지
    - UI 구성
      - 비주얼 영역
        - 간략한 소개 문구 작성
        - 매물 페이지 바로가기 버튼
        - 오버레이 추가로 텍스트 대비
      - 실시간 매물 영역
        - 최신순 정렬 매물 노출
        - 사진만 노출
        - 마우스 오버시 오버레이, 세부정보
        - 클릭시 페이지 이동 링크 추가
      - 배너
        - 광고 영역
        - 시선 흐름 정돈용
      - 인기 매물 영역
        - 찜순 정렬 매물 노출
        - 매물명, 간단한 설명, 가격 표기
        - 마우스 오버시 오버레이, 이동 아이콘
        - 클릭시 페이지 이동 링크 추가
      - 배너
        - 프리미엄 매물 또는 광고영역
        - 시선 흐름 정돈용
      - 탑버튼
        - 페이지 최상단 이동버튼
        - 스크롤 발생시 노출

### 매물 페이지
    - UI 구성
      - 필터링 영역
        - 지역, 유형, 조회수, 검색버튼
        - 텍스트 나열 형식에서 버튼으로 변경
        - 버튼 그룹간 실선으로 영역 구분
        - 체크된 버튼에 강한 강조 계층 사용
      - 매물 영역
        - 쇼츠 형식 UI 차용
        - 세로 이동 캐러셀로 매물 검색
        - 매물 입찰영역과 세부정보 영역
        - 세부정보 여닫기 기능
        - 세부사진 캐러셀
        - 입찰가, 입찰버튼, 등록일 기준 남은시간 표기
        - 찜 버튼
        - 매물 세부정보, 지도
      - 입찰 매물 모달
        - 현재 입찰가 + 고정금액 버튼
        - 판매자 지정 즉시 판매가 버튼
        - 원하는 입찰 비용 입력 인풋
        - 입찰시 주의사항

### 로딩 페이지
    - UI 구성
      - 로고 텍스트, 인디케이터
      - 스트로크 텍스트에 배경이 채워지는 연출

## 회고
    HTML, CSS, JS로 웹을 구성했던 방식 이후 React JS를 사용한 첫 SPA 프로젝트이다.

    APP처럼 부드러운 화면전환을 위해 팀원들의 요청에 따라 React JS를 선행학습하게 되었고,
    이 과정에서 React의 생명주기와 상태 관리에 대해서 스케치하듯 이해할 수 있는 계기가 되었다.

    UI 구성에 대한 고민, props drilling, 무한 리렌더링, 변하지 않는 상태 등 내가 겪은 주요 문제들과
    팀이 겪은 주요 문제인 백엔드 라우터 구성 및 구현, API 구성하기, 리액트 <-> 익스프레스 간 연결 등의 문제점들을 같이 해결해나감으로써 담당 분야 외적인 지식을 쌓을 수 있어서 좋은 경험이 되었다. 

    이 경험은 이후 정규 교과 과정 때 공부 방향성과 복습 개념의 역할이 되어 처음 접하는 학우들에 비해 빠르게 이해할 수 있는 계기가 되었다.
