export function renderWithTemplate(template, parentElement, data, callback){
    parentElement.innerHTML = template;

    if (callback){
        callback(data);
    }
}

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}
export async function loadHeaderFooter(){
    const header = await loadTemplate ("/header.html");
    const footer =  await loadTemplate("/footer.html");
    const headerElement = document.getElementById ("ajaxHeader");
    const footerElement = document.getElementById ("ajaxFooter");

    renderWithTemplate(header, headerElement);
    renderWithTemplate (footer, footerElement);
}

export function setupFooter(){

const timeElement = document. getElementById("time");

const date = new Date();

timeElement.innerHTML = `${date.getFullYear()} - ${String(date.getMonth()+1).padStart(2,"0")} - ${String(date.getDate()).padStart(2, "0")}`

}
export function setupVisits(){
const nvisitsElement = document.getElementById ("n-visits");

let storedValue = Number(window.localStorage.getItem("nVisits"))|| [];

if(storedValue!==0){
    nvisitsElement.textContent = `Welcome back! This is your ${storedValue} visit.`;
}
else{
    nvisitsElement.textContent = "This is your first visit"
}
storedValue ++;
localStorage.setItem("nVisits", storedValue);

}

export function visitsModal(){
    const modal = document.getElementById("visits");
    const modalbtn = document.getElementById("closeModal");

        setTimeout(() =>{
            modal.showModal();

            setTimeout(() => {
                modal.close()
            },3000)

        }, 4000);

    modalbtn.addEventListener("click",() => {
  modal.close()});
}
export  function setupNavigation(){
    const mainnav = document.querySelector(".nav-links");
    const hambtn = document.getElementById("ham-button");

    hambtn.addEventListener("click", ()=>{
        mainnav.classList.toggle("show");
        hambtn.classList.toggle("show");

    })
}