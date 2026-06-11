import { loadHeaderFooter, setupFooter, setupNavigation } from "./utils";

await loadHeaderFooter();
setupFooter();
setupNavigation();

const page = window.location.pathname.split("/").pop();
if (page === "about.html"){
    const search =  document.getElementById("searchLi");
    search.classList.add("hide")
}