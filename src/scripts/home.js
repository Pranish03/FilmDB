import {
  apiToken,
  apiURL,
  formatDate,
  posterURL,
  toggleNavMenu,
} from "./utils";

async function fetchData() {
  try {
    const response = await fetch(`${apiURL}/trending/all/week`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Http error! Status: ${response.status}`);
    }

    const data = await response.json();

    renderHTML(data);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function renderHTML(data) {
  let pageHTML = "";
  pageHTML += data.results
    .map((movie) => {
      return `
        <div class="card card-js">
          <img 
            class="card__poster" 
            src="${posterURL}/w500${movie.poster_path}"
            alt="${movie.title || movie.name}" 
          />
          <div 
            class="card__content content-js"
            data-id="${movie.id}"
            data-type="${movie.media_type}"
          >
            <h3>${movie.title || movie.name}</h3>
            <p>${formatDate(movie.release_date || movie.first_air_date)}</p>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelector(".trending-grid-js").innerHTML = pageHTML;
}

function handleClick() {
  document.querySelector(".trending-grid-js").addEventListener("click", (e) => {
    const card = e.target.closest(".content-js");
    if (card) {
      const mediaType = card.getAttribute("data-type");
      const mediaId = card.getAttribute("data-id");
      const encodedParams = btoa(`${mediaType}:${mediaId}`);
      window.location.href = `detail.html?data=${encodedParams}`;
    }
  });
}

toggleNavMenu();

fetchData();
handleClick();
