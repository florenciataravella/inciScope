import { loadHeaderFooter, setupFooter, setupNavigation } from "./utils";

await loadHeaderFooter();
setupFooter();
setupNavigation();


const page = window.location.pathname.split("/").pop();
if (page === "contact.html"){
    const search =  document.getElementById("searchLi");
    search.classList.add("hide")
}
const myForm = document.getElementById("myForm");
const thankyouDiv = document.getElementById("thankyou");

myForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const formData = new FormData(myForm);
    const fname = formData.get("fname");
    const lname = formData.get("lname");

    
    thankyouDiv.classList.toggle("show");
    thankyouDiv.innerHTML = `Thank you for contacting InciScope. ${fname} ${lname}`;
    myForm.reset();
})