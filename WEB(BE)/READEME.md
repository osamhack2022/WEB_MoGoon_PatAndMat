# 서버를 실행하는 방법
코드스페이스 환경이라면 아래와 같이 터미널에서 명령어를 입력합니다.
```(shell)
npm install
npm start
```
nodemon 이 실행됩니다.\
코드스페이스 우측 하단 브라우저에서 열기를 눌러 웹브라우저로 접속할 수 있습니다.

# API 리스트
|메소드|요청 주소|간단 설명|
|:---:|:---:|:---:|
|GET|/api/speciality/list|전체 특기를 객체 리스트로 반환합니다

# API 응답 객체 설명
## GET /api/speciality/list
각 특기 객체 리스트가 반환되며 각 객체의 속성은 아래 표를 참고해주세요.

|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|class|string|특기가 속한 분류|일반, 전문기술, 전문특기, ...|
|kind|string|특기 분류|일반, 수송, 전자계산, 화생방, ...|
|desc|string|한줄 설명|화학전에서 활약하는 특기|
|imageSrc|string|대표 이미지 파일 경로|res/image/화생방.jpg|
|like|number|특기를 찜한 사람 수|3564|
|military_kind|array|해당 특기가 있는 군종|["육군", "해군", "공군"]|
|speciality_code|map|각 군종별 특기코드|{"army":"", "airforce":"16", "navy":"", "marine":"" }|
|speciality_name|string|특기이름|화생방, 정보체계관리, ...|
|tags|array|특기 태그|["교대근무", "휴가많음", "실내근무"]|
