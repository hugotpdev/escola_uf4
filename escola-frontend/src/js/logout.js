import Common from "./common.js";

const btnLogout = document.querySelector("#btn-logout"); 

btnLogout.addEventListener("click", () => Common.logout());