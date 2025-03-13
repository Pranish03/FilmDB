const breadCrumbs = (type, title) => {
  return `
    <a class="crumb-home" href="../../index.html"><i class="fa-solid fa-house"></i> Home</a>
    <i class="fa-solid fa-angle-right"></i>
    <a href="#">${type}</a>
    <i class="fa-solid fa-angle-right"></i>
    <p>${title}</p>
  `;
};

export default breadCrumbs;
