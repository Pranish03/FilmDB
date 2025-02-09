import { apiToken, apiURL, formatDate, posterURL } from "./utils";

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
        <div 
          class="card card-js" 
          data-id="${movie.id}"
          data-type="${movie.media_type}"
        >
          <img 
            class="poster" 
            src="${posterURL}/w500${movie.poster_path}"
            alt="${movie.title || movie.name}" 
          />
          <h3>${movie.title || movie.name}</h3>
          <p>${formatDate(movie.release_date || movie.first_air_date)}</p>
        </div>
      `;
    })
    .join("");

  document.querySelector(".trending-js").innerHTML = pageHTML;
}

function handleClick() {
  document.querySelector(".trending-js").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
      const mediaType = card.getAttribute("data-type");
      const mediaId = card.getAttribute("data-id");
      window.location.href = `detail.html?type=${mediaType}&id=${mediaId}`;
    }
  });
}

fetchData();
handleClick();
