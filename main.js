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
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();

    let fullNameInvalid = fullNameValue === '';
    let emailInvalid = emailValue === '' || !isEmail(emailValue);
    let phoneInvalid = phoneValue === '' || phoneValue.length !== 7;
    let messageInvalid = messageValue === '';
    const anyFormInputInvalid = fullNameInvalid || emailInvalid || phoneInvalid || messageInvalid;

    if(anyFormInputInvalid) {

        if(fullNameInvalid) {
            setErrorFor(fullName, 'Name cannot be blank');
        } else {
            setSuccessFor(fullName);
        }
    
        if(emailValue === '') {
            setErrorFor(email, 'Email cannot be blank');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Not a valid email');
        } else {
            setSuccessFor(email);
        }
    
        if(phoneValue === '') {
            setErrorFor(phone, 'Phone cannot be blank');
        } else if (phoneValue.length != 7) {
            setErrorFor(phone, 'Not a valid phone number length. Length has to be 7 characters');
        } else {
            setSuccessFor(phone);
        }
    
        if(messageInvalid) {
            setErrorFor(message, 'Message cannot be blank');
        } else {
            setSuccessFor(message);
        }
    } else {
        goToThankYou();
    }
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const errorMsg = formControl.querySelector('.error-msg');
	formControl.className = 'form-control error';
	errorMsg.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const goToThankYou = () => { //these two lines are used often in the code so we make a function for it to simplify
    h1.innerHTML = "Thank you!";
    p.innerHTML = ""
    form.innerHTML = "";
    thanksMsg.innerHTML = "<p class='large-text'>Thank you for your inquiry.<br> Your message has been received and we will be in contact soon.</p>"
    button.innerHTML = "<a href='/' class='btn'>Back to Form</a>";
}

window.addEventListener("popstate", (e) => { //when ever the user pushes the back or forward button in the browser
    if(e.state === "Thank you") goToThankYou();
});

if(location.hash === "#thankyou") goToThankYou(); //in case we refresh the Thank you page