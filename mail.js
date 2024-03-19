// Reference your database
const contactFormDB = firebase.database().ref("contactForm");

// Function to submit the form
function submitForm(e) {
    e.preventDefault();
    console.log("submitted");
    const name = getElementVal("name");
    const emailid = getElementVal("emailid");
    const msgContent = getElementVal("msgContent");

    saveMessages(name, emailid, msgContent);

 
    document.querySelector(".alert").style.display = "block";

    
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

   
    document.getElementById("contactForm").reset();
}


const saveMessages = (name, emailid, msgContent) => {
    const newContactForm = contactFormDB.push();

    newContactForm.set({
        name: name,
        emailid: emailid,
        msgContent: msgContent,
    });
};


const getElementVal = (id) => {
    return document.getElementById(id).value;
};


document.getElementById("contactForm").addEventListener("submit", submitForm);
