const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});
