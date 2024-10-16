styled-components을 편리하게 사용하기 위해 vscode 패키지
https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components

# 2주차



프론트엔드 팀원 의견


* 중고서점 - 신동주

실현가능성 : 가능성 높다

관심사 : 전자책의 등장으로 인한 사람들이 책에 관심이 적은편이다.

명확성 : 단순한 중고서점에 내가 원하는 책이 있는지 확인, 가격대별 비교

가치 : 가게에 책 유무 확인 가능


* 미세먼지 확인 - 서이건

실현가능성 : 실현가능성 높다

관심사 : 미세먼지 확인하는 사람들이 많은 편

명확성 : 오늘 미세먼지로 인한 마스크 확인

가치 : 마스크 챙기는 번거로움 해결


* 비 예보 확인 - 나예린

실현가능성 : 실현가능성 높다

관심사 : 비 예보에 대한 사람들의 관심도는 높다

명확성 : 오늘 날씨 비 예보로 인한 우산 확인

가치 : 시간 축소 가능, 미리 우산확인 가능

선택사유 :

- 강수량 확률로 인한 우산챙기기 확인에 대한 메리트가 매우 좋아보인다고 생각이 들어 선택함- 서이건
- 아침에 우산을 챙겨야하는지 말아야하는지 확인할수 있다는 점이 좋아 선택함 - 신동주
- 비 강수량 확인으로 우산을 챙김으로서 비를 맞아야 하는 상황이 안생긴다는 점에서 선택함 - 나예린

비전목표 : 강수량 확인으로 퍼센트별 우산챙기기 체크

예시) 80% - 큰우산 필수 , 50% - 가방안에 들어갈만한 작은우산 필수, 10% - 우산X


### **최종**


개발 Front

**[기상청_단기예보 ((구)_동네예보) 조회서비스]**

[**https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084**](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084)

- 선택사유 : 강수량을 확인함으로서 오늘 우산을 챙겨가면 좋을지 안좋을지 확인이 가능하여 우산을 챙기는 번거로움을 해결할 수 있음, 아침에 우산챙기기를 빠르게 확인할 수 있음
- 비전 : 강수량 확인으로 우산을 챙겨 비를 맞아야 하는 상황이 안생기게 만들게 하는 것
- 목표 : 실시간 강수량 퍼센트를 확인하여 퍼센트별 우산챙기기를 체크
예시) 80% - 큰우산 필수 , 50% - 가방안에 들어갈만한 작은우산 필수, 10% - 우산X 등



# 3주차



## 서비스 디바이스에 대한 숙련도 정의

### 주제 : 국립중앙의료원 전국 응급의료기관 정보 조회 서비스

**저희 주제에 대해 제작을 할때 저희가 서비스를 진행하는 기기가 웹, 앱, 태블릿 등 어떤 디바이스로 서비스를 진행해야 좀더 사용자들이 편하게 사용을 할 것 인지 의견내주시면 됩니다.**

**저희 주제가 의료 기관을 사용하는 주제이니 그것에 맞게 해주시면 됩니다.**

- 서이건
1. 사람들이 자주 사용하는 기기인 휴대폰을 가지고 앱을 만들면 좋다고 생각이 들었습니다. 병원에서 태블릿을 사용한 의료진료 확인이나 서비스를 사용한다는 것을 들었던 것 같아서 사람들이 자주 사용하고 사용이 편리하게 휴대폰의 앱기반으로 제작을 한 후 병원측에서도 사용이 편하게 태블릿 지원까지 보면 좋을 것 같습니다.
    
    앱 사용자는 웹 서비스 방문자에 비해 동시에 여러 개의 서비스를 동시에 사용하기에 용이하여 문자, 전화, 인터넷 검색, 앱 사용 등 다양하게 번갈아 가며 사용하는데 자연스럽습니다.
    
    사용자는 휴대폰으로 확인을 하고 병원측에서는 태블릿을 사용하여 확인하는 방향
    
2. 웹 서비스는 장소나 플랫폼과 상관없이 브라우저만 있다면 누구나 접근할 수 있지만 모바일 앱은 스마트폰에 다운로드하여 설치해야 한다는 번거로움이 있습니다. 응급의료에 관한 서비스를 진행하는 만큼 신속하게 처리가 가능한 서비스가 있으면 좋다고 생각이 들어 웹 서비스로 진행을 하는 것 도 좋다고 생각이 들었습니다.


- 나예린
1. 응급의료기관 정보 조회인 만큼 사람들이 응급 상황에 쉽게 검색할 수 있게 앱으로 만들면 좋겠다고 생각했습니다
병원에서 편리하게 태블릿을 사용하여 하는 방향도 좋다는 생각이 들었습니다


