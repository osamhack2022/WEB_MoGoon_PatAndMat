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
|GET|/api/speciality/특기명(한글)/군종(한글)|해당 특기의 상세 정보 객체를 반환합니다|
|GET|/api/speciality/특기명(한글)/군종(한글)/opinions|해당 특기의 의견 데이터 리스트를 불러옵니다.|
|GET|/api/speciality/특기명(한글)/군종(한글)/questions|해당 특기의 질문 데이터 리스트를 불러옵니다.|
|GET|/api/speciality/특기명(한글)/군종(한글)/answers/질문코드|해당 특기 질문의 답변 데이터 리스트를 불러옵니다.|
|GET|/api/user/info|현재 로그인한 유저 정보를 불러옵니다.|
|POST|/api/speciality/특기명(한글)/군종(한글)/like/increase|해당 특기의 좋아요 수를 1 늘립니다|
|POST|/api/speciality/특기명(한글)/군종(한글)/like/decrease|해당 특기의 좋아요 수를 1 줄입니다|
|POST|/api/auth/register|이메일/비밀번호 계정 생성을 요청합니다|
|POST|/api/auth/login|이메일/비밀번호 계정 로그인을 요청합니다|
|POST|/api/speciality/특기명(한글)/군종(한글)/opinion|해당 특기의 의견 데이터를 추가합니다.|
|POST|/api/speciality/특기명(한글)/군종(한글)/question|해당 특기의 질문 데이터를 추가합니다.|
|POST|/api/speciality/특기명(한글)/군종(한글)/answer/질문코드|해당 특기 질문의 답변을 추가합니다.|

# API 응답 객체 설명

모든 요청에 대한 응답은 result 객체에 담겨서 반환됩니다.   
아래는 result 객체의 구조입니다.

|속성명|데이터 타입|간단 설명|예시 값|
|:---:|:---:|:---:|:---:|
|success|bool|성공여부|true / false|
|data|object, array|반환 데이터|데이터 형식은 아래 상세 정보를 확인해주세요.|
|error_code|string|에러코드|auth/email-already-in-use|
|error_msg|string|에러 메세지|Firebase: Error (auth/email-already-in-use).|

아래 설명하는 API의 반환 데이터 형식은 모두 result 객체의 data 프로퍼티를 통해 반환됩니다.

* ## GET /api/speciality/list
    전체 특기의 객체 **리스트**가 반환되며 리스트 안의 각 객체의 속성은 아래 표와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
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
    |is_favorite|boolean|즐겨찾기한 특기 여부|true / false|

* ## GET /api/speciality/특기명(한글)/군종(한글)
    해당 군종에서의 특기 상세 정보를 가져옵니다.   
    **특기 리스트에서 해당 특기의 정보를 가져온 뒤** 그 내용에 아래 내용을 추가합니다.
    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |speciality_summary|array|특기요약|["정보체계 관리는..", "그렇습니다"]|
    |contents|array|콘텐츠 리스트|(아래에서 설명)|

    speciality_summary속성에는 특기 요약 설명 데이터가 있습니다.
    한줄 한줄 데이터를 리스트에 나눠 담아보내주므로, 받은 내용 사이사이에 줄바꿈을 해주어 보여주면 됩니다.   
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

* ## GET /api/speciality/특기명(한글)/군종(한글)/opinions
    해당 특기의 의견 데이터 리스트를 응답 받습니다.   
    응답 객체의 형태는 아래와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |editor_nickname|string|작성자 닉네임|삼성애플맨|
    |editor_email|string|작성자 이메일|"kckc0608@naver.com"|
    |opinion|string|의견|"this is good speciality for study"|
    |like|number|좋아요 수|0 (기본), 1, 2, ...|
    |dislike|number|싫어요 수|0 (기본), 1, 2, ...|
    |created_time|object|의견 생성 시간|{"seconds": 1666505548, "nanoseconds": 141000000}|

    생성 시간은 타임스탬프 입니다.
    날짜로 활용하기 위해서는 변환이 필요합니다.

