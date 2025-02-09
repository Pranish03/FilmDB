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
