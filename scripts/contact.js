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
const check_status = myForm.checkValidity();


myForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    if(check_status){
    const formData = new FormData(myForm);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    
    thankyouDiv.classList.toggle("show");
    thankyouDiv.innerHTML = `Thank you for contacting InciScope. ${fname} ${lname}.Your contact information is: ${email} `;
    myForm.reset();
    }
    else{
        console.log("The form has not been submitted");
        thankyouDiv.classList.toggle("show");
        thankyouDiv.innerHTML =`Please, fill in all the inputs.`
    }
})