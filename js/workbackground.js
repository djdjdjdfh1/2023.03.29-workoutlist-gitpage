const body = document.querySelector("body");
const images = ["3.jpg", "5.jpg", "6.jpg"];

const randomNum = Math.floor(Math.random()*images.length);

// 계속 url 전체에 따옴표를 안걸고 안에다만 거는 실수함
body.style.backgroundImage = `url(./img/${images[randomNum]})`;
body.style.backgroundSize = "cover";