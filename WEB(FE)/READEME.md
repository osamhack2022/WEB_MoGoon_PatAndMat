-공통-
지금 모든 소스와 css가 app.js와 app.css에 몰려있음
화면별로 js와 css나눌것 그리고 css너무 지저분함 scss도입할것

-main-

1. banner에서 div backgroundImage 속성이 작동하지 않음 이후에 한번 확인해야함
현재로서는 css에서 nth-child() 속성을 이용해서 사진을 넣었음 별로 좋은 방식이 아님

2. 배너의 사진 크기 문제
width : 100vh
height : width/4
기존에 있던 사진을 임의로 사용하는거라서 
내가 원하는 장면이 center가 잡히지 않음
위 길이 공식에 맞춰서 사진을 다시 가공할 필요가 있음
그리고 사진 화질이 고화질이어야 함