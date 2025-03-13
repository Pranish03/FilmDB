import { apiToken, apiURL, posterURL } from "./utils";

const params = new URLSearchParams(window.location.search);

const mediaType = params.get("type");
const mediaId = params.get("id");

console.log(mediaId);

async function getDetail(type, id) {
  try {
    const response = await fetch(`${apiURL}/${type}/${id}`, {
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

    console.log(data);
    renderHTML(data);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

function renderHTML(data) {
  document.querySelector(".root-js").innerHTML = `
    <div class="container">
      <div class="wrapper">
        <img class="poster" src="${posterURL}/w500${data.poster_path}" />
        <div>
          <h1>${data.title || data.name}</h1>
          
          <p>Original title: ${data.original_title || data.original_name}</p>
          <br />
          <p class="overview">${data.overview}</p>
        </div>
      </div>
    </div>
  `;
}

getDetail(mediaType, mediaId);

/*
<p>
  $
  {new Date(data.release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
  <b>&bull;</b>$
  {data.genres
    .map((genre) => {
      return genre.name;
    })
    .join(", ")}
  $
  {data.status === "Released"
    ? `<b>&bull;</b>
                  ${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : ""}
</p>
*/
