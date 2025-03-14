document.querySelector(".menu__button-js").addEventListener("click", () => {
  const navItems = document.querySelector(".nav__items-js");
  const menuIcon = document.querySelector(".menu__button-js i");

  navItems.classList.toggle("display");

  if (menuIcon.classList.contains("fa-bars"))
    menuIcon.classList.replace("fa-bars", "fa-xmark");
  else menuIcon.classList.replace("fa-xmark", "fa-bars");
});
