import ExternalServices from "./ExternalServices"
import CompoundDetails from "./CompoundDetails";
import { loadHeaderFooter } from "./utils";
import { setupFooter } from "./utils";
import { setupNavigation } from "./utils";
import { setupVisits } from "./utils";
import { visitsModal } from "./utils";

const compoundElement = document.getElementById("compoundInput");
const button = document. getElementById("search-btn");
const detailspubChemElement = document.getElementById("compound-pubChemDetails");
const detailswikiElement = document.getElementById("compound-wikiDetails");
const imageElement = document.getElementById("compound-image");
const clearBtn = document.getElementById("clearDescription");

clearBtn.addEventListener("click", ()=>{
    detailspubChemElement.innerHTML="";
    detailswikiElement.innerHTML=""});


button.addEventListener("click", ()=>{
const compound = compoundElement.value.toLowerCase();
const dataSource = new ExternalServices(compound);
const details = new CompoundDetails(dataSource,detailspubChemElement,detailswikiElement,imageElement );

details.init();
});

await loadHeaderFooter();
setupFooter();
setupNavigation();
visitsModal();
setupVisits();



