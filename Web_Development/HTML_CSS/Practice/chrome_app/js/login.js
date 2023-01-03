const backgroundImage = document.getElementsByClassName("bgImage");
const loginWrapper = document.querySelector("#login-wrapper");
const mainWrapper = document.querySelector("#main-wrapper");
const loginForm = document.querySelector("#login-form");
const idInput = document.querySelector("#login-form input:nth-child(1)");
const passwordInput = document.querySelector("#login-form input:nth-child(2)");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERINFO_KEY = "userInfo";

// 로컬 스토리지로부터 받아온 userList 정보
let isSavedUserListExist = false;
let savedUserList = null;

// 로컬 스토리지에 기본 user 정보를 저장한다.
const userList = [];
userList.push({id: "user", password: "12345678"});  // 디폴트 ID, 비밀번호를 저장한다.
localStorage.setItem(USERINFO_KEY, JSON.stringify(userList));


function onLoginSubmit(event) {
    event.preventDefault();  // 브라우저의 기본 동작을 막는다. (ex. 새로고침)

    const userInfo = {
        id: idInput.value.trim(),
        password : passwordInput.value.trim(),
    }

    if (isSavedUserListExist) {
        if (isUserInfoExist(userInfo, savedUserList)) {
            loginWrapper.classList.add(HIDDEN_CLASSNAME);       // 로그인 화면을 숨긴다.
            mainWrapper.classList.remove(HIDDEN_CLASSNAME);
            deleteBlur();                                       // 배경화면 블러를 제거한다.
            paintGreetings(userInfo.id);                        // greetings 화면을 출력한다.
        } else {
            alert("Please check your ID and Password again.");
        }
    } else {
        alert("Please register your ID before login.");
    }
}


/* 로그인 성공 시 인사말을 출력하는 메소드 */
function paintGreetings(userId) {
    greeting.innerHTML = `Welcome ${userId}!`;       // 해당 문자열을 출력한다.
    greeting.classList.remove(HIDDEN_CLASSNAME);     // greeting 화면을 보여준다. (hidden 클래스 삭제)
}


/* 입력된 user id가 로컬 스토리지에 저장된 userList에 이미 존재하는 경우 true를 반환하는 메소드 */
function isIdExist(userId, savedUserList) {
    const idList = savedUserList.map(element => element.id);
    return (idList.includes(userId)) ? true : false;
}


/* 입력된 user 정보가 로컬 스토리지에 저장된 userList에 이미 존재하는 경우 true를 반환하는 메소드 */
function isUserInfoExist(userInfo, savedUserList) {
    let userInfoExist = false;

    savedUserList.forEach(element => {
        if (element.id == userInfo.id && element.password == userInfo.password) { 
            userInfoExist = true;
        }
    });

    return userInfoExist;
}


/* 로그인 초기화 메소드 */
function loginInit() {
    // 로컬 스토리지에 저장된 userList를 가져온다
    savedUserList = localStorage.getItem(USERINFO_KEY);

    if (savedUserList) {
        savedUserList = JSON.parse(savedUserList);
        isSavedUserListExist = true;
    }
 
    loginForm.addEventListener("submit", onLoginSubmit);
}


/* 배경화면 블러처리 제거 메소드 */
function deleteBlur() {
    backgroundImage.style.blur = "none";
    backgroundImage.style.webkitBlur = "none"; 
}


// 로그인 초기화 메소드를 실행한다.
loginInit();
