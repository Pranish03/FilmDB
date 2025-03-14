export const apiURL = import.meta.env.VITE_API_URL;
export const apiToken = import.meta.env.VITE_API_TOKEN;
export const posterURL = import.meta.env.VITE_POSTER_URL;

export const formatDate = (dateStr) => {
  const formattedDate = new Date(dateStr)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", " ");

  return formattedDate;
};

export function formatListDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function displayStars(rating) {
  let starsOutOf5 = (rating / 10) * 5;
  let fullStars = Math.floor(starsOutOf5); // Full stars
  let halfStar = starsOutOf5 % 1 >= 0.5 ? 1 : 0; // Half star if >= 0.5
  let emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

  let starHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starHTML += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'; // Full star
  }
  if (halfStar) {
    starHTML +=
      '<i class="fa-solid fa-star-half-stroke" style="color: #FFD43B;"></i>'; // Half star
  }
  for (let i = 0; i < emptyStars; i++) {
    starHTML += '<i class="fa-regular fa-star" style="color: #FFD43B;"></i>'; // Empty star
  }

  return starHTML;
}

export function toggleNavMenu() {
  const menuButton = document.querySelector(".menu__button-js");

  menuButton.addEventListener("click", () => {
    const navItems = document.querySelector(".nav__items-js");
    const menuIcon = document.querySelector(".menu__button-js i");

    navItems.classList.toggle("display");

    if (menuIcon.classList.contains("fa-bars"))
      menuIcon.classList.replace("fa-bars", "fa-xmark");
    else menuIcon.classList.replace("fa-xmark", "fa-bars");
  });
}
