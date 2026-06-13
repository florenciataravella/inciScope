import ExternalServices from "./ExternalServices"
import CompoundDetails from "./CompoundDetails";
import { loadHeaderFooter } from "./utils";
import { setupFooter } from "./utils";
import { setupNavigation } from "./utils";
import { setupVisits } from "./utils";
import { visitsModal } from "./utils";
import { randomCompound } from "./utils";

await loadHeaderFooter();
setupFooter();
setupNavigation();
visitsModal();
setupVisits();

const compoundElement = document.getElementById("compoundInput");
const form = document.getElementById("searchForm")
const detailspubChemElement = document.getElementById("compound-pubChemDetails");
const detailswikiElement = document.getElementById("compound-wikiDetails");

const imageElement = document.getElementById("compound-image");
const clearBtn = document.getElementById("clearButton");

const dataSource = new ExternalServices("ethanolamine");
    
const details = new CompoundDetails(dataSource, detailspubChemElement, detailswikiElement, imageElement );

await details.init();

display();

clearBtn.addEventListener("click", ()=> {
    detailspubChemElement.innerHTML="";
    detailswikiElement.innerHTML=""
    imageElement.innerHTML="";
display();
});
    

function display(){
let homeBanner = setInterval( async() => {
    
    const homeCompound = randomCompound();

    const spinner = document.getElementById("spinner");

    const dataSource = new ExternalServices(homeCompound);

    const details = new CompoundDetails (
        dataSource,
        detailspubChemElement,
        detailswikiElement,
        imageElement 
        );

        spinner.classList.remove("hidden");

        await details.init();

        spinner.classList.add("hidden");
  
        detailspubChemElement.classList.remove("fade-in");
        detailswikiElement.classList.remove("fade-in");

        void detailspubChemElement.offsetWidth; // forces restart

        detailspubChemElement.classList.add("fade-in");
        detailswikiElement.classList.add("fade-in");



},10000)

form.addEventListener("submit", async(event)=>{
    event.preventDefault();
    
    clearInterval(homeBanner);

    const compound = compoundElement.value.toLowerCase();
    
    
    const dataSource = new ExternalServices(compound);
    
    const details = new CompoundDetails(
    dataSource,
    detailspubChemElement,
    detailswikiElement,
    imageElement 
    );
  

    await details.init();


    compoundElement.value="";
    compoundElement.focus()
}
);
}





