// Get the form element
const form = document.querySelector('#form');

// Get form child elements
const fullName = form.querySelector('#fullName');
const email = form.querySelector('#email');
const phone = form.querySelector('#phone');
const message = form.querySelector('#message');

// Get other page elements
const banner = document.querySelector('.banner')
const h1 = banner.querySelector('h1');
const p = banner.querySelector('p');
const thanksMsg = document.querySelector('#thankyou_message');
const button = document.querySelector('#button');

// Add submit event listener to the form
form.addEventListener('submit', e => {
    // Prevent reloading page
    e.preventDefault();
    // Check for errors in form
    checkInputs();
});

// Function to check for errors in form
function checkInputs() {
    // trim to remove the whitespaces
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();

    // Variables for validation rules, just to make the if statement more readable (not necessary)
    const fullNameInvalid = fullNameValue === '';
    const emailInvalid = emailValue === '' || !isEmail(emailValue);
    const phoneInvalid = phoneValue === '' || phoneValue.length !== 7;
    const messageInvalid = messageValue === '';
    const anyInputInvalid = fullNameInvalid || emailInvalid || phoneInvalid || messageInvalid;

    if(anyInputInvalid) { // Checks if any input field is not correctly filled in

        // Checks checks if name input is valid
        if(fullNameInvalid) {
            // sets error function if nothing is filled in
            setErrorFor(fullName, 'Name cannot be blank');
        } else {
            // else sets success function
            setSuccessFor(fullName);
        }
    
        if(emailValue === '') {
            // sets error function if nothing is filled in
            setErrorFor(email, 'Email cannot be blank');
        } else if (!isEmail(emailValue)) {
            // sets error function if email is not correctly filled in as the isEmail() function declares
            setErrorFor(email, 'Not a valid email');
        } else {
            // else sets success function
            setSuccessFor(email);
        }
    
        if(phoneValue === '') {
            // sets error function if nothing is filled in
            setErrorFor(phone, 'Phone cannot be blank');
        } else if (phoneValue.length != 7) {
            // sets error function if phone does not have exactly 7 charachters
            setErrorFor(phone, 'Not a valid phone number length. Length has to be 7 characters');
        } else {
            // else sets success function
            setSuccessFor(phone);
        }
    
        if(messageInvalid) {
            // sets error function if nothing is filled in
            setErrorFor(message, 'Message cannot be blank');
        } else {
            // else sets success function
            setSuccessFor(message);
        }

    } else { // If all fields are correctly filled in
        // adds the /#thankyou to the url
        history.pushState("Thank you", null, "#thankyou")
        // Sets the thankyou function
        goToThankYou();
    }
}

// Function for error, sets a class .error on div.form-control and a text to div.error-msg 
function setErrorFor(input, message) {
	const formControl = input.parentElement; // formControl is the parent element of said input
	const errorMsg = formControl.querySelector('.error-msg'); // Error message is of that same formControl
	formControl.className = 'form-control error'; // creates a new class for form control with .error added
 	errorMsg.innerText = message; // Adds a message to that error-msg element.
}

// Function for success, sets a class .success on div.form-control
function setSuccessFor(input) {
	const formControl = input.parentElement; // formControl is the parent element of said input
	formControl.className = 'form-control success'; // creates a new class for form control with .success added
}

// Checks if the email is correctly filled in
function isEmail(email) {
    // Regular expression rule for the email 
    // Must have some letters, then an @, then some more letters followed by a ., and some letters
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Thank you function
const goToThankYou = () => { 
    // These lines replace the form content a thank you message
    h1.innerHTML = "Thank you!";
    p.innerHTML = ""
    form.innerHTML = "";
    thanksMsg.innerHTML = "<p class='large-text'>Thank you for your inquiry.<br> Your message has been received and we will be in contact soon.</p>"
    button.innerHTML = "<a href='/' class='btn'>Back to Form</a>";
}

window.addEventListener("popstate", (e) => { 
    // Whenever the user pushes the back or forward button in the browser
    if(e.state === "Thank you") goToThankYou();
});
// In case we refresh the Thank you page
if(location.hash === "#thankyou") goToThankYou(); 