* ## GET /api/speciality/특기명(한글)/군종(한글)/questions
    해당 특기의 질문 데이터 객체 **리스트**를 응답 받습니다.   
    리스트 내 각 응답 객체의 데이터 형태는 아래와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |editor_nickname|string|작성자 닉네임|삼성애플맨|
    |editor_email|string|작성자 이메일|"kckc0608@naver.com"|
    |question_id|string|질문코드|"8YtkkSvySGsrodugYUCw"|
    |title|string|질문 제목|"what is?"|
    |contents|array|질문 내용|["what is that?","what is that too?"]|

    질문 내용은 한줄 한줄 데이터를 배열에 저장하여 전송하므로,
    화면에 출력할 때는 줄넘김을 직접 구현해주어야 합니다.

    질문코드는 해당 질문에 달린 답변을 조회할 때 사용됩니다.

* ## GET /api/speciality/정보체계관리/공군/answers/질문코드
    해당 특기의 답변 데이터 객체 **리스트**를 응답 받습니다.   
    리스트 내 각 응답 객체의 데이터 형태는 아래와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |editor_nickname|string|작성자 닉네임|삼성애플맨|
    |editor_email|string|작성자 이메일|"kckc0608@naver.com"|
    |contents|array|답변 내용|["what is that?","what is that too?"]|
    |like|number|좋아요 수|0 (기본), 1, 2, ...|
    |dislike|number|싫어요 수|0 (기본), 1, 2, ...|

    질문 내용은 한줄 한줄 데이터를 배열에 저장하여 전송하므로,
    화면에 출력할 때는 줄넘김을 직접 구현해주어야 합니다.

    질문코드는 해당 질문에 달린 답변을 조회할 때 사용됩니다.

* ## GET /api/user/info
    현재 로그인 중인 사용자의 정보를 불러옵니다.
    현재 로그인 중인 사용자를 전달하기 위해 요청 헤더 중
    Authorization 헤더에 Bearer 타입의 ID Token을 넘깁니다.

    아래는 반환 데이터 입니다.
    
    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |name|string|이름|"권찬"|
    |nickname|string|닉네임|"에버듀"|
    |favorite_speciality|array|좋아요 누른 특기 리스트|["km1sF8jysWoBiRxSUWXg", "km1sF8jysWoBiRxSUWXn"]|
    |school|map|학교 및 전공 정보|하단 참고|
    |certificate|map|자격증 정보|하단 참고|
    |extra_point|map|가산점 정보|하단 참고|
    |extra_point|map|가산점 정보|하단 참고|

    학교 및 전공 정보는 아래와 같은 데이터를 가집니다.
    ```json
    "school": {
        "work_school": "2년 수료", // 직업전문학교, 인재개발원 경력 : 2년 수료, 1년 수료, 6개월 ~ 1년 중 하나의 값
        "type": "대학교", // 대학교, 전문대(2년), 전문대(3년), 고졸 중 하나의 값
        "grade": "1학년", // 1학년, 2학년, 3학년, 4학년 중 하나의 값
        "is_major": "전공", // 고졸 선택시 전공 / 비전공 여부
        "is_register": "재학" // 재학 / 수료 여부
    },
    ```
    자격증 정보는 아래와 같은 데이터를 가집니다.
    ```json
    "certificate": {
        "national": "기사이상", // 국가기술자격: 기사이상 / 산업기사 / 기능사 / null 중 하나의 값
        "general": "공인", // 일반자격: 공인 / 민간 / null 중 하나의 값
        "drive_license": "대형 / 특수", // 운전면허: 대형 / 특수, 1종 보통, 2종 보통(수동) / null 중 하나의 값
        "work_learn": "L2" // 일학습 병행 자격증: L6, L5 / L4, L3, L2, null 중 하나의 값
    },
    ```
    가산점은 아래와 같은 데이터를 가집니다.
    ```json
    "extra_point": {
        "other": {
            "국가유공자_독립운동가": true,
            "국외이주자": true,
            "경제적약자": true
        },
        "volunteer": 8, // 봉사활동 시간: 0 8 16 24 32 40 48 56 64 중 하나의 값
        "blood_donation": 8, // 헌혈 횟수: 0~8 사이의 값
        "child_count": "2인", // 다자녀 여부: 2인 / 3인이상 / null 중 하나의 값
        "history_cert": "1, 2급",// 한국사능력검정시험: 1, 2급 / 3, 4급 / null 중 하나의 값
        "korean_cert": "1, 2급" // 한국어능력검정시험: 1, 2급 / 3, 4급 / null 중 하나의 값
    }
    ```

