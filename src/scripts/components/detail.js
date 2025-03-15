import { displayStars, formatListDate, posterURL } from "../utils";

export const detail = (data, type) => {
  return `
    <div class="container">
        <div class="detail">
          <img 
            class="detail__poster" 
            src="${posterURL}/w500${data.poster_path}" 
          />

          <div class="detail__content">
            <h1>
              ${data.title || data.name} 
              (${new Date(
                data.release_date || data.first_air_date
              ).toLocaleDateString("en-GB", {
                year: "numeric",
              })})
            </h1>  

            <div class="detail__rating">
              ${displayStars(data.vote_average)}
            </div>
  
            <div class="subtitle">
              <span>${type}</span>
              ${new Date(
                data.release_date || data.first_air_date
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              <b>&bull;</b>
              ${data.genres
                .map((genre) => {
                  return genre.name;
                })
                .join(", ")}
              ${
                data.status === "Released"
                  ? `<b>&bull;</b>
                    ${Math.floor(data.runtime / 60)}h 
                    ${data.runtime % 60}m`
                  : ""
              }
            </div>

            <button class="play__btn play__btn-js">
              <span class="btn__container">
                <i class="fa-solid fa-play"></i>
              </span>
              Play Trailer
            </button>
  
            <p class="overview">${data.overview}</p>
  
            <div class="tables">
              <table>
                <tr>
                  <td>Type:</td>
                  <td style="text-transform: capitalize;">${type}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>${data.status}</td>
                </tr>
                <tr>
                  ${
                    type === "tv"
                      ? `
                        <td>Date aired:</td>
                        <td>
                          ${formatListDate(data.first_air_date)}
                        </td>`
                      : `
                        <td>Release date:</td>
                        <td>
                          ${formatListDate(data.release_date)}
                        </td>`
                  }
                </tr>
                 <tr>
                  <td>Original title:</td>
                  <td>
                    ${data.original_title || data.original_name}
                  </td> 
                </tr>
                <tr>
                  <td>Genres:</td>
                  <td>
                    ${data.genres
                      .map((genre) => {
                        return genre.name;
                      })
                      .join(", ")}
                  </td>
                </tr>
              </table>
  
              <table>
                <tr>
                  <td>Rating:</td>
                  <td>${data.vote_average} out of 10</td>
                </tr>
                <tr>
                  <td>Vote count:</td>
                  <td>${data.vote_count}</td> 
                </tr>
                <tr>
                  <td>Popularity:</td> 
                  <td>${data.popularity}</td>
                </tr>
                ${
                  data.status === "Released"
                    ? `
                      <tr>
                        <td>Runtime: </td>
                        <td>
                          ${Math.floor(data.runtime / 60)}h
                          ${data.runtime % 60}m
                        </td>`
                    : ""
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
};
