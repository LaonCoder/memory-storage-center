✍️ **스마트폰 레이아웃 (TIL)**
===

</br>

### ✔️ **뷰포트 meta 태그**
- meta 태그는 웹 브라우저에 특별한 정보를 제공하는 HTML 태그이다.
- 모바일 웹 페이지는 화면에 대한 특별한 정보를 제공하기 위해 뷰포트 meta 태그를 사용한다.  
    ```html
    <!--네이버 모바일 페이지 뷰포트 meta 태그-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" />
    ```  
- 대표적인 뷰포트 meta 태그 속성은 다음과 같다.
    <table border="1">
        <tr>
            <th>속성 이름</th>
            <th>설명</th>
        </tr>
        <tr>
            <td align="center">width</td>
            <td>화면의 너비를 지정한다.</td>
        </tr>
        <tr>
            <td align="center">height</td>
            <td>화면의 높이를 설정한다.</td>
        </tr>
        <tr>
            <td align="center">initial-scale</td>
            <td>초기 확대 비율을 설정한다.</td>
        </tr>
        <tr>
            <td align="center">user-scalable</td>
            <td>확대 및 축소의 가능 여부를 설정한다.</td>
        </tr>
        <tr>
            <td align="center">minimum-scale</td>
            <td>최소 축소 비율을 설정한다.</td>
        </tr>
        <tr>
            <td align="center">maximum-scale</td>
            <td>최대 축소 비율을 설정한다.</td>
        </tr>
        <tr>
            <td align="center">target-densitydpi</td>
            <td>DPI를 지정한다.</td>
        </tr>
    </table>

</br>

### ✔️ **헤더** 작성
- **line-height** 속성은 글자의 높이를 지정하는 속성이고, 글자를 수직 정렬할 때 주로 사용한다.
    - 글자를 감싸는 박스의 높이와 같은 크기로 line-height 속성을 설정하여 글자를 수직 정렬 할 수 있다.  
        ```css
        #main_header {
            /* 배경 지정 */
            height: 45px;
            background: url('../../Images/practice1_4/header_background.png');

            /* 자손 위치 지정 */
            position: relative;
            text-align: center;
            line-height: 45px;
        }
        ```  
- 스프라이트 이미지를 사용할 때 참고할 사항
    - https://www.toptal.com/developers/css/sprite-generator/ 와 같은 사이트에서 스프라이트 이미지를 만들 수 있다.
    - 스프라이트 이미지를 넣을 땐 background-position 속성을 사용한다.  

</br>

### ✔️ **네비게이션** 작성
- 모바일에서 내비게이션 목록은 일반적으로 다음 3가지 방법을 사용해서 만든다.
    - (1) overflow 속성과 float 속성을 사용한다.
    - (2) display 속성에 table 키워드를 적용한다.
    - (3) table 태그를 사용한다.  

</br>

### ✒️ **Takeaway(느낀점)** 
- 디스플레이에서 웹페이지가 어떻게 보여질 것인지에 대한 설정을 잘 해주어야 한다.  
(meta 태그 사용)
- 하나의 스프라이트 이미지로 묶어서 사용하면 웹 페이지의 요청 시간을 줄이고, 쉽게 관리할 수 있게 된다.  

</br>

> 참조 : 윤인성. (2019). 모던 웹을 위한 HTML5 + CSS3 바이블, 3판. 한빛미디어