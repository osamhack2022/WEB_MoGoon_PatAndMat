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
|GET|/api/speciality/list|전체 특기를 객체 리스트로 반환합니다|
|GET|/api/speciality/list/특기이름|해당 특기의 상세 정보 객체를 반환합니다|
|POST|/api/auth/register|이메일/비밀번호 계정 생성을 요청합니다|
|POST|/api/auth/login|이메일/비밀번호 계정 로그인을 요청합니다|

# API 응답 객체 설명

모든 요청에 대한 응답은 result 객체에 담겨서 반환됩니다.   
아래는 result 객체의 구조입니다.

|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|success|bool|성공여부|true / false|
|data|object, array|반환 데이터|데이터 형식은 아래 상세 정보를 확인해주세요.|
|error_code|string|에러코드|auth/email-already-in-use|
|error_msg|string|에러 메세지|Firebase: Error (auth/email-already-in-use).|

아래 설명하는 API의 반환 데이터 형식은 모두 result 객체의 data 프로퍼티를 통해 반환됩니다.

## GET /api/speciality/list
전체 특기의 객체 **리스트**가 반환되며 리스트 안의 각 객체의 속성은 아래 표와 같습니다.

|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|class|string|특기가 속한 분류|일반, 전문기술, 전문특기, ...|
|kind|string|특기 분류|일반, 수송, 전자계산, 화생방, ...|
|desc|string|한줄 설명|화학전에서 활약하는 특기|
|imageSrc|string|대표 이미지 파일 경로|res/image/화생방.jpg|
|like|number|특기를 찜한 사람 수|3564|
|military_kind|array|해당 특기가 있는 군종|["육군", "해군", "공군"]|
|speciality_code|string|특기코드|16|
|speciality_name|string|특기이름|화생방, 정보체계관리, ...|
|tags|array|특기 태그|["교대근무", "휴가많음", "실내근무"]|

## GET /api/speciality/특기명(한글)
단일 특기의 상세 정보를 가져옵니다.
|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|speciality_summary|string|특기 요약|.|
|speciality_education|string|특기 교육|.|
|speciality_work|string|주요 업무|.|
|speciality_eligibility|map|군별 지원 자격|{"army": null, "navy": '', ...}|
|score|map|각 군별 지원 배점|{"army": null, "navy": '', ...}|

## POST /api/auth/login
## POST /api/auth/register

두 요청 모두 요청과 응답 형식이 같습니다.   
요청의 경우 body로 아래의 값을 전달합니다.
|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|email|string|이메일|kckc0608@naver.com|
|password|string|비밀번호|123412|

응답은 파이어베이스의 user 객체를 반환합니다.