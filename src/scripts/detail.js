import breadCrumbs from "./components/breadCrumbs";
import { detail } from "./components/detail";
import { apiToken, apiURL } from "./utils";

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
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

getDetail(mediaType, mediaId);
