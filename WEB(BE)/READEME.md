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
|military_kind|string|해당 특기가 있는 군종|육군|
|speciality_code|string|특기코드|16|
|speciality_name|string|특기이름|화생방, 정보체계관리, ...|
|tags|array|특기 태그|["교대근무", "휴가많음", "실내근무"]|

## GET /api/speciality/특기명(한글)/군종(한글)
해당 군종에서의 특기 상세 정보를 가져옵니다.
|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|class|string|특기가 속한 분류|일반, 전문기술, 전문특기, ...|
|kind|string|특기 분류|일반, 수송, 전자계산, 화생방, ...|
|desc|string|한줄 설명|화학전에서 활약하는 특기|
|imageSrc|string|대표 이미지 파일 경로|res/image/화생방.jpg|
|like|number|특기를 찜한 사람 수|3564|
|military_kind|string|군종|공군|
|speciality_code|string|특기코드|16|
|speciality_name|string|특기이름|화생방, 정보체계관리, ...|
|tags|array|특기 태그|["교대근무", "휴가많음", "실내근무"]|
|contents|array|콘텐츠 리스트|(아래에서 설명)|

contents 속성에는 특기 상세 페이지에 보여줄 내용을 title, content 객체에 담아 리스트로 보여줍니다.   

```
[
    {title: 주요업무, content: [ ]},    
    {title: 특기교육, content: [ ]},   
    {title: 장단점, content: [ ]}
]
```

와 같은 형식입니다.

content속성에는 **(콘텐츠 리스트인 contents 속성과 구별!)**   
각 내용 한 줄, 또는 표 데이터가 리스트로 들어갑니다.   
각 내용은 스트링으로, 표 데이터는 객체로 들어갑니다.   
따라서 프론트에서는 content 리스트를 순회할 때 instanceof Object 연산자를 이용하여 객체여부를 확인할 필요가 있습니다.   
아래는 예시 데이터 입니다.
```
content: [
    "정보체계관리의 특기 교육은 2개의 반으로 나누어 집니다",
    "한 반은 하드웨어 장비를 다루는 교육을, 나머지 한 반은 소프트웨어를 다루는 교육을 받습니다",
    {
        표 객체
    }

]
```

한줄 한줄이 데이터로 들어가기 때문에, 한줄 데이터를 받고난 다음에는 명시적으로 다음줄로 넘기는 처리가 필요합니다.   
(파이어베이스에서 줄넘김 처리를 저장하지 못하는 이슈 때문)

표 객체는 아래와 같은 구성으로 이루어집니다.
```
{
    "table_header": [    // 헤더 리스트 (헤더 순서)
        "header1",
        "header2"
    ]

    "table": {           // 각 헤더에 들어갈 내용
        "header1": [
            "value1",
            "value2"
        ],
        "header2": [
            "value3",
            "value4"
        ]
    },
}
```

이 객체는 아래와 같은 표를 나타냅니다.

|header1|header2|
|:---:|:---:|
|value1|value3|
|value2|value4|

## POST /api/auth/login
## POST /api/auth/register

두 요청 모두 요청과 응답 형식이 같습니다.   
요청의 경우 body로 아래의 값을 전달합니다.
|속성명|데이터타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|email|string|이메일|kckc0608@naver.com|
|password|string|비밀번호|123412|

응답은 파이어베이스의 인증 객체를 반환합니다.