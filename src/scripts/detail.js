import breadCrumbs from "./components/breadCrumbs";
import { detail } from "./components/detail";
import { apiToken, apiURL, toggleNavMenu } from "./utils";

const params = new URLSearchParams(window.location.search);
const encodedData = params.get("data");

const decodedString = atob(encodedData);
const [mediaType, mediaId] = decodedString.split(":");

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

    document.querySelector(".breadcrumbs-js").innerHTML = breadCrumbs(
      type,
      data.title || data.name
    );

    document.querySelector(".root-js").innerHTML = detail(data, type);

    const playButton = document.querySelector(".play__btn-js");
    const closeButton = document.querySelector(".close__btn-js");
    const trailerFrame = document.querySelector(".trailer__frame-js");
    const trailerOverlay = document.querySelector(".trailer__overlay-js");

    if (playButton) {
      playButton.addEventListener("click", async () => {
        const url = `${apiURL}/${type}/${id}/videos`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          const trailer = data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          if (trailer) {
            const trailerURL = `https://www.youtube-nocookie.com/embed/${trailer.key}`;
            trailerFrame.src = trailerURL;
            trailerOverlay.style.display = "flex";
          } else {
            alert("Trailer not availiable");
          }
        } catch (err) {
          console.log(`Trailer fetching error: ${err}`);
        }
      });
    } else {
      console.log("play button not found");
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        trailerOverlay.style.display = "none";
        trailerFrame.src = "";
      });
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

toggleNavMenu();

getDetail(mediaType, mediaId);
