const menuBtn = document.querySelector('.menu-btn');
const header = document.querySelector('.header__inner');
const body = document.body;

menuBtn.addEventListener("click", function (event) {
    header.classList.toggle('header__inner--active');
    body.classList.toggle('body--active');
    menuBtn.classList.toggle('active');
});