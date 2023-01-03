const images = ["img1.jpg", "img2.jpg", "img3.jpg"];

const body = document.querySelector("body");

function paintImage() {
    const bgImage = new Image();
    bgImage.src = `img/background_image/${images[Math.floor(Math.random() * images.length)]}`;
    bgImage.classList.add("bgImage");
    body.appendChild(bgImage);
}

paintImage();