import { loadHeaderFooter, setupFooter, setupNavigation } from "./utils";

await loadHeaderFooter();
setupFooter();
setupNavigation();


const page = window.location.pathname.split("/").pop();
if (page === "contact.html"){
    const search =  document.getElementById("searchLi");
    search.classList.add("hide")
}

const myForm = document.forms["myForm"];



myForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    
    const check_status = myForm.checkValidity();
    const invalidFields = myForm.querySelectorAll(":invalid");
    const thankyouDiv = document.getElementById("thankyou");
    myForm.reportValidity();

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
       
        console.log(invalidFields);
        thankyouDiv.classList.toggle("show");
        thankyouDiv.innerHTML =`Please, fill in all the inputs.`
        return
    }
})