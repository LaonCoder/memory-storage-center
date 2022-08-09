✍️ **웹 페이지 레이아웃 (TIL)**
===

</br>

### ✔️ **초기화 코드**
- 초기화 코드는 모든 웹 브라우저에서 동일한 출력 결과를 만드는데 사용한다.
- 즉, 브라우저마다 다르게 적용되어 있는 CSS 기본 값들을 제거해주는 것을 말한다.
- 초기화 코드는 다음과 같은 초기화 코드를 많이 사용한다.  
(원하는 리셋 코드의 홈페이지에서 코드 복사 후 HTML 페이지에 붙여 넣는다.)
    - Eric Meyer's CSS reset : https://meyerweb.com/eric/tools/css/reset/
    - HTML5 Reset Stylesheet : http://html5doctor.com/html-5-reset-stylesheet/  

</br>

### ✔️ **헤더(header)** 구성
- 헤더는 도입부에 해당하는 콘텐츠나 네비게이션 링크의 집합 등과 같은 정보를 포함하는 영역이다. 
- **gnb** 는 global navigation bar를 의미하고, **lnb** 는 local navigation bar를 의미한다.
- width를 설정하고, margin의 속성값을 "0 auto"로 설정함으로써 중앙정렬을 할 수 있다.
- **자손의 position 속성에 absolute 키워드를 적용하려면** 다음과 같은 처리를 해주어야 한다.
    - (1) **부모에 height 속성을 사용한다.**
        - position 속성에 absolute 키워드를 적용하면 부모 태그가 영역을 차지하지 않게 된다.
        - 이때 height 속성을 사용해서 부모 태그가 영역을 차지할 수 있게 만들어 주어야 한다.
    - (2) **부모의 position 속성에 relative 키워드를 적용한다.**
        - 이렇게 하면 자손 태그가 부모의 위치를 기준으로 절대 좌표를 설정하게 된다.  

</br>

### ✔️ **수평 메뉴** 구성
- **자손에 float 속성을 사용하면 부모의 overflow 속성에 hidden 키워드를 적용한다.**
    - 이렇게 하면 내부 요소들의 부유(float)를 막을 수 있다.
    - 그 외에도 **clear: both** 를 사용해 float로 일그러진 레이아웃을 쉽게 초기화할 수 있다.

</br>

### ✔️ **사이드 탭바** 구성
- 탭바는 자바스크립트로 생성하는 것이 일반적이지만, CSS를 사용해서 구현할 수도 있다.
- 탭바 스타일 사용
    ```html
    <style>
        /* 첫 번째 탭 */
        input:nth-of-type(1) {display : none;}
        input:nth-of-type(1) ~ div:nth-of-type(1) {display : none;}
        input:nth-of-type(1):checked ~ div:nth-of-type(1) {display : block;}

        /* 두 번째 탭 */
        input:nth-of-type(2) {display : none;}
        input:nth-of-type(2) ~ div:nth-of-type(2) {display : none;}
        input:nth-of-type(2):checked ~ div:nth-of-type(2) {display : block;}

        /* (생략) */
    </style>
    ```
    - input 태그를 보이지 않게 만든다.
    - input 태그가 체크되어 있지 않을 경우, 뒤에 위치하는 div 태그를 보이지 않게 만든다.
    - input 태그가 체크되어 있을 경우, 뒤에 위치하는 div 태그를 보이게 만든다.  

</br>

### ✔️ **목록** 구성
- 문장이 너무 길어져서 글자를 생략해야 할 때, 다음과 같이 생략(Ellipsis) 클래스를 사용한다.
    ```css
    .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ```  

</br>

### ✒️ **Takeaway(느낀점)** 
- HTML 문서와 CSS 파일을 따로 분리해서 관리하는 것이 효율적일 것 같다.
- 리액트를 사용해 헤더, 수평 메뉴, 탭바 등을 컴포넌트로 묶어서 관리하면 더 직관적이고 유지보수하기 쉬울 것 같다.
- 레이아웃을 구성하는 방법에 대해 더 알아보도록 하자.  

</br>

> 참조 : 윤인성. (2019). 모던 웹을 위한 HTML5 + CSS3 바이블, 3판. 한빛미디어