- 신동주
1. 대부분 이 서비스를 이용하는 사람들은 빠른 정보를 얻어야 하니 대부분의 사람들이 가지고 있고 간단하고 실행하여 원하는 정보를 바로 얻을 수 있고 설정만 해둔다면 바로 GPS정보를 바로 얻어 근처 응급실 정보를 얻을수있기에 앱이 좋다고 생각합니다


### **정리**

### 서비스 디바이스에 대한 숙련도 정의

- **앱 개발 의견**

다수의 사람들이 휴대폰 사용을 하여 앱 기획

응급의료기관 정보 조회인 만큼 사람들이 응급상황에 쉽게 검색할 수 있게 앱으로 사용

빠른 정보 조회를 위해 간단하고 실행이 빠른 앱을 사용하여 GPS정보를 사용하여 응급실에서도 빠른 정보 조회

앱 사용자는 웹 서비스 방문자에 비해 동시에 여러 개의 서비스를 동시에 사용하기에 용이, 문자, 전화, 인터넷 검색, 앱 사용 등 다양하게 번갈아 가며 사용하는데 자연스러움.

병원에서 태블릿을 자주 사용하는 만큼 사용자는 휴대폰으로, 병원측은 태블릿을 사용하여 확인


- **웹 개발 의견**

웹 서비스는 장소나 플랫폼과 상관없이 브라우저만 있다면 누구나 접근할 수 있지만 모바일 앱은 스마트폰에 다운로드하여 설치해야 한다는 번거로움

응급의료에 관한 서비스를 진행하는 만큼 신속함이 장점(앱이 안깔려있다는 전제)


**정리** :

Front - 저희 주제에 적합하다고 생각이 된 디바이스는 휴대폰이라고 생각이 들었습니다. 사람들이 자주 사용하는 만큼 저희 팀은 앱 기반 휴대폰 디바이스가 좀더 편하고 빠르다고 생각하는 의견입니다.


## RN 타입스크립트

나예린 - 문서 정리, 필요한 기능 세세하게

신동주 - 메인화면

서이건 - 서브화면

메인화면 - GPS, 지도 화면

서브화면 - 응급실 조건검색, 가까운 응급실

ㄴ 전체, 신경과, 화상, 외상 

ㄴ 검색

ㄴ 초기화

ㄴ 검색창 

서브화면 - AED위치(클릭시 화면)

서브화면 - 응급실, 병원, 약국 위치

서브화면 - 응급처치 요령



# 4주차

### 경도 위도 사용하는 지도

### React-Leaflet

### React Native

- 리액트 네이티브 선택 사유

크로스 플랫폼 개발 도구이다

라이브러리가 다양하고 많다

- 타입스크립트 선택 사유

가독성이 좋다

실행 속도가 빠르다


데이터 기반으로 응급실과 수술실, 각종병상별 응급의료가 이용가능한지 여부를 파악가능함

즐겨찾기로 자주 가는 병의원 및 약국 모아 보기

응급실 상황 한눈에 보기

ㄴ 현재 위치를 기반으로 각 응급실의 세부 상황을 한눈에 파악

야간/주말 진료 가능한 병원 찾기

ㄴ 야간이나 주말에 현재 운영중인 병의원 아이콘 제공

가용가능 초록

가용 X 빨강


**Jira**

* 팀장-RN 네이버지도 확인, 기본 UI 위치 배치
* 동주-RN 구글지도 확인
* 예린-문서 정리
* Front github 연동


# 5주차

### 기능 추가

지도 기능

ㄴ 시군구 위도 경도 지정 기능

검색기능 추가

지도 마크 설정

ㄴ 50m 주변 건물에 마커 띄우기, 눌렀을 떄 구글 정보 생성


**Jira**

* 팀장-지도 검색기능 활성화 및 상세주소 출력
* 동주-지도 마커 추가



# 6주차(보강)

### 기능 추가

하단버튼 페이지 생성

위도, 경도를 사용하여 지정한 곳에 마커 지정

백엔드 - 상세아이템 전달

상세페이지 제작


**Jira**

* 동주-지정한 위도경도에 마커 지정



# 7주차

### 기능 추가

**완료된 기능**

지도 연결

확대축소 기능 추가

지도 마커 추가

검색기능 활성화 및 주소 출력

하단 버튼 추가(응급실, 응급처치, 즐겨찾기, 응급실조건검색)

하단 버튼들 숨기기

응급실 스크린 - 지도기능 추가, 하단 버튼추가, 응급실 정보 출력

**예정 기능**

마커 클릭 기능

최근 검색 기록 기능 

응급처치 스크린 

즐겨찾기 스크린

응급실조건검색


**Jira**

* 팀장-기본 UI 버튼들 기능 활성화, 응급실 스크린 UI 구성
* 동주-지도 마커 클릭 및 이동
* 예린-최근 검색 기록 기능
