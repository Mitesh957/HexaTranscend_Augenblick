const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const panCard = document.getElementById('panCard'); // Add the PAN card input element

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const isValidPAN = pan => {
    const panRegex = /^[A-Z]{3}[P,C,A,F,H,T]{1}[A-Z]{1}[0-9]{4}[A-Z]$/;
    return panRegex.test(pan);
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const panCardValue = panCard.value.trim(); // Get the PAN card input value

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
    } else {
        setSuccess(password2);
    }

    if (panCardValue === '') {
        setError(panCard, 'PAN Card is required'); // Validate PAN card input
    } else if (!isValidPAN(panCardValue)) {
        setError(panCard, 'Invalid PAN Card format'); // Validate PAN card format
    } else {
        setSuccess(panCard);
    }
};


const firebaseConfig = {
    apiKey: "AIzaSyCqTWhstnYIMAWxFKlFmhqV5kXfDsMwm7Q",
    authDomain: "work-vibe.firebaseapp.com",
    databaseURL: "https://work-vibe-default-rtdb.firebaseio.com",
    projectId: "work-vibe",
    storageBucket: "work-vibe.appspot.com",
    messagingSenderId: "657553447517",
    appId: "1:657553447517:web:b31d13b5e033c32d7a8bb4",
    measurementId: "G-HEN3V080PD"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  


const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            
            document.write("You are Signed Up")
            console.log(result)


             
             window.location.href = "sign.html";
           
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
            // ..
        });
}


const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
   
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
          
            console.log(result);

           
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);

         
            window.alert("Incorrect credentials. Please try again.");
        });
}



function displayResources() {
    const resourceList = document.getElementById("resource-list");

    resources.forEach((resource) => {
        const resourceCard = document.createElement("div");
        resourceCard.classList.add("resource-card");

        const titleElement = document.createElement("div");
        titleElement.classList.add("resource-title");
        titleElement.textContent = resource.title;

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("resource-description");
        descriptionElement.textContent = resource.description;

        resourceCard.appendChild(titleElement);
        resourceCard.appendChild(descriptionElement);

        resourceList.appendChild(resourceCard);
    });
}

displayResources();

