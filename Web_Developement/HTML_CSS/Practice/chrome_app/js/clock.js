const clock = document.querySelector("h1#clock");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}`;
}

getClock();
setInterval(getClock, 1000);  // 매 초마다 getClock 메소드를 실행한다.