* ## POST /api/speciality/특기명(한글)/군종(한글)/like/increase
    요청시 Authorization 헤더를 통해 Bearer 타입의 아이디 토큰을 보내야 합니다.

    해당하는 특기의 좋아요 수를 1 증가시키고,
    현재 로그인한 유저의 즐겨찾기 특기 리스트에 해당 특기를 추가합니다.
    
    별도의 응답 데이터는 없습니다.   
    (result객체를 통해 보내는 데이터가 없다는 뜻입니다)
* ## POST /api/speciality/특기명(한글)/군종(한글)/like/decrease
    요청시 Authorization 헤더를 통해 Bearer 타입의 아이디 토큰을 보내야 합니다.

    해당하는 특기의 좋아요 수를 1 감소시키고,
    현재 로그인한 유저의 즐겨찾기 특기 리스트에서 해당 특기를 삭제합니다.

    별도의 응답 데이터는 없습니다.
    (result객체를 통해 보내는 데이터가 없다는 뜻입니다)

* ## POST /api/auth/login
    서버에 입력한 계정 정보로 로그인을 요청합니다.   
    요청시 body로 아래의 값을 전달합니다.
    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |email|string|이메일|kckc0608@naver.com|
    |password|string|비밀번호|123412|

    응답은 **ID Token을 반환합니다.**
    반환 받은 ID Token은 매 요청시 Authorization 헤더에 Bearer type으로 넣어서 요청해주세요.
    이 토큰의 존재 여부로 로그인 여부를 알 수 있습니다.
* ## POST /api/auth/register
    서버에 입력한 계정 정보로 회원가입을 요청합니다.   
    요청시 body로 아래의 값을 전달합니다.
    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |email|string|이메일|kckc0608@naver.com|
    |password|string|비밀번호|123412|

    result 응답 객체에 담기는 데이터는 없습니다.

* ## POST /api/speciality/특기명(한글)/군종(한글)/opinion
    해당 특기의 의견 데이터 추가를 요청합니다.   
    요청 객체의 형태는 아래와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |editor_nickname|string|작성자 닉네임|삼성애플맨|
    |editor_email|string|작성자 이메일|"kckc0608@naver.com"|
    |opinion|string|의견|"this is good speciality for study"|

* ## POST /api/speciality/특기명(한글)/군종(한글)/question
    해당 특기의 질문 데이터 추가를 요청합니다.
    요청 객체의 형태는 아래와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |editor_nickname|string|작성자 닉네임|삼성애플맨|
    |editor_email|string|작성자 이메일|"kckc0608@naver.com"|
    |title|string|질문 제목|"what is?"|
    |contents|array|질문 내용|["what is that?","what is that too?"]|

* ## POST /api/speciality/정보체계관리/공군/answer/질문코드
    해당 특기의 답변 데이터 추가를 요청합니다. 
    요청 객체의 형태는 아래와 같습니다.

    |속성명|데이터 타입|간단 설명|예시 값|
    |:---:|:---:|:---:|:---:|
    |editor_nickname|string|작성자 닉네임|삼성애플맨|
    |editor_email|string|작성자 이메일|"kckc0608@naver.com"|
    |contents|array|답변 내용|["what is that?","what is that too?"]|